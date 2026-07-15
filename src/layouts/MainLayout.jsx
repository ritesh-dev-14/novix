import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import VideoBackground from '../components/VideoBackground/VideoBackground';

export default function MainLayout() {
  return (
    <>
      <VideoBackground />
      <div id="page-wrapper" className="min-h-screen w-full bg-transparent flex flex-col overflow-x-hidden relative">
        <Navbar />
        {/* Main Content Area */}
        <main className="flex-1 flex flex-col items-center w-full">
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );
}
