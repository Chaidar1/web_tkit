import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { 
  FaPhone, 
  FaEnvelope, 
  FaMapMarkerAlt, 
  FaClock,
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaHome,
  FaBook,
  FaNewspaper,
  FaEnvelope as FaContact,
  FaGraduationCap,
  FaHeart,
  FaArrowRight,
  FaStar
} from 'react-icons/fa';
import { useResponsive } from '../hooks/useResponsive';

const styles = {
  footer: {
    background: 'linear-gradient(135deg, #0F4C5C 0%, #0A3540 50%, #0F4C5C 100%)',
    color: '#ffffff',
    padding: '70px 0 30px',
    marginTop: '80px',
    position: 'relative',
    overflow: 'hidden',
  },
  decorCircle1: {
    position: 'absolute',
    top: '-100px',
    right: '-100px',
    width: '300px',
    height: '300px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(130, 215, 222, 0.08) 0%, transparent 70%)',
    pointerEvents: 'none',
  },
  decorCircle2: {
    position: 'absolute',
    bottom: '-100px',
    left: '-100px',
    width: '350px',
    height: '350px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(130, 215, 222, 0.06) 0%, transparent 70%)',
    pointerEvents: 'none',
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 20px',
    position: 'relative',
    zIndex: 2,
  },
  content: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
    gap: '35px',
    marginBottom: '45px',
  },
  logoSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '18px',
  },
  logoWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
  },
  logoImageWrapper: {
    width: '60px',
    height: '60px',
    background: '#ffffff',
    borderRadius: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '6px',
    boxShadow: '0 8px 25px rgba(130, 215, 222, 0.3)',
    flexShrink: 0,
  },
  logoImage: {
    height: '100%',
    width: '100%',
    objectFit: 'contain',
    borderRadius: '10px',
  },
  logoTextWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  logoText: {
    fontSize: '1.05rem',
    fontWeight: '800',
    lineHeight: 1.2,
    color: '#82D7DE',
    letterSpacing: '-0.3px',
  },
  logoSubText: {
    fontSize: '0.7rem',
    fontWeight: '600',
    color: 'rgba(130, 215, 222, 0.7)',
    letterSpacing: '1px',
    textTransform: 'uppercase',
  },
  description: {
    opacity: 0.85,
    lineHeight: '1.8',
    fontSize: '0.88rem',
    marginTop: '5px',
    position: 'relative',
    paddingLeft: '18px',
  },
  descriptionBar: {
    position: 'absolute',
    left: 0,
    top: '5px',
    width: '4px',
    height: 'calc(100% - 10px)',
    background: 'linear-gradient(180deg, #82D7DE, #5BC0C9)',
    borderRadius: '4px',
  },
  heading4: {
    marginBottom: '22px',
    fontSize: '1.1rem',
    fontWeight: '800',
    position: 'relative',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    paddingBottom: '12px',
    color: '#82D7DE',
    letterSpacing: '-0.3px',
  },
  headingUnderline: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '50px',
    height: '3px',
    background: 'linear-gradient(90deg, #82D7DE, #5BC0C9)',
    borderRadius: '3px',
  },
  headingIcon: {
    fontSize: '0.9rem',
    color: '#82D7DE',
  },
  contactItem: {
    marginBottom: '14px',
    opacity: 0.85,
    lineHeight: '1.6',
    fontSize: '0.88rem',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    transition: 'all 0.3s ease',
  },
  contactIconWrapper: {
    width: '36px',
    height: '36px',
    background: 'rgba(130, 215, 222, 0.15)',
    borderRadius: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    border: '1px solid rgba(130, 215, 222, 0.2)',
  },
  contactIcon: {
    fontSize: '0.85rem',
    color: '#82D7DE',
  },
  contactText: {
    flex: 1,
  },
  socialLinksWrapper: {
    marginTop: '22px',
    paddingTop: '18px',
    borderTop: '1px solid rgba(130, 215, 222, 0.15)',
  },
  socialLabel: {
    fontSize: '0.82rem',
    opacity: 0.75,
    marginBottom: '12px',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontWeight: '600',
  },
  socialLinks: {
    display: 'flex',
    gap: '10px',
  },
  socialLink: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '40px',
    height: '40px',
    background: 'rgba(130, 215, 222, 0.15)',
    borderRadius: '12px',
    color: '#ffffff',
    textDecoration: 'none',
    transition: 'all 0.3s ease',
    fontSize: '1rem',
    border: '1px solid rgba(130, 215, 222, 0.2)',
  },
  quickLinks: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  quickLink: {
    color: '#ffffff',
    textDecoration: 'none',
    opacity: 0.8,
    transition: 'all 0.3s ease',
    fontSize: '0.88rem',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '6px 0',
    position: 'relative',
  },
  quickLinkIconWrapper: {
    width: '28px',
    height: '28px',
    background: 'rgba(130, 215, 222, 0.1)',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    transition: 'all 0.3s ease',
  },
  quickLinkIcon: {
    color: '#82D7DE',
    fontSize: '0.75rem',
  },
  quickLinkArrow: {
    marginLeft: 'auto',
    fontSize: '0.7rem',
    opacity: 0,
    transition: 'all 0.3s ease',
    color: '#82D7DE',
  },
  bottomWrapper: {
    borderTop: '1px solid rgba(130, 215, 222, 0.15)',
    paddingTop: '25px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  bottom: {
    fontSize: '0.85rem',
    opacity: 0.8,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    flexWrap: 'wrap',
    color: 'rgba(255, 255, 255, 0.85)',
  },
  bottomBrand: {
    color: '#82D7DE',
    fontWeight: '700',
  },
};

