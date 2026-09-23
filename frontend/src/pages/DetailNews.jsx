import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { newsAPI } from '../services/api';
import { 
  FaCalendarAlt, 
  FaUser, 
  FaMapMarkerAlt, 
  FaEye, 
  FaFacebook, 
  FaInstagram,
  FaWhatsapp, 
  FaLinkedin,
  FaArrowLeft,
  FaTag,
  FaClock,
  FaNewspaper,
  FaShareAlt
} from 'react-icons/fa';

const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 20px',
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
  },
  heroTitle: {
    fontSize: '2.8rem',
    fontWeight: 'bold',
    marginBottom: '20px',
    lineHeight: '1.3',
    textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
  },
  heroMeta: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '20px',
    fontSize: '0.85rem',
    opacity: 0.9,
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
    border: '1px solid rgba(130, 215, 222, 0.25)',
  },
  excerpt: {
    fontSize: '1.2rem',
    color: '#0F4C5C',
    lineHeight: '1.7',
    marginBottom: '30px',
    padding: '20px 25px',
    background: '#f0fafb',
    borderRadius: '12px',
    borderLeft: '4px solid #82D7DE',
    fontStyle: 'italic',
  },
  content: {
    fontSize: '1rem',
    lineHeight: '1.9',
    color: '#333',
  },
  paragraph: {
    marginBottom: '20px',
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
    fontWeight: 'bold',
    color: '#0F4C5C',
    marginBottom: '20px',
    paddingBottom: '12px',
    borderBottom: '2px solid #82D7DE',
    display: 'inline-block',
  },
  authorInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    marginBottom: '20px',
  },
  authorAvatar: {
    width: '55px',
    height: '55px',
    background: 'linear-gradient(135deg, #0F4C5C, #82D7DE)',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
    fontSize: '1.6rem',
  },
  authorName: {
    fontWeight: 'bold',
    fontSize: '1rem',
    color: '#333',
  },
  authorRole: {
    fontSize: '0.75rem',
    color: '#888',
    marginTop: '4px',
  },
  infoRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px 0',
    borderBottom: '1px solid #f0f0f0',
  },
  infoIcon: {
    color: '#82D7DE',
    fontSize: '1rem',
    width: '24px',
  },
  infoLabel: {
    fontWeight: 500,
    color: '#555',
    width: '70px',
  },
  infoValue: {
    color: '#666',
    flex: 1,
  },
  tagsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px',
    marginTop: '10px',
  },
  tag: {
    background: '#f0fafb',
    padding: '6px 14px',
    borderRadius: '25px',
    fontSize: '0.75rem',
    color: '#0F4C5C',
    textDecoration: 'none',
    transition: 'all 0.3s',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '5px',
    border: '1px solid rgba(130, 215, 222, 0.3)',
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
    fontWeight: 'bold',
    marginBottom: '35px',
    color: '#82D7DE',
    textAlign: 'center',
    position: 'relative',
  },
  relatedGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '30px',
  },
  relatedCard: {
    background: '#ffffff',
    borderRadius: '16px',
    overflow: 'hidden',
    boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
    textDecoration: 'none',
    color: 'inherit',
    transition: 'transform 0.3s, box-shadow 0.3s',
    display: 'block',
    border: '1px solid rgba(130, 215, 222, 0.25)',
  },
  relatedImage: {
    width: '100%',
    height: '180px',
    objectFit: 'cover',
  },
  relatedContent: {
    padding: '18px',
  },
  relatedDate: {
    fontSize: '0.7rem',
    color: '#82D7DE',
    marginBottom: '8px',
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
  },
  relatedNewsTitle: {
    fontSize: '0.9rem',
    fontWeight: 'bold',
    lineHeight: '1.45',
    color: '#0F4C5C',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
  },
  loading: {
    textAlign: 'center',
    padding: '80px 20px',
    fontSize: '1.1rem',
    color: '#888',
  },
  error: {
    textAlign: 'center',
    padding: '80px 20px',
    fontSize: '1rem',
    color: '#dc3545',
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
  },
  '@media (max-width: 968px)': {
    contentWrapper: {
      gridTemplateColumns: '1fr',
    },
    sidebar: {
      position: 'static',
    },
    relatedGrid: {
      gridTemplateColumns: 'repeat(2, 1fr)',
    },
    heroTitle: {
      fontSize: '2rem',
    },
    mainContent: {
      padding: '25px',
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
  },
};

