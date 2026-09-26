import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authAPI } from '../../services/adminApi';
import { 
  FaUser, 
  FaLock, 
  FaArrowLeft, 
  FaEye, 
  FaEyeSlash, 
  FaGraduationCap,
  FaShieldAlt,
  FaCheckCircle
} from 'react-icons/fa';

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #06262E 0%, #0A3A47 35%, #0F4C5C 70%, #156272 100%)',
    padding: '24px',
    fontFamily: "'Segoe UI', 'Poppins', system-ui, -apple-system, sans-serif",
    position: 'relative',
    overflow: 'hidden',
  },
  // ==================== DECORATIVE BACKGROUND ====================
  decorativeCircle1: {
    position: 'absolute',
    width: '500px',
    height: '500px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(130,215,222,0.22) 0%, rgba(130,215,222,0) 70%)',
    top: '-150px',
    right: '-150px',
    pointerEvents: 'none',
    animation: 'float 8s ease-in-out infinite',
  },
  decorativeCircle2: {
    position: 'absolute',
    width: '600px',
    height: '600px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(255,183,3,0.12) 0%, rgba(255,183,3,0) 70%)',
    bottom: '-200px',
    left: '-200px',
    pointerEvents: 'none',
    animation: 'float 10s ease-in-out infinite reverse',
  },
  decorativeCircle3: {
    position: 'absolute',
    width: '300px',
    height: '300px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(130,215,222,0.15) 0%, rgba(130,215,222,0) 70%)',
    top: '50%',
    left: '10%',
    transform: 'translateY(-50%)',
    pointerEvents: 'none',
    animation: 'float 12s ease-in-out infinite',
  },
  gridPattern: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundImage: `
      linear-gradient(rgba(130,215,222,0.04) 1px, transparent 1px),
      linear-gradient(90deg, rgba(130,215,222,0.04) 1px, transparent 1px)
    `,
    backgroundSize: '50px 50px',
    pointerEvents: 'none',
    maskImage: 'radial-gradient(circle at center, black 40%, transparent 80%)',
    WebkitMaskImage: 'radial-gradient(circle at center, black 40%, transparent 80%)',
  },
  // ==================== MAIN WRAPPER ====================
  mainWrapper: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    width: '100%',
    maxWidth: '1000px',
    background: 'rgba(255, 255, 255, 0.06)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    borderRadius: '28px',
    boxShadow: '0 40px 80px -20px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(130, 215, 222, 0.15)',
    overflow: 'hidden',
    position: 'relative',
    zIndex: 2,
    animation: 'slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
  },
  // ==================== BRANDING PANEL (KIRI) ====================
  brandingPanel: {
    background: 'linear-gradient(160deg, rgba(15,76,92,0.9) 0%, rgba(21,98,114,0.85) 50%, rgba(130,215,222,0.4) 100%)',
    padding: '50px 40px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    position: 'relative',
    overflow: 'hidden',
  },
  brandingPattern: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundImage: `
      radial-gradient(circle at 20% 30%, rgba(255,255,255,0.08) 0%, transparent 40%),
      radial-gradient(circle at 80% 70%, rgba(130,215,222,0.15) 0%, transparent 40%)
    `,
    pointerEvents: 'none',
  },
  brandingTop: {
    position: 'relative',
    zIndex: 1,
  },
  logoWrapper: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '14px',
    marginBottom: '40px',
  },
  logoImage: {
    height: '60px',
    width: 'auto',
    borderRadius: '14px',
    padding: '6px',
    border: '2px solid rgba(255,255,255,0.2)',
    background: 'rgba(255,255,255,0.95)',
    boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
  },
  logoText: {
    display: 'flex',
    flexDirection: 'column',
  },
  logoTextMain: {
    color: '#ffffff',
    fontSize: '1.05rem',
    fontWeight: '700',
    letterSpacing: '0.3px',
    lineHeight: 1.2,
  },
  logoTextSub: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: '0.75rem',
    fontWeight: '500',
    marginTop: '2px',
  },
  brandingTitle: {
    color: '#ffffff',
    fontSize: '2rem',
    fontWeight: '800',
    lineHeight: 1.2,
    marginBottom: '16px',
    letterSpacing: '-0.5px',
    background: 'linear-gradient(135deg, #ffffff 0%, #82D7DE 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  },
  brandingSubtitle: {
    color: 'rgba(255,255,255,0.75)',
    fontSize: '0.92rem',
    lineHeight: 1.7,
    marginBottom: '30px',
  },
  featureList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '14px',
    marginTop: '10px',
  },
  featureItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    color: 'rgba(255,255,255,0.9)',
    fontSize: '0.88rem',
    fontWeight: '500',
  },
  featureIcon: {
    width: '32px',
    height: '32px',
    borderRadius: '8px',
    background: 'rgba(130,215,222,0.2)',
    border: '1px solid rgba(130,215,222,0.3)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#82D7DE',
    fontSize: '0.85rem',
    flexShrink: 0,
  },
  brandingFooter: {
    position: 'relative',
    zIndex: 1,
    color: 'rgba(255,255,255,0.55)',
    fontSize: '0.75rem',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  // ==================== FORM PANEL (KANAN) ====================
  formPanel: {
    padding: '50px 45px',
    background: '#ffffff',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    position: 'relative',
  },
  backToHome: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    color: '#0F4C5C',
    textDecoration: 'none',
    fontSize: '0.8rem',
    fontWeight: '600',
    marginBottom: '28px',
    padding: '7px 12px',
    borderRadius: '8px',
    background: '#F0FAFB',
    border: '1px solid rgba(130, 215, 222, 0.3)',
    transition: 'all 0.25s ease',
    alignSelf: 'flex-start',
  },
  title: {
    fontSize: '1.75rem',
    fontWeight: '800',
    color: '#0F4C5C',
    marginBottom: '6px',
    letterSpacing: '-0.5px',
  },
  titleAccent: {
    display: 'block',
    width: '48px',
    height: '4px',
    background: 'linear-gradient(90deg, #82D7DE, #0F4C5C)',
    borderRadius: '4px',
    marginBottom: '14px',
  },
  subtitle: {
    fontSize: '0.86rem',
    color: '#64748B',
    marginBottom: '30px',
    lineHeight: 1.6,
  },
  inputGroup: {
    marginBottom: '18px',
  },
  label: {
    display: 'block',
    marginBottom: '8px',
    color: '#334155',
    fontWeight: '600',
    fontSize: '0.84rem',
    letterSpacing: '0.2px',
  },
  inputWrapper: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
  },
  inputIcon: {
    position: 'absolute',
    left: '16px',
    color: '#94A3B8',
    fontSize: '0.95rem',
    transition: 'color 0.2s ease',
    pointerEvents: 'none',
  },
  input: {
    width: '100%',
    padding: '13px 16px 13px 46px',
    border: '1.5px solid #E2E8F0',
    borderRadius: '12px',
    fontSize: '0.92rem',
    transition: 'all 0.25s ease',
    outline: 'none',
    background: '#F8FAFC',
    color: '#1E293B',
    boxSizing: 'border-box',
    fontFamily: 'inherit',
  },
  togglePasswordBtn: {
    position: 'absolute',
    right: '14px',
    background: 'none',
    border: 'none',
    color: '#94A3B8',
    cursor: 'pointer',
    fontSize: '1rem',
    padding: '4px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'color 0.2s ease',
    borderRadius: '6px',
  },
  button: {
    width: '100%',
    padding: '14px',
    background: 'linear-gradient(135deg, #0F4C5C 0%, #15697A 50%, #1A7E92 100%)',
    color: '#ffffff',
    border: 'none',
    borderRadius: '12px',
    fontSize: '0.96rem',
    fontWeight: '700',
    cursor: 'pointer',
    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
    marginTop: '12px',
    boxShadow: '0 8px 24px rgba(15, 76, 92, 0.3)',
    letterSpacing: '0.4px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    position: 'relative',
    overflow: 'hidden',
  },
  buttonDisabled: {
    opacity: 0.75,
    cursor: 'not-allowed',
  },
  error: {
    background: 'linear-gradient(135deg, #FEF2F2, #FEE2E2)',
    color: '#B91C1C',
    border: '1px solid #FCA5A5',
    padding: '12px 16px',
    borderRadius: '12px',
    marginBottom: '20px',
    fontSize: '0.85rem',
    fontWeight: '500',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    animation: 'shake 0.4s ease',
  },
  errorDot: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    background: '#DC2626',
    flexShrink: 0,
  },
  footerText: {
    marginTop: '28px',
    textAlign: 'center',
    fontSize: '0.72rem',
    color: '#94A3B8',
    letterSpacing: '0.3px',
  },
  // ==================== RESPONSIVE ====================
  '@media (max-width: 860px)': {
    mainWrapper: {
      gridTemplateColumns: '1fr',
      maxWidth: '440px',
    },
    brandingPanel: {
      padding: '32px 28px',
      minHeight: 'auto',
    },
    brandingTitle: {
      fontSize: '1.5rem',
    },
    featureList: {
      display: 'none',
    },
    formPanel: {
      padding: '36px 28px',
    },
    title: {
      fontSize: '1.5rem',
    },
  },
};

