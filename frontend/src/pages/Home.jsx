import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FaQuoteLeft, FaUserCircle } from 'react-icons/fa';

const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 20px',
  },
  // ==================== HERO CAROUSEL ====================
  carouselContainer: {
    position: 'relative',
    width: '100%',
    height: '600px',
    overflow: 'hidden',
  },
  carouselSlide: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    opacity: 0,
    transition: 'opacity 0.8s ease-in-out',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    color: '#ffffff',
  },
  carouselSlideActive: {
    opacity: 1,
  },
  carouselOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'rgba(0,0,0,0.4)',
  },
  carouselContent: {
    position: 'relative',
    zIndex: 2,
    maxWidth: '800px',
    padding: '20px',
  },
  carouselTitle: {
    fontSize: '3.5rem',
    marginBottom: '20px',
    textShadow: '3px 3px 6px rgba(0,0,0,0.6)',
    fontWeight: '800',
    letterSpacing: '-1px',
    lineHeight: '1.2',
  },
  carouselDescription: {
    fontSize: '1.3rem',
    marginBottom: '30px',
    textShadow: '2px 2px 4px rgba(0,0,0,0.6)',
    fontWeight: '400',
    lineHeight: '1.6',
  },
  carouselBtn: {
    display: 'inline-block',
    padding: '14px 38px',
    background: 'linear-gradient(135deg, #82D7DE, #5BC0C9)',
    color: '#ffffff',
    textDecoration: 'none',
    borderRadius: '50px',
    transition: 'all 0.3s ease',
    fontWeight: '700',
    fontSize: '1rem',
    border: 'none',
    cursor: 'pointer',
    boxShadow: '0 6px 20px rgba(130, 215, 222, 0.4)',
    letterSpacing: '0.5px',
  },
  dotsContainer: {
    position: 'absolute',
    bottom: '30px',
    left: '50%',
    transform: 'translateX(-50%)',
    display: 'flex',
    gap: '12px',
    zIndex: 3,
  },
  dot: {
    width: '12px',
    height: '12px',
    borderRadius: '50%',
    background: 'rgba(255,255,255,0.5)',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    border: '2px solid transparent',
  },
  dotActive: {
    background: '#82D7DE',
    width: '35px',
    borderRadius: '6px',
    border: '2px solid #ffffff',
  },
  arrow: {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    background: 'rgba(130, 215, 222, 0.8)',
    color: '#ffffff',
    border: 'none',
    fontSize: '1.8rem',
    padding: '12px 22px',
    cursor: 'pointer',
    zIndex: 3,
    borderRadius: '50%',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
  },
  arrowLeft: {
    left: '25px',
  },
  arrowRight: {
    right: '25px',
  },
  // ==================== SECTION ====================
  section: {
    padding: '90px 0',
    position: 'relative',
  },
  sectionTitle: {
    textAlign: 'center',
    fontSize: '2.8rem',
    marginBottom: '10px',
    color: '#0F4C5C',
    fontWeight: '800',
    letterSpacing: '-0.5px',
  },
  sectionDivider: {
    width: '80px',
    height: '4px',
    background: 'linear-gradient(90deg, #82D7DE, #5BC0C9)',
    margin: '0 auto 20px auto',
    borderRadius: '4px',
  },
  sectionSubtitle: {
    textAlign: 'center',
    color: '#64748B',
    marginBottom: '60px',
    fontSize: '1.15rem',
    fontWeight: '400',
    maxWidth: '650px',
    margin: '0 auto 60px',
    lineHeight: '1.7',
  },
  // ==================== WELCOME SECTION ====================
  welcomeSection: {
    padding: '90px 0',
    background: 'linear-gradient(180deg, #ffffff 0%, #f0fafb 50%, #ffffff 100%)',
    position: 'relative',
    overflow: 'hidden',
  },
  welcomeWrapper: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '70px',
    alignItems: 'center',
  },
  welcomeImageWrapper: {
    position: 'relative',
    borderRadius: '30px',
    overflow: 'hidden',
    boxShadow: '0 25px 70px rgba(130, 215, 222, 0.25)',
  },
  welcomeImage: {
    width: '100%',
    height: '420px',
    objectFit: 'cover',
    display: 'block',
  },
  welcomeImagePlaceholder: {
    width: '100%',
    height: '420px',
    background: 'linear-gradient(135deg, #82D7DE, #5BC0C9)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
    fontSize: '5rem',
  },
  welcomeContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  welcomeQuote: {
    fontSize: '3rem',
    color: '#82D7DE',
    opacity: 0.4,
    marginBottom: '-15px',
  },
  welcomeTitle: {
    fontSize: '2.2rem',
    fontWeight: '800',
    color: '#0F4C5C',
    marginBottom: '10px',
    lineHeight: '1.3',
  },
  welcomeText: {
    fontSize: '1.05rem',
    lineHeight: '2',
    color: '#4A5568',
    marginBottom: '10px',
  },
  welcomeAuthor: {
    marginTop: '20px',
    paddingTop: '25px',
    borderTop: '3px solid #E2F5F7',
    position: 'relative',
  },
  welcomeName: {
    fontSize: '1.15rem',
    fontWeight: '700',
    color: '#0F4C5C',
  },
  welcomePosition: {
    fontSize: '0.9rem',
    color: '#82D7DE',
    fontWeight: '500',
  },
  // ==================== PROGRAMS SECTION ====================
  programsSection: {
    padding: '90px 0',
    background: 'linear-gradient(180deg, #f0fafb 0%, #ffffff 100%)',
  },
  programsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
    gap: '30px',
    marginTop: '30px',
  },
  programsScrollArea: {
    position: 'relative',
    marginTop: '30px',
    overflow: 'visible',
  },
  programsScrollViewport: {
    overflowX: 'auto',
    overflowY: 'hidden',
    width: '100%',
    boxSizing: 'border-box',
    padding: '10px 0 20px',
    WebkitOverflowScrolling: 'touch',
    scrollbarWidth: 'none',
    msOverflowStyle: 'none',
    scrollBehavior: 'smooth',
  },
  programsScrollGrid: {
    display: 'flex',
    flexWrap: 'nowrap',
    gap: '30px',
    width: 'max-content',
  },
  programScrollItem: {
    flex: '0 0 auto',
    minWidth: '0',
  },
  programScrollButton: {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    width: '50px',
    height: '50px',
    border: 'none',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #0F4C5C, #15697A)',
    color: '#ffffff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.3rem',
    lineHeight: 1,
    cursor: 'pointer',
    zIndex: 20,
    boxShadow: '0 8px 25px rgba(15, 76, 92, 0.3)',
    transition: 'transform 0.2s ease, background 0.2s ease',
  },
  programScrollButtonLeft: {
    left: '-28px',
  },
  programScrollButtonRight: {
    right: '-28px',
  },
  // === PROGRAM CARD ===
  programCard: {
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
  programImageWrapper: {
    width: '100%',
    height: '220px',
    overflow: 'hidden',
    background: 'linear-gradient(135deg, #F0FAFB, #E0F5F7)',
    position: 'relative',
    flexShrink: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '15px',
  },
  programImageOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'linear-gradient(to bottom, rgba(0,0,0,0) 60%, rgba(15,76,92,0.15) 100%)',
    zIndex: 1,
    pointerEvents: 'none',
  },
  programImage: {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
    objectPosition: 'center',
    transition: 'transform 0.6s cubic-bezier(0.165, 0.84, 0.44, 1)',
    display: 'block',
    padding: '5px',
  },
  programBody: {
    padding: '28px 30px 30px',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
  },
  programTitle: {
    color: '#0F4C5C',
    fontSize: '1.35rem',
    fontWeight: '800',
    marginBottom: '12px',
    letterSpacing: '-0.3px',
    lineHeight: '1.3',
  },
  programDescription: {
    fontSize: '0.95rem',
    lineHeight: '1.8',
    color: '#64748B',
    flex: 1,
    marginBottom: '18px',
    display: '-webkit-box',
    WebkitLineClamp: 3,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  programFooter: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: '18px',
    borderTop: '2px solid #F1F5F9',
  },
  programLink: {
    color: '#0F4C5C',
    textDecoration: 'none',
    fontSize: '0.9rem',
    fontWeight: '700',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    transition: 'all 0.3s ease',
  },
  programLinkArrow: {
    transition: 'transform 0.3s ease',
    color: '#82D7DE',
    fontWeight: '700',
    fontSize: '1.1rem',
  },
  programOrder: {
    fontSize: '0.75rem',
    color: '#82D7DE',
    fontWeight: '700',
    background: '#E0F5F7',
    padding: '4px 12px',
    borderRadius: '20px',
  },
  programNoImage: {
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
  // ==================== STATS SECTION ====================
  statsSection: {
    background: 'linear-gradient(135deg, #0F4C5C 0%, #15697A 50%, #82D7DE 100%)',
    color: '#ffffff',
    padding: '70px 0',
    position: 'relative',
    overflow: 'hidden',
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '40px',
    textAlign: 'center',
    position: 'relative',
    zIndex: 2,
  },
  statItem: {
    padding: '20px',
    background: 'rgba(255,255,255,0.1)',
    borderRadius: '20px',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255,255,255,0.2)',
    transition: 'transform 0.3s ease',
  },
  statNumber: {
    fontSize: '3.2rem',
    fontWeight: '800',
    marginBottom: '10px',
    textShadow: '2px 2px 4px rgba(0,0,0,0.2)',
  },
  statLabel: {
    fontSize: '1.1rem',
    opacity: 0.95,
    fontWeight: '500',
  },
  // ==================== NEWS SECTION ====================
  newsSection: {
    padding: '90px 0',
    background: '#f8f9fa',
  },
  newsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '30px',
    marginTop: '30px',
  },
  newsScrollArea: {
    position: 'relative',
    marginTop: '30px',
    overflow: 'visible',
  },
  newsScrollViewport: {
    overflowX: 'auto',
    overflowY: 'hidden',
    width: '100%',
    boxSizing: 'border-box',
    padding: '10px 0 20px',
    WebkitOverflowScrolling: 'touch',
    scrollbarWidth: 'none',
    msOverflowStyle: 'none',
    scrollBehavior: 'smooth',
  },
  newsScrollGrid: {
    display: 'flex',
    flexWrap: 'nowrap',
    gap: '30px',
    width: 'max-content',
  },
  newsScrollItem: {
    flex: '0 0 auto',
    minWidth: '0',
  },
  newsScrollButton: {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    width: '50px',
    height: '50px',
    border: 'none',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #0F4C5C, #15697A)',
    color: '#ffffff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.3rem',
    lineHeight: 1,
    cursor: 'pointer',
    zIndex: 20,
    boxShadow: '0 8px 25px rgba(15, 76, 92, 0.3)',
    transition: 'transform 0.2s ease, background 0.2s ease',
  },
  newsScrollButtonLeft: {
    left: '-28px',
  },
  newsScrollButtonRight: {
    right: '-28px',
  },
  // === NEWS CARD ===
  newsCard: {
    background: '#ffffff',
    borderRadius: '24px',
    boxShadow: '0 10px 40px rgba(130, 215, 222, 0.12), 0 2px 8px rgba(0,0,0,0.04)',
    overflow: 'hidden',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    border: '2px solid rgba(130, 215, 222, 0.15)',
  },
  newsImageWrapper: {
    width: '100%',
    height: '220px',
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
    background: 'linear-gradient(to bottom, rgba(0,0,0,0) 60%, rgba(15,76,92,0.12) 100%)',
    zIndex: 1,
    pointerEvents: 'none',
  },
  newsImage: {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
    objectPosition: 'center',
    transition: 'transform 0.5s ease',
    display: 'block',
    padding: '5px',
  },
  newsNoImage: {
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
    padding: '25px',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  newsDate: {
    color: '#82D7DE',
    fontSize: '0.78rem',
    marginBottom: '12px',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: '1px',
  },
  newsTitle: {
    fontSize: '1.15rem',
    fontWeight: '800',
    marginBottom: '12px',
    color: '#0F4C5C',
    lineHeight: '1.45',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
  },
  newsExcerpt: {
    fontSize: '0.88rem',
    color: '#64748B',
    lineHeight: '1.7',
    marginBottom: '18px',
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
    fontSize: '0.88rem',
    marginTop: 'auto',
    transition: 'gap 0.3s ease',
  },
  // ==================== BUTTON "LIHAT SEMUA" ====================
  viewAllButtonWrapper: {
    textAlign: 'center',
    marginTop: '50px',
  },
  viewAllButton: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '10px',
    padding: '14px 38px',
    background: 'linear-gradient(135deg, #0F4C5C, #82D7DE)',
    color: '#ffffff',
    textDecoration: 'none',
    borderRadius: '50px',
    transition: 'all 0.3s ease',
    fontWeight: '700',
    fontSize: '1rem',
    border: 'none',
    cursor: 'pointer',
    boxShadow: '0 6px 20px rgba(15, 76, 92, 0.25)',
    letterSpacing: '0.3px',
  },
  // ==================== RESPONSIVE ====================
  '@media (max-width: 1024px)': {
    newsGrid: {
      gridTemplateColumns: 'repeat(2, 1fr)',
    },
  },
  '@media (max-width: 768px)': {
    carouselTitle: {
      fontSize: '2rem',
    },
    carouselDescription: {
      fontSize: '1rem',
    },
    newsGrid: {
      gridTemplateColumns: '1fr',
    },
    newsImageWrapper: {
      height: '180px',
    },
    section: {
      padding: '60px 0',
    },
    sectionTitle: {
      fontSize: '2rem',
    },
    welcomeWrapper: {
      gridTemplateColumns: '1fr',
      gap: '40px',
    },
    welcomeImage: {
      height: '300px',
    },
    welcomeImagePlaceholder: {
      height: '300px',
    },
    welcomeSection: { padding: '60px 0' },
    welcomeTitle: { fontSize: '1.6rem' },
    welcomeText: { fontSize: '0.95rem' },
    programsGrid: {
      gridTemplateColumns: '1fr',
    },
    statNumber: {
      fontSize: '2.5rem',
    },
  },
};

