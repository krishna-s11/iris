import React, { useState, useEffect } from 'react';
import "./wallet.css";
import api from '../../api/api';
import { FaWallet } from 'react-icons/fa';
import { toast } from 'react-toastify';
import WalletHistory from '../../components/Wallet/WalletHistory';
import { useWallet } from '../../contexts/WalletContext';

const Wallet = () => {
  const { walletInfo, updateWalletInfo } = useWallet();

  const [formData, setFormData] = useState({
    binance_api_key: '',
    binance_api_secret: ''
  });

  const [walletActivated, setWalletActivated] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [updateForm, setUpdateForm] = useState({
    binance_api_key: '',
    binance_api_secret: ''
  });

  useEffect(() => {
    setWalletActivated(!!(walletInfo?.binance_api_key && walletInfo?.binance_api_secret));
  }, [walletInfo]);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.id]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        binance_api_key: formData.binance_api_key,
        binance_api_secret: formData.binance_api_secret
      };

      await api.post('/auth/binance_keys', payload);
      updateWalletInfo(payload.binance_api_key, payload.binance_api_secret);
      localStorage.setItem('walletStatus', 'done');
      toast.success("Wallet activated successfully!");
    } catch (error) {
      console.error("Error submitting API keys:", error);
      toast.error("Binance API Key or Secret is not valid");
    }
  };

  const handleUpdateChange = (e) => {
    setUpdateForm(prev => ({
      ...prev,
      [e.target.id]: e.target.value
    }));
  };

  const handleUpdateSubmit = async () => {
    try {
      await api.post('/auth/binance_keys', updateForm);
      updateWalletInfo(updateForm.binance_api_key, updateForm.binance_api_secret);
      toast.success("Wallet updated successfully!");
      setShowUpdateModal(false);
      localStorage.setItem('walletStatus', 'done');
      setWalletActivated(true);
    } catch (error) {
      console.error("Error updating wallet:", error);
      toast.error("Failed to update wallet");
    }
  };

  const mockTransactions = [

  ];

  const modalStyles = {
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

  return (
    <div className='wallet_pg'>
      {walletActivated ? (
        <div className="wallet_status_box">
          <FaWallet className="wallet_icon" />
          <h2>Wallet Activated</h2>
          <p className="wallet_balance">$0.00</p>
          <p style={{ color: "#99C8FF", marginTop: "20px", fontSize: "16px" }}>
            Your account is connected to the Binance wallet.
          </p>
          <button
            className="btn_signIn"
            onClick={() => setShowUpdateModal(true)}
            style={{ marginTop: "20px" }}
          >
            Update Wallet Connection
          </button>
        </div>
      ) : (
        <>
          <h1>Wallet</h1>
          <p>Activate your wallet</p>
          <form onSubmit={handleSubmit}>
            <p className="login_label">Binance API Key</p>
            <input
              type="text"
              id="binance_api_key"
              className="login_input"
              placeholder="Your Binance API key"
              value={formData.binance_api_key}
              onChange={handleChange}
              required
            />

            <p className="login_label">Binance API Secret</p>
            <input
              type="text"
              id="binance_api_secret"
              className="login_input"
              placeholder="Your Binance API secret"
              value={formData.binance_api_secret}
              onChange={handleChange}
              required
            />

            <button className="btn_signIn" type="submit" style={{ marginTop: '30px' }}>
              Submit
            </button>
          </form>
        </>
      )}

      <WalletHistory transactions={mockTransactions} isWalletConnected={walletActivated} />

      {showUpdateModal && (
        <div style={modalStyles.modalOverlay}>
          <div style={modalStyles.modalBox}>
            <h2 style={{ color: 'white', marginBottom: '15px' }}>Update Wallet Connection</h2>
            <p style={{ color: '#CBD5E0', marginBottom: '20px' }}>
              Enter your new Binance API credentials.
            </p>

            <input
              type="text"
              id="binance_api_key"
              className="login_input"
              placeholder="New Binance API Key"
              value={updateForm.binance_api_key}
              onChange={handleUpdateChange}
              required
            />

            <input
              type="text"
              id="binance_api_secret"
              className="login_input"
              placeholder="New Binance API Secret"
              value={updateForm.binance_api_secret}
              onChange={handleUpdateChange}
              required
              style={{ marginTop: '15px' }}
            />

            <div style={modalStyles.modalActions}>
              <button onClick={() => setShowUpdateModal(false)} style={modalStyles.cancelBtn}>
                Cancel
              </button>
              <button onClick={handleUpdateSubmit} style={modalStyles.confirmBtn}>
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Wallet;
