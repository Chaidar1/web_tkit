import React, { useEffect, useState } from 'react';
import { aboutAPI } from '../services/api';
import { 
  FaBookOpen, 
  FaEye, 
  FaBullseye, 
  FaHeart, 
  FaStar, 
  FaGraduationCap,
  FaQuoteLeft,
  FaLightbulb,
  FaHandsHelping
} from 'react-icons/fa';

const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 20px',
  },
  section: {
    padding: '70px 0 50px 0',
    background: 'linear-gradient(180deg, #f0fafb 0%, #ffffff 50%, #f0fafb 100%)',
    position: 'relative',
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
    color: '#82D7DE',
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
    fontSize: '1.15rem',
    color: '#64748B',
    maxWidth: '700px',
    margin: '0 auto',
    lineHeight: '1.8',
  },
  // ==================== HISTORY CARD ====================
  historyCard: {
    background: '#ffffff',
    borderRadius: '30px',
    boxShadow: '0 20px 60px rgba(130, 215, 222, 0.15), 0 4px 12px rgba(0,0,0,0.04)',
    padding: '50px 55px',
    marginBottom: '40px',
    border: '2px solid rgba(130, 215, 222, 0.15)',
    transition: 'all 0.4s ease',
    position: 'relative',
    overflow: 'hidden',
  },
  historyCardDecor: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '6px',
    height: '100%',
    background: 'linear-gradient(180deg, #82D7DE, #5BC0C9)',
    borderRadius: '30px 0 0 30px',
  },
  historyCardIcon: {
    position: 'absolute',
    top: '30px',
    right: '40px',
    fontSize: '5rem',
    color: 'rgba(130, 215, 222, 0.1)',
    pointerEvents: 'none',
  },
  historyLabelWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '10px',
  },
  historyLabelIcon: {
    fontSize: '1rem',
    color: '#82D7DE',
  },
  historyLabel: {
    fontSize: '0.75rem',
    fontWeight: '700',
    color: '#82D7DE',
    letterSpacing: '3px',
    textTransform: 'uppercase',
  },
  historyTitle: {
    fontSize: '1.6rem',
    fontWeight: '800',
    color: '#0F4C5C',
    marginBottom: '12px',
    lineHeight: '1.3',
  },
  historyDivider: {
    width: '50px',
    height: '3px',
    background: 'linear-gradient(90deg, #82D7DE, #5BC0C9)',
    marginBottom: '25px',
    borderRadius: '3px',
  },
  historyContent: {
    fontSize: '1.05rem',
    lineHeight: '2',
    color: '#4A5568',
    whiteSpace: 'pre-wrap',
    position: 'relative',
    zIndex: 1,
  },
  // ==================== VISION MISSION GRID ====================
  visionMissionGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
    gap: '35px',
    margin: '40px 0',
  },
  // === VISION CARD ===
  visionCard: {
    background: 'linear-gradient(135deg, #ffffff 0%, #f0fafb 100%)',
    borderRadius: '30px',
    boxShadow: '0 20px 60px rgba(130, 215, 222, 0.15), 0 4px 12px rgba(0,0,0,0.04)',
    padding: '45px 45px',
    border: '2px solid rgba(130, 215, 222, 0.2)',
    transition: 'all 0.4s ease',
    position: 'relative',
    overflow: 'hidden',
  },
  visionCardDecor: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '6px',
    height: '100%',
    background: 'linear-gradient(180deg, #82D7DE, #5BC0C9)',
    borderRadius: '30px 0 0 30px',
  },
  visionCardIcon: {
    fontSize: '2.5rem',
    color: '#82D7DE',
    marginBottom: '20px',
    display: 'inline-block',
  },
  visionLabelWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '10px',
  },
  visionLabel: {
    fontSize: '0.75rem',
    fontWeight: '700',
    color: '#82D7DE',
    letterSpacing: '3px',
    textTransform: 'uppercase',
  },
  visionTitle: {
    fontSize: '1.5rem',
    fontWeight: '800',
    color: '#0F4C5C',
    marginBottom: '12px',
    lineHeight: '1.3',
  },
  visionDivider: {
    width: '50px',
    height: '3px',
    background: 'linear-gradient(90deg, #82D7DE, #5BC0C9)',
    marginBottom: '25px',
    borderRadius: '3px',
  },
  visionContent: {
    fontSize: '1rem',
    lineHeight: '2',
    color: '#4A5568',
  },
  // === MISSION CARD ===
  missionCard: {
    background: 'linear-gradient(135deg, #ffffff 0%, #f0fafb 100%)',
    borderRadius: '30px',
    boxShadow: '0 20px 60px rgba(130, 215, 222, 0.15), 0 4px 12px rgba(0,0,0,0.04)',
    padding: '45px 45px',
    border: '2px solid rgba(130, 215, 222, 0.2)',
    transition: 'all 0.4s ease',
    position: 'relative',
    overflow: 'hidden',
  },
  missionCardDecor: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '6px',
    height: '100%',
    background: 'linear-gradient(180deg, #82D7DE, #5BC0C9)',
    borderRadius: '30px 0 0 30px',
  },
  missionCardIcon: {
    fontSize: '2.5rem',
    color: '#82D7DE',
    marginBottom: '20px',
    display: 'inline-block',
  },
  missionLabelWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '10px',
  },
  missionLabel: {
    fontSize: '0.75rem',
    fontWeight: '700',
    color: '#82D7DE',
    letterSpacing: '3px',
    textTransform: 'uppercase',
  },
  missionTitle: {
    fontSize: '1.5rem',
    fontWeight: '800',
    color: '#0F4C5C',
    marginBottom: '12px',
    lineHeight: '1.3',
  },
  missionDivider: {
    width: '50px',
    height: '3px',
    background: 'linear-gradient(90deg, #82D7DE, #5BC0C9)',
    marginBottom: '25px',
    borderRadius: '3px',
  },
  list: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
  },
  listItem: {
    padding: '12px 0 12px 30px',
    borderBottom: '1px solid #E2F5F7',
    fontSize: '1rem',
    lineHeight: '1.8',
    color: '#4A5568',
    position: 'relative',
  },
  listItemBullet: {
    position: 'absolute',
    left: 0,
    top: '18px',
    width: '20px',
    height: '20px',
    background: 'linear-gradient(135deg, #82D7DE, #5BC0C9)',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#ffffff',
    fontSize: '0.6rem',
    fontWeight: '700',
  },
  listItemLast: {
    borderBottom: 'none',
  },
  // ==================== MESSAGE CARD ====================
  messageCard: {
    background: 'linear-gradient(135deg, #0F4C5C 0%, #15697A 50%, #82D7DE 100%)',
    color: '#ffffff',
    borderRadius: '30px',
    padding: '50px 55px',
    textAlign: 'center',
    marginTop: '50px',
    position: 'relative',
    overflow: 'hidden',
    boxShadow: '0 25px 70px rgba(15, 76, 92, 0.3)',
  },
  messageCardPattern: {
    position: 'absolute',
    top: '-50%',
    right: '-20%',
    width: '300px',
    height: '300px',
    borderRadius: '50%',
    background: 'rgba(255,255,255,0.05)',
    pointerEvents: 'none',
  },
  messageCardPattern2: {
    position: 'absolute',
    bottom: '-40%',
    left: '-10%',
    width: '200px',
    height: '200px',
    borderRadius: '50%',
    background: 'rgba(255,255,255,0.03)',
    pointerEvents: 'none',
  },
  messageCardPattern3: {
    position: 'absolute',
    top: '20%',
    left: '10%',
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    background: 'rgba(255,255,255,0.04)',
    pointerEvents: 'none',
  },
  messageIcon: {
    fontSize: '2.5rem',
    marginBottom: '15px',
    position: 'relative',
    zIndex: 1,
    opacity: 0.9,
  },
  messageTitle: {
    fontSize: '1.8rem',
    fontWeight: '800',
    marginBottom: '15px',
    letterSpacing: '0.5px',
    position: 'relative',
    zIndex: 1,
    textShadow: '2px 2px 4px rgba(0,0,0,0.2)',
  },
  messageDivider: {
    width: '60px',
    height: '3px',
    background: '#ffffff',
    margin: '0 auto 20px auto',
    position: 'relative',
    zIndex: 1,
    borderRadius: '3px',
  },
  messageContent: {
    fontSize: '1.05rem',
    lineHeight: '1.9',
    opacity: 0.95,
    maxWidth: '750px',
    margin: '0 auto',
    position: 'relative',
    zIndex: 1,
  },
  // ==================== DECORATIVE ELEMENTS ====================
  decorativeCircle1: {
    position: 'absolute',
    top: '10%',
    right: '-5%',
    width: '200px',
    height: '200px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(130, 215, 222, 0.1) 0%, transparent 70%)',
    pointerEvents: 'none',
  },
  decorativeCircle2: {
    position: 'absolute',
    bottom: '20%',
    left: '-5%',
    width: '250px',
    height: '250px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(130, 215, 222, 0.08) 0%, transparent 70%)',
    pointerEvents: 'none',
  },
  // ==================== LOADING ====================
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
  // ==================== RESPONSIVE ====================
  '@media (max-width: 768px)': {
    sectionTitle: { fontSize: '2rem' },
    section: { padding: '50px 0 30px 0' },
    historyCard: { padding: '30px 25px' },
    historyCardIcon: { fontSize: '3rem', top: '20px', right: '20px' },
    historyTitle: { fontSize: '1.3rem' },
    historyContent: { fontSize: '0.95rem' },
    visionCard: { padding: '30px 25px' },
    visionTitle: { fontSize: '1.25rem' },
    missionCard: { padding: '30px 25px' },
    missionTitle: { fontSize: '1.25rem' },
    messageCard: { padding: '35px 25px' },
    messageTitle: { fontSize: '1.4rem' },
    messageContent: { fontSize: '0.95rem' },
    visionMissionGrid: { gridTemplateColumns: '1fr', gap: '25px' },
    decorativeCircle1: { display: 'none' },
    decorativeCircle2: { display: 'none' },
  }
};

