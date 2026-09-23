import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LoadingScreen from './components/LoadingScreen';

// Public Pages
import Home from './pages/Home';
import About from './pages/About';
import Programs from './pages/Programs';
import DetailPrograms from './pages/DetailPrograms';
import News from './pages/News';
import DetailNews from './pages/DetailNews';
import Contact from './pages/Contact';

// Admin Pages
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminHeroImages from './pages/admin/AdminHeroImages';
import AdminPrograms from './pages/admin/AdminPrograms';
import AdminAbout from './pages/admin/AdminAbout';
import AdminNews from './pages/admin/AdminNews';
import AdminContact from './pages/admin/AdminContact';
import AdminFooter from './pages/admin/AdminFooter';

// ==================== PUBLIC LAYOUT ====================
const PublicLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      <main style={{ minHeight: '60vh' }}>{children}</main>
      <Footer />
    </>
  );
};

// ==================== LOADING WRAPPER ====================
const LoadingWrapper = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    // Tampilkan loading
    setIsLoading(true);

    // Sembunyikan setelah 2 detik
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    // Cleanup saat location berubah
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <>
      <LoadingScreen isLoading={isLoading} />
      {children}
    </>
  );
};

function App() {
  return (
    <Router>
      <LoadingWrapper>
        <ToastContainer 
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />

        <Routes>
          {/* ==================== PUBLIC ROUTES ==================== */}
          <Route 
            path="/" 
            element={
              <PublicLayout>
                <Home />
              </PublicLayout>
            } 
          />
          <Route 
            path="/about" 
            element={
              <PublicLayout>
                <About />
              </PublicLayout>
            } 
          />
          <Route 
            path="/programs" 
            element={
              <PublicLayout>
                <Programs />
              </PublicLayout>
            } 
          />
          <Route 
            path="/programs/:id" 
            element={
              <PublicLayout>
                <DetailPrograms />
              </PublicLayout>
            } 
          />
          <Route 
            path="/news" 
            element={
              <PublicLayout>
                <News />
              </PublicLayout>
            } 
          />
          <Route 
            path="/news/:id" 
            element={
              <PublicLayout>
                <DetailNews />
              </PublicLayout>
            } 
          />
          <Route 
            path="/contact" 
            element={
              <PublicLayout>
                <Contact />
              </PublicLayout>
            } 
          />

          {/* ==================== ADMIN ROUTES ==================== */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/hero-images" element={<AdminHeroImages />} />
          <Route path="/admin/programs" element={<AdminPrograms />} />
          <Route path="/admin/about" element={<AdminAbout />} />
          <Route path="/admin/news" element={<AdminNews />} />
          <Route path="/admin/contact" element={<AdminContact />} />
          <Route path="/admin/footer" element={<AdminFooter />} />

          {/* ==================== 404 - REDIRECT TO HOME ==================== */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </LoadingWrapper>
    </Router>
  );
}

export default App;