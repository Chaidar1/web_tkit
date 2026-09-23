import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminFooterAPI, authAPI } from '../../services/adminApi';
import AdminSidebar from '../../components/AdminSidebar';
import {
  FaSave,
  FaSignOutAlt,
  FaUserCircle,
  FaInfoCircle,
  FaFacebook,
  FaInstagram,
  FaYoutube,
  FaSync,
  FaGlobe,
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
    minHeight: '100vh',
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
  headerLeft: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
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
  card: {
    background: '#ffffff',
    borderRadius: '16px',
    padding: '28px 32px',
    boxShadow: '0 4px 20px -4px rgba(15, 76, 92, 0.08)',
    border: '1px solid #E2E8F0',
  },
  cardHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '24px',
    paddingBottom: '16px',
    borderBottom: '2px solid #F1F5F9',
  },
  cardHeaderIcon: {
    fontSize: '1.5rem',
    color: '#82D7DE',
  },
  cardHeaderTitle: {
    fontSize: '1.1rem',
    fontWeight: '700',
    color: '#0F4C5C',
    margin: 0,
  },
  cardHeaderSub: {
    fontSize: '0.8rem',
    color: '#94A3B8',
    marginLeft: 'auto',
  },
  formGroup: {
    marginBottom: '20px',
  },
  label: {
    display: 'block',
    marginBottom: '6px',
    fontWeight: '600',
    color: '#334155',
    fontSize: '0.86rem',
  },
  input: {
    width: '100%',
    padding: '10px 14px',
    border: '1.5px solid #CBD5E1',
    borderRadius: '10px',
    fontSize: '0.9rem',
    boxSizing: 'border-box',
    outline: 'none',
    transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
    background: '#ffffff',
  },
  textarea: {
    width: '100%',
    padding: '10px 14px',
    border: '1.5px solid #CBD5E1',
    borderRadius: '10px',
    fontSize: '0.9rem',
    minHeight: '100px',
    boxSizing: 'border-box',
    outline: 'none',
    fontFamily: 'inherit',
    transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
    background: '#ffffff',
    resize: 'vertical',
  },
  hintText: {
    fontSize: '0.75rem',
    color: '#94A3B8',
    marginTop: '4px',
    fontStyle: 'italic',
  },
  sectionDivider: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    margin: '28px 0 20px 0',
    padding: '10px 0',
    borderTop: '2px solid #F1F5F9',
  },
  sectionDividerIcon: {
    fontSize: '1.1rem',
    color: '#82D7DE',
  },
  sectionDividerText: {
    fontSize: '0.95rem',
    fontWeight: '700',
    color: '#0F4C5C',
    margin: 0,
  },
  sectionDividerLine: {
    flex: 1,
    height: '1px',
    background: '#E2E8F0',
  },
  row2cols: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '20px',
  },
  actionBar: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '12px',
    marginTop: '28px',
    paddingTop: '20px',
    borderTop: '2px solid #F1F5F9',
  },
  saveBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    background: 'linear-gradient(135deg, #0F4C5C 0%, #82D7DE 100%)',
    color: '#ffffff',
    border: 'none',
    padding: '12px 28px',
    borderRadius: '10px',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '0.9rem',
    boxShadow: '0 4px 12px rgba(15, 76, 92, 0.25)',
    transition: 'all 0.2s ease',
  },
  saveBtnDisabled: {
    opacity: 0.6,
    cursor: 'not-allowed',
  },
  cancelBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    background: '#F1F5F9',
    color: '#475569',
    border: '1px solid #CBD5E1',
    padding: '12px 20px',
    borderRadius: '10px',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '0.9rem',
    transition: 'all 0.2s ease',
  },
  successMsg: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    background: '#DCFCE7',
    color: '#15803D',
    padding: '12px 18px',
    borderRadius: '10px',
    marginBottom: '16px',
    border: '1px solid #BBF7D0',
    fontWeight: '500',
  },
  errorMsg: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    background: '#FEE2E2',
    color: '#B91C1C',
    padding: '12px 18px',
    borderRadius: '10px',
    marginBottom: '16px',
    border: '1px solid #FECACA',
    fontWeight: '500',
  },
  loadingState: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '60px 20px',
    gap: '12px',
    color: '#0F4C5C',
  },
  socialInputWrapper: {
    position: 'relative',
  },
  socialIcon: {
    position: 'absolute',
    left: '12px',
    top: '50%',
    transform: 'translateY(-50%)',
    fontSize: '1rem',
    pointerEvents: 'none',
  },
  socialInput: {
    width: '100%',
    padding: '10px 14px 10px 38px',
    border: '1.5px solid #CBD5E1',
    borderRadius: '10px',
    fontSize: '0.9rem',
    boxSizing: 'border-box',
    outline: 'none',
    transition: 'border-color 0.2s ease',
    background: '#ffffff',
  },
  '@media (max-width: 768px)': {
    mainContent: {
      marginLeft: '0',
      padding: '16px',
    },
    row2cols: {
      gridTemplateColumns: '1fr',
    },
    header: {
      flexDirection: 'column',
      alignItems: 'flex-start',
      gap: '12px',
    },
    userSection: {
      width: '100%',
      justifyContent: 'space-between',
    },
    card: {
      padding: '20px 18px',
    },
  },
};

const AdminFooter = () => {
  const [footer, setFooter] = useState(null);
  const [formData, setFormData] = useState({
    description: '',
    copyright_text: '',
    facebook_url: '',
    instagram_url: '',
    youtube_url: '',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const username = localStorage.getItem('admin_username') || 'Admin TK';

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (!token) {
      navigate('/admin/login');
      return;
    }
    fetchFooter();
  }, [navigate]);

  const fetchFooter = async () => {
    try {
      setLoading(true);
      setError('');
      const res = await adminFooterAPI.getFooter();
      setFooter(res.data);
      setFormData({
        description: res.data?.description || '',
        copyright_text: res.data?.copyright_text || '',
        facebook_url: res.data?.facebook_url || '',
        instagram_url: res.data?.instagram_url || '',
        youtube_url: res.data?.youtube_url || '',
      });
    } catch (error) {
      console.error('Error fetching footer:', error);
      if (error.response?.status === 401 || error.response?.status === 403) {
        authAPI.logout();
        navigate('/admin/login');
      } else {
        setError('Gagal memuat data footer');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError('');
    if (success) setSuccess(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSuccess(false);
    setError('');

    try {
      // Gunakan ID yang ada atau 1 jika belum ada
      const footerId = footer?.id || 1;
      await adminFooterAPI.updateFooter(footerId, formData);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 4000);
      await fetchFooter();
    } catch (error) {
      console.error('Error saving footer:', error);
      if (error.response?.status === 401 || error.response?.status === 403) {
        authAPI.logout();
        navigate('/admin/login');
      } else {
        setError('Gagal menyimpan data. Silakan coba lagi.');
      }
    } finally {
      setSaving(false);
    }
  };

  const handleReset = () => {
    if (footer) {
      setFormData({
        description: footer.description || '',
        copyright_text: footer.copyright_text || '',
        facebook_url: footer.facebook_url || '',
        instagram_url: footer.instagram_url || '',
        youtube_url: footer.youtube_url || '',
      });
    }
    setError('');
    setSuccess(false);
  };

  const handleLogout = () => {
    if (window.confirm('Apakah Anda ingin keluar dari panel admin?')) {
      authAPI.logout();
      navigate('/admin/login');
    }
  };

  if (loading) {
    return (
      <div style={styles.container}>
        <AdminSidebar />
        <main style={styles.mainContent}>
          <div style={styles.loadingState}>
            <FaSync className="fa-spin" style={{ fontSize: '2rem', color: '#82D7DE' }} />
            <div>Memuat data footer...</div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <AdminSidebar />
      <main style={styles.mainContent}>
        {/* HEADER */}
        <div style={styles.header}>
          <div style={styles.headerLeft}>
            <h1 style={styles.headerTitle}>Edit Footer</h1>
            <p style={styles.headerSubtitle}>
              Kelola deskripsi, copyright, dan media sosial pada footer website TK
            </p>
          </div>
          <div style={styles.userSection}>
            <div style={styles.userInfo}>
              <FaUserCircle style={{ color: '#0F4C5C', fontSize: '1.2rem' }} />
              <span>{username}</span>
            </div>
            <button onClick={handleLogout} style={styles.logoutBtn} title="Keluar dari Admin">
              <FaSignOutAlt />
              <span>Keluar</span>
            </button>
          </div>
        </div>

        <div style={styles.card}>
          {success && (
            <div style={styles.successMsg}>
              <FaSave /> Data footer berhasil disimpan!
            </div>
          )}
          {error && (
            <div style={styles.errorMsg}>
              <FaInfoCircle /> {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* ===== INFORMASI DASAR ===== */}
            <div style={styles.cardHeader}>
              <FaInfoCircle style={styles.cardHeaderIcon} />
              <h2 style={styles.cardHeaderTitle}>Informasi Footer</h2>
              <span style={styles.cardHeaderSub}>Deskripsi dan copyright</span>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Deskripsi Singkat</label>
              <textarea
                name="description"
                style={styles.textarea}
                value={formData.description}
                onChange={handleChange}
                rows={4}
                placeholder="Membina generasi qur'ani yang cerdas, ceria, mandiri, dan berakhlak mulia sejak usia dini."
                onFocus={(e) => (e.target.style.borderColor = '#82D7DE')}
                onBlur={(e) => (e.target.style.borderColor = '#CBD5E1')}
              />
              <div style={styles.hintText}>
                Deskripsi singkat tentang TK yang akan ditampilkan di footer.
              </div>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Teks Copyright</label>
              <input
                type="text"
                name="copyright_text"
                style={styles.input}
                value={formData.copyright_text}
                onChange={handleChange}
                placeholder="TK IT AR RAHMAN AL IKHLAS"
                onFocus={(e) => (e.target.style.borderColor = '#82D7DE')}
                onBlur={(e) => (e.target.style.borderColor = '#CBD5E1')}
              />
              <div style={styles.hintText}>
                Teks yang akan ditampilkan di bagian bawah footer.
              </div>
            </div>

            {/* ===== MEDIA SOSIAL ===== */}
            <div style={styles.sectionDivider}>
              <FaGlobe style={styles.sectionDividerIcon} />
              <h3 style={styles.sectionDividerText}>Media Sosial</h3>
              <span style={styles.sectionDividerLine}></span>
            </div>

            <div style={styles.row2cols}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Facebook URL</label>
                <div style={styles.socialInputWrapper}>
                  <FaFacebook style={{ ...styles.socialIcon, color: '#1877F2' }} />
                  <input
                    type="url"
                    name="facebook_url"
                    style={styles.socialInput}
                    value={formData.facebook_url}
                    onChange={handleChange}
                    placeholder="https://facebook.com/..."
                    onFocus={(e) => (e.target.style.borderColor = '#82D7DE')}
                    onBlur={(e) => (e.target.style.borderColor = '#CBD5E1')}
                  />
                </div>
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Instagram URL</label>
                <div style={styles.socialInputWrapper}>
                  <FaInstagram style={{ ...styles.socialIcon, color: '#E4405F' }} />
                  <input
                    type="url"
                    name="instagram_url"
                    style={styles.socialInput}
                    value={formData.instagram_url}
                    onChange={handleChange}
                    placeholder="https://instagram.com/..."
                    onFocus={(e) => (e.target.style.borderColor = '#82D7DE')}
                    onBlur={(e) => (e.target.style.borderColor = '#CBD5E1')}
                  />
                </div>
              </div>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>YouTube URL</label>
              <div style={styles.socialInputWrapper}>
                <FaYoutube style={{ ...styles.socialIcon, color: '#FF0000' }} />
                <input
                  type="url"
                  name="youtube_url"
                  style={styles.socialInput}
                  value={formData.youtube_url}
                  onChange={handleChange}
                  placeholder="https://youtube.com/..."
                  onFocus={(e) => (e.target.style.borderColor = '#82D7DE')}
                  onBlur={(e) => (e.target.style.borderColor = '#CBD5E1')}
                />
              </div>
            </div>

            {/* ===== ACTION BUTTONS ===== */}
            <div style={styles.actionBar}>
              <button
                type="button"
                style={styles.cancelBtn}
                onClick={handleReset}
                disabled={saving}
              >
                <FaSync /> Reset
              </button>
              <button
                type="submit"
                style={{
                  ...styles.saveBtn,
                  ...(saving ? styles.saveBtnDisabled : {}),
                }}
                disabled={saving}
              >
                <FaSave /> {saving ? 'Menyimpan...' : 'Simpan Perubahan'}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default AdminFooter;