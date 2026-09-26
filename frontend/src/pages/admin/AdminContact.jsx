import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminContactAPI, authAPI } from '../../services/adminApi';
import AdminSidebar from '../../components/AdminSidebar';
import LogoutModal from '../../components/LogoutModal';
import { toast } from 'react-toastify';
import {
  FaSave,
  FaSignOutAlt,
  FaUserCircle,
  FaInfoCircle,
  FaClock,
  FaMapMarkerAlt,
  FaFacebook,
  FaInstagram,
  FaYoutube,
  FaSync,
  FaGlobe,
  FaPhone,
  FaEnvelope,
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
  labelRequired: {
    color: '#DC2626',
    marginLeft: '2px',
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
    minHeight: '80px',
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
  mapPreview: {
    width: '100%',
    height: '220px',
    border: '2px solid #E2E8F0',
    borderRadius: '12px',
    marginTop: '10px',
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

const AdminContact = () => {
  const [contact, setContact] = useState(null);
  const [formData, setFormData] = useState({
    address: '',
    phone: '',
    email: '',
    map_url: '',
    latitude: '',
    longitude: '',
    jam_operasional: '',
    jam_operasional_sabtu: '',
    hari_libur: '',
    facebook_url: '',
    instagram_url: '',
    youtube_url: '',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const navigate = useNavigate();
  const username = localStorage.getItem('admin_username') || 'Admin TK';

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (!token) {
      navigate('/admin/login');
      return;
    }
    fetchContact();
  }, [navigate]);

  const fetchContact = async () => {
    try {
      setLoading(true);
      setError('');
      const res = await adminContactAPI.getContact();
      setContact(res.data);
      setFormData({
        address: res.data?.address || '',
        phone: res.data?.phone || '',
        email: res.data?.email || '',
        map_url: res.data?.map_url || '',
        latitude: res.data?.latitude || '',
        longitude: res.data?.longitude || '',
        jam_operasional: res.data?.jam_operasional || '',
        jam_operasional_sabtu: res.data?.jam_operasional_sabtu || '',
        hari_libur: res.data?.hari_libur || '',
        facebook_url: res.data?.facebook_url || '',
        instagram_url: res.data?.instagram_url || '',
        youtube_url: res.data?.youtube_url || '',
      });
    } catch (error) {
      console.error('Error fetching contact:', error);
      if (error.response?.status === 401 || error.response?.status === 403) {
        authAPI.logout();
        navigate('/admin/login');
      } else {
        setError('Gagal memuat data kontak');
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

    // Validasi
    if (!formData.address.trim()) {
      setError('Alamat harus diisi.');
      setSaving(false);
      return;
    }
    if (!formData.phone.trim()) {
      setError('Nomor telepon harus diisi.');
      setSaving(false);
      return;
    }
    if (!formData.email.trim()) {
      setError('Email harus diisi.');
      setSaving(false);
      return;
    }

    try {
      // Gunakan ID yang ada atau 1 jika belum ada
      const contactId = contact?.id || 1;
      await adminContactAPI.updateContact(contactId, formData);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 4000);
      await fetchContact();
    } catch (error) {
      console.error('Error saving contact:', error);
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
    if (contact) {
      setFormData({
        address: contact.address || '',
        phone: contact.phone || '',
        email: contact.email || '',
        map_url: contact.map_url || '',
        latitude: contact.latitude || '',
        longitude: contact.longitude || '',
        jam_operasional: contact.jam_operasional || '',
        jam_operasional_sabtu: contact.jam_operasional_sabtu || '',
        hari_libur: contact.hari_libur || '',
        facebook_url: contact.facebook_url || '',
        instagram_url: contact.instagram_url || '',
        youtube_url: contact.youtube_url || '',
      });
    }
    setError('');
    setSuccess(false);
  };

  // ==================== LOGOUT HANDLER (menggunakan LogoutModal) ====================
  const handleConfirmLogout = () => {
    authAPI.logout();
    toast.success('Berhasil keluar dari sesi admin.');
    navigate('/admin/login');
  };

  const getMapEmbedUrl = (lat, lng) => {
    if (!lat || !lng) return '';
    return `https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d10000!2d${lng}!3d${lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sid!4v1700000000000`;
  };

  if (loading) {
    return (
      <div style={styles.container}>
        <AdminSidebar />
        <main style={styles.mainContent}>
          <div style={styles.loadingState}>
            <FaSync className="fa-spin" style={{ fontSize: '2rem', color: '#82D7DE' }} />
            <div>Memuat data kontak...</div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <AdminSidebar />
      <LogoutModal 
        isOpen={showLogoutModal} 
        onClose={() => setShowLogoutModal(false)} 
        onConfirm={handleConfirmLogout} 
      />
      <main style={styles.mainContent}>
        {/* HEADER */}
        <div style={styles.header}>
          <div style={styles.headerLeft}>
            <h1 style={styles.headerTitle}>Edit Informasi Kontak</h1>
            <p style={styles.headerSubtitle}>
              Kelola alamat, kontak, jam operasional, dan media sosial TK IT AR RAHMAN AL IKHLAS
            </p>
          </div>
          <div style={styles.userSection}>
            <div style={styles.userInfo}>
              <FaUserCircle style={{ color: '#0F4C5C', fontSize: '1.2rem' }} />
              <span>{username}</span>
            </div>
            <button 
              onClick={() => setShowLogoutModal(true)} 
              style={styles.logoutBtn} 
              title="Keluar dari Admin"
            >
              <FaSignOutAlt />
              <span>Keluar</span>
            </button>
          </div>
        </div>

        <div style={styles.card}>
          {success && (
            <div style={styles.successMsg}>
              <FaSave /> Data kontak berhasil disimpan!
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
              <h2 style={styles.cardHeaderTitle}>Informasi Dasar</h2>
              <span style={styles.cardHeaderSub}>Alamat, telepon, dan email</span>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>
                Alamat Lengkap <span style={styles.labelRequired}>*</span>
              </label>
              <textarea
                name="address"
                style={styles.textarea}
                value={formData.address}
                onChange={handleChange}
                rows={3}
                placeholder="Masukkan alamat lengkap TK..."
                required
                onFocus={(e) => (e.target.style.borderColor = '#82D7DE')}
                onBlur={(e) => (e.target.style.borderColor = '#CBD5E1')}
              />
            </div>

            <div style={styles.row2cols}>
              <div style={styles.formGroup}>
                <label style={styles.label}>
                  <FaPhone style={{ marginRight: '6px', color: '#82D7DE' }} />
                  Nomor Telepon <span style={styles.labelRequired}>*</span>
                </label>
                <input
                  type="text"
                  name="phone"
                  style={styles.input}
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="(021) 7654321"
                  required
                  onFocus={(e) => (e.target.style.borderColor = '#82D7DE')}
                  onBlur={(e) => (e.target.style.borderColor = '#CBD5E1')}
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>
                  <FaEnvelope style={{ marginRight: '6px', color: '#82D7DE' }} />
                  Email <span style={styles.labelRequired}>*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  style={styles.input}
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="info@tkarrahman.sch.id"
                  required
                  onFocus={(e) => (e.target.style.borderColor = '#82D7DE')}
                  onBlur={(e) => (e.target.style.borderColor = '#CBD5E1')}
                />
              </div>
            </div>

            {/* ===== JAM OPERASIONAL ===== */}
            <div style={styles.sectionDivider}>
              <FaClock style={styles.sectionDividerIcon} />
              <h3 style={styles.sectionDividerText}>Jam Operasional</h3>
              <span style={styles.sectionDividerLine}></span>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Jam Operasional (Senin - Jumat)</label>
              <input
                type="text"
                name="jam_operasional"
                style={styles.input}
                value={formData.jam_operasional}
                onChange={handleChange}
                placeholder="07.00 - 16.00 WIB"
                onFocus={(e) => (e.target.style.borderColor = '#82D7DE')}
                onBlur={(e) => (e.target.style.borderColor = '#CBD5E1')}
              />
              <div style={styles.hintText}>Contoh: 07.00 - 16.00 WIB</div>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Jam Operasional (Sabtu)</label>
              <input
                type="text"
                name="jam_operasional_sabtu"
                style={styles.input}
                value={formData.jam_operasional_sabtu}
                onChange={handleChange}
                placeholder="08.00 - 12.00 WIB (kosongkan jika libur)"
                onFocus={(e) => (e.target.style.borderColor = '#82D7DE')}
                onBlur={(e) => (e.target.style.borderColor = '#CBD5E1')}
              />
              <div style={styles.hintText}>Kosongkan jika hari Sabtu libur</div>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Hari Libur</label>
              <input
                type="text"
                name="hari_libur"
                style={styles.input}
                value={formData.hari_libur}
                onChange={handleChange}
                placeholder="Minggu & Hari Libur Nasional"
                onFocus={(e) => (e.target.style.borderColor = '#82D7DE')}
                onBlur={(e) => (e.target.style.borderColor = '#CBD5E1')}
              />
              <div style={styles.hintText}>
                Contoh: Minggu, atau Minggu & Hari Libur Nasional
              </div>
            </div>

            {/* ===== LOKASI ===== */}
            <div style={styles.sectionDivider}>
              <FaMapMarkerAlt style={styles.sectionDividerIcon} />
              <h3 style={styles.sectionDividerText}>Lokasi</h3>
              <span style={styles.sectionDividerLine}></span>
            </div>

            <div style={styles.row2cols}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Latitude</label>
                <input
                  type="text"
                  name="latitude"
                  style={styles.input}
                  value={formData.latitude}
                  onChange={handleChange}
                  placeholder="Contoh: -6.2088"
                  onFocus={(e) => (e.target.style.borderColor = '#82D7DE')}
                  onBlur={(e) => (e.target.style.borderColor = '#CBD5E1')}
                />
                <div style={styles.hintText}>Koordinat latitude dari Google Maps</div>
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Longitude</label>
                <input
                  type="text"
                  name="longitude"
                  style={styles.input}
                  value={formData.longitude}
                  onChange={handleChange}
                  placeholder="Contoh: 106.8456"
                  onFocus={(e) => (e.target.style.borderColor = '#82D7DE')}
                  onBlur={(e) => (e.target.style.borderColor = '#CBD5E1')}
                />
                <div style={styles.hintText}>Koordinat longitude dari Google Maps</div>
              </div>
            </div>

            {formData.latitude && formData.longitude && (
              <div style={styles.formGroup}>
                <label style={styles.label}>Preview Lokasi</label>
                <iframe
                  src={getMapEmbedUrl(formData.latitude, formData.longitude)}
                  style={styles.mapPreview}
                  allowFullScreen
                  loading="lazy"
                  title="Preview Lokasi"
                ></iframe>
              </div>
            )}

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
                  <FaInstagram
                    style={{
                      ...styles.socialIcon,
                      color: '#E4405F',
                    }}
                  />
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

export default AdminContact;