import React from 'react';
import Lottie from 'lottie-react';  // ✅ Default import
import loadingAnimation from '../assets/animations/LoadingAnimation.json';

const LoadingScreen = ({ isLoading }) => {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100vh',
        background: 'linear-gradient(135deg, #f0fafb 0%, #ffffff 50%, #f0fafb 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        opacity: isLoading ? 1 : 0,
        visibility: isLoading ? 'visible' : 'hidden',
        transition: 'opacity 0.3s ease, visibility 0.3s ease',
        pointerEvents: isLoading ? 'all' : 'none',
      }}
    >
      <div style={{ width: '450px', height: '450px', marginBottom: '20px' }}>
        <Lottie animationData={loadingAnimation} loop={true} autoplay={true} />
      </div>

      <div style={{
        fontSize: '1.1rem',
        fontWeight: '700',
        color: '#0F4C5C',
        letterSpacing: '0.5px',
        animation: 'pulse 1.5s ease-in-out infinite',
      }}>
        Memuat halaman...
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.6; }
        }
      `}</style>
    </div>
  );
};

export default LoadingScreen;