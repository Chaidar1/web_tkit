import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { adminHeroAPI, authAPI } from '../../services/adminApi';
import AdminSidebar from '../../components/AdminSidebar';
import LogoutModal from '../../components/LogoutModal';
import { useResponsive } from '../../hooks/useResponsive';
import { toast } from 'react-toastify';
import { 
  FaImages, 
  FaGraduationCap, 
  FaNewspaper, 
  FaUserTie, 
  FaSignOutAlt, 
  FaUserCircle, 
  FaExternalLinkAlt, 
  FaPlus 
} from 'react-icons/fa';

const styles = {
  container: {
    minHeight: '100vh',
    background: '#F1F5F9',
    display: 'flex',
  },
  mainContent: {
    marginLeft: '270px',
    flex: 1,
    padding: '24px 30px',
  },
  header: {
    background: '#ffffff',
    padding: '18px 28px',
    borderRadius: '16px',
    marginBottom: '24px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: '0 4px 20px -4px rgba(15, 76, 92, 0.08)',
    border: '1px solid #E2E8F0',
  },
  headerTitle: {
    fontSize: '1.45rem',
    fontWeight: '700',
    color: '#0F4C5C',
    margin: 0,
  },
  headerSubtitle: {
    fontSize: '0.82rem',
    color: '#64748B',
    margin: 0,
  },
  userSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  },
  userInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    background: '#F8FAFC',
    padding: '8px 14px',
    borderRadius: '10px',
    border: '1px solid #E2E8F0',
    fontSize: '0.88rem',
    color: '#334155',
    fontWeight: '600',
  },
  logoutBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    background: '#FEE2E2',
    color: '#DC2626',
    border: '1px solid #FECACA',
    padding: '9px 16px',
    borderRadius: '10px',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '0.84rem',
    transition: 'all 0.2s ease',
  },
  welcomeBanner: {
    background: 'linear-gradient(135deg, #0F4C5C 0%, #156677 50%, #1D8A9E 100%)',
    color: '#ffffff',
    padding: '30px',
    borderRadius: '18px',
    marginBottom: '24px',
    boxShadow: '0 10px 25px -5px rgba(15, 76, 92, 0.3)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
    gap: '20px',
    marginBottom: '28px',
  },
  statCard: {
    background: '#ffffff',
    borderRadius: '16px',
    padding: '22px',
    border: '1px solid #E2E8F0',
    boxShadow: '0 4px 15px -3px rgba(15, 76, 92, 0.05)',
    display: 'flex',
    alignItems: 'center',
    gap: '18px',
  },
  iconBox: {
    width: '54px',
    height: '54px',
    borderRadius: '14px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.5rem',
  },
  statValue: {
    fontSize: '1.6rem',
    fontWeight: '700',
    color: '#0F4C5C',
    lineHeight: 1.1,
  },
  statLabel: {
    fontSize: '0.82rem',
    color: '#64748B',
    fontWeight: '500',
    marginTop: '2px',
  },
  card: {
    background: '#ffffff',
    borderRadius: '16px',
    padding: '24px',
    border: '1px solid #E2E8F0',
    boxShadow: '0 4px 15px -3px rgba(15, 76, 92, 0.05)',
  },
  cardTitle: {
    fontSize: '1.1rem',
    fontWeight: '700',
    color: '#0F4C5C',
    marginBottom: '16px',
  },
  quickLinks: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '14px',
  },
  quickLinkBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '14px 18px',
    borderRadius: '12px',
    background: '#F8FAFC',
    border: '1.5px solid #E2E8F0',
    color: '#334155',
    textDecoration: 'none',
    fontWeight: '600',
    fontSize: '0.9rem',
    transition: 'all 0.2s ease',
  }
};