const DetailNews = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [news, setNews] = useState(null);
  const [relatedNews, setRelatedNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getImageUrl = (url) => {
    if (!url) return null;
    if (url.startsWith('http')) return url;
    return `http://localhost:8000${url}`;
  };

  useEffect(() => {
    const fetchNewsDetail = async () => {
      try {
        setLoading(true);
        const res = await newsAPI.getNewsDetail(id);
        setNews(res.data);
        
        const allNewsRes = await newsAPI.getNews();
        const otherNews = allNewsRes.data.filter(item => item.id !== parseInt(id)).slice(0, 3);
        setRelatedNews(otherNews);
        
        setError(null);
      } catch (error) {
        console.error('Error fetching news detail:', error);
        setError('Berita tidak ditemukan');
      } finally {
        setLoading(false);
      }
    };
    
    if (id) {
      fetchNewsDetail();
    }
  }, [id]);

  const handleShare = (platform) => {
    const url = window.location.href;
    const title = news?.title || 'TK IT AR RAHMAN AL IKHLAS';
    
    const shareUrls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      instagram: `https://www.instagram.com/`,
      whatsapp: `https://wa.me/?text=${encodeURIComponent(title + ' ' + url)}`,
      linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`,
    };
    
    window.open(shareUrls[platform], '_blank', 'width=600,height=400');
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return (
      <div style={styles.loading}>
        <FaNewspaper style={{ fontSize: '2rem', marginBottom: '15px', color: '#82D7DE' }} />
        <div>Memuat berita...</div>
      </div>
    );
  }

  if (error || !news) {
    return (
      <div style={styles.error}>
        <p>❌ {error || 'Berita tidak ditemukan'}</p>
        <button onClick={() => navigate('/news')} style={styles.backButton}>
          <FaArrowLeft /> Kembali ke berita
        </button>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <button 
        onClick={() => navigate('/news')} 
        style={styles.backButton}
        onMouseEnter={(e) => e.currentTarget.style.gap = '12px'}
        onMouseLeave={(e) => e.currentTarget.style.gap = '8px'}
      >
        <FaArrowLeft /> Kembali ke semua berita
      </button>

      <div 
        style={{
          ...styles.heroSection,
          backgroundImage: news.hero_image ? `url(${getImageUrl(news.hero_image)})` : 'linear-gradient(135deg, #0F4C5C, #82D7DE)',
        }}
      >
        <div style={styles.heroOverlay}></div>
        <div style={styles.heroContent}>
          <div style={styles.heroCategory}>Berita Terkini</div>
          <h1 style={styles.heroTitle}>{news.title}</h1>
          <div style={styles.heroMeta}>
            <span style={styles.heroMetaItem}><FaCalendarAlt /> {formatDate(news.date || news.created_at)}</span>
            {news.author && <span style={styles.heroMetaItem}><FaUser /> {news.author}</span>}
            {news.location && <span style={styles.heroMetaItem}><FaMapMarkerAlt /> {news.location}</span>}
            <span style={styles.heroMetaItem}><FaEye /> {news.view_count || 0} dibaca</span>
          </div>
        </div>
      </div>

      <div style={styles.contentWrapper}>
        <div style={styles.mainContent}>
          {news.excerpt && (
            <div style={styles.excerpt}>
              "{news.excerpt}"
            </div>
          )}
          
          <div style={styles.content}>
            {news.content && news.content.split('\n').map((paragraph, idx) => (
              <p key={idx} style={styles.paragraph}>
                {paragraph}
              </p>
            ))}
          </div>

          <div style={styles.shareSection}>
            <div style={styles.shareTitle}>
              <FaShareAlt /> Bagikan artikel ini:
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
            <Link to="/news" style={styles.navButton}>
              <FaArrowLeft /> Lihat Semua Berita
            </Link>
          </div>
        </div>

        <div style={styles.sidebar}>
          <div style={styles.sidebarCard}>
            <h3 style={styles.sidebarTitle}>Tentang Penulis</h3>
            <div style={styles.authorInfo}>
              <div style={styles.authorAvatar}>
                <FaUser />
              </div>
              <div>
                <div style={styles.authorName}>{news.author || 'Admin TK IT AR RAHMAN AL IKHLAS'}</div>
                <div style={styles.authorRole}>Tim Redaksi</div>
              </div>
            </div>
            <p style={{ fontSize: '0.85rem', color: '#666', lineHeight: '1.6' }}>
              Tim redaksi TK IT AR RAHMAN AL IKHLAS menyajikan berita dan informasi terbaru seputar kegiatan pendidikan anak usia dini.
            </p>
          </div>

          <div style={styles.sidebarCard}>
            <h3 style={styles.sidebarTitle}>Informasi Artikel</h3>
            <div style={styles.infoRow}>
              <div style={styles.infoIcon}><FaCalendarAlt /></div>
              <span style={styles.infoLabel}>Tanggal</span>
              <span style={styles.infoValue}>{formatDate(news.date || news.created_at)}</span>
            </div>
            <div style={styles.infoRow}>
              <div style={styles.infoIcon}><FaUser /></div>
              <span style={styles.infoLabel}>Penulis</span>
              <span style={styles.infoValue}>{news.author || 'Admin TK IT AR RAHMAN AL IKHLAS'}</span>
            </div>
            {news.location && (
              <div style={styles.infoRow}>
                <div style={styles.infoIcon}><FaMapMarkerAlt /></div>
                <span style={styles.infoLabel}>Lokasi</span>
                <span style={styles.infoValue}>{news.location}</span>
              </div>
            )}
            <div style={styles.infoRow}>
              <div style={styles.infoIcon}><FaEye /></div>
              <span style={styles.infoLabel}>Dibaca</span>
              <span style={styles.infoValue}>{news.view_count || 0} kali</span>
            </div>
          </div>

          {news.tags && news.tags.length > 0 && (
            <div style={styles.sidebarCard}>
              <h3 style={styles.sidebarTitle}>
                <FaTag style={{ marginRight: '8px' }} /> Tags
              </h3>
              <div style={styles.tagsContainer}>
                {news.tags.split(',').map((tag, idx) => (
                  <Link 
                    key={idx} 
                    to={`/news?tag=${tag.trim()}`} 
                    style={styles.tag}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = '#82D7DE';
                      e.currentTarget.style.color = '#0F4C5C';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = '#f0fafb';
                      e.currentTarget.style.color = '#0F4C5C';
                    }}
                  >
                    <FaTag style={{ fontSize: '0.65rem' }} /> {tag.trim()}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {relatedNews.length > 0 && (
        <div style={styles.relatedSection}>
          <h2 style={styles.relatedTitle}>Berita Terkait</h2>
          <div style={styles.relatedGrid}>
            {relatedNews.map((item) => (
              <Link 
                key={item.id} 
                to={`/news/${item.id}`} 
                style={styles.relatedCard}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.boxShadow = '0 8px 25px rgba(130, 215, 222, 0.25)';
                  e.currentTarget.style.borderColor = 'rgba(130, 215, 222, 0.5)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.08)';
                  e.currentTarget.style.borderColor = 'rgba(130, 215, 222, 0.25)';
                }}
              >
                <img 
                  src={getImageUrl(item.hero_image) || 'https://placehold.co/400x200/82D7DE/0F4C5C?text=TK'} 
                  alt={item.title}
                  style={styles.relatedImage}
                  onError={(e) => {
                    e.target.src = 'https://placehold.co/400x200/82D7DE/0F4C5C?text=TK';
                  }}
                />
                <div style={styles.relatedContent}>
                  <div style={styles.relatedDate}>
                    <FaClock style={{ fontSize: '0.6rem' }} />
                    {new Date(item.date || item.created_at).toLocaleDateString('id-ID', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </div>
                  <h4 style={styles.relatedNewsTitle}>{item.title}</h4>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailNews;