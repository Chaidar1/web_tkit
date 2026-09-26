import React, { useEffect, useState } from 'react';
import { contactAPI } from '../services/api';
import { 
  FaMapMarkerAlt, 
  FaPhone, 
  FaEnvelope, 
  FaClock, 
  FaFacebook, 
  FaInstagram, 
  FaYoutube,
  FaGlobe,
  FaExternalLinkAlt,
  FaHeart
} from 'react-icons/fa';

const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 20px',
  },
  section: {
    padding: '70px 0 80px 0',
    background: 'linear-gradient(180deg, #f0fafb 0%, #ffffff 50%, #f0fafb 100%)',
    position: 'relative',
    overflow: 'hidden',
  },
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
  contactWrapper: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '30px',
  },
  infoCard: {
    background: '#ffffff',
    borderRadius: '30px',
    padding: '45px 45px',
    boxShadow: '0 25px 70px rgba(130, 215, 222, 0.15), 0 4px 12px rgba(0,0,0,0.04)',
    border: '2px solid rgba(130, 215, 222, 0.2)',
    transition: 'all 0.3s ease',
    position: 'relative',
    overflow: 'hidden',
  },
  infoCardDecor: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: '150px',
    height: '150px',
    background: 'radial-gradient(circle, rgba(130, 215, 222, 0.1) 0%, transparent 70%)',
    pointerEvents: 'none',
  },
  infoTitleWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
    marginBottom: '10px',
  },
  infoTitleIcon: {
    width: '50px',
    height: '50px',
    background: 'linear-gradient(135deg, #82D7DE, #5BC0C9)',
    borderRadius: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#ffffff',
    fontSize: '1.4rem',
    boxShadow: '0 8px 25px rgba(130, 215, 222, 0.35)',
  },
  infoTitle: {
    fontSize: '1.5rem',
    fontWeight: '800',
    color: '#0F4C5C',
    margin: 0,
  },
  infoDivider: {
    width: '60px',
    height: '4px',
    background: 'linear-gradient(90deg, #82D7DE, #5BC0C9)',
    marginBottom: '30px',
    borderRadius: '4px',
  },
  infoItem: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '16px',
    padding: '18px 0',
    borderBottom: '2px solid #F0FAFB',
    transition: 'all 0.3s ease',
  },
  infoItemLast: {
    borderBottom: 'none',
    paddingBottom: '0',
  },
  infoIconWrapper: {
    width: '48px',
    height: '48px',
    background: 'linear-gradient(135deg, #F0FAFB, #E0F5F7)',
    borderRadius: '14px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#82D7DE',
    fontSize: '1.15rem',
    flexShrink: 0,
    border: '2px solid rgba(130, 215, 222, 0.25)',
  },
  infoContent: {
    flex: 1,
  },
  infoLabel: {
    fontSize: '0.75rem',
    color: '#82D7DE',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    fontWeight: '700',
    marginBottom: '4px',
  },
  infoValue: {
    fontSize: '0.98rem',
    color: '#0F4C5C',
    fontWeight: '600',
    lineHeight: '1.6',
  },
  jamItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '5px 0',
  },
  jamLabel: {
    fontSize: '0.85rem',
    color: '#64748B',
    minWidth: '105px',
    fontWeight: '600',
  },
  jamValue: {
    fontSize: '0.92rem',
    color: '#0F4C5C',
    fontWeight: '700',
  },
  jamLibur: {
    fontSize: '0.92rem',
    color: '#94A3B8',
    fontStyle: 'italic',
    fontWeight: '500',
  },
  socialSection: {
    marginTop: '25px',
    paddingTop: '25px',
    borderTop: '2px solid #F0FAFB',
  },
  socialTitle: {
    fontSize: '0.85rem',
    fontWeight: '700',
    color: '#0F4C5C',
    marginBottom: '15px',
    letterSpacing: '0.5px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  socialLinks: {
    display: 'flex',
    gap: '12px',
  },
  socialLink: {
    width: '46px',
    height: '46px',
    borderRadius: '14px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
    textDecoration: 'none',
    transition: 'all 0.3s ease',
    fontSize: '1.1rem',
    boxShadow: '0 6px 18px rgba(0,0,0,0.1)',
  },
  mapCard: {
    background: '#ffffff',
    borderRadius: '30px',
    padding: '45px 45px',
    boxShadow: '0 25px 70px rgba(130, 215, 222, 0.15), 0 4px 12px rgba(0,0,0,0.04)',
    border: '2px solid rgba(130, 215, 222, 0.2)',
    display: 'flex',
    flexDirection: 'column',
    transition: 'all 0.3s ease',
    position: 'relative',
    overflow: 'hidden',
  },
  mapCardDecor: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '150px',
    height: '150px',
    background: 'radial-gradient(circle, rgba(130, 215, 222, 0.1) 0%, transparent 70%)',
    pointerEvents: 'none',
  },
  mapTitleWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
    marginBottom: '10px',
  },
  mapTitleIcon: {
    width: '50px',
    height: '50px',
    background: 'linear-gradient(135deg, #82D7DE, #5BC0C9)',
    borderRadius: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#ffffff',
    fontSize: '1.4rem',
    boxShadow: '0 8px 25px rgba(130, 215, 222, 0.35)',
  },
  mapTitle: {
    fontSize: '1.5rem',
    fontWeight: '800',
    color: '#0F4C5C',
    margin: 0,
  },
  mapContainer: {
    position: 'relative',
    width: '100%',
    minHeight: '400px',
    height: '400px',
    borderRadius: '20px',
    overflow: 'hidden',
    background: '#f0f0f0',
    boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.04)',
    border: '2px solid #F0FAFB',
  },
  mapIframe: {
    width: '100%',
    height: '100%',
    border: 0,
    display: 'block',
  },
  mapPlaceholder: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#64748B',
    fontSize: '1rem',
    gap: '12px',
    background: 'linear-gradient(135deg, #F0FAFB, #E0F5F7)',
    minHeight: '400px',
  },
  mapPlaceholderIcon: {
    fontSize: '4rem',
    color: '#82D7DE',
    opacity: 0.5,
  },
  mapButton: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    marginTop: '25px',
    padding: '14px 32px',
    background: 'linear-gradient(135deg, #0F4C5C, #82D7DE)',
    color: '#ffffff',
    textDecoration: 'none',
    borderRadius: '14px',
    fontSize: '0.95rem',
    fontWeight: '700',
    transition: 'all 0.3s ease',
    border: 'none',
    cursor: 'pointer',
    boxShadow: '0 8px 25px rgba(15, 76, 92, 0.25)',
  },
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
  loadingWrapper: {
    textAlign: 'center',
    padding: '100px 20px',
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
  '@media (max-width: 968px)': {
    contactWrapper: {
      gridTemplateColumns: '1fr',
      gap: '35px',
    },
  },
  '@media (max-width: 768px)': {
    sectionTitle: { fontSize: '2rem' },
    section: { padding: '50px 0 60px 0' },
    infoCard: { padding: '30px 25px' },
    mapCard: { padding: '30px 25px' },
    infoTitle: { fontSize: '1.25rem' },
    mapTitle: { fontSize: '1.25rem' },
    infoTitleIcon: { width: '42px', height: '42px', fontSize: '1.15rem' },
    mapTitleIcon: { width: '42px', height: '42px', fontSize: '1.15rem' },
    jamLabel: { minWidth: '85px', fontSize: '0.8rem' },
    jamItem: { flexWrap: 'wrap' },
    jamValue: { fontSize: '0.85rem' },
    infoIconWrapper: { width: '42px', height: '42px', fontSize: '1rem' },
    infoValue: { fontSize: '0.9rem' },
    socialLink: { width: '42px', height: '42px', fontSize: '1rem' },
    mapButton: { padding: '12px 24px', fontSize: '0.88rem' },
    mapContainer: { minHeight: '300px', height: '300px' },
    mapPlaceholder: { minHeight: '300px' },
    decorativeCircle1: { display: 'none' },
    decorativeCircle2: { display: 'none' },
  },
};

