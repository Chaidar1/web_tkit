import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  FaBook,
  FaGraduationCap,
  FaNewspaper,
  FaImages,
  FaPhoneAlt,
  FaCog,
  FaUserShield,
  FaArrowRight,
  FaUserTie,
  FaExternalLinkAlt
} from 'react-icons/fa';
import { MdDashboard } from 'react-icons/md';

const styles = {
  sidebar: {
    width: '270px',
    background: 'linear-gradient(180deg, #082F38 0%, #0E4E5C 45%, #136371 100%)',
    color: '#ffffff',
    position: 'fixed',
    left: 0,
    top: 0,
    bottom: 0,
    overflowY: 'auto',
    zIndex: 100,
    boxShadow: '4px 0 25px rgba(8, 47, 56, 0.25)',
    display: 'flex',
    flexDirection: 'column',
  },
  sidebarHeader: {
    padding: '24px 20px 18px',
    borderBottom: '1px solid rgba(255,255,255,0.08)',
  },
  sidebarLogoWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  sidebarLogo: {
    height: '46px',
    width: 'auto',
    borderRadius: '10px',
    background: '#ffffff',
    padding: '4px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
  },
  sidebarTitle: {
    fontSize: '0.95rem',
    fontWeight: '700',
    color: '#ffffff',
    letterSpacing: '0.5px',
    lineHeight: 1.2,
  },
  sidebarSubtitle: {
    fontSize: '0.68rem',
    color: '#82D7DE',
    fontWeight: '600',
    letterSpacing: '0.3px',
    marginTop: '3px',
    lineHeight: 1.2,
  },
  nav: {
    padding: '16px 14px',
    flex: 1,
  },
  navSection: {
    marginBottom: '14px',
  },
  navSectionLabel: {
    fontSize: '0.62rem',
    textTransform: 'uppercase',
    letterSpacing: '1.5px',
    color: 'rgba(255,255,255,0.45)',
    padding: '6px 12px 6px',
    fontWeight: '700',
  },
  navItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '10px 14px',
    color: 'rgba(255,255,255,0.8)',
    textDecoration: 'none',
    transition: 'all 0.2s ease',
    fontSize: '0.86rem',
    borderRadius: '10px',
    marginBottom: '3px',
    fontWeight: 500,
  },
  navItemActive: {
    color: '#ffffff',
    background: 'rgba(130, 215, 222, 0.2)',
    boxShadow: '0 2px 10px rgba(0,0,0,0.12)',
    fontWeight: '600',
  },
  navIcon: {
    fontSize: '1.1rem',
    width: '26px',
    textAlign: 'center',
    flexShrink: 0,
    color: 'rgba(255,255,255,0.7)',
  },
  navIconActive: {
    color: '#FFB703',
  },
  navLabel: {
    flex: 1,
  },
  navArrow: {
    fontSize: '0.65rem',
    opacity: 0,
    transition: 'all 0.2s ease',
    color: '#FFB703',
  },
  navArrowActive: {
    opacity: 1,
  },
  externalLink: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    margin: '10px 14px 14px',
    padding: '10px 14px',
    background: 'rgba(255, 255, 255, 0.08)',
    border: '1px dashed rgba(130, 215, 222, 0.4)',
    borderRadius: '10px',
    color: '#82D7DE',
    textDecoration: 'none',
    fontSize: '0.8rem',
    fontWeight: '500',
    transition: 'all 0.2s ease',
  },
  sidebarFooter: {
    padding: '14px 20px',
    borderTop: '1px solid rgba(255,255,255,0.08)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    fontSize: '0.72rem',
    color: 'rgba(255,255,255,0.5)',
    background: 'rgba(0,0,0,0.1)',
  },
  scrollbar: {
    scrollbarWidth: 'thin',
    scrollbarColor: 'rgba(255,255,255,0.2) transparent',
  },
};

const navItems = [
  { 
    section: 'Menu Utama',
    items: [
      { path: '/admin/dashboard', label: 'Dashboard', icon: <MdDashboard /> },
      { path: '/admin/hero-images', label: 'Hero Slider', icon: <FaImages /> },
    ]
  },
  {
    section: 'Konten Website',
    items: [
      { path: '/admin/welcome', label: 'Sambutan Kepala', icon: <FaUserTie /> },
      { path: '/admin/programs', label: 'Program & Kelas', icon: <FaGraduationCap /> },
      { path: '/admin/news', label: 'Berita & Kegiatan', icon: <FaNewspaper /> },
      { path: '/admin/about', label: 'Profil / Tentang', icon: <FaBook /> },
      { path: '/admin/contact', label: 'Kontak & Info', icon: <FaPhoneAlt /> },
      { path: '/admin/footer', label: 'Pengaturan Footer', icon: <FaCog /> },
    ]
  },
];

const AdminSidebar = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <aside style={{ ...styles.sidebar, ...styles.scrollbar }}>
      <div style={styles.sidebarHeader}>
        <div style={styles.sidebarLogoWrapper}>
          <img src="/Logo TK.png" alt="Logo TK" style={styles.sidebarLogo} />
          <div>
            <div style={styles.sidebarTitle}>Admin Panel</div>
            <div style={styles.sidebarSubtitle}>TK IT AR RAHMAN AL IKHLAS</div>
          </div>
        </div>
      </div>
      
      <nav style={styles.nav}>
        {navItems.map((section) => (
          <div key={section.section} style={styles.navSection}>
            <div style={styles.navSectionLabel}>{section.section}</div>
            {section.items.map((item) => {
              const active = isActive(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  style={{
                    ...styles.navItem,
                    ...(active ? styles.navItemActive : {}),
                  }}
                  onMouseEnter={(e) => {
                    if (!active) {
                      e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
                      e.currentTarget.style.color = '#ffffff';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!active) {
                      e.currentTarget.style.background = 'transparent';
                      e.currentTarget.style.color = 'rgba(255,255,255,0.8)';
                    }
                  }}
                >
                  <span style={{
                    ...styles.navIcon,
                    ...(active ? styles.navIconActive : {}),
                  }}>
                    {item.icon}
                  </span>
                  <span style={styles.navLabel}>{item.label}</span>
                  <FaArrowRight style={{
                    ...styles.navArrow,
                    ...(active ? styles.navArrowActive : {}),
                  }} />
                </Link>
              );
            })}
          </div>
        ))}

        <Link 
          to="/" 
          target="_blank" 
          rel="noopener noreferrer"
          style={styles.externalLink}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(130, 215, 222, 0.2)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
          }}
        >
          <FaExternalLinkAlt style={{ fontSize: '0.8rem' }} />
          <span>Lihat Website TK</span>
        </Link>
      </nav>
      
      <div style={styles.sidebarFooter}>
        <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <FaUserShield style={{ fontSize: '0.85rem', color: '#82D7DE' }} />
          <span>TK IT Admin</span>
        </span>
        <span style={{ opacity: 0.6 }}>v1.0</span>
      </div>
    </aside>
  );
};

export default AdminSidebar;