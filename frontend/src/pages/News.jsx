import React, { useEffect, useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { newsAPI } from '../services/api';
import { FaSearch, FaTimes, FaFilter, FaNewspaper, FaCalendarAlt, FaUser, FaMapMarkerAlt, FaEye, FaTag } from 'react-icons/fa';

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
    marginBottom: '50px',
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
  // ==================== FILTER BAR ====================
  filterBar: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '12px',
    justifyContent: 'center',
    marginBottom: '40px',
    alignItems: 'center',
    background: '#ffffff',
    padding: '20px 28px',
    borderRadius: '20px',
    border: '2px solid rgba(130, 215, 222, 0.2)',
    boxShadow: '0 10px 40px rgba(130, 215, 222, 0.1)',
  },
  searchWrapper: {
    display: 'flex',
    flex: 1,
    minWidth: '200px',
    maxWidth: '450px',
    position: 'relative',
  },
  searchInput: {
    width: '100%',
    padding: '12px 16px 12px 44px',
    border: '2px solid #E2F5F7',
    borderRadius: '12px',
    fontSize: '0.92rem',
    background: '#F8FDFE',
    transition: 'all 0.3s ease',
    outline: 'none',
    fontWeight: '500',
  },
  searchIcon: {
    position: 'absolute',
    left: '15px',
    top: '50%',
    transform: 'translateY(-50%)',
    color: '#82D7DE',
    fontSize: '0.95rem',
  },
  filterGroup: {
    display: 'flex',
    gap: '10px',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  filterSelect: {
    padding: '12px 40px 12px 16px',
    border: '2px solid #E2F5F7',
    borderRadius: '12px',
    fontSize: '0.92rem',
    minWidth: '180px',
    background: '#F8FDFE',
    cursor: 'pointer',
    outline: 'none',
    transition: 'all 0.3s ease',
    color: '#0F4C5C',
    fontWeight: '600',
    appearance: 'none',
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%2382D7DE' d='M6 8L1 3h10z'/%3E%3C/svg%3E")`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right 14px center',
  },
  filterButton: {
    padding: '12px 28px',
    background: 'linear-gradient(135deg, #0F4C5C, #82D7DE)',
    color: '#fff',
    border: 'none',
    borderRadius: '12px',
    fontSize: '0.92rem',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontWeight: '700',
    boxShadow: '0 6px 20px rgba(15, 76, 92, 0.25)',
  },
  clearButton: {
    padding: '12px 22px',
    background: '#F1F5F9',
    color: '#64748B',
    border: '2px solid #E2E8F0',
    borderRadius: '12px',
    fontSize: '0.92rem',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontWeight: '600',
  },
  // ==================== NEWS GRID ====================
  newsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '35px',
  },
  // ==================== NEWS CARD ====================
  newsCard: {
    background: '#ffffff',
    borderRadius: '24px',
    boxShadow: '0 10px 40px rgba(130, 215, 222, 0.12), 0 2px 8px rgba(0,0,0,0.04)',
    overflow: 'hidden',
    transition: 'all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1)',
    textDecoration: 'none',
    color: 'inherit',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    border: '2px solid rgba(130, 215, 222, 0.15)',
    position: 'relative',
  },
  newsImageWrapper: {
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
  newsImageOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'linear-gradient(to bottom, rgba(0,0,0,0) 60%, rgba(15,76,92,0.15) 100%)',
    zIndex: 1,
    pointerEvents: 'none',
  },
  newsImage: {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
    objectPosition: 'center',
    transition: 'transform 0.6s cubic-bezier(0.165, 0.84, 0.44, 1)',
    display: 'block',
    padding: '5px',
  },
  newsBadge: {
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
  noImage: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #82D7DE 0%, #5BC0C9 100%)',
    color: '#ffffff',
    fontSize: '3.5rem',
    fontWeight: '700',
    borderRadius: '16px',
  },
  newsContent: {
    padding: '28px 30px 30px',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  newsDateWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    marginBottom: '12px',
  },
  newsDate: {
    color: '#82D7DE',
    fontSize: '0.78rem',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: '1px',
  },
  newsTitle: {
    fontSize: '1.2rem',
    fontWeight: '800',
    marginBottom: '14px',
    color: '#0F4C5C',
    lineHeight: '1.45',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
  },
  newsTitleDivider: {
    width: '40px',
    height: '3px',
    background: 'linear-gradient(90deg, #82D7DE, #5BC0C9)',
    marginBottom: '14px',
    borderRadius: '3px',
  },
  newsExcerpt: {
    fontSize: '0.9rem',
    color: '#64748B',
    lineHeight: '1.7',
    marginBottom: '20px',
    display: '-webkit-box',
    WebkitLineClamp: 3,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
  },
  readMore: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    color: '#82D7DE',
    textDecoration: 'none',
    fontWeight: '700',
    fontSize: '0.9rem',
    marginTop: 'auto',
    transition: 'all 0.3s ease',
  },
  readMoreArrow: {
    transition: 'transform 0.3s ease',
    fontWeight: '700',
  },
  // ==================== DETAIL VIEW ====================
  detailCard: {
    background: '#ffffff',
    borderRadius: '30px',
    boxShadow: '0 25px 70px rgba(130, 215, 222, 0.15)',
    padding: '45px 50px',
    border: '2px solid rgba(130, 215, 222, 0.15)',
    position: 'relative',
  },
  detailHeroImage: {
    width: '100%',
    maxHeight: '500px',
    objectFit: 'cover',
    borderRadius: '20px',
    marginBottom: '30px',
    boxShadow: '0 15px 50px rgba(130, 215, 222, 0.2)',
  },
  detailTitle: {
    fontSize: '2.4rem',
    marginBottom: '20px',
    color: '#0F4C5C',
    fontWeight: '800',
    lineHeight: '1.3',
  },
  detailDivider: {
    width: '60px',
    height: '4px',
    background: 'linear-gradient(90deg, #82D7DE, #5BC0C9)',
    marginBottom: '25px',
    borderRadius: '4px',
  },
  detailMeta: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '20px',
    marginBottom: '30px',
    paddingBottom: '25px',
    borderBottom: '2px solid #E2F5F7',
    color: '#64748B',
    fontSize: '0.9rem',
    fontWeight: '500',
  },
  detailMetaItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  detailMetaIcon: {
    color: '#82D7DE',
    fontSize: '0.95rem',
  },
  detailExcerpt: {
    fontStyle: 'italic',
    color: '#0F4C5C',
    marginBottom: '25px',
    padding: '20px 25px',
    background: '#F0FAFB',
    borderRadius: '16px',
    borderLeft: '4px solid #82D7DE',
    fontSize: '1.05rem',
    lineHeight: '1.8',
    fontWeight: '500',
  },
  detailContent: {
    lineHeight: '2',
    fontSize: '1.05rem',
    color: '#4A5568',
  },
  detailParagraph: {
    marginBottom: '20px',
  },
  backLink: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '30px',
    color: '#0F4C5C',
    textDecoration: 'none',
    fontWeight: '700',
    fontSize: '0.95rem',
    padding: '10px 20px',
    background: '#F0FAFB',
    borderRadius: '12px',
    transition: 'all 0.3s ease',
    border: '2px solid rgba(130, 215, 222, 0.2)',
  },
  // ==================== TAGS ====================
  tagsContainer: {
    marginTop: '35px',
    paddingTop: '25px',
    borderTop: '2px solid #E2F5F7',
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px',
    alignItems: 'center',
  },
  tagsLabel: {
    fontSize: '0.85rem',
    fontWeight: '700',
    color: '#0F4C5C',
    marginRight: '10px',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
  },
  tag: {
    background: '#F0FAFB',
    padding: '8px 16px',
    borderRadius: '20px',
    fontSize: '0.82rem',
    color: '#0F4C5C',
    textDecoration: 'none',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    fontWeight: '600',
    border: '2px solid rgba(130, 215, 222, 0.2)',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '5px',
  },
  // ==================== STATES ====================
  loading: {
    textAlign: 'center',
    padding: '100px 20px',
    fontSize: '1.2rem',
    color: '#64748B',
  },
  loadingIcon: {
    fontSize: '3rem',
    color: '#82D7DE',
    marginBottom: '20px',
  },
  noResult: {
    textAlign: 'center',
    padding: '70px 30px',
    fontSize: '1.1rem',
    color: '#64748B',
    gridColumn: '1 / -1',
    background: '#F8FAFC',
    borderRadius: '24px',
    border: '2px dashed #CBD5E1',
    maxWidth: '600px',
    margin: '0 auto',
  },
  noResultIcon: {
    fontSize: '4rem',
    marginBottom: '20px',
  },
  noResultTitle: {
    color: '#0F4C5C',
    marginBottom: '10px',
    fontSize: '1.3rem',
    fontWeight: '800',
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
  '@media (max-width: 1024px)': {
    newsGrid: {
      gridTemplateColumns: 'repeat(2, 1fr)',
    },
    detailCard: {
      padding: '35px 30px',
    },
    detailTitle: {
      fontSize: '2rem',
    },
  },
  '@media (max-width: 768px)': {
    newsGrid: {
      gridTemplateColumns: '1fr',
      gap: '25px',
    },
    section: {
      padding: '50px 0 60px 0',
    },
    sectionTitle: {
      fontSize: '2rem',
    },
    detailTitle: {
      fontSize: '1.6rem',
    },
    detailCard: {
      padding: '25px 20px',
    },
    filterBar: {
      flexDirection: 'column',
      padding: '16px',
    },
    searchWrapper: {
      maxWidth: 'none',
      width: '100%',
    },
    filterSelect: {
      minWidth: 'auto',
      width: '100%',
    },
    filterGroup: {
      width: '100%',
    },
    filterButton: {
      flex: 1,
      justifyContent: 'center',
    },
    clearButton: {
      flex: 1,
      justifyContent: 'center',
    },
    newsImageWrapper: {
      height: '190px',
    },
    newsContent: {
      padding: '22px 24px 26px',
    },
    decorativeCircle1: { display: 'none' },
    decorativeCircle2: { display: 'none' },
  },
};