// ==================== KEYFRAMES (inject via style tag) ====================
const keyframes = `
  @keyframes float {
    0%, 100% { transform: translate(0, 0) scale(1); }
    50% { transform: translate(20px, -20px) scale(1.05); }
  }
  @keyframes slideUp {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-6px); }
    75% { transform: translateX(6px); }
  }
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await authAPI.login(username.trim(), password);
      if (res.data && res.data.access_token) {
        localStorage.setItem('admin_token', res.data.access_token);
        localStorage.setItem('admin_username', res.data.username || username.trim());
        navigate('/admin/hero-images');
      } else {
        setError('Respons server tidak valid. Silakan coba lagi.');
      }
    } catch (err) {
      console.error('Login error:', err);
      if (err.response) {
        if (err.response.status === 401) {
          setError('Username atau password salah!');
        } else if (err.response.data && err.response.data.detail) {
          setError(err.response.data.detail);
        } else {
          setError(`Gagal login (Error: ${err.response.status})`);
        }
      } else {
        setError('Gagal terhubung ke server backend. Pastikan server aktif.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <style>{keyframes}</style>
      
      <div style={styles.gridPattern} />
      <div style={styles.decorativeCircle1} />
      <div style={styles.decorativeCircle2} />
      <div style={styles.decorativeCircle3} />

      <div style={styles.mainWrapper}>
        {/* ==================== BRANDING PANEL ==================== */}
        <div style={styles.brandingPanel}>
          <div style={styles.brandingPattern} />
          
          <div style={styles.brandingTop}>
            <div style={styles.logoWrapper}>
              <img 
                src="/Logo TK.png" 
                alt="Logo TK IT AR RAHMAN AL IKHLAS" 
                style={styles.logoImage} 
              />
              <div style={styles.logoText}>
                <span style={styles.logoTextMain}>TK IT AR RAHMAN</span>
                <span style={styles.logoTextSub}>AL IKHLAS</span>
              </div>
            </div>

            <h1 style={styles.brandingTitle}>
              Selamat Datang<br />di Admin Panel
            </h1>
            <p style={styles.brandingSubtitle}>
              Kelola konten website TK IT Ar Rahman Al Ikhlas dengan mudah, cepat, dan aman.
            </p>

            <div style={styles.featureList}>
              <div style={styles.featureItem}>
                <div style={styles.featureIcon}>
                  <FaShieldAlt />
                </div>
                <span>Akses aman & terenkripsi</span>
              </div>
              <div style={styles.featureItem}>
                <div style={styles.featureIcon}>
                  <FaGraduationCap />
                </div>
                <span>Kelola program & kelas TK</span>
              </div>
              <div style={styles.featureItem}>
                <div style={styles.featureIcon}>
                  <FaCheckCircle />
                </div>
                <span>Konten website terintegrasi</span>
              </div>
            </div>
          </div>

          <div style={styles.brandingFooter}>
            <FaShieldAlt style={{ fontSize: '0.7rem' }} />
            <span>Sistem Informasi Administrasi</span>
          </div>
        </div>

        {/* ==================== FORM PANEL ==================== */}
        <div style={styles.formPanel}>
          <Link 
            to="/" 
            style={styles.backToHome}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#E0F5F7';
              e.currentTarget.style.transform = 'translateX(-3px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#F0FAFB';
              e.currentTarget.style.transform = 'translateX(0)';
            }}
          >
            <FaArrowLeft style={{ fontSize: '0.7rem' }} /> Kembali ke Website
          </Link>

          <h2 style={styles.title}>Masuk Admin</h2>
          <span style={styles.titleAccent}></span>
          <p style={styles.subtitle}>
            Silakan masukkan kredensial Anda untuk mengakses dashboard admin.
          </p>

          {error && (
            <div style={styles.error}>
              <span style={styles.errorDot}></span>
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Username</label>
              <div style={styles.inputWrapper}>
                <FaUser style={styles.inputIcon} />
                <input
                  type="text"
                  style={styles.input}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Masukkan username admin"
                  onFocus={(e) => {
                    e.target.style.borderColor = '#0F4C5C';
                    e.target.style.background = '#ffffff';
                    e.target.style.boxShadow = '0 0 0 4px rgba(130, 215, 222, 0.15)';
                    const icon = e.target.parentElement.querySelector('svg');
                    if (icon) icon.style.color = '#0F4C5C';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#E2E8F0';
                    e.target.style.background = '#F8FAFC';
                    e.target.style.boxShadow = 'none';
                    const icon = e.target.parentElement.querySelector('svg');
                    if (icon) icon.style.color = '#94A3B8';
                  }}
                  required
                  autoFocus
                />
              </div>
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Password</label>
              <div style={styles.inputWrapper}>
                <FaLock style={styles.inputIcon} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  style={styles.input}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  onFocus={(e) => {
                    e.target.style.borderColor = '#0F4C5C';
                    e.target.style.background = '#ffffff';
                    e.target.style.boxShadow = '0 0 0 4px rgba(130, 215, 222, 0.15)';
                    const icon = e.target.parentElement.querySelector('svg');
                    if (icon) icon.style.color = '#0F4C5C';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#E2E8F0';
                    e.target.style.background = '#F8FAFC';
                    e.target.style.boxShadow = 'none';
                    const icon = e.target.parentElement.querySelector('svg');
                    if (icon) icon.style.color = '#94A3B8';
                  }}
                  required
                />
                <button
                  type="button"
                  style={styles.togglePasswordBtn}
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex={-1}
                  aria-label={showPassword ? 'Sembunyikan password' : 'Tampilkan password'}
                  onMouseEnter={(e) => e.currentTarget.style.color = '#0F4C5C'}
                  onMouseLeave={(e) => e.currentTarget.style.color = '#94A3B8'}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              style={{
                ...styles.button,
                ...(loading ? styles.buttonDisabled : {})
              }}
              disabled={loading}
              onMouseEnter={(e) => {
                if (!loading) {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 12px 28px rgba(15, 76, 92, 0.4)';
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(15, 76, 92, 0.3)';
              }}
            >
              {loading ? (
                <>
                  <span style={{
                    width: '16px',
                    height: '16px',
                    border: '2px solid rgba(255,255,255,0.3)',
                    borderTopColor: '#ffffff',
                    borderRadius: '50%',
                    display: 'inline-block',
                    animation: 'spin 0.8s linear infinite',
                  }} />
                  Memverifikasi...
                </>
              ) : (
                'Masuk ke Admin'
              )}
            </button>
          </form>

          <div style={styles.footerText}>
            &copy; {new Date().getFullYear()} TK IT Ar Rahman Al Ikhlas &bull; All Rights Reserved
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;