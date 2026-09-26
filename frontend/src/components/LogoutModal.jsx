import React from 'react';
import { FaSignOutAlt, FaTimes, FaShieldAlt } from 'react-icons/fa';

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(8, 47, 56, 0.7)',
    backdropFilter: 'blur(8px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999,
    padding: '20px',
    animation: 'fadeIn 0.25s ease-out forwards',
  },
  modal: {
    background: '#ffffff',
    width: '100%',
    maxWidth: '440px',
    borderRadius: '24px',
    padding: '32px 28px 28px',
    boxShadow: '0 25px 70px -15px rgba(8, 47, 56, 0.35), 0 10px 30px rgba(0, 0, 0, 0.1)',
    position: 'relative',
    textAlign: 'center',
    border: '1px solid rgba(130, 215, 222, 0.25)',
  },
  closeBtn: {
    position: 'absolute',
    top: '18px',
    right: '18px',
    background: '#F1F5F9',
    border: 'none',
    color: '#64748B',
    width: '34px',
    height: '34px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '0.95rem',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  },
  iconWrapper: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '20px',
  },
  iconBg: {
    width: '80px',
    height: '80px',
    borderRadius: '24px',
    background: 'linear-gradient(135deg, #FEF2F2 0%, #FEE2E2 100%)',
    border: '2px solid #FCA5A5',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    boxShadow: '0 10px 25px rgba(239, 68, 68, 0.2)',
  },
  logoutIcon: {
    fontSize: '2.2rem',
    color: '#EF4444',
  },
  title: {
    fontSize: '1.4rem',
    fontWeight: '800',
    color: '#0F4C5C',
    margin: '0 0 10px 0',
    letterSpacing: '-0.3px',
  },
  description: {
    fontSize: '0.92rem',
    color: '#64748B',
    lineHeight: '1.6',
    margin: '0 0 26px 0',
  },
  buttonGroup: {
    display: 'flex',
    gap: '12px',
  },
  cancelBtn: {
    flex: 1,
    padding: '12px 20px',
    background: '#F1F5F9',
    color: '#475569',
    border: '1px solid #E2E8F0',
    borderRadius: '14px',
    fontSize: '0.92rem',
    fontWeight: '700',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  },
  confirmBtn: {
    flex: 1.2,
    padding: '12px 20px',
    background: 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)',
    color: '#ffffff',
    border: 'none',
    borderRadius: '14px',
    fontSize: '0.92rem',
    fontWeight: '700',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    boxShadow: '0 8px 20px rgba(239, 68, 68, 0.35)',
    transition: 'all 0.2s ease',
  },
};

const LogoutModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button 
          style={styles.closeBtn} 
          onClick={onClose} 
          aria-label="Close"
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#E2E8F0';
            e.currentTarget.style.color = '#1E293B';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = '#F1F5F9';
            e.currentTarget.style.color = '#64748B';
          }}
        >
          <FaTimes />
        </button>

        <div style={styles.iconWrapper}>
          <div style={styles.iconBg}>
            <FaSignOutAlt style={styles.logoutIcon} />
          </div>
        </div>

        <h3 style={styles.title}>Konfirmasi Keluar</h3>
        <p style={styles.description}>
          Apakah Anda yakin ingin mengakhiri sesi admin ini? Anda harus login kembali untuk mengakses panel pengelola.
        </p>

        <div style={styles.buttonGroup}>
          <button 
            style={styles.cancelBtn} 
            onClick={onClose}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#E2E8F0';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#F1F5F9';
            }}
          >
            Batal
          </button>
          <button 
            style={styles.confirmBtn} 
            onClick={onConfirm}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 12px 25px rgba(239, 68, 68, 0.45)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 8px 20px rgba(239, 68, 68, 0.35)';
            }}
          >
            <FaSignOutAlt /> Ya, Keluar
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
