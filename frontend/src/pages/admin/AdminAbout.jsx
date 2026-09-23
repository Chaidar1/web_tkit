import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminAboutAPI, authAPI } from '../../services/adminApi';
import AdminSidebar from '../../components/AdminSidebar';

import {
  FaSave,
  FaSignOutAlt,
  FaUserCircle,
  FaInfoCircle,
  FaBullseye,
  FaChartBar,
  FaSync,
  FaQuoteLeft,
} from 'react-icons/fa';

const DEFAULT_FORM = {
  title: 'Tentang TK IT AR RAHMAN AL IKHLAS',
  content: '',
  vision: '',
  mission: '',
  message_title: 'Mari Kita Membangun Negeri',
  message_content: 'Mari kita mulai dari diri sendiri untuk bisa berkontribusi dalam membangun Indonesia menjadi lebih baik dan juga membuat lingkungan yang nyaman dan bahagia untuk anak dan cucu kita di kemudian hari.',
  stat1_label: 'Tahun Berdiri',
  stat1_value: '2020',
  stat2_label: 'Siswa Aktif',
  stat2_value: '200+',
  stat3_label: 'Program Unggulan',
  stat3_value: '15+',
  stat4_label: 'Tenaga Pengajar',
  stat4_value: '30+',
};

const AdminAbout = () => {
  const navigate = useNavigate();

  const [about, setAbout] = useState(null);

  const [formData, setFormData] = useState({
    ...DEFAULT_FORM,
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined'
      ? window.innerWidth <= 768
      : false
  );

  const [isSmallMobile, setIsSmallMobile] = useState(
    typeof window !== 'undefined'
      ? window.innerWidth <= 520
      : false
  );

  const username =
    typeof window !== 'undefined'
      ? localStorage.getItem('admin_username') || 'Admin TK'
      : 'Admin TK';

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      setIsSmallMobile(window.innerWidth <= 520);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('admin_token');

    if (!token) {
      navigate('/admin/login');
      return;
    }

    fetchAbout();
  }, [navigate]);

  const mapAboutToForm = (data) => {
    return {
      title: data?.title || DEFAULT_FORM.title,
      content: data?.content || '',
      vision: data?.vision || '',
      mission: data?.mission || '',
      message_title: data?.message_title || DEFAULT_FORM.message_title,
      message_content: data?.message_content || DEFAULT_FORM.message_content,
      stat1_label: data?.stat1_label || DEFAULT_FORM.stat1_label,
      stat1_value: data?.stat1_value || DEFAULT_FORM.stat1_value,
      stat2_label: data?.stat2_label || DEFAULT_FORM.stat2_label,
      stat2_value: data?.stat2_value || DEFAULT_FORM.stat2_value,
      stat3_label: data?.stat3_label || DEFAULT_FORM.stat3_label,
      stat3_value: data?.stat3_value || DEFAULT_FORM.stat3_value,
      stat4_label: data?.stat4_label || DEFAULT_FORM.stat4_label,
      stat4_value: data?.stat4_value || DEFAULT_FORM.stat4_value,
    };
  };

  const fetchAbout = async () => {
    try {
      setLoading(true);
      setError('');

      const response = await adminAboutAPI.getAbout();
      const data = response?.data;

      if (!data) {
        setAbout(null);
        setFormData({
          ...DEFAULT_FORM,
        });
        return;
      }

      setAbout(data);
      setFormData(mapAboutToForm(data));
    } catch (err) {
      console.error('Error fetching about:', err);

      const status = err?.response?.status;

      if (status === 401) {
        authAPI.logout();
        navigate('/admin/login');
        return;
      }

      if (status === 403) {
        setError(
          'Anda tidak memiliki izin untuk mengakses halaman ini.'
        );
        return;
      }

      setError(
        err?.response?.data?.detail ||
          'Gagal memuat data Tentang Kami.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setError('');
    setSuccess('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (saving) {
      return;
    }

    setError('');
    setSuccess('');

    const title = formData.title.trim();
    const content = formData.content.trim();

    if (!title) {
      setError('Judul halaman harus diisi.');
      return;
    }

    if (!content) {
      setError('Konten utama / sejarah harus diisi.');
      return;
    }

    const payload = {
      ...formData,
      title,
      content,
    };

    try {
      setSaving(true);

      const isUpdate =
        about !== null &&
        about !== undefined &&
        about.id !== undefined &&
        about.id !== null;

      let response;

      if (isUpdate) {
        response = await adminAboutAPI.updateAbout(
          about.id,
          payload
        );
      } else {
        response = await adminAboutAPI.createAbout(
          payload
        );
      }

      const data = response?.data;

      if (!data) {
        throw new Error(
          'Server tidak mengembalikan data setelah penyimpanan.'
        );
      }

      setAbout(data);
      setFormData(mapAboutToForm(data));

      if (isUpdate) {
        setSuccess(
          'Data Tentang Kami berhasil diperbarui.'
        );
      } else {
        setSuccess(
          'Data Tentang Kami berhasil disimpan.'
        );
      }

      setTimeout(() => {
        setSuccess('');
      }, 4000);
    } catch (err) {
      console.error('Error saving about:', err);

      const status = err?.response?.status;

      if (status === 401) {
        authAPI.logout();

        setError(
          'Sesi login telah berakhir. Silakan login kembali.'
        );

        setTimeout(() => {
          navigate('/admin/login');
        }, 1500);

        return;
      }

      if (status === 403) {
        setError(
          'Anda tidak memiliki izin untuk menyimpan data ini.'
        );
        return;
      }

      if (status === 404) {
        setError(
          'Data Tentang Kami tidak ditemukan.'
        );
        return;
      }

      if (status === 422) {
        const detail = err?.response?.data?.detail;

        if (Array.isArray(detail)) {
          const messages = detail
            .map((item) => item?.msg)
            .filter(Boolean);

          setError(
            messages.length > 0
              ? messages.join(', ')
              : 'Data yang dikirim tidak sesuai format.'
          );
        } else {
          setError(
            detail ||
              'Data yang dikirim tidak sesuai format.'
          );
        }

        return;
      }

      setError(
        err?.response?.data?.detail ||
          err?.message ||
          'Gagal menyimpan data Tentang Kami.'
      );
    } finally {
      setSaving(false);
    }
  };

  const handleReset = () => {
    if (about) {
      setFormData(mapAboutToForm(about));
    } else {
      setFormData({
        ...DEFAULT_FORM,
      });
    }

    setError('');
    setSuccess('');
  };

  const handleLogout = () => {
    const confirmed = window.confirm(
      'Apakah Anda ingin keluar dari panel admin?'
    );

    if (!confirmed) {
      return;
    }

    authAPI.logout();
    navigate('/admin/login');
  };

  const mainContentStyle = {
    ...styles.mainContent,
    marginLeft: isMobile ? 0 : 270,
    padding: isSmallMobile
      ? 12
      : isMobile
      ? 16
      : '24px 30px',
  };

  const headerStyle = {
    ...styles.header,
    flexDirection: isMobile ? 'column' : 'row',
    alignItems: isMobile
      ? 'flex-start'
      : 'center',
    gap: isMobile ? 16 : 0,
  };

  const userSectionStyle = {
    ...styles.userSection,
    width: isMobile ? '100%' : 'auto',
    justifyContent: isMobile
      ? 'space-between'
      : 'flex-start',
  };

  const columnsStyle = {
    ...styles.twoColumn,
    gridTemplateColumns: isMobile
      ? '1fr'
      : '1fr 1fr',
  };

  const statsStyle = {
    ...styles.statsGrid,
    gridTemplateColumns: isSmallMobile
      ? '1fr'
      : isMobile
      ? '1fr'
      : 'repeat(4, minmax(0, 1fr))',
  };

  const actionStyle = {
    ...styles.actionBar,
    flexDirection: isMobile
      ? 'column-reverse'
      : 'row',
  };

  const actionButtonStyle = {
    ...styles.actionButton,
    width: isMobile ? '100%' : 'auto',
  };

  if (loading) {
    return (
      <div style={styles.container}>
        <AdminSidebar />

        <main
          style={{
            ...styles.mainContent,
            marginLeft: isMobile ? 0 : 270,
            padding: isSmallMobile
              ? 12
              : isMobile
              ? 16
              : '24px 30px',
          }}
        >
          <div style={styles.loadingState}>
            <FaSync
              style={{
                ...styles.loadingIcon,
                opacity: 0.7,
              }}
            />

            <div>
              Memuat data halaman Tentang Kami...
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <AdminSidebar />

      <main style={mainContentStyle}>
        {/* HEADER */}
        <div style={headerStyle}>
          <div style={styles.headerLeft}>
            <h1 style={styles.headerTitle}>
              Edit Halaman Tentang Kami
            </h1>

            <p style={styles.headerSubtitle}>
              Kelola konten sejarah, visi-misi, statistik, dan pesan motivasi
              TK IT AR RAHMAN AL IKHLAS
            </p>
          </div>

          <div style={userSectionStyle}>
            <div style={styles.userInfo}>
              <FaUserCircle style={styles.userIcon} />

              <span>{username}</span>
            </div>

            <button
              type="button"
              onClick={handleLogout}
              style={styles.logoutBtn}
              title="Keluar dari Admin"
            >
              <FaSignOutAlt />

              <span>Keluar</span>
            </button>
          </div>
        </div>

        {/* STATUS */}
        <div style={styles.dataStatus}>
          <span
            style={{
              ...styles.statusDot,
              backgroundColor: about
                ? '#22C55E'
                : '#F59E0B',
            }}
          />

          <span>
            {about
              ? 'Data Tentang Kami tersedia'
              : 'Data Tentang Kami belum dibuat'}
          </span>
        </div>

        {/* SUCCESS MESSAGE */}
        {success ? (
          <div style={styles.successMsg}>
            <FaSave />

            <div style={styles.messageContent}>
              <strong>Berhasil</strong>

              <span>{success}</span>
            </div>
          </div>
        ) : null}

        {/* ERROR MESSAGE */}
        {error ? (
          <div style={styles.errorMsg}>
            <FaInfoCircle />

            <div style={styles.messageContent}>
              <strong>Terjadi Kesalahan</strong>

              <span>{error}</span>
            </div>
          </div>
        ) : null}

        <form onSubmit={handleSubmit}>
          {/* INFORMASI DASAR */}
          <div style={styles.card}>
            <div style={styles.cardHeader}>
              <FaInfoCircle
                style={{
                  ...styles.cardHeaderIcon,
                  color: '#2563EB',
                }}
              />

              <div>
                <h2 style={styles.cardHeaderTitle}>
                  Informasi Dasar
                </h2>

                <p style={styles.cardHeaderSub}>
                  Konten utama halaman Tentang Kami
                </p>
              </div>
            </div>

            <div style={styles.cardBody}>
              <div style={styles.formGroup}>
                <label style={styles.label}>
                  Judul Halaman
                  <span style={styles.labelRequired}>
                    *
                  </span>
                </label>

                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Masukkan judul halaman Tentang Kami"
                  required
                  style={styles.input}
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>
                  Konten Utama (Sejarah)
                  <span style={styles.labelRequired}>
                    *
                  </span>
                </label>

                <textarea
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  placeholder="Masukkan sejarah atau deskripsi TK IT AR RAHMAN AL IKHLAS..."
                  rows={7}
                  required
                  style={styles.textarea}
                />

                <div style={styles.hintText}>
                  Tuliskan sejarah singkat, latar belakang,
                  atau deskripsi sekolah.
                </div>
              </div>
            </div>
          </div>

          {/* VISI MISI */}
          <div style={styles.card}>
            <div style={styles.cardHeader}>
              <FaBullseye
                style={{
                  ...styles.cardHeaderIcon,
                  color: '#7C3AED',
                }}
              />

              <div>
                <h2 style={styles.cardHeaderTitle}>
                  Visi & Misi
                </h2>

                <p style={styles.cardHeaderSub}>
                  Arah dan tujuan pendidikan sekolah
                </p>
              </div>
            </div>

            <div style={styles.cardBody}>
              <div style={columnsStyle}>
                {/* VISI */}
                <div style={styles.formGroup}>
                  <label style={styles.label}>
                    Visi
                  </label>

                  <textarea
                    name="vision"
                    value={formData.vision}
                    onChange={handleChange}
                    placeholder="Masukkan visi TK IT AR RAHMAN AL IKHLAS..."
                    rows={7}
                    style={styles.textarea}
                  />

                  <div style={styles.hintText}>
                    Visi utama yang menjadi arah dan
                    tujuan sekolah.
                  </div>
                </div>

                {/* MISI */}
                <div style={styles.formGroup}>
                  <label style={styles.label}>
                    Misi
                  </label>

                  <textarea
                    name="mission"
                    value={formData.mission}
                    onChange={handleChange}
                    placeholder="Masukkan misi TK IT AR RAHMAN AL IKHLAS..."
                    rows={7}
                    style={styles.textarea}
                  />

                  <div style={styles.hintText}>
                    Pisahkan setiap misi menggunakan
                    baris baru.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* PESAN MOTIVASI (MARI KITA MEMBANGUN NEGERI) */}
          <div style={styles.card}>
            <div style={styles.cardHeader}>
              <FaQuoteLeft
                style={{
                  ...styles.cardHeaderIcon,
                  color: '#F59E0B',
                }}
              />

              <div>
                <h2 style={styles.cardHeaderTitle}>
                  Pesan Motivasi
                </h2>

                <p style={styles.cardHeaderSub}>
                  Pesan "Mari Kita Membangun Negeri" yang ditampilkan di halaman Tentang Kami
                </p>
              </div>
            </div>

            <div style={styles.cardBody}>
              <div style={styles.formGroup}>
                <label style={styles.label}>
                  Judul Pesan
                </label>

                <input
                  type="text"
                  name="message_title"
                  value={formData.message_title}
                  onChange={handleChange}
                  placeholder="Contoh: Mari Kita Membangun Negeri"
                  style={styles.input}
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>
                  Isi Pesan
                </label>

                <textarea
                  name="message_content"
                  value={formData.message_content}
                  onChange={handleChange}
                  placeholder="Masukkan pesan motivasi..."
                  rows={5}
                  style={styles.textarea}
                />

                <div style={styles.hintText}>
                  Pesan ini akan ditampilkan dalam kotak khusus di halaman Tentang Kami.
                </div>
              </div>
            </div>
          </div>

          {/* STATISTIK */}
          <div style={styles.card}>
            <div style={styles.cardHeader}>
              <FaChartBar
                style={{
                  ...styles.cardHeaderIcon,
                  color: '#16A34A',
                }}
              />

              <div>
                <h2 style={styles.cardHeaderTitle}>
                  Statistik TK
                </h2>

                <p style={styles.cardHeaderSub}>
                  Statistik yang ditampilkan pada halaman
                  Tentang Kami
                </p>
              </div>
            </div>

            <div style={styles.cardBody}>
              <div
                style={{
                  ...styles.hintText,
                  marginBottom: 16,
                }}
              >
                Edit label dan nilai statistik sesuai
                kebutuhan.
              </div>

              <div style={statsStyle}>
                <StatCard
                  number="01"
                  title="Statistik 1"
                  labelName="stat1_label"
                  valueName="stat1_value"
                  labelValue={formData.stat1_label}
                  valueValue={formData.stat1_value}
                  labelPlaceholder="Contoh: Tahun Berdiri"
                  valuePlaceholder="Contoh: 2020"
                  onChange={handleChange}
                />

                <StatCard
                  number="02"
                  title="Statistik 2"
                  labelName="stat2_label"
                  valueName="stat2_value"
                  labelValue={formData.stat2_label}
                  valueValue={formData.stat2_value}
                  labelPlaceholder="Contoh: Siswa Aktif"
                  valuePlaceholder="Contoh: 200+"
                  onChange={handleChange}
                />

                <StatCard
                  number="03"
                  title="Statistik 3"
                  labelName="stat3_label"
                  valueName="stat3_value"
                  labelValue={formData.stat3_label}
                  valueValue={formData.stat3_value}
                  labelPlaceholder="Contoh: Program Unggulan"
                  valuePlaceholder="Contoh: 15+"
                  onChange={handleChange}
                />

                <StatCard
                  number="04"
                  title="Statistik 4"
                  labelName="stat4_label"
                  valueName="stat4_value"
                  labelValue={formData.stat4_label}
                  valueValue={formData.stat4_value}
                  labelPlaceholder="Contoh: Tenaga Pengajar"
                  valuePlaceholder="Contoh: 30+"
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          {/* ACTION BUTTON */}
          <div style={actionStyle}>
            <button
              type="button"
              onClick={handleReset}
              disabled={saving}
              style={{
                ...styles.cancelBtn,
                ...actionButtonStyle,
                ...(saving
                  ? styles.disabledButton
                  : {}),
              }}
            >
              <FaSync />

              <span>Reset</span>
            </button>

            <button
              type="submit"
              disabled={saving}
              style={{
                ...styles.saveBtn,
                ...actionButtonStyle,
                ...(saving
                  ? styles.disabledButton
                  : {}),
              }}
            >
              {saving ? (
                <>
                  <FaSync />

                  <span>Menyimpan...</span>
                </>
              ) : (
                <>
                  <FaSave />

                  <span>
                    {about?.id
                      ? 'Simpan Perubahan'
                      : 'Simpan Data'}
                  </span>
                </>
              )}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

const StatCard = ({
  number,
  title,
  labelName,
  valueName,
  labelValue,
  valueValue,
  labelPlaceholder,
  valuePlaceholder,
  onChange,
}) => {
  return (
    <div style={styles.statCard}>
      <div style={styles.statNumber}>
        {number}
      </div>

      <h3 style={styles.statTitle}>
        {title}
      </h3>

      <div style={styles.statFormGroup}>
        <label style={styles.statLabel}>
          Label
        </label>

        <input
          type="text"
          name={labelName}
          value={labelValue}
          onChange={onChange}
          placeholder={labelPlaceholder}
          style={styles.statInput}
        />
      </div>

      <div style={styles.statFormGroup}>
        <label style={styles.statLabel}>
          Nilai
        </label>

        <input
          type="text"
          name={valueName}
          value={valueValue}
          onChange={onChange}
          placeholder={valuePlaceholder}
          style={styles.statInput}
        />
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#F1F5F9',
    display: 'flex',
    position: 'relative',
  },

  mainContent: {
    flex: 1,
    minHeight: '100vh',
    boxSizing: 'border-box',
  },

  header: {
    backgroundColor: '#FFFFFF',
    padding: '18px 28px',
    borderRadius: 16,
    marginBottom: 16,
    display: 'flex',
    justifyContent: 'space-between',
    boxShadow:
      '0 4px 20px -4px rgba(15, 76, 92, 0.08)',
    border: '1px solid #E2E8F0',
    boxSizing: 'border-box',
  },

  headerLeft: {
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
    minWidth: 0,
  },

  headerTitle: {
    fontSize: '1.45rem',
    fontWeight: 700,
    color: '#0F4C5C',
    margin: 0,
    lineHeight: 1.3,
  },

  headerSubtitle: {
    fontSize: '0.82rem',
    color: '#64748B',
    margin: 0,
    lineHeight: 1.5,
  },

  userSection: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    boxSizing: 'border-box',
  },

  userInfo: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#F8FAFC',
    padding: '8px 14px',
    borderRadius: 10,
    border: '1px solid #E2E8F0',
    fontSize: '0.88rem',
    color: '#334155',
    fontWeight: 600,
    boxSizing: 'border-box',
  },

  userIcon: {
    color: '#0F4C5C',
    fontSize: '1.2rem',
  },

  logoutBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: '#FEE2E2',
    color: '#DC2626',
    border: '1px solid #FECACA',
    padding: '9px 16px',
    borderRadius: 10,
    cursor: 'pointer',
    fontWeight: 600,
    fontSize: '0.84rem',
  },

  dataStatus: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#FFFFFF',
    border: '1px solid #E2E8F0',
    padding: '8px 14px',
    borderRadius: 10,
    marginBottom: 18,
    fontSize: '0.8rem',
    color: '#64748B',
    fontWeight: 600,
    boxSizing: 'border-box',
  },

  statusDot: {
    width: 8,
    height: 8,
    borderRadius: '50%',
    display: 'inline-block',
    flexShrink: 0,
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 22,
    boxShadow:
      '0 4px 20px -4px rgba(15, 76, 92, 0.08)',
    border: '1px solid #E2E8F0',
    overflow: 'hidden',
  },

  cardHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    padding: '21px 28px',
    borderBottom: '1px solid #EDF0F4',
    boxSizing: 'border-box',
  },

  cardHeaderIcon: {
    fontSize: '1.45rem',
    flexShrink: 0,
  },

  cardHeaderTitle: {
    fontSize: '1.08rem',
    fontWeight: 700,
    color: '#0F4C5C',
    margin: 0,
  },

  cardHeaderSub: {
    fontSize: '0.78rem',
    color: '#94A3B8',
    margin: '4px 0 0',
    lineHeight: 1.4,
  },

  cardBody: {
    padding: '26px 28px',
    boxSizing: 'border-box',
  },

  formGroup: {
    marginBottom: 20,
    minWidth: 0,
  },

  label: {
    display: 'block',
    marginBottom: 7,
    fontWeight: 600,
    color: '#334155',
    fontSize: '0.86rem',
  },

  labelRequired: {
    color: '#DC2626',
    marginLeft: 3,
  },

  input: {
    width: '100%',
    height: 44,
    padding: '10px 14px',
    border: '1.5px solid #CBD5E1',
    borderRadius: 10,
    fontSize: '0.9rem',
    boxSizing: 'border-box',
    outline: 'none',
    backgroundColor: '#FFFFFF',
    color: '#1E293B',
  },

  textarea: {
    width: '100%',
    padding: '11px 14px',
    border: '1.5px solid #CBD5E1',
    borderRadius: 10,
    fontSize: '0.9rem',
    minHeight: 110,
    boxSizing: 'border-box',
    outline: 'none',
    fontFamily: 'inherit',
    lineHeight: 1.6,
    backgroundColor: '#FFFFFF',
    color: '#1E293B',
    resize: 'vertical',
  },

  hintText: {
    fontSize: '0.76rem',
    color: '#94A3B8',
    marginTop: 5,
    fontStyle: 'italic',
    lineHeight: 1.5,
  },

  twoColumn: {
    display: 'grid',
    gap: 24,
  },

  statsGrid: {
    display: 'grid',
    gap: 16,
  },

  statCard: {
    border: '1px solid #E2E8F0',
    borderRadius: 12,
    padding: 18,
    backgroundColor: '#F8FAFC',
    minWidth: 0,
    boxSizing: 'border-box',
  },

  statNumber: {
    color: '#94A3B8',
    fontSize: '0.7rem',
    fontWeight: 700,
    letterSpacing: 1,
    marginBottom: 6,
  },

  statTitle: {
    margin: '0 0 18px',
    color: '#1E293B',
    fontSize: '0.95rem',
    fontWeight: 700,
  },

  statFormGroup: {
    marginBottom: 14,
  },

  statLabel: {
    display: 'block',
    fontSize: '0.75rem',
    fontWeight: 600,
    color: '#64748B',
    marginBottom: 6,
  },

  statInput: {
    width: '100%',
    height: 40,
    padding: '8px 11px',
    border: '1.5px solid #CBD5E1',
    borderRadius: 8,
    fontSize: '0.82rem',
    boxSizing: 'border-box',
    outline: 'none',
    backgroundColor: '#FFFFFF',
    color: '#1E293B',
  },

  successMsg: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#DCFCE7',
    color: '#15803D',
    padding: '13px 18px',
    borderRadius: 10,
    marginBottom: 16,
    border: '1px solid #BBF7D0',
    fontSize: '0.86rem',
    boxSizing: 'border-box',
  },

  errorMsg: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#FEE2E2',
    color: '#B91C1C',
    padding: '13px 18px',
    borderRadius: 10,
    marginBottom: 16,
    border: '1px solid #FECACA',
    fontSize: '0.86rem',
    boxSizing: 'border-box',
  },

  messageContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
    minWidth: 0,
  },

  actionBar: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: 12,
    marginBottom: 35,
  },

  actionButton: {
    boxSizing: 'border-box',
  },

  saveBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    background:
      'linear-gradient(135deg, #0F4C5C 0%, #177184 100%)',
    color: '#FFFFFF',
    border: 'none',
    minHeight: 44,
    padding: '0 24px',
    borderRadius: 10,
    cursor: 'pointer',
    fontWeight: 600,
    fontSize: '0.88rem',
    boxShadow:
      '0 4px 12px rgba(15, 76, 92, 0.25)',
  },

  cancelBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 7,
    backgroundColor: '#FFFFFF',
    color: '#475569',
    border: '1px solid #CBD5E1',
    minHeight: 44,
    padding: '0 20px',
    borderRadius: 10,
    cursor: 'pointer',
    fontWeight: 600,
    fontSize: '0.88rem',
  },

  disabledButton: {
    opacity: 0.6,
    cursor: 'not-allowed',
  },

  loadingState: {
    minHeight: '80vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    color: '#0F4C5C',
    fontSize: '0.9rem',
  },

  loadingIcon: {
    fontSize: '2rem',
    color: '#82D7DE',
  },
};

export default AdminAbout;