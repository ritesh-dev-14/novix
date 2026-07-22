// import { Outlet, useLocation } from "react-router-dom";
// import { useLayoutEffect } from "react";
// import Navbar from "../components/Navbar/Navbar";
// import Footer from "../components/Footer/Footer";
// // import FramesBackground from "../components/FramesBackground/FramesBackground";
// import contactBg from "../../contact.mp4";

// export default function MainLayout() {
//   const { pathname } = useLocation();

//   const isHome = pathname === "/";
//   const isAbout = pathname === "/about";

//   return (
//     <>
//       {/* Background */}
//       {isHome ? (
//         <div className="bg-pattern-medical"></div>
//       ) : isAbout ? (
//         <video
//           className="fixed inset-0 w-full h-full object-cover -z-0"
//           autoPlay
//           muted
//           loop
//           playsInline
//           preload="auto"
//         >
//           <source src={contactBg} type="video/mp4" />
//         </video>
//       ) : (
//         <FramesBackground />
//       )}

//       {/* Optional overlay only for About Us */}
//       {isAbout && (
//         <div className="fixed inset-0 bg-black/55 -z-10 pointer-events-none" />
//       )}

//       <div
//         id="page-wrapper"
//         className="relative min-h-screen w-full flex flex-col overflow-x-hidden bg-transparent"
//       >
//         <Navbar />

//         <main className="flex-1 flex flex-col items-center w-full">
//           <Outlet />
//         </main>

//         <Footer />
//       </div>
//     </>
//   );
// }
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";

export default function MainLayout() {
  return (
    <div
      id="page-wrapper"
      className="relative min-h-screen w-full flex flex-col overflow-x-hidden bg-transparent"
    >
      <Navbar />

      <main className="flex-1 flex flex-col items-center w-full">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}