const Home = () => {
  const [programs, setPrograms] = useState([]);
  const [latestNews, setLatestNews] = useState([]);
  const [about, setAbout] = useState(null);
  const [heroImages, setHeroImages] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loading, setLoading] = useState(true);
  const [welcome, setWelcome] = useState(null);

  // Program scroll states
  const [programViewportWidth, setProgramViewportWidth] = useState(0);
  const [programScrollLeft, setProgramScrollLeft] = useState(0);
  const [programScrollMax, setProgramScrollMax] = useState(0);
  const [showProgramScrollButtons, setShowProgramScrollButtons] = useState(false);
  const programScrollRef = useRef(null);

  // News scroll states
  const [newsViewportWidth, setNewsViewportWidth] = useState(0);
  const [newsScrollLeft, setNewsScrollLeft] = useState(0);
  const [newsScrollMax, setNewsScrollMax] = useState(0);
  const [showNewsScrollButtons, setShowNewsScrollButtons] = useState(false);
  const newsScrollRef = useRef(null);

  // API Base URL - TANPA /api
  const API_BASE = 'http://localhost:8000';
  const BACKEND_URL = 'http://localhost:8000';

  // Fetch welcome data
  useEffect(() => {
    const fetchWelcome = async () => {
      try {
        const res = await axios.get(`${API_BASE}/welcome/`);
        setWelcome(res.data);
      } catch (error) {
        console.error('Error fetching welcome:', error);
      }
    };
    fetchWelcome();
  }, []);

  // Fetch hero images
  useEffect(() => {
    const fetchHeroImages = async () => {
      try {
        let res;
        try {
          res = await axios.get(`${API_BASE}/hero/`);
        } catch (e) {
          res = await axios.get(`${API_BASE}/hero-images/`);
        }
        if (res.data && Array.isArray(res.data)) {
          setHeroImages(res.data);
        }
      } catch (error) {
        console.error('Error fetching hero images:', error);
      }
    };
    fetchHeroImages();
  }, []);

  useEffect(() => {
    if (heroImages.length === 0) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [heroImages.length]);

  // Fetch other data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [programsRes, newsRes, aboutRes] = await Promise.all([
          axios.get(`${API_BASE}/programs/`).catch(() => ({ data: [] })),
          axios.get(`${API_BASE}/news/`).catch(() => ({ data: [] })),
          axios.get(`${API_BASE}/about/`).catch(() => ({ data: null })),
        ]);
        setPrograms(programsRes.data || []);
        setLatestNews(newsRes.data || []);
        setAbout(aboutRes.data || null);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Program scroll effect
  useEffect(() => {
    const updateProgramScroll = () => {
      const element = programScrollRef.current;
      if (!element) return;
      setProgramViewportWidth(element.clientWidth);
      setProgramScrollLeft(element.scrollLeft);
      setProgramScrollMax(Math.max(0, element.scrollWidth - element.clientWidth));
    };
    updateProgramScroll();
    window.addEventListener('resize', updateProgramScroll);
    return () => {
      window.removeEventListener('resize', updateProgramScroll);
    };
  }, [programs.length]);

  // News scroll effect
  useEffect(() => {
    const updateNewsScroll = () => {
      const element = newsScrollRef.current;
      if (!element) return;
      setNewsViewportWidth(element.clientWidth);
      setNewsScrollLeft(element.scrollLeft);
      setNewsScrollMax(Math.max(0, element.scrollWidth - element.clientWidth));
    };
    updateNewsScroll();
    window.addEventListener('resize', updateNewsScroll);
    return () => {
      window.removeEventListener('resize', updateNewsScroll);
    };
  }, [latestNews.length]);

  const updateProgramScrollState = () => {
    const element = programScrollRef.current;
    if (!element) return;
    setProgramScrollLeft(element.scrollLeft);
    setProgramScrollMax(Math.max(0, element.scrollWidth - element.clientWidth));
  };

  const updateNewsScrollState = () => {
    const element = newsScrollRef.current;
    if (!element) return;
    setNewsScrollLeft(element.scrollLeft);
    setNewsScrollMax(Math.max(0, element.scrollWidth - element.clientWidth));
  };

  const getProgramCardWidth = () => {
    const element = programScrollRef.current;
    if (!element) return 0;
    const viewportWidth = element.clientWidth;
    if (window.innerWidth > 768) {
      const gap = 30;
      return (viewportWidth - gap * 2) / 3;
    }
    const mobileGap = 20;
    return viewportWidth - mobileGap;
  };

  const getNewsCardWidth = () => {
    const element = newsScrollRef.current;
    if (!element) return 0;
    const viewportWidth = element.clientWidth;
    if (window.innerWidth > 768) {
      const gap = 30;
      return (viewportWidth - gap * 2) / 3;
    }
    const mobileGap = 20;
    return viewportWidth - mobileGap;
  };

  const scrollPrograms = (direction) => {
    const element = programScrollRef.current;
    if (!element) return;
    const gap = window.innerWidth > 768 ? 30 : 20;
    const cardWidth = getProgramCardWidth();
    if (!cardWidth) return;
    const distance = cardWidth + gap;
    element.scrollBy({
      left: direction === 'right' ? distance : -distance,
      behavior: 'smooth',
    });
  };

  const scrollNews = (direction) => {
    const element = newsScrollRef.current;
    if (!element) return;
    const gap = window.innerWidth > 768 ? 30 : 20;
    const cardWidth = getNewsCardWidth();
    if (!cardWidth) return;
    const distance = cardWidth + gap;
    element.scrollBy({
      left: direction === 'right' ? distance : -distance,
      behavior: 'smooth',
    });
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    if (heroImages.length === 0) return;
    setCurrentSlide((prev) => (prev + 1) % heroImages.length);
  };

  const prevSlide = () => {
    if (heroImages.length === 0) return;
    setCurrentSlide((prev) => (prev - 1 + heroImages.length) % heroImages.length);
  };

  const getImageUrl = (url) => {
    if (!url) return '';
    if (url.startsWith('http')) return url;
    if (url.startsWith('/uploads')) return `${BACKEND_URL}${url}`;
    return `${BACKEND_URL}${url.startsWith('/') ? '' : '/'}${url}`;
  };

  const handleCardHover = (e, isHovering) => {
    if (isHovering) {
      e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)';
      e.currentTarget.style.boxShadow = '0 20px 50px rgba(130, 215, 222, 0.25), 0 8px 20px rgba(0,0,0,0.08)';
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
      if (arrow) arrow.style.transform = 'translateX(6px)';
    } else {
      e.currentTarget.style.color = '#0F4C5C';
      if (arrow) arrow.style.transform = 'translateX(0)';
    }
  };

  const handleReadMoreHover = (e, isHovering) => {
    e.currentTarget.style.gap = isHovering ? '12px' : '6px';
  };

  const handleViewAllHover = (e, isHovering) => {
    if (isHovering) {
      e.currentTarget.style.transform = 'translateY(-4px) scale(1.03)';
      e.currentTarget.style.boxShadow = '0 12px 35px rgba(15, 76, 92, 0.4)';
      e.currentTarget.style.background = 'linear-gradient(135deg, #0A3540, #5BC0C9)';
    } else {
      e.currentTarget.style.transform = 'translateY(0) scale(1)';
      e.currentTarget.style.boxShadow = '0 6px 20px rgba(15, 76, 92, 0.25)';
      e.currentTarget.style.background = 'linear-gradient(135deg, #0F4C5C, #82D7DE)';
    }
  };

  const handleCarouselBtnHover = (e, isHovering) => {
    if (isHovering) {
      e.currentTarget.style.transform = 'translateY(-3px) scale(1.05)';
      e.currentTarget.style.boxShadow = '0 10px 30px rgba(130, 215, 222, 0.5)';
    } else {
      e.currentTarget.style.transform = 'translateY(0) scale(1)';
      e.currentTarget.style.boxShadow = '0 6px 20px rgba(130, 215, 222, 0.4)';
    }
  };

  const stats = [
    { label: about?.stat1_label || 'Tahun Pengalaman', value: about?.stat1_value || '10+' },
    { label: about?.stat2_label || 'Siswa Aktif', value: about?.stat2_value || '200+' },
    { label: about?.stat3_label || 'Program Unggulan', value: about?.stat3_value || '15+' },
    { label: about?.stat4_label || 'Tenaga Pengajar', value: about?.stat4_value || '30+' },
  ];

  const activeStats = stats.filter((stat) => stat.label && stat.value);

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '80px 20px', fontSize: '1.1rem', color: '#888' }}>
        <div style={{ fontSize: '3rem', marginBottom: '20px' }}>🎈</div>
        Memuat data...
      </div>
    );
  }

  return (
    <>
      {/* ==================== HERO CAROUSEL ==================== */}
      <div style={styles.carouselContainer}>
        {heroImages.length > 0 ? (
          heroImages.map((image, index) => (
            <div
              key={image.id}
              style={{
                ...styles.carouselSlide,
                backgroundImage: `url(${getImageUrl(image.image_url)})`,
                ...(index === currentSlide ? styles.carouselSlideActive : {}),
                opacity: index === currentSlide ? 1 : 0,
                zIndex: index === currentSlide ? 1 : 0,
              }}
            >
              <div style={styles.carouselOverlay}></div>
              <div style={styles.carouselContent}>
                <h1 style={styles.carouselTitle}>{image.title}</h1>
                <p style={styles.carouselDescription}>{image.description}</p>
                {image.link_url && (
                  <Link 
                    to={image.link_url} 
                    style={styles.carouselBtn}
                    onMouseEnter={(e) => handleCarouselBtnHover(e, true)}
                    onMouseLeave={(e) => handleCarouselBtnHover(e, false)}
                  >
                    {image.link_text || 'Lihat Selengkapnya'}
                  </Link>
                )}
              </div>
            </div>
          ))
        ) : (
          <div
            style={{
              ...styles.carouselSlide,
              ...styles.carouselSlideActive,
              background: 'linear-gradient(135deg, #0F4C5C 0%, #156272 40%, #82D7DE 100%)',
              opacity: 1,
              zIndex: 1,
            }}
          >
            <div style={styles.carouselOverlay}></div>
            <div style={styles.carouselContent}>
              <h1 style={styles.carouselTitle}>TK IT AR RAHMAN AL IKHLAS</h1>
              <p style={styles.carouselDescription}>
                Membina generasi qur'ani yang cerdas, ceria, mandiri, dan berakhlak mulia sejak usia dini.
              </p>
              <Link 
                to="/programs" 
                style={styles.carouselBtn}
                onMouseEnter={(e) => handleCarouselBtnHover(e, true)}
                onMouseLeave={(e) => handleCarouselBtnHover(e, false)}
              >
                Lihat Selengkapnya
              </Link>
            </div>
          </div>
        )}

        {heroImages.length > 1 && (
          <>
            <button
              style={{ ...styles.arrow, ...styles.arrowLeft }}
              onClick={prevSlide}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#5BC0C9';
                e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(130, 215, 222, 0.8)';
                e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
              }}
            >
              ❮
            </button>
            <button
              style={{ ...styles.arrow, ...styles.arrowRight }}
              onClick={nextSlide}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#5BC0C9';
                e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(130, 215, 222, 0.8)';
                e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
              }}
            >
              ❯
            </button>
          </>
        )}

        {heroImages.length > 1 && (
          <div style={styles.dotsContainer}>
            {heroImages.map((_, index) => (
              <div
                key={index}
                style={{
                  ...styles.dot,
                  ...(index === currentSlide ? styles.dotActive : {}),
                }}
                onClick={() => goToSlide(index)}
              />
            ))}
          </div>
        )}
      </div>

      {/* ==================== WELCOME SECTION ==================== */}
      {welcome && welcome.is_active && (
        <section style={styles.welcomeSection}>
          <div style={styles.container}>
            <div style={styles.welcomeWrapper}>
              <div style={styles.welcomeImageWrapper}>
                {welcome.image_url ? (
                  <img
                    src={getImageUrl(welcome.image_url)}
                    alt={welcome.title}
                    style={styles.welcomeImage}
                    onError={(e) => {
                      e.target.style.display = 'none';
                      const parent = e.target.parentElement;
                      const placeholder = document.createElement('div');
                      placeholder.style.cssText = `
                        width: 100%;
                        height: 420px;
                        background: linear-gradient(135deg, #82D7DE, #5BC0C9);
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        color: #fff;
                        font-size: 5rem;
                      `;
                      placeholder.textContent = '👤';
                      parent.appendChild(placeholder);
                    }}
                  />
                ) : (
                  <div style={styles.welcomeImagePlaceholder}>
                    <FaUserCircle />
                  </div>
                )}
              </div>

              <div style={styles.welcomeContent}>
                <FaQuoteLeft style={styles.welcomeQuote} />
                <h2 style={styles.welcomeTitle}>{welcome.title}</h2>
                <div style={styles.welcomeText}>
                  {welcome.content.split('\n').map((paragraph, idx) => (
                    <p key={idx} style={{ marginBottom: '12px' }}>
                      {paragraph}
                    </p>
                  ))}
                </div>
                {welcome.name && (
                  <div style={styles.welcomeAuthor}>
                    <div style={styles.welcomeName}>{welcome.name}</div>
                    <div style={styles.welcomePosition}>{welcome.position}</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ==================== PROGRAMS SECTION ==================== */}
      <section style={styles.programsSection}>
        <div style={styles.container}>
          <h2 style={styles.sectionTitle}>Program Unggulan</h2>
          <div style={styles.sectionDivider}></div>
          <p style={styles.sectionSubtitle}>
            Program pendidikan yang dirancang untuk tumbuh kembang anak secara holistik dan Islami
          </p>

          {programs.length >= 4 ? (
            <div
              style={styles.programsScrollArea}
              onMouseEnter={() => setShowProgramScrollButtons(true)}
              onMouseLeave={() => setShowProgramScrollButtons(false)}
            >
              <div
                ref={programScrollRef}
                style={styles.programsScrollViewport}
                onScroll={updateProgramScrollState}
              >
                <div
                  style={{
                    ...styles.programsScrollGrid,
                    gap: window.innerWidth > 768 ? '30px' : '20px',
                  }}
                >
                  {programs.map((program) => {
                    const cardWidth = programViewportWidth > 0 ? getProgramCardWidth() : 0;
                    return (
                      <div
                        key={program.id}
                        style={{
                          ...styles.programScrollItem,
                          width: cardWidth > 0
                            ? `${cardWidth}px`
                            : window.innerWidth > 768
                            ? 'calc((100vw - 100px) / 3)'
                            : 'calc(100vw - 60px)',
                        }}
                      >
                        <div
                          style={styles.programCard}
                          onMouseEnter={(e) => handleCardHover(e, true)}
                          onMouseLeave={(e) => handleCardHover(e, false)}
                        >
                          <div style={styles.programImageWrapper}>
                            {program.image_url ? (
                              <>
                                <img
                                  src={getImageUrl(program.image_url)}
                                  alt={program.title}
                                  style={styles.programImage}
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
                                      font-size: 4rem;
                                      font-weight: 700;
                                      border-radius: 16px;
                                    `;
                                    fallbackDiv.textContent = program.icon || '📚';
                                    parent.appendChild(fallbackDiv);
                                  }}
                                />
                                <div style={styles.programImageOverlay}></div>
                              </>
                            ) : (
                              <div style={styles.programNoImage}>
                                {program.icon || '📚'}
                              </div>
                            )}
                          </div>

                          <div style={styles.programBody}>
                            <h3 style={styles.programTitle}>{program.title}</h3>
                            <p style={styles.programDescription}>
                              {program.description?.substring(0, 120) || ''}...
                            </p>
                            <div style={styles.programFooter}>
                              <Link
                                to={`/programs/${program.id}`}
                                style={styles.programLink}
                                onMouseEnter={(e) => handleLinkHover(e, true)}
                                onMouseLeave={(e) => handleLinkHover(e, false)}
                              >
                                Lihat Selengkapnya
                                <span style={styles.programLinkArrow}>→</span>
                              </Link>
                              <span style={styles.programOrder}>#{program.order || 0}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {showProgramScrollButtons && (
                <>
                  {programScrollLeft > 5 && (
                    <button
                      type="button"
                      aria-label="Program sebelumnya"
                      title="Program sebelumnya"
                      style={{
                        ...styles.programScrollButton,
                        ...styles.programScrollButtonLeft,
                      }}
                      onClick={() => scrollPrograms('left')}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = '#82D7DE';
                        e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'linear-gradient(135deg, #0F4C5C, #15697A)';
                        e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
                      }}
                    >
                      ❮
                    </button>
                  )}
                  {programScrollLeft < programScrollMax - 5 && (
                    <button
                      type="button"
                      aria-label="Program berikutnya"
                      title="Lihat program berikutnya"
                      style={{
                        ...styles.programScrollButton,
                        ...styles.programScrollButtonRight,
                      }}
                      onClick={() => scrollPrograms('right')}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = '#82D7DE';
                        e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'linear-gradient(135deg, #0F4C5C, #15697A)';
                        e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
                      }}
                    >
                      ❯
                    </button>
                  )}
                </>
              )}
            </div>
          ) : (
            <div style={styles.programsGrid}>
              {programs.map((program) => (
                <div
                  key={program.id}
                  style={styles.programCard}
                  onMouseEnter={(e) => handleCardHover(e, true)}
                  onMouseLeave={(e) => handleCardHover(e, false)}
                >
                  <div style={styles.programImageWrapper}>
                    {program.image_url ? (
                      <>
                        <img
                          src={getImageUrl(program.image_url)}
                          alt={program.title}
                          style={styles.programImage}
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
                              font-size: 4rem;
                              font-weight: 700;
                              border-radius: 16px;
                            `;
                            fallbackDiv.textContent = program.icon || '📚';
                            parent.appendChild(fallbackDiv);
                          }}
                        />
                        <div style={styles.programImageOverlay}></div>
                      </>
                    ) : (
                      <div style={styles.programNoImage}>
                        {program.icon || '📚'}
                      </div>
                    )}
                  </div>

                  <div style={styles.programBody}>
                    <h3 style={styles.programTitle}>{program.title}</h3>
                    <p style={styles.programDescription}>
                      {program.description?.substring(0, 120) || ''}...
                    </p>
                    <div style={styles.programFooter}>
                      <Link
                        to={`/programs/${program.id}`}
                        style={styles.programLink}
                        onMouseEnter={(e) => handleLinkHover(e, true)}
                        onMouseLeave={(e) => handleLinkHover(e, false)}
                      >
                        Lihat Selengkapnya
                        <span style={styles.programLinkArrow}>→</span>
                      </Link>
                      <span style={styles.programOrder}>#{program.order || 0}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {programs.length > 3 && (
            <div style={styles.viewAllButtonWrapper}>
              <Link
                to="/programs"
                style={styles.viewAllButton}
                onMouseEnter={(e) => handleViewAllHover(e, true)}
                onMouseLeave={(e) => handleViewAllHover(e, false)}
              >
                Lihat Semua Program
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* ==================== STATS SECTION ==================== */}
      <section style={styles.statsSection}>
        <div style={styles.container}>
          <div style={styles.statsGrid}>
            {activeStats.map((stat, index) => (
              <div 
                key={index} 
                style={styles.statItem}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px) scale(1.03)';
                  e.currentTarget.style.background = 'rgba(255,255,255,0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                }}
              >
                <div style={styles.statNumber}>{stat.value}</div>
                <div style={styles.statLabel}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== NEWS SECTION ==================== */}
      <section style={styles.newsSection}>
        <div style={styles.container}>
          <h2 style={styles.sectionTitle}>Berita Terkini</h2>
          <div style={styles.sectionDivider}></div>
          <p style={styles.sectionSubtitle}>
            Ikuti perkembangan terbaru dari TK IT AR RAHMAN AL IKHLAS
          </p>

          {latestNews.length > 3 ? (
            <div
              style={styles.newsScrollArea}
              onMouseEnter={() => setShowNewsScrollButtons(true)}
              onMouseLeave={() => setShowNewsScrollButtons(false)}
            >
              <div
                ref={newsScrollRef}
                style={styles.newsScrollViewport}
                onScroll={updateNewsScrollState}
              >
                <div
                  style={{
                    ...styles.newsScrollGrid,
                    gap: window.innerWidth > 768 ? '30px' : '20px',
                  }}
                >
                  {latestNews.map((news) => {
                    const cardWidth = newsViewportWidth > 0 ? getNewsCardWidth() : 0;
                    return (
                      <div
                        key={news.id}
                        style={{
                          ...styles.newsScrollItem,
                          width: cardWidth > 0
                            ? `${cardWidth}px`
                            : window.innerWidth > 768
                            ? 'calc((100vw - 100px) / 3)'
                            : 'calc(100vw - 60px)',
                        }}
                      >
                        <div
                          style={styles.newsCard}
                          onMouseEnter={(e) => handleCardHover(e, true)}
                          onMouseLeave={(e) => handleCardHover(e, false)}
                        >
                          <div style={styles.newsImageWrapper}>
                            {news.hero_image ? (
                              <>
                                <img
                                  src={getImageUrl(news.hero_image)}
                                  alt={news.title}
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
                              <div style={styles.newsNoImage}>
                                📰
                              </div>
                            )}
                          </div>

                          <div style={styles.newsContent}>
                            <div style={styles.newsDate}>
                              {new Date(news.date || news.created_at || Date.now()).toLocaleDateString('id-ID', {
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric',
                              })}
                            </div>
                            <h3 style={styles.newsTitle}>{news.title}</h3>
                            <p style={styles.newsExcerpt}>
                              {news.excerpt || news.content?.substring(0, 120) || ''}...
                            </p>
                            <Link
                              to={`/news/${news.id}`}
                              style={styles.readMore}
                              onMouseEnter={(e) => handleReadMoreHover(e, true)}
                              onMouseLeave={(e) => handleReadMoreHover(e, false)}
                            >
                              Baca Selengkapnya <span>→</span>
                            </Link>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {showNewsScrollButtons && (
                <>
                  {newsScrollLeft > 5 && (
                    <button
                      type="button"
                      aria-label="Berita sebelumnya"
                      title="Berita sebelumnya"
                      style={{
                        ...styles.newsScrollButton,
                        ...styles.newsScrollButtonLeft,
                      }}
                      onClick={() => scrollNews('left')}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = '#82D7DE';
                        e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'linear-gradient(135deg, #0F4C5C, #15697A)';
                        e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
                      }}
                    >
                      ❮
                    </button>
                  )}
                  {newsScrollLeft < newsScrollMax - 5 && (
                    <button
                      type="button"
                      aria-label="Berita berikutnya"
                      title="Lihat berita berikutnya"
                      style={{
                        ...styles.newsScrollButton,
                        ...styles.newsScrollButtonRight,
                      }}
                      onClick={() => scrollNews('right')}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = '#82D7DE';
                        e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'linear-gradient(135deg, #0F4C5C, #15697A)';
                        e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
                      }}
                    >
                      ❯
                    </button>
                  )}
                </>
              )}
            </div>
          ) : (
            <div style={styles.newsGrid}>
              {latestNews.map((news) => (
                <div
                  key={news.id}
                  style={styles.newsCard}
                  onMouseEnter={(e) => handleCardHover(e, true)}
                  onMouseLeave={(e) => handleCardHover(e, false)}
                >
                  <div style={styles.newsImageWrapper}>
                    {news.hero_image ? (
                      <>
                        <img
                          src={getImageUrl(news.hero_image)}
                          alt={news.title}
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
                      <div style={styles.newsNoImage}>
                        📰
                      </div>
                    )}
                  </div>

                  <div style={styles.newsContent}>
                    <div style={styles.newsDate}>
                      {new Date(news.date || news.created_at || Date.now()).toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </div>
                    <h3 style={styles.newsTitle}>{news.title}</h3>
                    <p style={styles.newsExcerpt}>
                      {news.excerpt || news.content?.substring(0, 120) || ''}...
                    </p>
                    <Link
                      to={`/news/${news.id}`}
                      style={styles.readMore}
                      onMouseEnter={(e) => handleReadMoreHover(e, true)}
                      onMouseLeave={(e) => handleReadMoreHover(e, false)}
                    >
                      Baca Selengkapnya <span>→</span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}

          {latestNews.length > 3 && (
            <div style={styles.viewAllButtonWrapper}>
              <Link
                to="/news"
                style={styles.viewAllButton}
                onMouseEnter={(e) => handleViewAllHover(e, true)}
                onMouseLeave={(e) => handleViewAllHover(e, false)}
              >
                Lihat Semua Berita
              </Link>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Home;