const News = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tags, setTags] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const { id } = useParams();
  
  const searchQuery = searchParams.get('search') || '';
  const tagFilter = searchParams.get('tag') || '';

  const getImageUrl = (url) => {
    if (!url) return null;
    if (url.startsWith('http')) return url;
    return `http://localhost:8000${url}`;
  };

  useEffect(() => {
    fetchTags();
  }, []);

  useEffect(() => {
    fetchNews();
  }, [searchQuery, tagFilter, id]);

  const fetchTags = async () => {
    try {
      const res = await newsAPI.getTags();
      setTags(res.data.tags || []);
    } catch (error) {
      console.error('Error fetching tags:', error);
    }
  };

  const fetchNews = async () => {
    try {
      setLoading(true);
      
      if (id) {
        const res = await newsAPI.getNewsDetail(id);
        setNews([res.data]);
      } else {
        const params = {};
        if (searchQuery) params.search = searchQuery;
        if (tagFilter) params.tag = tagFilter;
        
        const res = await newsAPI.getNews(params);
        setNews(res.data);
      }
    } catch (error) {
      console.error('Error fetching news:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const form = e.target;
    const searchInput = form.querySelector('input[name="search"]');
    const newParams = new URLSearchParams(searchParams);
    
    if (searchInput.value) {
      newParams.set('search', searchInput.value);
    } else {
      newParams.delete('search');
    }
    setSearchParams(newParams);
  };

  const handleTagFilter = (e) => {
    const value = e.target.value;
    const newParams = new URLSearchParams(searchParams);
    
    if (value) {
      newParams.set('tag', value);
    } else {
      newParams.delete('tag');
    }
    setSearchParams(newParams);
  };

  const handleTagClick = (tag) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('tag', tag);
    setSearchParams(newParams);
  };

  const clearFilters = () => {
    setSearchParams({});
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

  const handleReadMoreHover = (e, isHovering) => {
    const arrow = e.currentTarget.querySelector('span');
    if (isHovering) {
      e.currentTarget.style.color = '#5BC0C9';
      e.currentTarget.style.gap = '12px';
      if (arrow) arrow.style.transform = 'translateX(6px)';
    } else {
      e.currentTarget.style.color = '#82D7DE';
      e.currentTarget.style.gap = '6px';
      if (arrow) arrow.style.transform = 'translateX(0)';
    }
  };

  const handleButtonHover = (e, isHovering) => {
    if (isHovering) {
      e.currentTarget.style.transform = 'translateY(-3px) scale(1.02)';
      e.currentTarget.style.boxShadow = '0 10px 30px rgba(15, 76, 92, 0.35)';
    } else {
      e.currentTarget.style.transform = 'translateY(0) scale(1)';
      e.currentTarget.style.boxShadow = '0 6px 20px rgba(15, 76, 92, 0.25)';
    }
  };

  const handleBackLinkHover = (e, isHovering) => {
    if (isHovering) {
      e.currentTarget.style.background = '#E0F5F7';
      e.currentTarget.style.transform = 'translateX(-5px)';
    } else {
      e.currentTarget.style.background = '#F0FAFB';
      e.currentTarget.style.transform = 'translateX(0)';
    }
  };

  if (loading) {
    return (
      <div style={styles.loading}>
        <div style={styles.loadingIcon}>📰</div>
        <div>Memuat berita...</div>
      </div>
    );
  }

  // Single news detail view
  if (id && news.length === 1) {
    const item = news[0];
    return (
      <div style={styles.container}>
        <section style={styles.section}>
          {/* Dekorasi Background */}
          <div style={styles.decorativeCircle1}></div>
          <div style={styles.decorativeCircle2}></div>

          <Link 
            to="/news" 
            style={styles.backLink}
            onMouseEnter={(e) => handleBackLinkHover(e, true)}
            onMouseLeave={(e) => handleBackLinkHover(e, false)}
          >
            ← Kembali ke semua berita
          </Link>
          
          <div style={styles.detailCard}>
            {item.hero_image && (
              <img 
                src={getImageUrl(item.hero_image)} 
                alt={item.title}
                style={styles.detailHeroImage}
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            )}
            
            <h1 style={styles.detailTitle}>{item.title}</h1>
            <div style={styles.detailDivider}></div>
            
            <div style={styles.detailMeta}>
              <span style={styles.detailMetaItem}>
                <FaCalendarAlt style={styles.detailMetaIcon} />
                {new Date(item.date || item.created_at).toLocaleDateString('id-ID', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </span>
              {item.author && (
                <span style={styles.detailMetaItem}>
                  <FaUser style={styles.detailMetaIcon} />
                  {item.author}
                </span>
              )}
              {item.location && (
                <span style={styles.detailMetaItem}>
                  <FaMapMarkerAlt style={styles.detailMetaIcon} />
                  {item.location}
                </span>
              )}
              {item.view_count !== undefined && (
                <span style={styles.detailMetaItem}>
                  <FaEye style={styles.detailMetaIcon} />
                  {item.view_count} dilihat
                </span>
              )}
            </div>
            
            {item.excerpt && (
              <div style={styles.detailExcerpt}>
                "{item.excerpt}"
              </div>
            )}
            
            <div style={styles.detailContent}>
              {item.content && item.content.split('\n').map((paragraph, idx) => (
                <p key={idx} style={styles.detailParagraph}>{paragraph}</p>
              ))}
            </div>
            
            {item.tags && (
              <div style={styles.tagsContainer}>
                <div style={styles.tagsLabel}>
                  <FaTag /> Tags:
                </div>
                {item.tags.split(',').map((tag, idx) => (
                  <span 
                    key={idx} 
                    style={styles.tag}
                    onClick={() => handleTagClick(tag.trim())}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = '#82D7DE';
                      e.currentTarget.style.color = '#ffffff';
                      e.currentTarget.style.borderColor = '#82D7DE';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = '#F0FAFB';
                      e.currentTarget.style.color = '#0F4C5C';
                      e.currentTarget.style.borderColor = 'rgba(130, 215, 222, 0.2)';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    #{tag.trim()}
                  </span>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
    );
  }

  // All news list view
  const hasActiveFilters = searchQuery || tagFilter;

  return (
    <div style={styles.container}>
      <section style={styles.section}>
        {/* Dekorasi Background */}
        <div style={styles.decorativeCircle1}></div>
        <div style={styles.decorativeCircle2}></div>

        {/* Header */}
        <div style={styles.headerWrapper}>
          <div style={styles.headerIcon}>📰</div>
          <h1 style={styles.sectionTitle}>Berita & Informasi</h1>
          <div style={styles.sectionDivider}></div>
          <p style={styles.sectionSubtitle}>
            Informasi terbaru seputar kegiatan dan perkembangan TK IT AR RAHMAN AL IKHLAS
          </p>
          <div style={styles.subtitleHighlight}>
            ✨ Update Terkini ✨
          </div>
        </div>
        
        {/* Filter Bar */}
        <div style={styles.filterBar}>
          <div style={styles.searchWrapper}>
            <FaSearch style={styles.searchIcon} />
            <form onSubmit={handleSearch} style={{ width: '100%' }}>
              <input
                type="text"
                name="search"
                style={styles.searchInput}
                placeholder="Cari berita..."
                defaultValue={searchQuery}
                onFocus={(e) => {
                  e.target.style.borderColor = '#82D7DE';
                  e.target.style.boxShadow = '0 0 0 4px rgba(130,215,222,0.15)';
                  e.target.style.background = '#ffffff';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#E2F5F7';
                  e.target.style.boxShadow = 'none';
                  e.target.style.background = '#F8FDFE';
                }}
              />
            </form>
          </div>
          
          <div style={styles.filterGroup}>
            <FaFilter style={{ color: '#82D7DE', fontSize: '0.95rem' }} />
            <select 
              style={styles.filterSelect}
              value={tagFilter}
              onChange={handleTagFilter}
              onFocus={(e) => {
                e.target.style.borderColor = '#82D7DE';
                e.target.style.boxShadow = '0 0 0 4px rgba(130,215,222,0.15)';
                e.target.style.background = '#ffffff';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#E2F5F7';
                e.target.style.boxShadow = 'none';
                e.target.style.background = '#F8FDFE';
              }}
            >
              <option value="">Semua Tags</option>
              {tags.map((tag) => (
                <option key={tag} value={tag}>{tag}</option>
              ))}
            </select>
          </div>
          
          <button 
            type="submit" 
            style={styles.filterButton} 
            onClick={handleSearch}
            onMouseEnter={(e) => handleButtonHover(e, true)}
            onMouseLeave={(e) => handleButtonHover(e, false)}
          >
            <FaSearch /> Cari
          </button>
          
          {hasActiveFilters && (
            <button 
              onClick={clearFilters} 
              style={styles.clearButton}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#E2E8F0';
                e.currentTarget.style.color = '#0F4C5C';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#F1F5F9';
                e.currentTarget.style.color = '#64748B';
              }}
            >
              <FaTimes /> Reset
            </button>
          )}
        </div>
        
        <div style={styles.newsGrid}>
          {news.length > 0 ? (
            news.map((item) => (
              <Link 
                key={item.id} 
                to={`/news/${item.id}`} 
                style={styles.newsCard}
                onMouseEnter={(e) => handleCardHover(e, true)}
                onMouseLeave={(e) => handleCardHover(e, false)}
              >
                <div style={styles.newsImageWrapper}>
                  {item.hero_image ? (
                    <>
                      <img 
                        src={getImageUrl(item.hero_image)} 
                        alt={item.title}
                        style={styles.newsImage}
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
                          fallbackDiv.textContent = '📰';
                          parent.appendChild(fallbackDiv);
                        }}
                      />
                      <div style={styles.newsImageOverlay}></div>
                    </>
                  ) : (
                    <div style={styles.noImage}>
                      📰
                    </div>
                  )}
                  
                  {/* Badge */}
                  <div style={styles.newsBadge}>
                    <FaNewspaper style={{ fontSize: '0.65rem' }} />
                    Berita
                  </div>
                </div>
                
                <div style={styles.newsContent}>
                  <div style={styles.newsDateWrapper}>
                    <FaCalendarAlt style={{ color: '#82D7DE', fontSize: '0.75rem' }} />
                    <div style={styles.newsDate}>
                      {new Date(item.date || item.created_at).toLocaleDateString('id-ID', { 
                        day: 'numeric', 
                        month: 'long', 
                        year: 'numeric' 
                      })}
                    </div>
                  </div>
                  
                  <h3 style={styles.newsTitle}>{item.title}</h3>
                  <div style={styles.newsTitleDivider}></div>
                  
                  <p style={styles.newsExcerpt}>
                    {item.excerpt || item.content?.substring(0, 120) || ''}...
                  </p>
                  
                  <div 
                    style={styles.readMore}
                    onMouseEnter={(e) => handleReadMoreHover(e, true)}
                    onMouseLeave={(e) => handleReadMoreHover(e, false)}
                  >
                    Baca Selengkapnya <span style={styles.readMoreArrow}>→</span>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div style={styles.noResult}>
              <div style={styles.noResultIcon}>🔍</div>
              <h3 style={styles.noResultTitle}>Tidak Ada Berita Ditemukan</h3>
              <p style={{ marginBottom: '20px' }}>
                Coba ubah kata kunci pencarian atau reset filter.
              </p>
              <button 
                onClick={clearFilters} 
                style={styles.filterButton}
                onMouseEnter={(e) => handleButtonHover(e, true)}
                onMouseLeave={(e) => handleButtonHover(e, false)}
              >
                <FaTimes /> Reset Filter
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default News;