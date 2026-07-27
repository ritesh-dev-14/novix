import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import Preloader from "./components/Preloader/Preloader";
import ScrollToTop from "./components/scrolltotop/ScrollToTop";
import { useEffect } from "react";
import { HelmetProvider } from "react-helmet-async";

export default function App() {
  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
  }, []);
  return (
    <HelmetProvider>
      <BrowserRouter>
        <ScrollToTop />
        {/* <Preloader /> */}
        <AppRoutes />
      </BrowserRouter>
    </HelmetProvider>
  );
}