const Contact = () => {
  const [contact, setContact] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContact = async () => {
      try {
        setLoading(true);
        const res = await contactAPI.getContact();
        console.log('Contact data:', res.data);
        setContact(res.data);
      } catch (error) {
        console.error('Error fetching contact:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchContact();
  }, []);

  const getMapUrl = (lat, lng) => {
    if (!lat || !lng) return null;
    return `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lng}#map=15/${lat}/${lng}`;
  };

  const getMapEmbedUrl = (lat, lng) => {
    if (!lat || !lng) return null;
    const latitude = parseFloat(lat);
    const longitude = parseFloat(lng);
    const bbox = `${longitude - 0.01},${latitude - 0.01},${longitude + 0.01},${latitude + 0.01}`;
    return `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${latitude},${longitude}`;
  };

  const hasLocation = contact?.latitude && contact?.longitude;
  const mapLink = hasLocation ? getMapUrl(contact.latitude, contact.longitude) : null;
  const mapEmbedUrl = hasLocation ? getMapEmbedUrl(contact.latitude, contact.longitude) : null;

  if (loading) {
    return (
      <div style={styles.loadingWrapper}>
        <div style={styles.loadingIcon}>📌</div>
        <div style={styles.loadingText}>Memuat data kontak...</div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <section style={styles.section}>
        <div style={styles.decorativeCircle1}></div>
        <div style={styles.decorativeCircle2}></div>

        <div style={styles.headerWrapper}>
          <div style={styles.headerIcon}>📞</div>
          <h1 style={styles.sectionTitle}>Hubungi Kami</h1>
          <div style={styles.sectionDivider}></div>
          <p style={styles.sectionSubtitle}>
            Sampaikan pesan dan pertanyaan Anda kepada kami. Kami siap membantu!
          </p>
          <div style={styles.subtitleHighlight}>
            💬 TK IT AR RAHMAN AL IKHLAS 💬
          </div>
        </div>
        
        <div style={styles.contactWrapper}>
          <div style={styles.infoCard}>
            <div style={styles.infoCardDecor}></div>
            <div style={styles.infoTitleWrapper}>
              <div style={styles.infoTitleIcon}>
                <FaMapMarkerAlt />
              </div>
              <h2 style={styles.infoTitle}>Informasi Kontak</h2>
            </div>
            <div style={styles.infoDivider}></div>

            {contact?.address && (
              <div style={styles.infoItem}>
                <div style={styles.infoIconWrapper}>
                  <FaMapMarkerAlt />
                </div>
                <div style={styles.infoContent}>
                  <div style={styles.infoLabel}>Alamat</div>
                  <div style={styles.infoValue}>{contact.address}</div>
                </div>
              </div>
            )}

            {contact?.phone && (
              <div style={styles.infoItem}>
                <div style={styles.infoIconWrapper}>
                  <FaPhone />
                </div>
                <div style={styles.infoContent}>
                  <div style={styles.infoLabel}>Telepon</div>
                  <div style={styles.infoValue}>{contact.phone}</div>
                </div>
              </div>
            )}

            {contact?.email && (
              <div style={styles.infoItem}>
                <div style={styles.infoIconWrapper}>
                  <FaEnvelope />
                </div>
                <div style={styles.infoContent}>
                  <div style={styles.infoLabel}>Email</div>
                  <div style={styles.infoValue}>{contact.email}</div>
                </div>
              </div>
            )}

            <div style={{ ...styles.infoItem, ...styles.infoItemLast }}>
              <div style={styles.infoIconWrapper}>
                <FaClock />
              </div>
              <div style={styles.infoContent}>
                <div style={styles.infoLabel}>Jam Operasional</div>
                {contact?.jam_operasional && (
                  <div style={styles.jamItem}>
                    <span style={styles.jamLabel}>Senin - Jumat</span>
                    <span style={styles.jamValue}>{contact.jam_operasional}</span>
                  </div>
                )}
                {contact?.jam_operasional_sabtu ? (
                  <div style={styles.jamItem}>
                    <span style={styles.jamLabel}>Sabtu</span>
                    <span style={styles.jamValue}>{contact.jam_operasional_sabtu}</span>
                  </div>
                ) : (
                  <div style={styles.jamItem}>
                    <span style={styles.jamLabel}>Sabtu</span>
                    <span style={styles.jamLibur}>Libur</span>
                  </div>
                )}
                {contact?.hari_libur && (
                  <div style={styles.jamItem}>
                    <span style={styles.jamLabel}>Libur</span>
                    <span style={styles.jamValue}>{contact.hari_libur}</span>
                  </div>
                )}
              </div>
            </div>

            {(contact?.facebook_url || contact?.instagram_url || contact?.youtube_url) && (
              <div style={styles.socialSection}>
                <div style={styles.socialTitle}>
                  <FaHeart style={{ color: '#82D7DE' }} /> Ikuti Kami
                </div>
                <div style={styles.socialLinks}>
                  {contact?.facebook_url && (
                    <a 
                      href={contact.facebook_url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      style={{...styles.socialLink, background: '#1877F2'}}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-5px) scale(1.1)';
                        e.currentTarget.style.boxShadow = '0 12px 30px rgba(24, 119, 242, 0.4)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0) scale(1)';
                        e.currentTarget.style.boxShadow = '0 6px 18px rgba(0,0,0,0.1)';
                      }}
                    >
                      <FaFacebook />
                    </a>
                  )}
                  {contact?.instagram_url && (
                    <a 
                      href={contact.instagram_url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      style={{...styles.socialLink, background: 'radial-gradient(circle at 30% 110%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%)'}}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-5px) scale(1.1)';
                        e.currentTarget.style.boxShadow = '0 12px 30px rgba(214, 36, 159, 0.4)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0) scale(1)';
                        e.currentTarget.style.boxShadow = '0 6px 18px rgba(0,0,0,0.1)';
                      }}
                    >
                      <FaInstagram />
                    </a>
                  )}
                  {contact?.youtube_url && (
                    <a 
                      href={contact.youtube_url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      style={{...styles.socialLink, background: '#FF0000'}}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-5px) scale(1.1)';
                        e.currentTarget.style.boxShadow = '0 12px 30px rgba(255, 0, 0, 0.4)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0) scale(1)';
                        e.currentTarget.style.boxShadow = '0 6px 18px rgba(0,0,0,0.1)';
                      }}
                    >
                      <FaYoutube />
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>

          <div style={styles.mapCard}>
            <div style={styles.mapCardDecor}></div>
            <div style={styles.mapTitleWrapper}>
              <div style={styles.mapTitleIcon}>
                <FaGlobe />
              </div>
              <h2 style={styles.mapTitle}>Lokasi Kami</h2>
            </div>
            <div style={styles.infoDivider}></div>
            
            <div style={styles.mapContainer}>
              {hasLocation && mapEmbedUrl ? (
                <iframe
                  src={mapEmbedUrl}
                  style={styles.mapIframe}
                  title="Lokasi TK IT AR RAHMAN AL IKHLAS"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div style={styles.mapPlaceholder}>
                  <FaMapMarkerAlt style={styles.mapPlaceholderIcon} />
                  <p style={{ fontWeight: '700', color: '#0F4C5C', margin: 0 }}>Lokasi belum diatur</p>
                  <p style={{ fontSize: '0.85rem', color: '#94A3B8', margin: 0 }}>
                    Admin dapat mengatur lokasi di panel admin
                  </p>
                </div>
              )}
            </div>

            {mapLink && (
              <a 
                href={mapLink} 
                target="_blank" 
                rel="noopener noreferrer"
                style={styles.mapButton}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'linear-gradient(135deg, #0A3540, #5BC0C9)';
                  e.currentTarget.style.transform = 'translateY(-4px) scale(1.02)';
                  e.currentTarget.style.boxShadow = '0 12px 35px rgba(15, 76, 92, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'linear-gradient(135deg, #0F4C5C, #82D7DE)';
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.boxShadow = '0 8px 25px rgba(15, 76, 92, 0.25)';
                }}
              >
                <FaExternalLinkAlt /> Buka di OpenStreetMap
              </a>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;