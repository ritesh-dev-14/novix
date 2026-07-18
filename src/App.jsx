import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import Preloader from "./components/Preloader/Preloader";
import ScrollToTop from "./components/scrolltotop/ScrollToTop";
import { useEffect } from "react";

export default function App() {
  useEffect(() => {
  if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
  }
}, []);
  return (
    <BrowserRouter>
      <ScrollToTop />
      {/* <Preloader /> */}
      <AppRoutes />
    </BrowserRouter>
  );
}