const About = () => {
  const [about, setAbout] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        setLoading(true);
        const res = await aboutAPI.getAbout();
        setAbout(res.data);
      } catch (error) {
        console.error('Error fetching about:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchAbout();
  }, []);

  if (loading) {
    return (
      <div style={styles.loadingWrapper}>
        <div style={styles.loadingIcon}>📖</div>
        <div style={styles.loadingText}>Memuat data...</div>
      </div>
    );
  }

  const missionItems = about?.mission 
    ? about.mission.split('\n').filter(item => item.trim() !== '')
    : [
        'Menyelenggarakan pendidikan berkualitas dengan kurikulum terintegrasi',
        'Mengembangkan potensi siswa secara holistik (akademik, karakter, dan keterampilan)',
        'Membangun karakter islami yang kuat melalui pembiasaan sehari-hari',
        'Menyiapkan generasi siap menghadapi tantangan masa depan',
        'Menjalin kerjasama dengan berbagai lembaga pendidikan nasional dan internasional'
      ];

  return (
    <div style={styles.container}>
      <section style={styles.section}>
        {/* Dekorasi Background */}
        <div style={styles.decorativeCircle1}></div>
        <div style={styles.decorativeCircle2}></div>

        {/* Header */}
        <div style={styles.headerWrapper}>
          <div style={styles.headerIcon}>🏫</div>
          <h1 style={styles.sectionTitle}>{about?.title || 'Tentang Kami'}</h1>
          <div style={styles.sectionDivider}></div>
          <p style={styles.sectionSubtitle}>
            Mengenal lebih dekat TK IT AR RAHMAN AL IKHLAS - tempat terbaik untuk tumbuh dan berkembang
          </p>
        </div>

        {/* History Card */}
        <div style={styles.historyCard}>
          <div style={styles.historyCardDecor}></div>
          <div style={styles.historyCardIcon}>📚</div>
          
          <div style={styles.historyLabelWrapper}>
            <FaBookOpen style={styles.historyLabelIcon} />
            <div style={styles.historyLabel}>Sejarah</div>
          </div>
          <div style={styles.historyTitle}>Perjalanan Kami</div>
          <div style={styles.historyDivider}></div>
          <p style={styles.historyContent}>{about?.content || 'Belum ada data'}</p>
        </div>

        {/* Vision & Mission Grid */}
        <div style={styles.visionMissionGrid}>
          {/* Vision Card */}
          <div style={styles.visionCard}>
            <div style={styles.visionCardDecor}></div>
            <div style={styles.visionCardIcon}>👁️</div>
            
            <div style={styles.visionLabelWrapper}>
              <FaEye style={styles.historyLabelIcon} />
              <div style={styles.visionLabel}>Visi</div>
            </div>
            <div style={styles.visionTitle}>Visi Kami</div>
            <div style={styles.visionDivider}></div>
            <p style={styles.visionContent}>
              {about?.vision || 'Belum ada data visi'}
            </p>
          </div>

          {/* Mission Card */}
          <div style={styles.missionCard}>
            <div style={styles.missionCardDecor}></div>
            <div style={styles.missionCardIcon}>🎯</div>
            
            <div style={styles.missionLabelWrapper}>
              <FaBullseye style={styles.historyLabelIcon} />
              <div style={styles.missionLabel}>Misi</div>
            </div>
            <div style={styles.missionTitle}>Misi Kami</div>
            <div style={styles.missionDivider}></div>
            <ul style={styles.list}>
              {missionItems.length > 0 ? (
                missionItems.map((item, index) => (
                  <li 
                    key={index} 
                    style={{
                      ...styles.listItem,
                      ...(index === missionItems.length - 1 ? styles.listItemLast : {})
                    }}
                  >
                    <span style={styles.listItemBullet}>
                      {index + 1}
                    </span>
                    {item}
                  </li>
                ))
              ) : (
                <li style={styles.listItem}>
                  <span style={styles.listItemBullet}>✓</span>
                  Belum ada data misi
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* Message Card */}
        <div style={styles.messageCard}>
          <div style={styles.messageCardPattern}></div>
          <div style={styles.messageCardPattern2}></div>
          <div style={styles.messageCardPattern3}></div>
          
          <div style={styles.messageIcon}>💫</div>
          <div style={styles.messageTitle}>
            {about?.message_title || 'Mari Kita Membangun Negeri'}
          </div>
          <div style={styles.messageDivider}></div>
          <p style={styles.messageContent}>
            {about?.message_content || 'Mari kita mulai dari diri sendiri untuk bisa berkontribusi dalam membangun Indonesia menjadi lebih baik dan juga membuat lingkungan yang nyaman dan bahagia untuk anak dan cucu kita di kemudian hari.'}
          </p>
        </div>
      </section>
    </div>
  );
};

export default About;