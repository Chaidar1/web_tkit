import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authAPI } from '../../services/adminApi';
import { FaUser, FaLock, FaArrowLeft, FaEye, FaEyeSlash } from 'react-icons/fa';

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #09343E 0%, #0F4C5C 40%, #156272 75%, #82D7DE 100%)',
    padding: '24px',
    fontFamily: 'inherit',
    position: 'relative',
    overflow: 'hidden',
  },
  decorativeCircle1: {
    position: 'absolute',
    width: '320px',
    height: '320px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(130,215,222,0.2) 0%, rgba(130,215,222,0) 70%)',
    top: '-80px',
    right: '-80px',
    pointerEvents: 'none',
  },
  decorativeCircle2: {
    position: 'absolute',
    width: '380px',
    height: '380px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(255,183,3,0.15) 0%, rgba(255,183,3,0) 70%)',
    bottom: '-100px',
    left: '-100px',
    pointerEvents: 'none',
  },
  card: {
    background: '#ffffff',
    borderRadius: '20px',
    padding: '40px 36px',
    width: '100%',
    maxWidth: '420px',
    boxShadow: '0 25px 50px -12px rgba(8, 47, 56, 0.35), 0 0 0 1px rgba(130, 215, 222, 0.2)',
    position: 'relative',
    zIndex: 2,
  },
  backToHome: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    color: '#0F4C5C',
    textDecoration: 'none',
    fontSize: '0.82rem',
    fontWeight: '500',
    marginBottom: '20px',
    padding: '6px 10px',
    borderRadius: '8px',
    background: '#F0FDF4',
    transition: 'all 0.2s ease',
  },
  logo: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  logoImage: {
    height: '75px',
    width: 'auto',
    borderRadius: '14px',
    padding: '4px',
    border: '2px solid rgba(130, 215, 222, 0.3)',
    background: '#F8FAFC',
    boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
  },
  title: {
    fontSize: '1.45rem',
    fontWeight: '700',
    color: '#0F4C5C',
    marginBottom: '4px',
    textAlign: 'center',
    letterSpacing: '-0.3px',
  },
  subtitle: {
    fontSize: '0.84rem',
    color: '#64748B',
    textAlign: 'center',
    marginBottom: '28px',
    lineHeight: 1.4,
  },
  inputGroup: {
    marginBottom: '18px',
  },
  label: {
    display: 'block',
    marginBottom: '6px',
    color: '#334155',
    fontWeight: '600',
    fontSize: '0.86rem',
  },
  inputWrapper: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
  },
  inputIcon: {
    position: 'absolute',
    left: '14px',
    color: '#94A3B8',
    fontSize: '0.95rem',
  },
  input: {
    width: '100%',
    padding: '12px 14px 12px 42px',
    border: '1.5px solid #E2E8F0',
    borderRadius: '10px',
    fontSize: '0.92rem',
    transition: 'all 0.2s ease',
    outline: 'none',
    background: '#F8FAFC',
    color: '#1E293B',
    boxSizing: 'border-box',
  },
  togglePasswordBtn: {
    position: 'absolute',
    right: '12px',
    background: 'none',
    border: 'none',
    color: '#94A3B8',
    cursor: 'pointer',
    fontSize: '1rem',
    padding: '4px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    width: '100%',
    padding: '13px',
    background: 'linear-gradient(135deg, #0F4C5C 0%, #15697A 100%)',
    color: '#ffffff',
    border: 'none',
    borderRadius: '10px',
    fontSize: '0.96rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.25s ease',
    marginTop: '10px',
    boxShadow: '0 4px 14px rgba(15, 76, 92, 0.3)',
    letterSpacing: '0.3px',
  },
  buttonDisabled: {
    opacity: 0.7,
    cursor: 'not-allowed',
  },
  error: {
    background: '#FEF2F2',
    color: '#DC2626',
    border: '1px solid #FCA5A5',
    padding: '10px 14px',
    borderRadius: '10px',
    marginBottom: '20px',
    fontSize: '0.85rem',
    textAlign: 'center',
    fontWeight: '500',
  },
  footerText: {
    marginTop: '24px',
    textAlign: 'center',
    fontSize: '0.75rem',
    color: '#94A3B8',
  }
};

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
      <div style={styles.decorativeCircle1} />
      <div style={styles.decorativeCircle2} />

      <div style={styles.card}>
        <Link to="/" style={styles.backToHome}>
          <FaArrowLeft style={{ fontSize: '0.75rem' }} /> Kembali ke Website
        </Link>

        <div style={styles.logo}>
          <img src="/Logo TK.png" alt="Logo TK IT AR RAHMAN AL IKHLAS" style={styles.logoImage} />
        </div>
        <h2 style={styles.title}>Admin Panel TK</h2>
        <p style={styles.subtitle}>TK IT AR RAHMAN AL IKHLAS<br />Masuk untuk mengelola konten website</p>
        
        {error && <div style={styles.error}>{error}</div>}
        
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
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#E2E8F0';
                  e.target.style.background = '#F8FAFC';
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
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#E2E8F0';
                  e.target.style.background = '#F8FAFC';
                }}
                required
              />
              <button
                type="button"
                style={styles.togglePasswordBtn}
                onClick={() => setShowPassword(!showPassword)}
                tabIndex={-1}
                aria-label={showPassword ? 'Sembunyikan password' : 'Tampilkan password'}
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
          >
            {loading ? 'Memverifikasi...' : 'Masuk ke Admin'}
          </button>
        </form>

        <div style={styles.footerText}>
          Sistem Informasi Administrasi &bull; TK IT Ar Rahman
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
