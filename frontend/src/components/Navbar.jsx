import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  FaHome, 
  FaInfoCircle, 
  FaGraduationCap, 
  FaNewspaper, 
  FaEnvelope,
  FaBars,
  FaTimes
} from 'react-icons/fa';

const styles = {
  navbar: {
    background: '#ffffff',
    boxShadow: '0 2px 20px rgba(130, 215, 222, 0.1), 0 1px 3px rgba(0,0,0,0.04)',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
    borderBottom: '2px solid rgba(130, 215, 222, 0.15)',
    backdropFilter: 'blur(10px)',
    transition: 'all 0.3s ease',
  },
  // ==================== MAIN NAVBAR ====================
  navContainer: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0.8rem 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  // ==================== LOGO ====================
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
    textDecoration: 'none',
    transition: 'all 0.2s ease',
  },
  logoImageWrapper: {
    position: 'relative',
  },
  logoImage: {
    height: '58px',
    width: 'auto',
    objectFit: 'contain',
    borderRadius: '14px',
    border: '2px solid rgba(130, 215, 222, 0.25)',
    padding: '4px',
    background: 'linear-gradient(135deg, #ffffff 0%, #f0fafb 100%)',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 15px rgba(130, 215, 222, 0.15)',
  },
  logoTextWrapper: {
    display: 'flex',
    flexDirection: 'column',
    lineHeight: 1.2,
    gap: '3px',
  },
  logoText: {
    fontSize: '1.15rem',
    fontWeight: '800',
    color: '#0F4C5C',
    letterSpacing: '-0.3px',
  },
  logoTextHighlight: {
    color: '#82D7DE',
    fontWeight: '800',
  },
  logoSubTextWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
  },
  logoSubTextLine: {
    width: '16px',
    height: '2px',
    background: 'linear-gradient(90deg, #82D7DE, #5BC0C9)',
    borderRadius: '2px',
  },
  logoSubText: {
    fontSize: '0.62rem',
    fontWeight: '600',
    color: '#64748B',
    letterSpacing: '0.8px',
    textTransform: 'uppercase',
  },
  // ==================== TOGGLE BUTTON ====================
  navToggle: {
    display: 'none',
    background: 'linear-gradient(135deg, #82D7DE, #5BC0C9)',
    border: 'none',
    fontSize: '1.2rem',
    cursor: 'pointer',
    color: '#ffffff',
    padding: '0',
    borderRadius: '12px',
    transition: 'all 0.3s ease',
    width: '46px',
    height: '46px',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 4px 15px rgba(130, 215, 222, 0.3)',
  },
  // ==================== NAV MENU ====================
  navMenu: {
    display: 'flex',
    listStyle: 'none',
    gap: '6px',
    margin: 0,
    padding: '6px',
    alignItems: 'center',
    background: 'linear-gradient(135deg, #f0fafb 0%, #ffffff 100%)',
    borderRadius: '16px',
    border: '1px solid rgba(130, 215, 222, 0.15)',
  },
  navItem: {
    position: 'relative',
  },
  navLink: {
    textDecoration: 'none',
    color: '#4A5568',
    fontWeight: '600',
    fontSize: '0.88rem',
    transition: 'all 0.3s ease',
    position: 'relative',
    padding: '10px 18px',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  navLinkIcon: {
    fontSize: '0.85rem',
    color: '#82D7DE',
    transition: 'all 0.3s ease',
  },
  activeLink: {
    color: '#ffffff',
    background: 'linear-gradient(135deg, #82D7DE, #5BC0C9)',
    fontWeight: '700',
    boxShadow: '0 4px 15px rgba(130, 215, 222, 0.35)',
  },
  activeLinkIcon: {
    color: '#ffffff',
  },
  // ==================== MOBILE ====================
  '@media (max-width: 968px)': {
    logoText: { fontSize: '1rem' },
    logoSubText: { fontSize: '0.55rem' },
    logoImage: { height: '50px' },
  },
  '@media (max-width: 768px)': {
    navToggle: { 
      display: 'flex',
    },
    navMenu: {
      display: 'none',
      position: 'absolute',
      top: '100%',
      left: 0,
      right: 0,
      background: '#ffffff',
      flexDirection: 'column',
      padding: '20px 20px 28px',
      gap: '6px',
      boxShadow: '0 20px 40px rgba(130, 215, 222, 0.15), 0 4px 12px rgba(0,0,0,0.04)',
      zIndex: 999,
      borderTop: '2px solid rgba(130, 215, 222, 0.15)',
      borderRadius: '0 0 20px 20px',
      marginTop: '0',
    },
    navMenuActive: { 
      display: 'flex',
    },
    navLink: {
      padding: '14px 18px',
      borderRadius: '12px',
      width: '100%',
      fontSize: '0.95rem',
      background: '#f8fdfe',
      border: '1px solid rgba(130, 215, 222, 0.1)',
    },
    logoText: { fontSize: '0.85rem' },
    logoSubText: { fontSize: '0.5rem' },
    logoImage: { height: '44px' },
    navContainer: { padding: '0.7rem 16px' },
    activeLink: {
      background: 'linear-gradient(135deg, #82D7DE, #5BC0C9)',
      color: '#ffffff',
      boxShadow: '0 4px 15px rgba(130, 215, 222, 0.3)',
    },
  },
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) {
        setIsOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Tutup menu saat pindah halaman
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const navItems = [
    { path: '/', label: 'Beranda', icon: <FaHome /> },
    { path: '/about', label: 'Tentang', icon: <FaInfoCircle /> },
    { path: '/programs', label: 'Program', icon: <FaGraduationCap /> },
    { path: '/news', label: 'Berita', icon: <FaNewspaper /> },
    { path: '/contact', label: 'Kontak', icon: <FaEnvelope /> },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav style={{
      ...styles.navbar,
      boxShadow: scrolled 
        ? '0 4px 30px rgba(130, 215, 222, 0.2), 0 2px 8px rgba(0,0,0,0.06)' 
        : styles.navbar.boxShadow,
    }}>
      <div style={styles.navContainer}>
        {/* Logo */}
        <Link to="/" style={styles.logo}>
          <div style={styles.logoImageWrapper}>
            <img 
              src="/Logo TK.png" 
              alt="Logo TK IT AR RAHMAN AL IKHLAS" 
              style={styles.logoImage}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#82D7DE';
                e.currentTarget.style.transform = 'scale(1.05) rotate(-2deg)';
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(130, 215, 222, 0.35)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(130, 215, 222, 0.25)';
                e.currentTarget.style.transform = 'scale(1) rotate(0deg)';
                e.currentTarget.style.boxShadow = '0 4px 15px rgba(130, 215, 222, 0.15)';
              }}
            />
          </div>
          <div style={styles.logoTextWrapper}>
            <span style={styles.logoText}>
              TK IT <span style={styles.logoTextHighlight}>AR RAHMAN</span>
            </span>
            <div style={styles.logoSubTextWrapper}>
              <span style={styles.logoSubTextLine}></span>
              <span style={styles.logoSubText}>
                Al Ikhlas Sindangkerta
              </span>
            </div>
          </div>
        </Link>

        {/* Mobile Toggle */}
        <button 
          style={styles.navToggle} 
          onClick={() => setIsOpen(!isOpen)}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.05)';
            e.currentTarget.style.boxShadow = '0 6px 20px rgba(130, 215, 222, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = '0 4px 15px rgba(130, 215, 222, 0.3)';
          }}
          aria-label="Toggle menu"
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Nav Menu */}
        <ul style={{
          ...styles.navMenu,
          ...(isOpen ? styles.navMenuActive : {}),
          ...(isMobile ? {
            display: isOpen ? 'flex' : 'none',
          } : {})
        }}>
          {navItems.map((item) => {
            const active = isActive(item.path);
            return (
              <li key={item.path} style={styles.navItem}>
                <Link
                  to={item.path}
                  style={{
                    ...styles.navLink,
                    ...(active ? styles.activeLink : {}),
                  }}
                  onClick={() => setIsOpen(false)}
                  onMouseEnter={(e) => {
                    if (!active && !isMobile) {
                      e.currentTarget.style.color = '#82D7DE';
                      e.currentTarget.style.background = 'rgba(130, 215, 222, 0.08)';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!active && !isMobile) {
                      e.currentTarget.style.color = '#4A5568';
                      e.currentTarget.style.background = 'transparent';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }
                  }}
                >
                  <span style={{
                    ...styles.navLinkIcon,
                    ...(active ? styles.activeLinkIcon : {}),
                  }}>
                    {item.icon}
                  </span>
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;