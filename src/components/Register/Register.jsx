import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './register.css';

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { email, password, name } = formData;

      const response = await axios.post('https://13.53.142.82/auth/register', {
        username: name,
        email,
        password,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      toast.success('Registration successful! Please log in.', {
        position: 'top-center',
      });

      navigate('/auth/login');
    } catch (error) {
      if (error.response && error.response.data.detail) {
        toast.error(error.response.data.detail, { position: 'top-center' });
      } else {
        toast.error('Registration failed. Try again.', { position: 'top-center' });
      }
    }
  };

  return (
    <form className="register_card login_card" onSubmit={handleSubmit}>
      <h1>Let's get started!</h1>
      <p className="login_sub">Enter your details to step into the future.</p>

      <p className="login_label">Name</p>
      <input
        type="text"
        id="name"
        className="login_input"
        placeholder="Your full name"
        value={formData.name}
        onChange={handleChange}
        required
      />

      <p className="login_label">Email</p>
      <input
        type="email"
        id="email"
        className="login_input"
        placeholder="Your email address"
        value={formData.email}
        onChange={handleChange}
        required
      />

      <p className="login_label">Password</p>
      <input
        type="password"
        id="password"
        className="login_input"
        placeholder="Your password"
        value={formData.password}
        onChange={handleChange}
        required
      />

      {/* <p className="login_label">Binance API Key</p>
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
      /> */}

      <button className="btn_signIn" type="submit" style={{ marginTop: '30px' }}>
        Sign Up
      </button>

      <p className="ln_register">
        Already have an account?{' '}
        <span onClick={() => navigate('/auth/login')}>Sign in</span>
      </p>
    </form>
  );
};

export default Register;
