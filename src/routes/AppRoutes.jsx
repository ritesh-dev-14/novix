import { Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import Products from "../components/Products/Products";
import AboutPage from "../pages/Contact";

import DirectorsMessagePage from "../components/DirectorsMessage/DirectorsMessagePage";

import MissionVisionPage from "../components/MissonVission/MissionVisionPage";
import BlogsPage from "../components/Blogs/BlogsPage";
import CareersPage from "../Careers/CareersPage";
import ContactPage from "../Contact/ContactPage";
import PrivacyPolicy from "../components/legal/PrivacyPolicyPage";
import TermsAndConditions from "../components/terms/TermsAndConditions";
export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/directors-message" element={<DirectorsMessagePage />} />
        <Route path="/mission-vision" element={<MissionVisionPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/careers" element={<CareersPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/blogs" element={<BlogsPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
      </Route>
    </Routes>
  );
}
