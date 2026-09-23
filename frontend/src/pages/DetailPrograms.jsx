import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { programsAPI } from '../services/api';
import { 
  FaArrowLeft,
  FaSchool,
  FaUsers,
  FaBook,
  FaGraduationCap,
  FaClock,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaGlobe,
  FaCalendarAlt,
  FaUserTie,
  FaShareAlt,
  FaExternalLinkAlt,
  FaBuilding,
  FaChalkboardTeacher,
  FaFacebook,
  FaInstagram,
  FaWhatsapp,
  FaLinkedin,
  FaStar
} from 'react-icons/fa';

const fontFamily = {
  primary: "'Segoe UI', 'Poppins', system-ui, -apple-system, sans-serif",
  heading: "'Poppins', 'Segoe UI', system-ui, sans-serif",
};

const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 20px',
    fontFamily: fontFamily.primary,
  },
  heroSection: {
    position: 'relative',
    width: '100%',
    minHeight: '500px',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    display: 'flex',
    alignItems: 'flex-end',
    marginBottom: '50px',
    borderRadius: '0 0 20px 20px',
    overflow: 'hidden',
  },
  heroOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.8) 100%)',
  },
  heroContent: {
    position: 'relative',
    zIndex: 2,
    padding: '50px 40px 40px',
    color: '#ffffff',
    maxWidth: '800px',
  },
  heroCategory: {
    display: 'inline-block',
    background: '#82D7DE',
    color: '#0F4C5C',
    padding: '6px 16px',
    borderRadius: '30px',
    fontSize: '0.7rem',
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '1px',
    marginBottom: '20px',
    fontFamily: fontFamily.primary,
  },
  heroTitle: {
    fontSize: '2.8rem',
    fontWeight: '700',
    marginBottom: '20px',
    lineHeight: '1.3',
    textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
    fontFamily: fontFamily.heading,
  },
  heroWebsite: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '20px',
    padding: '6px 16px',
    background: 'rgba(255,255,255,0.15)',
    borderRadius: '30px',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255,255,255,0.1)',
    transition: 'all 0.3s ease',
  },
  heroWebsiteLink: {
    color: '#ffffff',
    textDecoration: 'none',
    fontSize: '0.85rem',
    fontWeight: 500,
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontFamily: fontFamily.primary,
  },
  heroMeta: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '20px',
    fontSize: '0.85rem',
    opacity: 0.9,
    fontFamily: fontFamily.primary,
  },
  heroMetaItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  contentWrapper: {
    display: 'grid',
    gridTemplateColumns: '1fr 320px',
    gap: '50px',
    marginBottom: '60px',
  },
  mainContent: {
    background: '#ffffff',
    borderRadius: '20px',
    padding: '40px',
    boxShadow: '0 4px 30px rgba(0,0,0,0.05)',
    border: '1px solid rgba(0,0,0,0.03)',
  },
  sectionTitle: {
    fontSize: '1.25rem',
    fontWeight: '700',
    color: '#0F4C5C',
    marginBottom: '8px',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    fontFamily: fontFamily.heading,
  },
  sectionDivider: {
    width: '50px',
    height: '3px',
    background: '#82D7DE',
    marginBottom: '20px',
    borderRadius: '2px',
  },
  description: {
    fontSize: '1.05rem',
    lineHeight: '1.9',
    color: '#444',
    marginBottom: '25px',
    fontFamily: fontFamily.primary,
  },
  infoGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '16px',
    marginTop: '20px',
  },
  infoItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
    padding: '14px 18px',
    background: '#f8faf8',
    borderRadius: '12px',
    border: '1px solid #f0f2f0',
    transition: 'all 0.3s ease',
  },
  infoIconWrapper: {
    width: '42px',
    height: '42px',
    background: 'linear-gradient(135deg, #82D7DE, #5BC0C9)',
    borderRadius: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#0F4C5C',
    fontSize: '1rem',
    flexShrink: 0,
  },
  infoContent: {
    flex: 1,
  },
  infoLabel: {
    fontSize: '0.7rem',
    color: '#999',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    fontWeight: 600,
    fontFamily: fontFamily.primary,
  },
  infoValue: {
    fontSize: '0.95rem',
    color: '#333',
    fontWeight: 500,
    fontFamily: fontFamily.primary,
  },
  contactSection: {
    marginTop: '30px',
    padding: '20px 0',
    borderTop: '1px solid #f0f2f0',
  },
  contactItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
    padding: '8px 0',
  },
  contactIconWrapper: {
    width: '36px',
    height: '36px',
    background: 'rgba(130, 215, 222, 0.15)',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#82D7DE',
    fontSize: '0.9rem',
    flexShrink: 0,
  },
  contactLabel: {
    fontSize: '0.75rem',
    color: '#888',
    fontWeight: 500,
    width: '60px',
    flexShrink: 0,
    fontFamily: fontFamily.primary,
  },
  contactValue: {
    fontSize: '0.95rem',
    color: '#333',
    fontWeight: 400,
    fontFamily: fontFamily.primary,
  },
  sidebar: {
    position: 'sticky',
    top: '100px',
    alignSelf: 'start',
  },
  sidebarCard: {
    background: '#ffffff',
    borderRadius: '20px',
    padding: '25px',
    marginBottom: '30px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
    border: '1px solid #f0f0f0',
  },
  sidebarTitle: {
    fontSize: '1.1rem',
    fontWeight: '700',
    color: '#0F4C5C',
    marginBottom: '20px',
    paddingBottom: '12px',
    borderBottom: '2px solid #82D7DE',
    display: 'inline-block',
    fontFamily: fontFamily.heading,
  },
  sidebarInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '12px 0',
    borderBottom: '1px solid #f5f5f5',
  },
  sidebarIcon: {
    color: '#82D7DE',
    fontSize: '1rem',
    width: '24px',
    flexShrink: 0,
  },
  sidebarLabel: {
    fontSize: '0.8rem',
    color: '#888',
    flex: 1,
    fontFamily: fontFamily.primary,
  },
  sidebarValue: {
    fontSize: '0.85rem',
    color: '#333',
    fontWeight: 500,
    fontFamily: fontFamily.primary,
  },
  sidebarLast: {
    borderBottom: 'none',
  },
  navButtons: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '40px',
    paddingTop: '30px',
    borderTop: '1px solid #eee',
  },
  navButton: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '10px',
    background: 'linear-gradient(135deg, #0F4C5C, #82D7DE)',
    padding: '12px 28px',
    borderRadius: '40px',
    color: '#fff',
    textDecoration: 'none',
    transition: 'all 0.3s',
    fontWeight: 500,
    fontSize: '0.9rem',
    fontFamily: fontFamily.primary,
  },
  shareSection: {
    marginTop: '30px',
    paddingTop: '20px',
    borderTop: '1px solid #eee',
  },
  shareTitle: {
    fontSize: '0.85rem',
    fontWeight: 600,
    marginBottom: '12px',
    color: '#555',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontFamily: fontFamily.primary,
  },
  shareButtons: {
    display: 'flex',
    gap: '12px',
  },
  shareButton: {
    width: '38px',
    height: '38px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
    textDecoration: 'none',
    transition: 'all 0.3s',
    border: 'none',
    cursor: 'pointer',
    fontSize: '1rem',
  },
  relatedSection: {
    marginTop: '60px',
    paddingTop: '40px',
    borderTop: '1px solid #eee',
  },
  relatedTitle: {
    fontSize: '1.8rem',
    fontWeight: '700',
    marginBottom: '35px',
    color: '#0F4C5C',
    textAlign: 'center',
    fontFamily: fontFamily.heading,
  },
  relatedGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
    gap: '35px',
  },
  // ==================== CARD (sama seperti Programs.jsx) ====================
  card: {
    background: '#ffffff',
    borderRadius: '24px',
    boxShadow: '0 10px 40px rgba(130, 215, 222, 0.12), 0 2px 8px rgba(0,0,0,0.04)',
    overflow: 'hidden',
    transition: 'all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1)',
    border: '2px solid rgba(130, 215, 222, 0.15)',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
  },
  cardImageWrapper: {
    width: '100%',
    height: '230px',
    overflow: 'hidden',
    background: 'linear-gradient(135deg, #F0FAFB, #E0F5F7)',
    position: 'relative',
    flexShrink: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '15px',
  },
  cardImageOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'linear-gradient(to bottom, rgba(0,0,0,0) 60%, rgba(15,76,92,0.15) 100%)',
    zIndex: 1,
    pointerEvents: 'none',
  },
  cardImage: {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
    objectPosition: 'center',
    transition: 'transform 0.6s cubic-bezier(0.165, 0.84, 0.44, 1)',
    display: 'block',
    padding: '5px',
  },
  cardBadge: {
    position: 'absolute',
    top: '15px',
    right: '15px',
    background: 'linear-gradient(135deg, #82D7DE, #5BC0C9)',
    color: '#ffffff',
    padding: '6px 14px',
    borderRadius: '20px',
    fontSize: '0.72rem',
    fontWeight: '700',
    letterSpacing: '0.5px',
    zIndex: 3,
    boxShadow: '0 4px 12px rgba(130, 215, 222, 0.4)',
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
  },
  cardBody: {
    padding: '30px 32px 32px',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
  },
  cardTitleWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '14px',
  },
  cardTitleIcon: {
    fontSize: '1.1rem',
    color: '#82D7DE',
  },
  cardTitle: {
    color: '#0F4C5C',
    fontSize: '1.4rem',
    fontWeight: '800',
    margin: 0,
    letterSpacing: '-0.3px',
    lineHeight: '1.3',
    fontFamily: fontFamily.heading,
  },
  cardDivider: {
    width: '40px',
    height: '3px',
    background: 'linear-gradient(90deg, #82D7DE, #5BC0C9)',
    marginBottom: '16px',
    borderRadius: '3px',
  },
  cardDescription: {
    fontSize: '0.95rem',
    lineHeight: '1.8',
    color: '#64748B',
    flex: 1,
    marginBottom: '20px',
    display: '-webkit-box',
    WebkitLineClamp: 3,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    fontFamily: fontFamily.primary,
  },
  cardFooter: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: '18px',
    borderTop: '2px solid #F1F5F9',
  },
  cardLink: {
    color: '#0F4C5C',
    textDecoration: 'none',
    fontSize: '0.92rem',
    fontWeight: '700',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    transition: 'all 0.3s ease',
    fontFamily: fontFamily.primary,
  },
  cardLinkArrow: {
    transition: 'transform 0.3s ease',
    color: '#82D7DE',
    fontWeight: '700',
    fontSize: '1.1rem',
    display: 'inline-flex',
    alignItems: 'center',
  },
  cardOrder: {
    fontSize: '0.72rem',
    color: '#82D7DE',
    fontWeight: '700',
    background: '#E0F5F7',
    padding: '4px 12px',
    borderRadius: '20px',
    letterSpacing: '0.5px',
  },
  noImage: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #82D7DE 0%, #5BC0C9 100%)',
    color: '#ffffff',
    fontSize: '4rem',
    fontWeight: '700',
    borderRadius: '16px',
  },
  loading: {
    textAlign: 'center',
    padding: '80px 20px',
    fontSize: '1.1rem',
    color: '#888',
    fontFamily: fontFamily.primary,
  },
  error: {
    textAlign: 'center',
    padding: '80px 20px',
    fontSize: '1rem',
    color: '#dc3545',
    fontFamily: fontFamily.primary,
  },
  backButton: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    background: 'none',
    border: 'none',
    color: '#0F4C5C',
    fontSize: '0.9rem',
    cursor: 'pointer',
    marginBottom: '25px',
    padding: '8px 0',
    transition: 'gap 0.3s',
    fontFamily: fontFamily.primary,
  },
  '@media (max-width: 968px)': {
    contentWrapper: {
      gridTemplateColumns: '1fr',
    },
    sidebar: {
      position: 'static',
    },
    relatedGrid: {
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    },
    heroTitle: {
      fontSize: '2rem',
    },
    mainContent: {
      padding: '25px',
    },
    infoGrid: {
      gridTemplateColumns: '1fr',
    },
  },
  '@media (max-width: 768px)': {
    relatedGrid: {
      gridTemplateColumns: '1fr',
    },
    heroContent: {
      padding: '30px 20px',
    },
    heroTitle: {
      fontSize: '1.6rem',
    },
    heroWebsite: {
      fontSize: '0.7rem',
      padding: '4px 12px',
    },
    cardImageWrapper: { height: '190px' },
    cardBody: { padding: '22px 24px 26px' },
    cardTitle: { fontSize: '1.2rem' },
  },
};

const DetailPrograms = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [program, setProgram] = useState(null);
  const [relatedPrograms, setRelatedPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getImageUrl = (url) => {
    if (!url) return null;
    if (url.startsWith('http')) return url;
    return `http://localhost:8000${url}`;
  };

  useEffect(() => {
    const fetchProgramDetail = async () => {
      try {
        setLoading(true);
        const res = await programsAPI.getPrograms();
        const foundProgram = res.data.find(item => item.id === parseInt(id));
        
        if (foundProgram) {
          setProgram(foundProgram);
          const otherPrograms = res.data.filter(item => item.id !== parseInt(id)).slice(0, 3);
          setRelatedPrograms(otherPrograms);
        } else {
          setError('Program tidak ditemukan');
        }
        setError(null);
      } catch (error) {
        console.error('Error fetching program detail:', error);
        setError('Program tidak ditemukan');
      } finally {
        setLoading(false);
      }
    };
    
    if (id) {
      fetchProgramDetail();
    }
  }, [id]);

  const handleShare = (platform) => {
    const url = window.location.href;
    const title = program?.title || 'TK IT AR RAHMAN AL IKHLAS';
    
    const shareUrls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      instagram: `https://www.instagram.com/`,
      whatsapp: `https://wa.me/?text=${encodeURIComponent(title + ' ' + url)}`,
      linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`,
    };
    
    window.open(shareUrls[platform], '_blank', 'width=600,height=400');
  };

  // ==================== HANDLER HOVER CARD (sama seperti Programs.jsx) ====================
  const handleCardHover = (e, isHovering) => {
    if (isHovering) {
      e.currentTarget.style.transform = 'translateY(-10px) scale(1.02)';
      e.currentTarget.style.boxShadow = '0 25px 60px rgba(130, 215, 222, 0.3), 0 10px 25px rgba(0,0,0,0.08)';
      e.currentTarget.style.borderColor = 'rgba(130, 215, 222, 0.5)';
    } else {
      e.currentTarget.style.transform = 'translateY(0) scale(1)';
      e.currentTarget.style.boxShadow = '0 10px 40px rgba(130, 215, 222, 0.12), 0 2px 8px rgba(0,0,0,0.04)';
      e.currentTarget.style.borderColor = 'rgba(130, 215, 222, 0.15)';
    }
  };

  const handleImageHover = (e, isHovering) => {
    if (isHovering) {
      e.currentTarget.style.transform = 'scale(1.1) rotate(2deg)';
    } else {
      e.currentTarget.style.transform = 'scale(1) rotate(0deg)';
    }
  };

  const handleLinkHover = (e, isHovering) => {
    const arrow = e.currentTarget.querySelector('span');
    if (isHovering) {
      e.currentTarget.style.color = '#5BC0C9';
      if (arrow) {
        arrow.style.transform = 'translateX(6px)';
        arrow.style.color = '#0F4C5C';
      }
    } else {
      e.currentTarget.style.color = '#0F4C5C';
      if (arrow) {
        arrow.style.transform = 'translateX(0)';
        arrow.style.color = '#82D7DE';
      }
    }
  };

  if (loading) {
    return (
      <div style={styles.loading}>
        <FaSchool style={{ fontSize: '2rem', marginBottom: '15px', color: '#82D7DE' }} />
        <div>Memuat detail program...</div>
      </div>
    );
  }

  if (error || !program) {
    return (
      <div style={styles.error}>
        <p>❌ {error || 'Program tidak ditemukan'}</p>
        <button onClick={() => navigate('/programs')} style={styles.backButton}>
          <FaArrowLeft /> Kembali ke program
        </button>
      </div>
    );
  }

  const hasWebsite = program.website && program.website.trim() !== '';

  const infoItems = [
    { label: 'Kepala Sekolah', value: program.kepala_sekolah, icon: <FaUserTie />, default: '-' },
    { label: 'Tahun Berdiri', value: program.tahun_berdiri, icon: <FaCalendarAlt />, default: '-' },
    { label: 'Jumlah Siswa', value: program.jumlah_siswa, icon: <FaUsers />, default: '-' },
    { label: 'Jumlah Guru', value: program.jumlah_guru, icon: <FaChalkboardTeacher />, default: '-' },
    { label: 'Jam Belajar', value: program.jam_belajar, icon: <FaClock />, default: '-' },
    { label: 'Akreditasi', value: program.akreditasi, icon: <FaGraduationCap />, default: '-' },
  ];

  const contactItems = [
    { label: 'Alamat', value: program.alamat, icon: <FaMapMarkerAlt /> },
    { label: 'Telepon', value: program.telepon, icon: <FaPhone /> },
    { label: 'Email', value: program.email, icon: <FaEnvelope /> },
  ];

  return (
    <div style={styles.container}>
      <button 
        onClick={() => navigate('/programs')} 
        style={styles.backButton}
        onMouseEnter={(e) => e.currentTarget.style.gap = '12px'}
        onMouseLeave={(e) => e.currentTarget.style.gap = '8px'}
      >
        <FaArrowLeft /> Kembali ke semua program
      </button>

      <div 
        style={{
          ...styles.heroSection,
          backgroundImage: program.image_url ? `url(${getImageUrl(program.image_url)})` : 'linear-gradient(135deg, #0F4C5C, #82D7DE)',
        }}
      >
        <div style={styles.heroOverlay}></div>
        <div style={styles.heroContent}>
          <div style={styles.heroCategory}>
            {program.icon || '📚'} Program
          </div>
          <h1 style={styles.heroTitle}>{program.title}</h1>
          
          {hasWebsite && (
            <div style={styles.heroWebsite}>
              <FaGlobe style={{ fontSize: '0.9rem' }} />
              <a 
                href={program.website.startsWith('http') ? program.website : `https://${program.website}`}
                target="_blank" 
                rel="noopener noreferrer"
                style={styles.heroWebsiteLink}
                onMouseEnter={(e) => e.currentTarget.style.textDecoration = 'underline'}
                onMouseLeave={(e) => e.currentTarget.style.textDecoration = 'none'}
              >
                {program.website.replace(/^https?:\/\//, '')}
                <FaExternalLinkAlt style={{ fontSize: '0.6rem', opacity: 0.7 }} />
              </a>
            </div>
          )}
          
          <div style={styles.heroMeta}>
            <span style={styles.heroMetaItem}><FaSchool /> Program Unggulan</span>
            <span style={styles.heroMetaItem}><FaGraduationCap /> Akreditasi {program.akreditasi || '-'}</span>
            <span style={styles.heroMetaItem}><FaUsers /> {program.jumlah_siswa || '-'}</span>
          </div>
        </div>
      </div>

      <div style={styles.contentWrapper}>
        <div style={styles.mainContent}>
          <div>
            <div style={styles.sectionTitle}>
              <FaBook style={{ color: '#82D7DE' }} /> Tentang Program
            </div>
            <div style={styles.sectionDivider}></div>
            <p style={styles.description}>{program.description}</p>
          </div>

          <div style={{ marginTop: '30px' }}>
            <div style={styles.sectionTitle}>
              <FaBuilding style={{ color: '#82D7DE' }} /> Informasi Lengkap
            </div>
            <div style={styles.sectionDivider}></div>
            <div style={styles.infoGrid}>
              {infoItems.map((item, index) => (
                <div key={index} style={styles.infoItem}>
                  <div style={styles.infoIconWrapper}>
                    {item.icon}
                  </div>
                  <div style={styles.infoContent}>
                    <div style={styles.infoLabel}>{item.label}</div>
                    <div style={styles.infoValue}>{item.value || item.default}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={styles.contactSection}>
            <div style={styles.sectionTitle}>
              <FaMapMarkerAlt style={{ color: '#82D7DE' }} /> Alamat & Kontak
            </div>
            <div style={styles.sectionDivider}></div>
            {contactItems.map((item, index) => (
              item.value && (
                <div key={index} style={styles.contactItem}>
                  <div style={styles.contactIconWrapper}>
                    {item.icon}
                  </div>
                  <span style={styles.contactLabel}>{item.label}</span>
                  <span style={styles.contactValue}>{item.value}</span>
                </div>
              )
            ))}
          </div>

          <div style={styles.shareSection}>
            <div style={styles.shareTitle}>
              <FaShareAlt /> Bagikan program ini:
            </div>
            <div style={styles.shareButtons}>
              <button
                onClick={() => handleShare('facebook')}
                style={{...styles.shareButton, background: '#1877F2'}}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
              >
                <FaFacebook />
              </button>
              <button
                onClick={() => handleShare('instagram')}
                style={{...styles.shareButton, background: 'radial-gradient(circle at 30% 110%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%)'}}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
              >
                <FaInstagram />
              </button>
              <button
                onClick={() => handleShare('whatsapp')}
                style={{...styles.shareButton, background: '#25D366'}}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
              >
                <FaWhatsapp />
              </button>
              <button
                onClick={() => handleShare('linkedin')}
                style={{...styles.shareButton, background: '#0077B5'}}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
              >
                <FaLinkedin />
              </button>
            </div>
          </div>

          <div style={styles.navButtons}>
            <Link to="/programs" style={styles.navButton}>
              <FaArrowLeft /> Lihat Semua Program
            </Link>
          </div>
        </div>

        <div style={styles.sidebar}>
          <div style={styles.sidebarCard}>
            <h3 style={styles.sidebarTitle}>Info Program</h3>
            <div style={styles.sidebarInfo}>
              <FaSchool style={styles.sidebarIcon} />
              <span style={styles.sidebarLabel}>Jenis</span>
              <span style={styles.sidebarValue}>{program.icon || '📚'}</span>
            </div>
            <div style={styles.sidebarInfo}>
              <FaCalendarAlt style={styles.sidebarIcon} />
              <span style={styles.sidebarLabel}>Berdiri</span>
              <span style={styles.sidebarValue}>{program.tahun_berdiri || '-'}</span>
            </div>
            <div style={styles.sidebarInfo}>
              <FaGraduationCap style={styles.sidebarIcon} />
              <span style={styles.sidebarLabel}>Akreditasi</span>
              <span style={styles.sidebarValue}>{program.akreditasi || '-'}</span>
            </div>
            <div style={styles.sidebarInfo}>
              <FaUsers style={styles.sidebarIcon} />
              <span style={styles.sidebarLabel}>Siswa</span>
              <span style={styles.sidebarValue}>{program.jumlah_siswa || '-'}</span>
            </div>
            <div style={{ ...styles.sidebarInfo, ...styles.sidebarLast }}>
              <FaChalkboardTeacher style={styles.sidebarIcon} />
              <span style={styles.sidebarLabel}>Guru</span>
              <span style={styles.sidebarValue}>{program.jumlah_guru || '-'}</span>
            </div>
          </div>

          <div style={styles.sidebarCard}>
            <h3 style={styles.sidebarTitle}>
              <FaClock style={{ marginRight: '6px', color: '#82D7DE' }} /> Jam Belajar
            </h3>
            
            {program.hari_operasional && (
              <div style={styles.sidebarInfo}>
                <FaClock style={styles.sidebarIcon} />
                <span style={styles.sidebarLabel}>{program.hari_operasional}</span>
                <span style={styles.sidebarValue}>{program.jam_belajar || '-'}</span>
              </div>
            )}
            
            {program.hari_operasional_sabtu ? (
              <div style={styles.sidebarInfo}>
                <FaClock style={styles.sidebarIcon} />
                <span style={styles.sidebarLabel}>{program.hari_operasional_sabtu}</span>
                <span style={styles.sidebarValue}>{program.jam_belajar || '-'}</span>
              </div>
            ) : (
              <div style={{ ...styles.sidebarInfo, ...styles.sidebarLast }}>
                <FaClock style={styles.sidebarIcon} />
                <span style={styles.sidebarLabel}>Sabtu</span>
                <span style={{ ...styles.sidebarValue, color: '#999', fontStyle: 'italic' }}>
                  Libur
                </span>
              </div>
            )}
            
            {program.hari_libur && (
              <div style={{ ...styles.sidebarInfo, ...styles.sidebarLast }}>
                <FaClock style={styles.sidebarIcon} />
                <span style={styles.sidebarLabel}>Libur</span>
                <span style={styles.sidebarValue}>{program.hari_libur}</span>
              </div>
            )}
          </div>

          <div style={styles.sidebarCard}>
            <h3 style={styles.sidebarTitle}>
              <FaMapMarkerAlt style={{ marginRight: '6px', color: '#82D7DE' }} /> Kontak
            </h3>
            {program.alamat && (
              <div style={styles.sidebarInfo}>
                <FaMapMarkerAlt style={styles.sidebarIcon} />
                <span style={styles.sidebarLabel}>Alamat</span>
                <span style={{ ...styles.sidebarValue, fontSize: '0.8rem' }}>
                  {program.alamat}
                </span>
              </div>
            )}
            {program.telepon && (
              <div style={styles.sidebarInfo}>
                <FaPhone style={styles.sidebarIcon} />
                <span style={styles.sidebarLabel}>Telp</span>
                <span style={styles.sidebarValue}>{program.telepon}</span>
              </div>
            )}
            {program.email && (
              <div style={{ ...styles.sidebarInfo, ...styles.sidebarLast }}>
                <FaEnvelope style={styles.sidebarIcon} />
                <span style={styles.sidebarLabel}>Email</span>
                <span style={{ ...styles.sidebarValue, fontSize: '0.8rem' }}>
                  {program.email}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {relatedPrograms.length > 0 && (
        <div style={styles.relatedSection}>
          <h2 style={styles.relatedTitle}>Program Lainnya</h2>
          <div style={styles.relatedGrid}>
            {relatedPrograms.map((item) => (
              <div 
                key={item.id} 
                style={styles.card}
                onMouseEnter={(e) => handleCardHover(e, true)}
                onMouseLeave={(e) => handleCardHover(e, false)}
              >
                <div style={styles.cardImageWrapper}>
                  {item.image_url ? (
                    <>
                      <img 
                        src={getImageUrl(item.image_url)} 
                        alt={item.title}
                        style={styles.cardImage}
                        onMouseEnter={(e) => handleImageHover(e, true)}
                        onMouseLeave={(e) => handleImageHover(e, false)}
                        onError={(e) => {
                          e.target.style.display = 'none';
                          const parent = e.target.parentElement;
                          const fallbackDiv = document.createElement('div');
                          fallbackDiv.style.cssText = `
                            width: 100%;
                            height: 100%;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            background: linear-gradient(135deg, #82D7DE, #5BC0C9);
                            color: #ffffff;
                            font-size: 3.5rem;
                            font-weight: 700;
                            border-radius: 16px;
                          `;
                          fallbackDiv.textContent = item.icon || item.title.charAt(0) || '📚';
                          parent.appendChild(fallbackDiv);
                        }}
                      />
                      <div style={styles.cardImageOverlay}></div>
                    </>
                  ) : (
                    <div style={styles.noImage}>
                      {item.icon || item.title.charAt(0) || '📚'}
                    </div>
                  )}
                  
                  {/* Badge Order */}
                  <div style={styles.cardBadge}>
                    <FaStar style={{ fontSize: '0.65rem' }} />
                    #{item.order || 0}
                  </div>
                </div>

                <div style={styles.cardBody}>
                  <div style={styles.cardTitleWrapper}>
                    <FaGraduationCap style={styles.cardTitleIcon} />
                    <h3 style={styles.cardTitle}>{item.title}</h3>
                  </div>
                  <div style={styles.cardDivider}></div>
                  <p style={styles.cardDescription}>{item.description}</p>
                  
                  <div style={styles.cardFooter}>
                    <Link 
                      to={`/programs/${item.id}`} 
                      style={styles.cardLink}
                      onMouseEnter={(e) => handleLinkHover(e, true)}
                      onMouseLeave={(e) => handleLinkHover(e, false)}
                    >
                      Lihat Selengkapnya
                      <span style={styles.cardLinkArrow}>→</span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailPrograms;