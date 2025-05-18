import React, { useState, useEffect } from 'react';
import "./wallet.css";
import api from '../../api/api';
import { FaWallet } from 'react-icons/fa';
import { toast } from 'react-toastify';

const Wallet = () => {
  const [formData, setFormData] = useState({
    binance_api_key: '',
    binance_api_secret: ''
  });

  const [walletActivated, setWalletActivated] = useState(false);

  useEffect(() => {
    const status = localStorage.getItem('walletStatus');
    if (status === 'done') {
      setWalletActivated(true);
    }
  }, []);

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
      localStorage.setItem('walletStatus', 'done');
      setWalletActivated(true);
      toast.success("Wallet activated successfully!");
    } catch (error) {
      console.error("Error submitting API keys:", error);
      toast.error("Binance API Key or Secret is not valid");
    }
  };

  return (
    <div className='wallet_pg'>
      {walletActivated ? (
        <div className="wallet_status_box">
          <FaWallet className="wallet_icon" />
          <h2>Wallet Activated</h2>
          <p className="wallet_balance">$0.00</p>
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
    </div>
  );
};

export default Wallet;