const API_BASE = 'http://localhost:8000';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [contact, setContact] = useState(null);
  const [footer, setFooter] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [contactRes, footerRes] = await Promise.all([
          axios.get(`${API_BASE}/contact/`).catch(() => ({ data: null })),
          axios.get(`${API_BASE}/footer/`).catch(() => ({ data: null })),
        ]);

        if (contactRes.data) setContact(contactRes.data);
        if (footerRes.data) setFooter(footerRes.data);
      } catch (error) {
        console.error('Error fetching data for footer:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const description = footer?.description || "Membina generasi qur'ani yang cerdas, ceria, mandiri, dan berakhlak mulia sejak usia dini.";
  const copyrightText = footer?.copyright_text || "TK IT AR RAHMAN AL IKHLAS";

  const facebookUrl = footer?.facebook_url || contact?.facebook_url;
  const instagramUrl = footer?.instagram_url || contact?.instagram_url;
  const youtubeUrl = footer?.youtube_url || contact?.youtube_url;

  const hasSocialMedia = facebookUrl || instagramUrl || youtubeUrl;

  const handleSocialHover = (e, color) => {
    e.currentTarget.style.background = color;
    e.currentTarget.style.transform = 'translateY(-5px) scale(1.1)';
    e.currentTarget.style.borderColor = color;
  };

  const handleSocialLeave = (e) => {
    e.currentTarget.style.background = 'rgba(130, 215, 222, 0.15)';
    e.currentTarget.style.transform = 'translateY(0) scale(1)';
    e.currentTarget.style.borderColor = 'rgba(130, 215, 222, 0.2)';
  };

  const handleLinkHover = (e, isHover) => {
    const arrow = e.currentTarget.querySelector('.arrow');
    const iconWrapper = e.currentTarget.querySelector('.icon-wrapper');
    
    if (isHover) {
      e.currentTarget.style.opacity = '1';
      e.currentTarget.style.transform = 'translateX(8px)';
      e.currentTarget.style.color = '#82D7DE';
      if (arrow) {
        arrow.style.opacity = '1';
        arrow.style.transform = 'translateX(0)';
      }
      if (iconWrapper) {
        iconWrapper.style.background = 'rgba(130, 215, 222, 0.25)';
      }
    } else {
      e.currentTarget.style.opacity = '0.8';
      e.currentTarget.style.transform = 'translateX(0)';
      e.currentTarget.style.color = '#ffffff';
      if (arrow) {
        arrow.style.opacity = '0';
        arrow.style.transform = 'translateX(-5px)';
      }
      if (iconWrapper) {
        iconWrapper.style.background = 'rgba(130, 215, 222, 0.1)';
      }
    }
  };

  const handleContactHover = (e, isHovering) => {
    if (isHovering) {
      e.currentTarget.style.opacity = '1';
      e.currentTarget.style.transform = 'translateX(5px)';
    } else {
      e.currentTarget.style.opacity = '0.85';
      e.currentTarget.style.transform = 'translateX(0)';
    }
  };

  return (
    <footer style={styles.footer}>
      <div style={styles.decorCircle1}></div>
      <div style={styles.decorCircle2}></div>

      <div style={styles.container}>
        <div style={styles.content}>
          {/* KOLOM 1: LOGO & DESKRIPSI */}
          <div style={styles.logoSection}>
            <div style={styles.logoWrapper}>
              <div style={styles.logoImageWrapper}>
                <img 
                  src="/Logo TK.png" 
                  alt="Logo TK IT AR RAHMAN AL IKHLAS" 
                  style={styles.logoImage}
                  onError={(e) => {
                    e.target.src = '/vite.svg';
                  }}
                />
              </div>
              <div style={styles.logoTextWrapper}>
                <div style={styles.logoText}>
                  TK IT AR RAHMAN
                </div>
                <div style={styles.logoSubText}>
                  AL IKHLAS
                </div>
              </div>
            </div>
            <div style={styles.description}>
              <div style={styles.descriptionBar}></div>
              {description}
            </div>
          </div>

          {/* KOLOM 2: KONTAK */}
          <div>
            <h4 style={styles.heading4}>
              <FaPhone style={styles.headingIcon} />
              Kontak Kami
              <span style={styles.headingUnderline}></span>
            </h4>
            
            <div 
              style={styles.contactItem}
              onMouseEnter={(e) => handleContactHover(e, true)}
              onMouseLeave={(e) => handleContactHover(e, false)}
            >
              <div style={styles.contactIconWrapper}>
                <FaPhone style={styles.contactIcon} />
              </div>
              <span style={styles.contactText}>{contact?.phone || '(021) 7654321'}</span>
            </div>
            
            <div 
              style={styles.contactItem}
              onMouseEnter={(e) => handleContactHover(e, true)}
              onMouseLeave={(e) => handleContactHover(e, false)}
            >
              <div style={styles.contactIconWrapper}>
                <FaEnvelope style={styles.contactIcon} />
              </div>
              <span style={styles.contactText}>{contact?.email || 'info@tkarrahman.sch.id'}</span>
            </div>
            
            <div 
              style={styles.contactItem}
              onMouseEnter={(e) => handleContactHover(e, true)}
              onMouseLeave={(e) => handleContactHover(e, false)}
            >
              <div style={styles.contactIconWrapper}>
                <FaMapMarkerAlt style={styles.contactIcon} />
              </div>
              <span style={styles.contactText}>{contact?.address || 'Jakarta, Indonesia'}</span>
            </div>
            
            <div 
              style={styles.contactItem}
              onMouseEnter={(e) => handleContactHover(e, true)}
              onMouseLeave={(e) => handleContactHover(e, false)}
            >
              <div style={styles.contactIconWrapper}>
                <FaClock style={styles.contactIcon} />
              </div>
              <span style={styles.contactText}>{contact?.jam_operasional || '07.00 - 16.00 WIB'}</span>
            </div>
            
            {hasSocialMedia && (
              <div style={styles.socialLinksWrapper}>
                <span style={styles.socialLabel}>
                  <FaHeart style={{ color: '#FF6B6B', fontSize: '0.75rem' }} />
                  Ikuti kami:
                </span>
                <div style={styles.socialLinks}>
                  {facebookUrl && (
                    <a 
                      href={facebookUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      style={styles.socialLink}
                      onMouseEnter={(e) => handleSocialHover(e, '#1877F2')}
                      onMouseLeave={handleSocialLeave}
                      title="Facebook"
                    >
                      <FaFacebookF />
                    </a>
                  )}
                  {instagramUrl && (
                    <a 
                      href={instagramUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      style={styles.socialLink}
                      onMouseEnter={(e) => handleSocialHover(e, '#E4405F')}
                      onMouseLeave={handleSocialLeave}
                      title="Instagram"
                    >
                      <FaInstagram />
                    </a>
                  )}
                  {youtubeUrl && (
                    <a 
                      href={youtubeUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      style={styles.socialLink}
                      onMouseEnter={(e) => handleSocialHover(e, '#FF0000')}
                      onMouseLeave={handleSocialLeave}
                      title="YouTube"
                    >
                      <FaYoutube />
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* KOLOM 3: TAUTAN CEPAT */}
          <div>
            <h4 style={styles.heading4}>
              <FaStar style={styles.headingIcon} />
              Tautan Cepat
              <span style={styles.headingUnderline}></span>
            </h4>
            <div style={styles.quickLinks}>
              <Link 
                to="/" 
                style={styles.quickLink}
                onMouseEnter={(e) => handleLinkHover(e, true)}
                onMouseLeave={(e) => handleLinkHover(e, false)}
              >
                <span className="icon-wrapper" style={styles.quickLinkIconWrapper}>
                  <FaHome style={styles.quickLinkIcon} />
                </span>
                Beranda
                <FaArrowRight className="arrow" style={styles.quickLinkArrow} />
              </Link>
              
              <Link 
                to="/about" 
                style={styles.quickLink}
                onMouseEnter={(e) => handleLinkHover(e, true)}
                onMouseLeave={(e) => handleLinkHover(e, false)}
              >
                <span className="icon-wrapper" style={styles.quickLinkIconWrapper}>
                  <FaBook style={styles.quickLinkIcon} />
                </span>
                Tentang Kami
                <FaArrowRight className="arrow" style={styles.quickLinkArrow} />
              </Link>
              
              <Link 
                to="/programs" 
                style={styles.quickLink}
                onMouseEnter={(e) => handleLinkHover(e, true)}
                onMouseLeave={(e) => handleLinkHover(e, false)}
              >
                <span className="icon-wrapper" style={styles.quickLinkIconWrapper}>
                  <FaGraduationCap style={styles.quickLinkIcon} />
                </span>
                Program
                <FaArrowRight className="arrow" style={styles.quickLinkArrow} />
              </Link>
              
              <Link 
                to="/news" 
                style={styles.quickLink}
                onMouseEnter={(e) => handleLinkHover(e, true)}
                onMouseLeave={(e) => handleLinkHover(e, false)}
              >
                <span className="icon-wrapper" style={styles.quickLinkIconWrapper}>
                  <FaNewspaper style={styles.quickLinkIcon} />
                </span>
                Berita
                <FaArrowRight className="arrow" style={styles.quickLinkArrow} />
              </Link>
              
              <Link 
                to="/contact" 
                style={styles.quickLink}
                onMouseEnter={(e) => handleLinkHover(e, true)}
                onMouseLeave={(e) => handleLinkHover(e, false)}
              >
                <span className="icon-wrapper" style={styles.quickLinkIconWrapper}>
                  <FaContact style={styles.quickLinkIcon} />
                </span>
                Kontak
                <FaArrowRight className="arrow" style={styles.quickLinkArrow} />
              </Link>
            </div>
          </div>
        </div>

        {/* ==================== BOTTOM (CENTERED) ==================== */}
        <div style={styles.bottomWrapper}>
          <div style={styles.bottom}>
            <span>&copy; {currentYear}</span>
            <span style={styles.bottomBrand}>{copyrightText}</span>
            <span>. All rights reserved.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;