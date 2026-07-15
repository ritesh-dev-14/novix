$port = 3000
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$port/")

# Stop existing listener if any
if ($listener.IsListening) {
    $listener.Stop()
}

try {
    $listener.Start()
    Write-Host "Server started at http://localhost:$port/"
    
    # Run loop
    while ($listener.IsListening) {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response

        $url = $request.Url.LocalPath
        if ($url -eq "/") { $url = "/index.html" }
        
        # Decode URL spaces, etc.
        $decodedUrl = [System.Uri]::UnescapeDataString($url)
        $filePath = Join-Path $PSScriptRoot $decodedUrl

        if (Test-Path $filePath -PathType Leaf) {
            $bytes = [System.IO.File]::ReadAllBytes($filePath)
            
            # Determine mime type
            if ($decodedUrl.EndsWith(".html")) {
                $response.ContentType = "text/html; charset=utf-8"
            } elseif ($decodedUrl.EndsWith(".jpg") -or $decodedUrl.EndsWith(".jpeg")) {
                $response.ContentType = "image/jpeg"
            } elseif ($decodedUrl.EndsWith(".png")) {
                $response.ContentType = "image/png"
            } elseif ($decodedUrl.EndsWith(".css")) {
                $response.ContentType = "text/css; charset=utf-8"
            } elseif ($decodedUrl.EndsWith(".js")) {
                $response.ContentType = "application/javascript; charset=utf-8"
            }
            
            $response.ContentLength64 = $bytes.Length
            $response.OutputStream.Write($bytes, 0, $bytes.Length)
        } else {
            $response.StatusCode = 404
            $errorMessage = [System.Text.Encoding]::UTF8.GetBytes("404 Not Found")
            $response.ContentLength64 = $errorMessage.Length
            $response.OutputStream.Write($errorMessage, 0, $errorMessage.Length)
        }
        $response.OutputStream.Close()
    }
} catch {
    Write-Error $_
} finally {
    $listener.Stop()
}