const AdminDashboard = () => {
  const [heroCount, setHeroCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const navigate = useNavigate();
  const { isMobile } = useResponsive();
  const username = localStorage.getItem('admin_username') || 'Admin TK';

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (!token) {
      navigate('/admin/login');
      return;
    }

    const fetchStats = async () => {
      try {
        const res = await adminHeroAPI.getHeroImages();
        setHeroCount(res.data?.length || 0);
      } catch (err) {
        if (err.response?.status === 401) {
          authAPI.logout();
          navigate('/admin/login');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [navigate]);

  const handleConfirmLogout = () => {
    authAPI.logout();
    toast.success('Berhasil keluar dari sesi admin.');
    navigate('/admin/login');
  };

  return (
    <div style={styles.container}>
      <AdminSidebar />
      <LogoutModal 
        isOpen={showLogoutModal} 
        onClose={() => setShowLogoutModal(false)} 
        onConfirm={handleConfirmLogout} 
      />
      <main style={{
        ...styles.mainContent,
        marginLeft: isMobile ? 0 : '270px',
        padding: isMobile ? '16px 14px 80px' : '24px 30px',
        width: isMobile ? '100%' : 'calc(100% - 270px)',
      }}>
        <div style={{
          ...styles.header,
          flexDirection: isMobile ? 'column' : 'row',
          alignItems: isMobile ? 'flex-start' : 'center',
          gap: isMobile ? '14px' : '0',
          padding: isMobile ? '16px' : '18px 28px',
        }}>
          <div>
            <h1 style={{
              ...styles.headerTitle,
              fontSize: isMobile ? '1.2rem' : '1.45rem',
            }}>Dashboard Admin</h1>
            <p style={styles.headerSubtitle}>Panel Administrasi TK IT AR RAHMAN AL IKHLAS</p>
          </div>

          <div style={{
            ...styles.userSection,
            width: isMobile ? '100%' : 'auto',
            justifyContent: isMobile ? 'space-between' : 'flex-end',
          }}>
            <div style={styles.userInfo}>
              <FaUserCircle style={{ color: '#0F4C5C', fontSize: '1.2rem' }} />
              <span>{username}</span>
            </div>
            <button onClick={() => setShowLogoutModal(true)} style={styles.logoutBtn}>
              <FaSignOutAlt /> Keluar
            </button>
          </div>
        </div>

        {/* Welcome Banner */}
        <div style={styles.welcomeBanner}>
          <div>
            <h2 style={{ fontSize: '1.6rem', fontWeight: '700', marginBottom: '8px', margin: 0 }}>
              Selamat Datang di Panel Admin TK IT
            </h2>
            <p style={{ opacity: 0.9, fontSize: '0.9rem', maxWidth: '600px', margin: '8px 0 16px' }}>
              Kelola slide beranda, program anak didik, berita kegiatan, dan informasi profil TK IT Ar Rahman Al Ikhlas dengan mudah.
            </p>
            <Link 
              to="/admin/hero-images" 
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: '#FFB703',
                color: '#082F38',
                padding: '9px 18px',
                borderRadius: '8px',
                textDecoration: 'none',
                fontWeight: '700',
                fontSize: '0.85rem'
              }}
            >
              <FaPlus /> Kelola Hero Slider Beranda
            </Link>
          </div>
        </div>

        {/* Stat Cards */}
        <div style={styles.grid}>
          <div style={styles.statCard}>
            <div style={{ ...styles.iconBox, background: '#E0F2FE', color: '#0284C7' }}>
              <FaImages />
            </div>
            <div>
              <div style={styles.statValue}>{loading ? '...' : heroCount}</div>
              <div style={styles.statLabel}>Slide Hero Slider</div>
            </div>
          </div>

          <div style={styles.statCard}>
            <div style={{ ...styles.iconBox, background: '#FEF3C7', color: '#D97706' }}>
              <FaGraduationCap />
            </div>
            <div>
              <div style={styles.statValue}>Aktif</div>
              <div style={styles.statLabel}>Program Pembelajaran</div>
            </div>
          </div>

          <div style={styles.statCard}>
            <div style={{ ...styles.iconBox, background: '#DCFCE7', color: '#16A34A' }}>
              <FaNewspaper />
            </div>
            <div>
              <div style={styles.statValue}>Online</div>
              <div style={styles.statLabel}>Berita & Pengumuman</div>
            </div>
          </div>
        </div>

        {/* Quick Links Card */}
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>Akses Cepat Pengelolaan</h3>
          <div style={styles.quickLinks}>
            <Link 
              to="/admin/hero-images" 
              style={styles.quickLinkBtn}
              onMouseEnter={(e) => e.currentTarget.style.borderColor = '#0F4C5C'}
              onMouseLeave={(e) => e.currentTarget.style.borderColor = '#E2E8F0'}
            >
              <FaImages style={{ color: '#0F4C5C', fontSize: '1.2rem' }} />
              <span>Kelola Hero Slider</span>
            </Link>

            <Link 
              to="/admin/welcome" 
              style={styles.quickLinkBtn}
              onMouseEnter={(e) => e.currentTarget.style.borderColor = '#0F4C5C'}
              onMouseLeave={(e) => e.currentTarget.style.borderColor = '#E2E8F0'}
            >
              <FaUserTie style={{ color: '#0F4C5C', fontSize: '1.2rem' }} />
              <span>Sambutan Kepala TK</span>
            </Link>

            <Link 
              to="/" 
              target="_blank"
              style={styles.quickLinkBtn}
              onMouseEnter={(e) => e.currentTarget.style.borderColor = '#0F4C5C'}
              onMouseLeave={(e) => e.currentTarget.style.borderColor = '#E2E8F0'}
            >
              <FaExternalLinkAlt style={{ color: '#0F4C5C', fontSize: '1.2rem' }} />
              <span>Lihat Website Beranda</span>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
