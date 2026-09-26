import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminNewsAPI, uploadAPI, authAPI } from '../../services/adminApi';
import AdminSidebar from '../../components/AdminSidebar';
import LogoutModal from '../../components/LogoutModal';
import { toast } from 'react-toastify';
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaSignOutAlt,
  FaUserCircle,
  FaImage,
  FaCheckCircle,
  FaTimesCircle,
  FaSync,
  FaNewspaper,
  FaUpload,
  FaSave,
  FaTimes,
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
    background: 'linear-gradient(135deg, #0F4C5C 0%, #82D7DE 100%)',
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
  tableWrapper: {
    overflowX: 'auto',
    borderRadius: '12px',
    border: '1px solid #E2E8F0',
  },
  newsTable: {
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
  newsImage: {
    width: '80px',
    height: '50px',
    objectFit: 'cover',
    borderRadius: '8px',
    border: '1px solid #E2E8F0',
  },
  titleCol: {
    fontWeight: '600',
    color: '#0F4C5C',
    maxWidth: '250px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  excerptCol: {
    maxWidth: '200px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    color: '#64748B',
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
  },
  statusPublished: {
    background: '#DCFCE7',
    color: '#15803D',
  },
  statusDraft: {
    background: '#FEF3C7',
    color: '#B45309',
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
    maxWidth: '750px',
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
    resize: 'vertical',
  },
  fileInputBox: {
    border: '2px dashed #82D7DE',
    background: '#F0FDFF',
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
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    background: 'linear-gradient(135deg, #0F4C5C 0%, #82D7DE 100%)',
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
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
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
  errorState: {
    textAlign: 'center',
    padding: '50px 20px',
    color: '#DC2626',
  },
  tagsInput: {
    width: '100%',
    padding: '10px 14px',
    border: '1.5px solid #CBD5E1',
    borderRadius: '10px',
    fontSize: '0.9rem',
    boxSizing: 'border-box',
    outline: 'none',
    transition: 'border-color 0.2s ease',
  },
  hintText: {
    fontSize: '0.75rem',
    color: '#94A3B8',
    marginTop: '4px',
    fontStyle: 'italic',
  },
};

const AdminNews = () => {
  const [news, setNews] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingNews, setEditingNews] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    hero_image: '',
    content: '',
    excerpt: '',
    author: 'Admin TK IT AR RAHMAN AL IKHLAS',
    location: '',
    tags: '',
    is_published: true,
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const navigate = useNavigate();
  const username = localStorage.getItem('admin_username') || 'Admin TK';

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (!token) {
      navigate('/admin/login');
      return;
    }
    fetchNews();
  }, [navigate]);

  const fetchNews = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await adminNewsAPI.getNews();
      setNews(res.data || []);
    } catch (error) {
      console.error('Error fetching news:', error);
      if (error.response?.status === 401) {
        authAPI.logout();
        navigate('/admin/login');
      } else {
        setError('Gagal memuat data berita');
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

  const handleUpload = async () => {
    if (!selectedFile) return null;

    setUploading(true);
    try {
      const res = await uploadAPI.uploadImage(selectedFile);
      return res.data.url;
    } catch (error) {
      console.error('Upload error:', error);
      if (error.response?.status === 401) {
        authAPI.logout();
        navigate('/admin/login');
      } else {
        alert('Gagal upload gambar');
      }
      return null;
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      let heroImageUrl = formData.hero_image;

      // Upload file jika ada file baru
      if (selectedFile) {
        const uploadedUrl = await handleUpload();
        if (uploadedUrl) {
          heroImageUrl = uploadedUrl;
        }
      }

      const payload = {
        ...formData,
        hero_image: heroImageUrl,
      };

      if (editingNews) {
        await adminNewsAPI.updateNews(editingNews.id, payload);
      } else {
        await adminNewsAPI.createNews(payload);
      }

      setShowModal(false);
      resetForm();
      fetchNews();
    } catch (error) {
      console.error('Save error:', error);
      if (error.response?.status === 401) {
        authAPI.logout();
        navigate('/admin/login');
      } else {
        alert('Gagal menyimpan berita');
      }
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (item) => {
    setEditingNews(item);
    setFormData({
      title: item.title || '',
      hero_image: item.hero_image || '',
      content: item.content || '',
      excerpt: item.excerpt || '',
      author: item.author || 'Admin TK IT AR RAHMAN AL IKHLAS',
      location: item.location || '',
      tags: item.tags || '',
      is_published: item.is_published !== undefined ? item.is_published : true,
    });
    setSelectedFile(null);
    setPreviewUrl(item.hero_image ? getImageUrl(item.hero_image) : '');
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus berita ini?')) {
      try {
        await adminNewsAPI.deleteNews(id);
        fetchNews();
      } catch (error) {
        console.error('Delete error:', error);
        if (error.response?.status === 401) {
          authAPI.logout();
          navigate('/admin/login');
        } else {
          alert('Gagal menghapus berita');
        }
      }
    }
  };

  const handleToggleStatus = async (item) => {
    try {
      await adminNewsAPI.updateNews(item.id, {
        is_published: !item.is_published,
      });
      fetchNews();
    } catch (error) {
      console.error('Toggle status error:', error);
      alert('Gagal mengubah status berita');
    }
  };

  const resetForm = () => {
    setEditingNews(null);
    setSelectedFile(null);
    setPreviewUrl('');
    setFormData({
      title: '',
      hero_image: '',
      content: '',
      excerpt: '',
      author: 'Admin TK IT AR RAHMAN AL IKHLAS',
      location: '',
      tags: '',
      is_published: true,
    });
  };

  const handleConfirmLogout = () => {
    authAPI.logout();
    toast.success('Berhasil keluar dari sesi admin.');
    navigate('/admin/login');
  };

  const getImageUrl = (url) => {
    if (!url) return '';
    if (url.startsWith('http://') || url.startsWith('https://')) {
      return url;
    }
    return `http://localhost:8000${url.startsWith('/') ? '' : '/'}${url}`;
  };

  const handleOpenAddModal = () => {
    resetForm();
    setShowModal(true);
  };

  if (loading) {
    return (
      <div style={styles.container}>
        <AdminSidebar />
        <main style={styles.mainContent}>
          <div style={styles.loadingState}>
            <FaSync className="fa-spin" style={{ fontSize: '2rem', color: '#82D7DE' }} />
            <div>Memuat data berita...</div>
          </div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.container}>
        <AdminSidebar />
        <main style={styles.mainContent}>
          <div style={styles.errorState}>
            <p>{error}</p>
            <button onClick={fetchNews} style={styles.editBtn}>
              <FaSync /> Coba Lagi
            </button>
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
            <h1 style={styles.headerTitle}>Kelola Berita</h1>
            <p style={styles.headerSubtitle}>
              Kelola berita dan informasi TK IT AR RAHMAN AL IKHLAS
            </p>
          </div>
          <div style={styles.userSection}>
            <div style={styles.userInfo}>
              <FaUserCircle style={{ color: '#0F4C5C', fontSize: '1.2rem' }} />
              <span>{username}</span>
            </div>
            <button onClick={() => setShowLogoutModal(true)} style={styles.logoutBtn} title="Keluar dari Admin">
              <FaSignOutAlt />
              <span>Keluar</span>
            </button>
          </div>
        </div>

        {/* CARD */}
        <div style={styles.card}>
          <div style={styles.cardTopBar}>
            <div style={styles.statsCounter}>
              Total Berita: <strong>{news.length}</strong> artikel
            </div>
            <button style={styles.addBtn} onClick={handleOpenAddModal}>
              <FaPlus />
              Tambah Berita
            </button>
          </div>

          {news.length === 0 ? (
            <div style={styles.emptyState}>
              <FaNewspaper style={{ fontSize: '3rem', color: '#CBD5E1', marginBottom: '12px' }} />
              <p style={{ fontWeight: '600', fontSize: '1rem', color: '#334155' }}>
                Belum ada berita
              </p>
              <p style={{ fontSize: '0.85rem', color: '#94A3B8', marginBottom: '16px' }}>
                Tambahkan berita pertama untuk ditampilkan di halaman berita.
              </p>
              <button style={styles.addBtn} onClick={handleOpenAddModal}>
                <FaPlus />
                Buat Berita Pertama
              </button>
            </div>
          ) : (
            <div style={styles.tableWrapper}>
              <table style={styles.newsTable}>
                <thead>
                  <tr>
                    <th style={styles.th}>Gambar</th>
                    <th style={styles.th}>Judul</th>
                    <th style={styles.th}>Penulis</th>
                    <th style={styles.th}>Tanggal</th>
                    <th style={styles.th}>Status</th>
                    <th style={{ ...styles.th, textAlign: 'center' }}>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {news.map((item) => (
                    <tr key={item.id}>
                      <td style={styles.td}>
                        {item.hero_image ? (
                          <img
                            src={getImageUrl(item.hero_image)}
                            alt={item.title}
                            style={styles.newsImage}
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src =
                                'https://placehold.co/80x50/82D7DE/0F4C5C?text=News';
                            }}
                          />
                        ) : (
                          <div
                            style={{
                              ...styles.newsImage,
                              background: 'linear-gradient(135deg, #82D7DE, #5BC0C9)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              color: '#0F4C5C',
                              fontSize: '1.2rem',
                            }}
                          >
                            📰
                          </div>
                        )}
                      </td>
                      <td style={styles.td}>
                        <div style={styles.titleCol}>{item.title}</div>
                        {item.excerpt && (
                          <div style={styles.excerptCol}>{item.excerpt}</div>
                        )}
                      </td>
                      <td style={styles.td}>{item.author || '-'}</td>
                      <td style={styles.td}>
                        {new Date(item.date || item.created_at).toLocaleDateString('id-ID', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </td>
                      <td style={styles.td}>
                        <button
                          onClick={() => handleToggleStatus(item)}
                          style={{
                            ...styles.statusBadge,
                            ...(item.is_published ? styles.statusPublished : styles.statusDraft),
                            border: 'none',
                            cursor: 'pointer',
                          }}
                          title="Klik untuk mengubah status"
                        >
                          {item.is_published ? (
                            <>
                              <FaCheckCircle style={{ fontSize: '0.8rem' }} />
                              <span>Terbit</span>
                            </>
                          ) : (
                            <>
                              <FaTimesCircle style={{ fontSize: '0.8rem' }} />
                              <span>Draft</span>
                            </>
                          )}
                        </button>
                      </td>
                      <td style={{ ...styles.td, textAlign: 'center' }}>
                        <div style={styles.actionsWrapper}>
                          <button style={styles.editBtn} onClick={() => handleEdit(item)}>
                            <FaEdit />
                            Edit
                          </button>
                          <button style={styles.deleteBtn} onClick={() => handleDelete(item.id)}>
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

      {/* MODAL */}
      {showModal && (
        <div style={styles.modal} onClick={() => !saving && setShowModal(false)}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <h2 style={styles.modalTitle}>
                {editingNews ? 'Edit Berita' : 'Tambah Berita Baru'}
              </h2>
              <button
                style={styles.closeModalBtn}
                onClick={() => !saving && setShowModal(false)}
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              {/* JUDUL */}
              <div style={styles.formGroup}>
                <label style={styles.label}>
                  Judul Berita <span style={styles.labelRequired}>*</span>
                </label>
                <input
                  type="text"
                  style={styles.input}
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Masukkan judul berita..."
                  required
                  onFocus={(e) => (e.target.style.borderColor = '#82D7DE')}
                  onBlur={(e) => (e.target.style.borderColor = '#CBD5E1')}
                />
              </div>

              {/* HERO IMAGE */}
              <div style={styles.formGroup}>
                <label style={styles.label}>
                  Gambar Utama {editingNews ? '(Pilih jika ingin mengganti)' : ''}
                </label>
                <div style={styles.fileInputBox}>
                  <FaImage style={{ fontSize: '2rem', color: '#82D7DE', marginBottom: '8px' }} />
                  <div>
                    <input
                      type="file"
                      accept="image/png, image/jpeg, image/jpg, image/webp"
                      onChange={handleFileChange}
                      style={{ fontSize: '0.85rem' }}
                    />
                  </div>
                  <p style={{ fontSize: '0.75rem', color: '#64748B', marginTop: '6px', margin: 0 }}>
                    Rekomendasi rasio 16:9 atau lebar minimal 800px (JPG/PNG/WebP)
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
                        e.target.src = 'https://placehold.co/400x200/82D7DE/0F4C5C?text=Preview';
                      }}
                    />
                  </div>
                )}
              </div>

              {/* EXCERPT */}
              <div style={styles.formGroup}>
                <label style={styles.label}>Ringkasan (Excerpt)</label>
                <textarea
                  style={styles.textarea}
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  placeholder="Ringkasan singkat berita..."
                  rows={3}
                  onFocus={(e) => (e.target.style.borderColor = '#82D7DE')}
                  onBlur={(e) => (e.target.style.borderColor = '#CBD5E1')}
                />
              </div>

              {/* KONTEN */}
              <div style={styles.formGroup}>
                <label style={styles.label}>
                  Konten Lengkap <span style={styles.labelRequired}>*</span>
                </label>
                <textarea
                  style={{ ...styles.textarea, minHeight: '150px' }}
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder="Tulis konten berita lengkap di sini..."
                  rows={10}
                  required
                  onFocus={(e) => (e.target.style.borderColor = '#82D7DE')}
                  onBlur={(e) => (e.target.style.borderColor = '#CBD5E1')}
                />
              </div>

              {/* AUTHOR & LOCATION */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Penulis</label>
                  <input
                    type="text"
                    style={styles.input}
                    value={formData.author}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                    placeholder="Nama penulis"
                    onFocus={(e) => (e.target.style.borderColor = '#82D7DE')}
                    onBlur={(e) => (e.target.style.borderColor = '#CBD5E1')}
                  />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Lokasi</label>
                  <input
                    type="text"
                    style={styles.input}
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="Contoh: Jakarta, Indonesia"
                    onFocus={(e) => (e.target.style.borderColor = '#82D7DE')}
                    onBlur={(e) => (e.target.style.borderColor = '#CBD5E1')}
                  />
                </div>
              </div>

              {/* TAGS */}
              <div style={styles.formGroup}>
                <label style={styles.label}>Tags</label>
                <input
                  type="text"
                  style={styles.tagsInput}
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  placeholder="Contoh: pendidikan, prestasi, beasiswa"
                  onFocus={(e) => (e.target.style.borderColor = '#82D7DE')}
                  onBlur={(e) => (e.target.style.borderColor = '#CBD5E1')}
                />
                <div style={styles.hintText}>
                  Pisahkan setiap tag dengan koma (,)
                </div>
              </div>

              {/* PUBLISH */}
              <div style={styles.formGroup}>
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
                    checked={formData.is_published}
                    onChange={(e) =>
                      setFormData({ ...formData, is_published: e.target.checked })
                    }
                    style={{ width: '18px', height: '18px', accentColor: '#0F4C5C' }}
                  />
                  <span>Terbitkan sekarang</span>
                </label>
              </div>

              {/* FOOTER */}
              <div style={styles.modalFooter}>
                <button
                  type="button"
                  style={styles.cancelBtn}
                  onClick={() => setShowModal(false)}
                  disabled={saving || uploading}
                >
                  <FaTimes /> Batal
                </button>
                <button type="submit" style={styles.saveBtn} disabled={saving || uploading}>
                  {saving || uploading ? (
                    <>
                      <FaSync className="fa-spin" />
                      <span>Menyimpan...</span>
                    </>
                  ) : (
                    <>
                      <FaSave />
                      <span>{editingNews ? 'Simpan Perubahan' : 'Simpan'}</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminNews;