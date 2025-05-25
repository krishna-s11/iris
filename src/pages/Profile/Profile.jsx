import React, { useState } from 'react';
import '../Wallet/wallet.css';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import api from '../../api/api';

const Profile = ({ user }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    old_password: '',
    new_password: ''
  });

  const [showModal, setShowModal] = useState(false);
  const [deletePassword, setDeletePassword] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.id]: e.target.value
    }));
  };

  const logoutAndRedirect = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('walletStatus');
    sessionStorage.removeItem('token');
    toast.success("Signed out successfully", {
      onClose: () => navigate("/auth/login"),
      autoClose: 1000
    });
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        current_password: formData.old_password,
        new_password: formData.new_password
      };

      await api.post('/auth/change-password', payload);
      toast.success("Password changed successfully! Logging you out...", {
        autoClose: 1500,
        onClose: logoutAndRedirect
      });
    } catch (error) {
      console.error("Error changing password:", error);
      toast.error("Failed to change password");
    }
  };

  const handleDeleteAccount = async () => {
    if (!deletePassword) {
      toast.error("Please enter your current password");
      return;
    }

    try {
      await api.delete('/auth/delete_account', {
        data: { email: user.email, password: deletePassword }
      });

      toast.success("Account deleted successfully", {
        autoClose: 1500,
        onClose: logoutAndRedirect
      });

      setShowModal(false);
      setDeletePassword('');
    } catch (error) {
      console.error("Error deleting account:", error);
      toast.error("Failed to delete account");
    }
  };

  return (
    <div className='wallet_pg'>
      <h1>Profile</h1>
      <p>Change your password</p>
      <form onSubmit={handlePasswordChange}>
        <p className="login_label">Old Password</p>
        <input
          type="password"
          id="old_password"
          className="login_input"
          placeholder="Enter old password"
          value={formData.old_password}
          onChange={handleChange}
          required
        />

        <p className="login_label">New Password</p>
        <input
          type="password"
          id="new_password"
          className="login_input"
          placeholder="Enter new password"
          value={formData.new_password}
          onChange={handleChange}
          required
        />

        <button className="btn_signIn" type="submit" style={{ marginTop: '30px' }}>
          Submit
        </button>
      </form>

      <div style={{ marginTop: '40px', borderTop: '1px solid #99C8FF', paddingTop: '30px' }}>
        <h2 style={{ color: 'red', fontSize: '20px' }}>Danger Zone</h2>
        <p>Deleting your account is irreversible. Please proceed with caution.</p>
        <button
          onClick={() => setShowModal(true)}
          className="btn_signIn"
          style={{ marginTop: '20px', backgroundColor: '#ff4d4d' }}
        >
          Delete Account
        </button>
      </div>

      {/* Confirmation Modal */}
      {showModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalBox}>
            <h2 style={{ color: 'white', marginBottom: '15px' }}>Confirm Deletion</h2>
            <p style={{ color: '#CBD5E0', marginBottom: '20px' }}>
              Are you sure you want to delete your account? This action is irreversible.
            </p>

            <input
              type="password"
              className="login_input"
              placeholder="Current password"
              value={deletePassword}
              onChange={(e) => setDeletePassword(e.target.value)}
              required
            />

            <div style={styles.modalActions}>
              <button onClick={() => setShowModal(false)} style={styles.cancelBtn}>
                Cancel
              </button>
              <button onClick={handleDeleteAccount} style={styles.confirmBtn}>
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  modalOverlay: {
    position: 'fixed',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999
  },
  modalBox: {
    background: 'linear-gradient(135deg, #1F2937, #111827)',
    padding: '30px',
    borderRadius: '20px',
    width: '90%',
    maxWidth: '400px',
    textAlign: 'center',
    boxShadow: '0 0 20px rgba(0,0,0,0.5)'
  },
  modalActions: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '20px',
    marginTop: '20px'
  },
  cancelBtn: {
    flex: 1,
    padding: '10px',
    borderRadius: '10px',
    border: 'none',
    backgroundColor: '#6B7280',
    color: 'white',
    cursor: 'pointer'
  },
  confirmBtn: {
    flex: 1,
    padding: '10px',
    borderRadius: '10px',
    border: 'none',
    backgroundColor: '#EF4444',
    color: 'white',
    cursor: 'pointer'
  }
};

export default Profile;
