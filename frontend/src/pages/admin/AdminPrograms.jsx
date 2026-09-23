import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminProgramsAPI, uploadAPI, authAPI } from '../../services/adminApi';
import AdminSidebar from '../../components/AdminSidebar';
import { 
  FaPlus, 
  FaEdit, 
  FaTrash, 
  FaSignOutAlt, 
  FaUserCircle, 
  FaGraduationCap, 
  FaCheckCircle, 
  FaTimesCircle,
  FaImage,
  FaSync,
  FaTimes
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
  programTable: {
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
  tableImage: {
    width: '54px',
    height: '54px',
    objectFit: 'contain',
    borderRadius: '8px',
    border: '1px solid #E2E8F0',
    background: '#F8FAFC',
    padding: '2px',
    display: 'block',
  },
  iconBox: {
    width: '54px',
    height: '54px',
    borderRadius: '8px',
    background: 'linear-gradient(135deg, #0F4C5C 0%, #15697A 100%)',
    color: '#ffffff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.6rem',
    fontWeight: '700',
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
    maxWidth: '740px',
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
    minHeight: '90px',
    boxSizing: 'border-box',
    outline: 'none',
    fontFamily: 'inherit',
    transition: 'border-color 0.2s ease',
  },
  formGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '16px',
  },
  sectionHeading: {
    fontSize: '1rem',
    fontWeight: '700',
    color: '#0F4C5C',
    marginTop: '24px',
    marginBottom: '16px',
    paddingBottom: '8px',
    borderBottom: '2px solid rgba(130, 215, 222, 0.4)',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  imagePreviewWrapper: {
    position: 'relative',
    display: 'inline-block',
    marginTop: '10px',
  },
  imagePreview: {
    width: '130px',
    height: '130px',
    objectFit: 'contain',
    borderRadius: '10px',
    border: '2px solid #E2E8F0',
    background: '#F8FAFC',
    padding: '6px',
    display: 'block',
  },
  removeImageBtn: {
    position: 'absolute',
    top: '-8px',
    right: '-8px',
    background: '#EF4444',
    color: '#ffffff',
    border: 'none',
    borderRadius: '50%',
    width: '24px',
    height: '24px',
    cursor: 'pointer',
    fontSize: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
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
};

const AdminPrograms = () => {
  const [programs, setPrograms] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingProgram, setEditingProgram] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    icon: '📚',
    image_url: '',
    order: 0,
    is_active: true,
    kepala_sekolah: '',
    akreditasi: '',
    jumlah_siswa: '',
    jumlah_guru: '',
    tahun_berdiri: '',
    jam_belajar: '',
    hari_operasional: '',
    hari_operasional_sabtu: '',
    hari_libur: '',
    alamat: '',
    telepon: '',
    email: '',
    website: '',
  });
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const username = localStorage.getItem('admin_username') || 'Admin TK';

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (!token) {
      navigate('/admin/login');
      return;
    }
    fetchPrograms();
  }, [navigate]);

  const fetchPrograms = async () => {
    try {
      setLoading(true);
      const res = await adminProgramsAPI.getPrograms();
      setPrograms(res.data || []);
    } catch (error) {
      console.error('Error fetching programs:', error);
      if (error.response?.status === 401) {
        authAPI.logout();
        navigate('/admin/login');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    setUploading(true);
    try {
      const res = await uploadAPI.uploadImage(file);
      setFormData({ ...formData, image_url: res.data.url });
    } catch (error) {
      console.error('Upload error:', error);
      alert('Gagal mengunggah gambar program.');
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveImage = () => {
    setFormData({ ...formData, image_url: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editingProgram) {
        await adminProgramsAPI.updateProgram(editingProgram.id, formData);
      } else {
        await adminProgramsAPI.createProgram(formData);
      }
      setShowModal(false);
      resetForm();
      fetchPrograms();
    } catch (error) {
      console.error('Save error:', error);
      alert('Gagal menyimpan data program.');
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (program) => {
    setEditingProgram(program);
    setFormData({
      title: program.title || '',
      description: program.description || '',
      icon: program.icon || '📚',
      image_url: program.image_url || '',
      order: program.order || 0,
      is_active: program.is_active !== undefined ? program.is_active : true,
      kepala_sekolah: program.kepala_sekolah || '',
      akreditasi: program.akreditasi || '',
      jumlah_siswa: program.jumlah_siswa || '',
      jumlah_guru: program.jumlah_guru || '',
      tahun_berdiri: program.tahun_berdiri || '',
      jam_belajar: program.jam_belajar || '',
      hari_operasional: program.hari_operasional || '',
      hari_operasional_sabtu: program.hari_operasional_sabtu || '',
      hari_libur: program.hari_libur || '',
      alamat: program.alamat || '',
      telepon: program.telepon || '',
      email: program.email || '',
      website: program.website || '',
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus program ini?')) {
      try {
        await adminProgramsAPI.deleteProgram(id);
        fetchPrograms();
      } catch (error) {
        console.error('Delete error:', error);
        alert('Gagal menghapus program.');
      }
    }
  };

  const handleToggleStatus = async (program) => {
    try {
      await adminProgramsAPI.updateProgram(program.id, {
        ...program,
        is_active: !program.is_active
      });
      fetchPrograms();
    } catch (error) {
      console.error('Toggle status error:', error);
      alert('Gagal mengubah status program.');
    }
  };

  const resetForm = () => {
    setEditingProgram(null);
    setFormData({
      title: '',
      description: '',
      icon: '📚',
      image_url: '',
      order: 0,
      is_active: true,
      kepala_sekolah: '',
      akreditasi: '',
      jumlah_siswa: '',
      jumlah_guru: '',
      tahun_berdiri: '',
      jam_belajar: '',
      hari_operasional: '',
      hari_operasional_sabtu: '',
      hari_libur: '',
      alamat: '',
      telepon: '',
      email: '',
      website: '',
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
    if (url.startsWith('http')) return url;
    return `http://localhost:8000${url.startsWith('/') ? '' : '/'}${url}`;
  };

  return (
    <div style={styles.container}>
      <AdminSidebar />
      <div style={styles.mainContent}>
        <div style={styles.header}>
          <div style={styles.headerLeft}>
            <h1 style={styles.headerTitle}>Kelola Program & Kelas TK</h1>
            <p style={styles.headerSubtitle}>Atur program unggulan, kelas belajar, dan info operasional TK IT Ar Rahman Al Ikhlas</p>
          </div>

          <div style={styles.userSection}>
            <div style={styles.userInfo}>
              <FaUserCircle style={{ color: '#0F4C5C', fontSize: '1.2rem' }} />
              <span>{username}</span>
            </div>
            <button onClick={handleLogout} style={styles.logoutBtn} title="Keluar">
              <FaSignOutAlt /> Keluar
            </button>
          </div>
        </div>

        <div style={styles.card}>
          <div style={styles.cardTopBar}>
            <div style={styles.statsCounter}>
              Total Program: <strong>{programs.length}</strong> program terdaftar
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button style={styles.refreshBtn} onClick={fetchPrograms} title="Segarkan Data">
                <FaSync /> Muat Ulang
              </button>
              <button style={styles.addBtn} onClick={() => { resetForm(); setShowModal(true); }}>
                <FaPlus /> Tambah Program Baru
              </button>
            </div>
          </div>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '50px', color: '#64748B' }}>
              Memuat data program...
            </div>
          ) : programs.length === 0 ? (
            <div style={styles.emptyState}>
              <FaGraduationCap style={{ fontSize: '3rem', color: '#CBD5E1', marginBottom: '12px' }} />
              <p style={{ fontWeight: '600', fontSize: '1rem', color: '#334155' }}>
                Belum ada program yang ditambahkan
              </p>
              <p style={{ fontSize: '0.85rem', color: '#94A3B8', marginBottom: '16px' }}>
                Klik tombol "Tambah Program Baru" untuk menambahkan program pembelajaran atau kelas TK.
              </p>
              <button style={styles.addBtn} onClick={() => { resetForm(); setShowModal(true); }}>
                <FaPlus /> Tambah Program Sekarang
              </button>
            </div>
          ) : (
            <div style={styles.tableWrapper}>
              <table style={styles.programTable}>
                <thead>
                  <tr>
                    <th style={styles.th}>Gambar / Icon</th>
                    <th style={styles.th}>Judul Program</th>
                    <th style={styles.th}>Deskripsi</th>
                    <th style={styles.th}>Jam & Hari Belajar</th>
                    <th style={styles.th}>Urutan</th>
                    <th style={styles.th}>Status</th>
                    <th style={{ ...styles.th, textAlign: 'center' }}>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {programs.map((program) => (
                    <tr key={program.id}>
                      <td style={styles.td}>
                        {program.image_url ? (
                          <img 
                            src={getImageUrl(program.image_url)} 
                            alt={program.title}
                            style={styles.tableImage}
                            onError={(e) => { 
                              e.target.onerror = null;
                              e.target.src = 'https://placehold.co/54x54/0F4C5C/ffffff?text=TK'; 
                            }}
                          />
                        ) : (
                          <div style={styles.iconBox}>{program.icon || '📚'}</div>
                        )}
                      </td>
                      <td style={styles.td}>
                        <strong style={{ color: '#0F4C5C' }}>{program.title}</strong>
                        {program.akreditasi && (
                          <div style={{ fontSize: '0.75rem', color: '#64748B', marginTop: '2px' }}>
                            Akreditasi: {program.akreditasi}
                          </div>
                        )}
                      </td>
                      <td style={styles.td}>
                        <div style={{ maxWidth: '240px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', color: '#64748B' }}>
                          {program.description || '-'}
                        </div>
                      </td>
                      <td style={styles.td}>
                        <div style={{ fontSize: '0.8rem', color: '#334155' }}>
                          {program.jam_belajar || '-'}
                        </div>
                        {program.hari_operasional && (
                          <div style={{ fontSize: '0.75rem', color: '#94A3B8' }}>
                            {program.hari_operasional}
                          </div>
                        )}
                      </td>
                      <td style={styles.td}>
                        <span style={styles.orderBadge}>{program.order ?? 0}</span>
                      </td>
                      <td style={styles.td}>
                        <button 
                          onClick={() => handleToggleStatus(program)}
                          style={{
                            ...styles.statusBadge,
                            ...(program.is_active ? styles.statusActive : styles.statusInactive),
                          }}
                          title="Klik untuk mengubah status"
                        >
                          {program.is_active ? (
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
                          <button style={styles.editBtn} onClick={() => handleEdit(program)}>
                            <FaEdit /> Edit
                          </button>
                          <button style={styles.deleteBtn} onClick={() => handleDelete(program.id)}>
                            <FaTrash /> Hapus
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
      </div>

      {showModal && (
        <div style={styles.modal} onClick={() => !saving && setShowModal(false)}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <h2 style={styles.modalTitle}>
                {editingProgram ? 'Edit Program & Kelas' : 'Tambah Program & Kelas Baru'}
              </h2>
              <button 
                style={styles.closeModalBtn} 
                onClick={() => !saving && setShowModal(false)}
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div style={styles.formGrid}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Judul Program *</label>
                  <input
                    type="text"
                    style={styles.input}
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    placeholder="Contoh: Kelas TK B (Usia 5-6 Tahun)"
                    required
                  />
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>Icon Fallback (Emoji)</label>
                  <input
                    type="text"
                    style={styles.input}
                    value={formData.icon}
                    onChange={(e) => setFormData({...formData, icon: e.target.value})}
                    placeholder="Contoh: 📚, 🎓, ⭐, 🎨"
                  />
                  <small style={{ color: '#94A3B8', fontSize: '0.75rem' }}>Digunakan jika tidak ada gambar</small>
                </div>
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Deskripsi Program *</label>
                <textarea
                  style={styles.textarea}
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="Deskripsi kegiatan, metode pengajaran, dan capaian belajar anak..."
                  required
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Gambar Program (Rekomendasi format PNG/JPG/WebP)</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleUpload}
                  style={styles.input}
                />
                {uploading && <p style={{ color: '#0F4C5C', fontSize: '0.85rem' }}>Mengunggah gambar...</p>}
                {formData.image_url && (
                  <div style={styles.imagePreviewWrapper}>
                    <img 
                      src={getImageUrl(formData.image_url)} 
                      alt="Pratinjau" 
                      style={styles.imagePreview}
                      onError={(e) => { e.target.src = 'https://placehold.co/130x130/0F4C5C/ffffff?text=Preview'; }}
                    />
                    <button 
                      type="button" 
                      style={styles.removeImageBtn}
                      onClick={handleRemoveImage}
                      title="Hapus gambar"
                    >
                      <FaTimes />
                    </button>
                  </div>
                )}
              </div>

              <div style={styles.sectionHeading}>
                📋 Detail Tambahan & Informasi Sekolah TK
              </div>

              <div style={styles.formGrid}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Kepala Sekolah</label>
                  <input
                    type="text"
                    style={styles.input}
                    value={formData.kepala_sekolah}
                    onChange={(e) => setFormData({...formData, kepala_sekolah: e.target.value})}
                    placeholder="Contoh: Siti Rahmah, S.Pd.I"
                  />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Akreditasi</label>
                  <input
                    type="text"
                    style={styles.input}
                    value={formData.akreditasi}
                    onChange={(e) => setFormData({...formData, akreditasi: e.target.value})}
                    placeholder="Contoh: A (Unggul)"
                  />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Jumlah Siswa</label>
                  <input
                    type="text"
                    style={styles.input}
                    value={formData.jumlah_siswa}
                    onChange={(e) => setFormData({...formData, jumlah_siswa: e.target.value})}
                    placeholder="Contoh: 85 Siswa"
                  />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Jumlah Guru</label>
                  <input
                    type="text"
                    style={styles.input}
                    value={formData.jumlah_guru}
                    onChange={(e) => setFormData({...formData, jumlah_guru: e.target.value})}
                    placeholder="Contoh: 10 Guru & Staf"
                  />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Tahun Berdiri</label>
                  <input
                    type="text"
                    style={styles.input}
                    value={formData.tahun_berdiri}
                    onChange={(e) => setFormData({...formData, tahun_berdiri: e.target.value})}
                    placeholder="Contoh: 2018"
                  />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Jam Belajar</label>
                  <input
                    type="text"
                    style={styles.input}
                    value={formData.jam_belajar}
                    onChange={(e) => setFormData({...formData, jam_belajar: e.target.value})}
                    placeholder="Contoh: 07.30 - 11.30 WIB"
                  />
                </div>
              </div>

              <div style={styles.formGrid}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Hari Operasional (Senin - Jumat)</label>
                  <input
                    type="text"
                    style={styles.input}
                    value={formData.hari_operasional}
                    onChange={(e) => setFormData({...formData, hari_operasional: e.target.value})}
                    placeholder="Contoh: Senin - Jumat"
                  />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Hari Operasional (Sabtu)</label>
                  <input
                    type="text"
                    style={styles.input}
                    value={formData.hari_operasional_sabtu}
                    onChange={(e) => setFormData({...formData, hari_operasional_sabtu: e.target.value})}
                    placeholder="Contoh: Sabtu (Ekskul) atau Kosongkan"
                  />
                </div>
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Hari Libur</label>
                <input
                  type="text"
                  style={styles.input}
                  value={formData.hari_libur}
                  onChange={(e) => setFormData({...formData, hari_libur: e.target.value})}
                  placeholder="Contoh: Ahad & Hari Libur Nasional"
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Alamat Sekolah</label>
                <textarea
                  style={{ ...styles.textarea, minHeight: '60px' }}
                  value={formData.alamat}
                  onChange={(e) => setFormData({...formData, alamat: e.target.value})}
                  placeholder="Alamat lengkap lokasi TK IT..."
                />
              </div>

              <div style={styles.formGrid}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Nomor Telepon / WhatsApp</label>
                  <input
                    type="text"
                    style={styles.input}
                    value={formData.telepon}
                    onChange={(e) => setFormData({...formData, telepon: e.target.value})}
                    placeholder="Contoh: 0812-3456-7890"
                  />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Email Sekolah</label>
                  <input
                    type="email"
                    style={styles.input}
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="Contoh: info@tkit-arrahman.sch.id"
                  />
                </div>
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Website Sekolah</label>
                <input
                  type="url"
                  style={styles.input}
                  value={formData.website}
                  onChange={(e) => setFormData({...formData, website: e.target.value})}
                  placeholder="Contoh: https://tkit-arrahman.sch.id"
                />
              </div>

              <div style={styles.formGrid}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Urutan Tampil (Order)</label>
                  <input
                    type="number"
                    min="0"
                    style={styles.input}
                    value={formData.order}
                    onChange={(e) => setFormData({...formData, order: parseInt(e.target.value) || 0})}
                  />
                </div>

                <div style={{ ...styles.formGroup, marginTop: '26px' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontWeight: '600', color: '#334155' }}>
                    <input
                      type="checkbox"
                      checked={formData.is_active}
                      onChange={(e) => setFormData({...formData, is_active: e.target.checked})}
                      style={{ width: '18px', height: '18px', accentColor: '#0F4C5C' }}
                    />
                    <span>Aktifkan program di website</span>
                  </label>
                </div>
              </div>

              <div style={styles.modalFooter}>
                <button 
                  type="button" 
                  style={styles.cancelBtn} 
                  onClick={() => setShowModal(false)}
                  disabled={saving}
                >
                  Batal
                </button>
                <button 
                  type="submit" 
                  style={styles.saveBtn} 
                  disabled={saving}
                >
                  {saving ? 'Menyimpan...' : (editingProgram ? 'Simpan Perubahan' : 'Tambah Program')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPrograms;
