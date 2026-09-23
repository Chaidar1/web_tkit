import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminHeroAPI, authAPI } from '../../services/adminApi';
import AdminSidebar from '../../components/AdminSidebar';
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaSignOutAlt,
  FaUserCircle,
  FaImage,
  FaCheckCircle,
  FaTimesCircle,
  FaExternalLinkAlt,
  FaSortNumericDown,
  FaSync
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
    padding: '24px',
    boxShadow: '0 4px 20px -4px rgba(15, 76, 92, 0.08)',
    border: '1px solid #E2E8F0',
  },
  cardTopBar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
    flexWrap: 'wrap',
    gap: '12px',
  },
  statsCounter: {
    fontSize: '0.9rem',
    color: '#64748B',
    fontWeight: '500',
  },
  addBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    background: 'linear-gradient(135deg, #0F4C5C 0%, #177184 100%)',
    color: '#ffffff',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '10px',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '0.88rem',
    boxShadow: '0 4px 12px rgba(15, 76, 92, 0.25)',
    transition: 'all 0.2s ease',
  },
  refreshBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    background: '#F8FAFC',
    color: '#475569',
    border: '1px solid #CBD5E1',
    padding: '9px 14px',
    borderRadius: '10px',
    cursor: 'pointer',
    fontSize: '0.84rem',
    fontWeight: '500',
  },
  tableWrapper: {
    overflowX: 'auto',
    borderRadius: '12px',
    border: '1px solid #E2E8F0',
  },
  heroTable: {
    width: '100%',
    borderCollapse: 'collapse',
    textAlign: 'left',
    fontSize: '0.88rem',
  },
  th: {
    background: '#F8FAFC',
    padding: '14px 16px',
    borderBottom: '1px solid #E2E8F0',
    color: '#475569',
    fontWeight: '600',
    fontSize: '0.8rem',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  td: {
    padding: '14px 16px',
    borderBottom: '1px solid #F1F5F9',
    verticalAlign: 'middle',
    color: '#334155',
  },
  previewImage: {
    width: '100px',
    height: '60px',
    objectFit: 'cover',
    borderRadius: '8px',
    border: '1px solid #E2E8F0',
    boxShadow: '0 2px 6px rgba(0,0,0,0.06)',
    display: 'block',
  },
  titleCol: {
    fontWeight: '600',
    color: '#0F4C5C',
  },
  descriptionCol: {
    maxWidth: '260px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    color: '#64748B',
    fontSize: '0.82rem',
  },
  orderBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: '28px',
    height: '28px',
    borderRadius: '8px',
    background: '#F1F5F9',
    color: '#0F4C5C',
    fontWeight: '700',
    fontSize: '0.82rem',
  },
  statusBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '5px',
    padding: '5px 12px',
    borderRadius: '20px',
    fontSize: '0.76rem',
    fontWeight: '600',
    cursor: 'pointer',
    border: 'none',
    transition: 'transform 0.15s ease',
  },
  statusActive: {
    background: '#DCFCE7',
    color: '#15803D',
  },
  statusInactive: {
    background: '#FEE2E2',
    color: '#B91C1C',
  },
  actionsWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  editBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px',
    background: '#FEF3C7',
    color: '#B45309',
    border: '1px solid #FDE68A',
    padding: '6px 12px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '0.8rem',
    fontWeight: '600',
    transition: 'all 0.2s ease',
  },
  deleteBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px',
    background: '#FEE2E2',
    color: '#DC2626',
    border: '1px solid #FECACA',
    padding: '6px 12px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '0.8rem',
    fontWeight: '600',
    transition: 'all 0.2s ease',
  },
  modal: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(8, 47, 56, 0.6)',
    backdropFilter: 'blur(3px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    padding: '20px',
  },
  modalContent: {
    background: '#ffffff',
    borderRadius: '20px',
    padding: '32px',
    width: '100%',
    maxWidth: '580px',
    maxHeight: '90vh',
    overflowY: 'auto',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  },
  modalHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '22px',
    borderBottom: '1px solid #F1F5F9',
    paddingBottom: '14px',
  },
  modalTitle: {
    fontSize: '1.3rem',
    fontWeight: '700',
    color: '#0F4C5C',
    margin: 0,
  },
  closeModalBtn: {
    background: 'none',
    border: 'none',
    fontSize: '1.4rem',
    color: '#94A3B8',
    cursor: 'pointer',
    lineHeight: 1,
  },
  formGroup: {
    marginBottom: '18px',
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
    transition: 'border-color 0.2s ease',
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
    transition: 'border-color 0.2s ease',
  },
  fileInputBox: {
    border: '2px dashed #93C5FD',
    background: '#F0F9FF',
    borderRadius: '12px',
    padding: '18px',
    textAlign: 'center',
    cursor: 'pointer',
    position: 'relative',
    transition: 'background 0.2s ease',
  },
  imagePreviewContainer: {
    marginTop: '12px',
    textAlign: 'center',
    padding: '10px',
    background: '#F8FAFC',
    borderRadius: '10px',
    border: '1px solid #E2E8F0',
  },
  imagePreview: {
    maxWidth: '100%',
    maxHeight: '180px',
    objectFit: 'cover',
    borderRadius: '8px',
    boxShadow: '0 4px 10px rgba(0,0,0,0.08)',
  },
  modalFooter: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '12px',
    marginTop: '26px',
    borderTop: '1px solid #F1F5F9',
    paddingTop: '18px',
  },
  saveBtn: {
    background: 'linear-gradient(135deg, #0F4C5C 0%, #177184 100%)',
    color: '#ffffff',
    border: 'none',
    padding: '11px 24px',
    borderRadius: '10px',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '0.9rem',
    boxShadow: '0 4px 12px rgba(15, 76, 92, 0.25)',
  },
  cancelBtn: {
    background: '#F1F5F9',
    color: '#475569',
    border: '1px solid #CBD5E1',
    padding: '11px 20px',
    borderRadius: '10px',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '0.9rem',
  },
  emptyState: {
    textAlign: 'center',
    padding: '50px 20px',
    color: '#64748B',
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
};

const AdminHeroImages = () => {
  const [heroImages, setHeroImages] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingHero, setEditingHero] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    link_url: '',
    link_text: '',
    order: 0,
    is_active: true,
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const username = localStorage.getItem('admin_username') || 'Admin TK';

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (!token) {
      navigate('/admin/login');
      return;
    }
    fetchHeroImages();
  }, [navigate]);

  const fetchHeroImages = async () => {
    try {
      setLoading(true);
      const res = await adminHeroAPI.getHeroImages();
      setHeroImages(res.data || []);
    } catch (error) {
      console.error('Error fetching hero images:', error);
      if (error.response?.status === 401) {
        authAPI.logout();
        navigate('/admin/login');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      alert('Hanya file gambar (JPG, PNG, WebP) yang diperbolehkan.');
      return;
    }
    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleOpenAddModal = () => {
    resetForm();
    setShowModal(true);
  };

  const handleEdit = (hero) => {
    setEditingHero(hero);
    setFormData({
      title: hero.title || '',
      description: hero.description || '',
      link_url: hero.link_url || '',
      link_text: hero.link_text || '',
      order: hero.order !== undefined ? hero.order : 0,
      is_active: hero.is_active !== undefined ? hero.is_active : true,
    });
    setSelectedFile(null);
    setPreviewUrl(hero.image_url ? getImageUrl(hero.image_url) : '');
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!editingHero && !selectedFile) {
      alert('Silakan pilih file gambar untuk slide hero baru.');
      return;
    }
    setSubmitting(true);
    try {
      const payload = new FormData();
      payload.append('title', formData.title.trim());
      if (formData.description) {
        payload.append('description', formData.description.trim());
      }
      if (formData.link_url) {
        payload.append('link_url', formData.link_url.trim());
      }
      if (formData.link_text) {
        payload.append('link_text', formData.link_text.trim());
      }
      payload.append('order', Number(formData.order) || 0);
      payload.append('is_active', formData.is_active ? 'true' : 'false');
      if (selectedFile) {
        payload.append('image', selectedFile);
      }
      if (editingHero) {
        await adminHeroAPI.updateHeroImage(editingHero.id, payload);
      } else {
        await adminHeroAPI.createHeroImage(payload);
      }
      setShowModal(false);
      resetForm();
      fetchHeroImages();
    } catch (error) {
      console.error('Save hero image error:', error);
      let errMsg = 'Gagal menyimpan slide.';
      if (error.response?.data?.detail) {
        if (typeof error.response.data.detail === 'string') {
          errMsg = error.response.data.detail;
        } else if (Array.isArray(error.response.data.detail)) {
          errMsg = error.response.data.detail.map((d) => d.msg).join(', ');
        }
      }
      alert(errMsg);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus slide hero ini?')) {
      try {
        await adminHeroAPI.deleteHeroImage(id);
        fetchHeroImages();
      } catch (error) {
        console.error('Delete error:', error);
        alert('Gagal menghapus slide hero');
      }
    }
  };

  const handleToggleStatus = async (hero) => {
    try {
      const payload = new FormData();
      payload.append('is_active', (!hero.is_active).toString());
      await adminHeroAPI.updateHeroImage(hero.id, payload);
      fetchHeroImages();
    } catch (error) {
      console.error('Toggle error:', error);
      alert('Gagal mengubah status slide');
    }
  };

  const resetForm = () => {
    setEditingHero(null);
    setSelectedFile(null);
    setPreviewUrl('');
    setFormData({
      title: '',
      description: '',
      link_url: '',
      link_text: '',
      order: 0,
      is_active: true,
    });
  };

  const handleLogout = () => {
    if (window.confirm('Apakah Anda ingin keluar dari panel admin?')) {
      authAPI.logout();
      navigate('/admin/login');
    }
  };

  const getImageUrl = (url) => {
    if (!url) return '';
    if (url.startsWith('http://') || url.startsWith('https://')) {
      return url;
    }
    return `http://localhost:8000${url.startsWith('/') ? '' : '/'}${url}`;
  };

  return (
    <div style={styles.container}>
      <AdminSidebar />
      <main style={styles.mainContent}>
        <div style={styles.header}>
          <div style={styles.headerLeft}>
            <h1 style={styles.headerTitle}>Kelola Hero Slider</h1>
            <p style={styles.headerSubtitle}>
              Atur banner visual utama dan pesan sambutan di beranda TK
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
          <div style={styles.cardTopBar}>
            <div style={styles.statsCounter}>
              Total Slide: <strong>{heroImages.length}</strong> slide banner
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button style={styles.addBtn} onClick={handleOpenAddModal}>
                <FaPlus />
                Tambah Slide Baru
              </button>
            </div>
          </div>

          {loading ? (
            <div style={styles.loadingState}>
              <FaSync className="fa-spin" style={{ fontSize: '2rem' }} />
              <div>Memuat data hero slider...</div>
            </div>
          ) : heroImages.length === 0 ? (
            <div style={styles.emptyState}>
              <FaImage style={{ fontSize: '3rem', color: '#CBD5E1', marginBottom: '12px' }} />
              <p style={{ fontWeight: '600', fontSize: '1rem', color: '#334155' }}>
                Belum ada banner hero slider
              </p>
              <p style={{ fontSize: '0.85rem', color: '#94A3B8', marginBottom: '16px' }}>
                Tambahkan foto kegiatan, keceriaan anak, atau pengumuman penting untuk ditampilkan di
                halaman depan.
              </p>
              <button style={styles.addBtn} onClick={handleOpenAddModal}>
                <FaPlus />
                Buat Slide Pertama
              </button>
            </div>
          ) : (
            <div style={styles.tableWrapper}>
              <table style={styles.heroTable}>
                <thead>
                  <tr>
                    <th style={styles.th}>Gambar</th>
                    <th style={styles.th}>Judul & Info</th>
                    <th style={styles.th}>Tautan / Link</th>
                    <th style={styles.th}>Urutan</th>
                    <th style={styles.th}>Status</th>
                    <th style={{ ...styles.th, textAlign: 'center' }}>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {heroImages.map((hero) => (
                    <tr key={hero.id}>
                      <td style={styles.td}>
                        <img
                          src={getImageUrl(hero.image_url)}
                          alt={hero.title}
                          style={styles.previewImage}
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = 'https://placehold.co/100x60/0F4C5C/ffffff?text=Slide+TK';
                          }}
                        />
                      </td>
                      <td style={styles.td}>
                        <div style={styles.titleCol}>{hero.title}</div>
                        {hero.description && (
                          <div style={styles.descriptionCol} title={hero.description}>
                            {hero.description}
                          </div>
                        )}
                      </td>
                      <td style={styles.td}>
                        {hero.link_url ? (
                          <span
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '4px',
                              fontSize: '0.8rem',
                              color: '#0F4C5C',
                            }}
                          >
                            <FaExternalLinkAlt style={{ fontSize: '0.7rem' }} />
                            <span>{hero.link_text || hero.link_url}</span>
                          </span>
                        ) : (
                          <span style={{ color: '#94A3B8', fontSize: '0.8rem' }}>
                            - Tidak ada link -
                          </span>
                        )}
                      </td>
                      <td style={styles.td}>
                        <span style={styles.orderBadge}>{hero.order ?? 0}</span>
                      </td>
                      <td style={styles.td}>
                        <button
                          onClick={() => handleToggleStatus(hero)}
                          style={{
                            ...styles.statusBadge,
                            ...(hero.is_active ? styles.statusActive : styles.statusInactive),
                          }}
                          title="Klik untuk mengubah status aktif/nonaktif"
                        >
                          {hero.is_active ? (
                            <>
                              <FaCheckCircle style={{ fontSize: '0.8rem' }} />
                              <span>Aktif</span>
                            </>
                          ) : (
                            <>
                              <FaTimesCircle style={{ fontSize: '0.8rem' }} />
                              <span>Nonaktif</span>
                            </>
                          )}
                        </button>
                      </td>
                      <td style={{ ...styles.td, textAlign: 'center' }}>
                        <div style={styles.actionsWrapper}>
                          <button style={styles.editBtn} onClick={() => handleEdit(hero)}>
                            <FaEdit />
                            Edit
                          </button>
                          <button style={styles.deleteBtn} onClick={() => handleDelete(hero.id)}>
                            <FaTrash />
                            Hapus
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      {showModal && (
        <div style={styles.modal} onClick={() => !submitting && setShowModal(false)}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <h2 style={styles.modalTitle}>
                {editingHero ? 'Edit Slide Hero' : 'Tambah Slide Hero Baru'}
              </h2>
              <button
                style={styles.closeModalBtn}
                onClick={() => !submitting && setShowModal(false)}
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Judul Slide *</label>
                <input
                  type="text"
                  style={styles.input}
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      title: e.target.value,
                    })
                  }
                  placeholder="Contoh: Selamat Datang di TK IT Ar Rahman"
                  required
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Deskripsi Singkat</label>
                <textarea
                  style={styles.textarea}
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      description: e.target.value,
                    })
                  }
                  placeholder="Contoh: Membina generasi islami, cerdas, kreatif, dan berakhlak mulia sejak usia dini."
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>
                  Foto Banner {editingHero ? '(Pilih jika ingin mengganti)' : '*'}
                </label>
                <div style={styles.fileInputBox}>
                  <FaImage
                    style={{
                      fontSize: '2rem',
                      color: '#0F4C5C',
                      marginBottom: '8px',
                    }}
                  />
                  <div>
                    <input
                      type="file"
                      accept="image/png, image/jpeg, image/jpg, image/webp"
                      onChange={handleFileChange}
                      required={!editingHero && !selectedFile}
                      style={{ fontSize: '0.85rem' }}
                    />
                  </div>
                  <p
                    style={{
                      fontSize: '0.75rem',
                      color: '#64748B',
                      marginTop: '6px',
                      margin: 0,
                    }}
                  >
                    Rekomendasi rasio 16:9 atau lebar minimal 1200px (format JPG/PNG/WebP)
                  </p>
                </div>

                {previewUrl && (
                  <div style={styles.imagePreviewContainer}>
                    <div style={{ fontSize: '0.75rem', color: '#64748B', marginBottom: '6px' }}>
                      Pratinjau Gambar:
                    </div>
                    <img
                      src={previewUrl}
                      alt="Pratinjau"
                      style={styles.imagePreview}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://placehold.co/400x200/0F4C5C/ffffff?text=Preview';
                      }}
                    />
                  </div>
                )}
              </div>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '14px',
                }}
              >
                <div style={styles.formGroup}>
                  <label style={styles.label}>Teks Tombol (Opsional)</label>
                  <input
                    type="text"
                    style={styles.input}
                    value={formData.link_text}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        link_text: e.target.value,
                      })
                    }
                    placeholder="Contoh: Lihat Program"
                  />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Tautan Tujuan (Opsional)</label>
                  <input
                    type="text"
                    style={styles.input}
                    value={formData.link_url}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        link_url: e.target.value,
                      })
                    }
                    placeholder="Contoh: /programs atau /contact"
                  />
                </div>
              </div>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '14px',
                  alignItems: 'center',
                }}
              >
                <div style={styles.formGroup}>
                  <label style={styles.label}>Urutan Tampil (Order)</label>
                  <input
                    type="number"
                    min="0"
                    style={styles.input}
                    value={formData.order}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        order: parseInt(e.target.value) || 0,
                      })
                    }
                  />
                </div>
                <div style={{ ...styles.formGroup, marginTop: '22px' }}>
                  <label
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      cursor: 'pointer',
                      fontWeight: '600',
                      color: '#334155',
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={formData.is_active}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          is_active: e.target.checked,
                        })
                      }
                      style={{
                        width: '18px',
                        height: '18px',
                        accentColor: '#0F4C5C',
                      }}
                    />
                    <span>Aktifkan slide di beranda</span>
                  </label>
                </div>
              </div>

              <div style={styles.modalFooter}>
                <button
                  type="button"
                  style={styles.cancelBtn}
                  onClick={() => setShowModal(false)}
                  disabled={submitting}
                >
                  Batal
                </button>
                <button type="submit" style={styles.saveBtn} disabled={submitting}>
                  {submitting
                    ? 'Menyimpan...'
                    : editingHero
                    ? 'Simpan Perubahan'
                    : 'Tambah Slide'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminHeroImages;