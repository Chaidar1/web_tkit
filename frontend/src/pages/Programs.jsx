import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { 
  FaGraduationCap, 
  FaStar, 
  FaArrowRight,
  FaBookOpen
} from 'react-icons/fa';

const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 20px',
  },
  section: {
    padding: '70px 0 80px 0',
    position: 'relative',
    background: 'linear-gradient(180deg, #f0fafb 0%, #ffffff 50%, #f0fafb 100%)',
    overflow: 'hidden',
  },
  // ==================== HEADER ====================
  headerWrapper: {
    textAlign: 'center',
    marginBottom: '60px',
    position: 'relative',
  },
  headerIcon: {
    fontSize: '3.5rem',
    marginBottom: '15px',
    display: 'inline-block',
  },
  sectionTitle: {
    textAlign: 'center',
    fontSize: '3rem',
    marginBottom: '15px',
    color: '#0F4C5C',
    fontWeight: '800',
    letterSpacing: '-1px',
    lineHeight: '1.2',
  },
  sectionDivider: {
    width: '100px',
    height: '5px',
    background: 'linear-gradient(90deg, #82D7DE, #5BC0C9)',
    margin: '0 auto 25px auto',
    borderRadius: '5px',
  },
  sectionSubtitle: {
    textAlign: 'center',
    color: '#64748B',
    marginBottom: '20px',
    fontSize: '1.15rem',
    fontWeight: '400',
    maxWidth: '700px',
    margin: '0 auto 20px',
    lineHeight: 1.8,
  },
  subtitleHighlight: {
    display: 'inline-block',
    background: 'linear-gradient(135deg, #82D7DE, #5BC0C9)',
    color: '#ffffff',
    padding: '6px 18px',
    borderRadius: '30px',
    fontSize: '0.85rem',
    fontWeight: '700',
    letterSpacing: '0.5px',
    marginTop: '10px',
    boxShadow: '0 4px 15px rgba(130, 215, 222, 0.3)',
  },
  // ==================== PROGRAMS GRID ====================
  programsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))',
    gap: '28px',
  },
  // ==================== CARD ====================
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
  // ==================== NO IMAGE ====================
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
  // ==================== EMPTY STATE ====================
  emptyState: {
    textAlign: 'center',
    padding: '70px 30px',
    color: '#64748B',
    background: '#F8FAFC',
    borderRadius: '24px',
    border: '2px dashed #CBD5E1',
    maxWidth: '600px',
    margin: '0 auto',
  },
  emptyStateIcon: {
    fontSize: '4rem',
    marginBottom: '20px',
  },
  emptyStateTitle: {
    color: '#0F4C5C',
    marginBottom: '10px',
    fontSize: '1.3rem',
    fontWeight: '800',
  },
  emptyStateText: {
    fontSize: '0.95rem',
    color: '#64748B',
    margin: 0,
    lineHeight: '1.7',
  },
  // ==================== LOADING ====================
  loadingWrapper: {
    textAlign: 'center',
    padding: '80px 20px',
  },
  loadingIcon: {
    fontSize: '3rem',
    color: '#82D7DE',
    marginBottom: '20px',
  },
  loadingText: {
    fontSize: '1.1rem',
    color: '#64748B',
  },
  // ==================== DECORATIVE ====================
  decorativeCircle1: {
    position: 'absolute',
    top: '5%',
    right: '-8%',
    width: '300px',
    height: '300px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(130, 215, 222, 0.1) 0%, transparent 70%)',
    pointerEvents: 'none',
  },
  decorativeCircle2: {
    position: 'absolute',
    bottom: '5%',
    left: '-8%',
    width: '350px',
    height: '350px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(130, 215, 222, 0.08) 0%, transparent 70%)',
    pointerEvents: 'none',
  },
  // ==================== RESPONSIVE ====================
  '@media (max-width: 768px)': {
    sectionTitle: { fontSize: '2rem' },
    section: { padding: '50px 0 60px 0' },
    programsGrid: { 
      gridTemplateColumns: '1fr',
      gap: '25px',
    },
    cardImageWrapper: { height: '190px' },
    cardBody: { padding: '22px 24px 26px' },
    cardTitle: { fontSize: '1.2rem' },
    sectionSubtitle: { fontSize: '1rem' },
    decorativeCircle1: { display: 'none' },
    decorativeCircle2: { display: 'none' },
  },
};

const Programs = () => {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        setLoading(true);
        const res = await axios.get('http://localhost:8000/programs/');
        console.log('Programs data:', res.data);
        setPrograms(res.data || []);
      } catch (error) {
        console.error('Error fetching programs:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPrograms();
  }, []);

  const getImageUrl = (url) => {
    if (!url) return '';
    if (url.startsWith('http')) return url;
    return `http://localhost:8000${url.startsWith('/') ? '' : '/'}${url}`;
  };

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

  return (
    <div style={styles.container}>
      <section style={styles.section}>
        {/* Dekorasi Background */}
        <div style={styles.decorativeCircle1}></div>
        <div style={styles.decorativeCircle2}></div>

        {/* Header */}
        <div style={styles.headerWrapper}>
          <div style={styles.headerIcon}>🎓</div>
          <h1 style={styles.sectionTitle}>Program & Kurikulum</h1>
          <div style={styles.sectionDivider}></div>
          <p style={styles.sectionSubtitle}>
            Menumbuhkan keceriaan belajar, karakter islami, kemandirian, dan kreativitas sejak usia dini
          </p>
          <div style={styles.subtitleHighlight}>
            ✨ TK IT AR RAHMAN AL IKHLAS ✨
          </div>
        </div>

        {loading ? (
          <div style={styles.loadingWrapper}>
            <div style={styles.loadingIcon}>📚</div>
            <div style={styles.loadingText}>Memuat program kegiatan...</div>
          </div>
        ) : programs.length === 0 ? (
          <div style={styles.emptyState}>
            <div style={styles.emptyStateIcon}>📚</div>
            <h3 style={styles.emptyStateTitle}>Belum Ada Program Ditambahkan</h3>
            <p style={styles.emptyStateText}>
              Silakan periksa kembali nanti atau kunjungi panel admin untuk menambahkan program dan kelas TK.
            </p>
          </div>
        ) : (
          <div style={styles.programsGrid}>
            {programs.map((program) => (
              <div 
                key={program.id} 
                style={styles.card}
                onMouseEnter={(e) => handleCardHover(e, true)}
                onMouseLeave={(e) => handleCardHover(e, false)}
              >
                <div style={styles.cardImageWrapper}>
                  {program.image_url ? (
                    <>
                      <img 
                        src={getImageUrl(program.image_url)} 
                        alt={program.title}
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
                          fallbackDiv.textContent = program.icon || program.title.charAt(0) || '📚';
                          parent.appendChild(fallbackDiv);
                        }}
                      />
                      <div style={styles.cardImageOverlay}></div>
                    </>
                  ) : (
                    <div style={styles.noImage}>
                      {program.icon || program.title.charAt(0) || '📚'}
                    </div>
                  )}
                  
                  {/* Badge Order */}
                  <div style={styles.cardBadge}>
                    <FaStar style={{ fontSize: '0.65rem' }} />
                    #{program.order || 0}
                  </div>
                </div>

                <div style={styles.cardBody}>
                  <div style={styles.cardTitleWrapper}>
                    <FaGraduationCap style={styles.cardTitleIcon} />
                    <h3 style={styles.cardTitle}>{program.title}</h3>
                  </div>
                  <div style={styles.cardDivider}></div>
                  <p style={styles.cardDescription}>{program.description}</p>
                  
                  <div style={styles.cardFooter}>
                    <Link 
                      to={`/programs/${program.id}`} 
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
        )}
      </section>
    </div>
  );
};

export default Programs;