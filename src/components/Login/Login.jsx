import React from 'react'
import "./login.css";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import Loader from '../../utils/Loader/Loader';

const Login = () => {
    const navigate = useNavigate();
    const [loading,setLoading] = useState(false)
    const [formData, setFormData] = useState({
      email: '',
      password: '',
      rememberMe: false,
    });

    useEffect(() => {
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      if (token) {
        navigate('/dashboard/home');
      }
    }, [navigate]);
  
    const toggleSwitch = () => {
      setFormData((prev) => ({
        ...prev,
        rememberMe: !prev.rememberMe,
      }));
    };
  
    const handleChange = (e) => {
      const { id, value } = e.target;
      setFormData((prev) => ({
        ...prev,
        [id]: value,
      }));
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      try {
        const response = await axios.post('https://13.53.142.82/auth/login', {
          email: formData.email,
          password: formData.password
        });
        console.log(response.data);
        const { access_token } = response.data;
    
        if (formData.rememberMe) {
          localStorage.setItem('token', access_token);
        } else {
          sessionStorage.setItem('token', access_token);
        }
        setLoading(false);
        navigate("/dashboard/home");
    
      } catch (error) {
        setLoading(false);
        console.error('Login failed:', error.response?.data?.detail || error.message);
        toast.error("Login failed: " + (error.response?.data?.detail || error.message));
      }
      //
    };
  
    return (
      <form className="login_card" onSubmit={handleSubmit}>
        <h1>Nice to see you!</h1>
        <p className="login_sub">Enter your email and password to sign in</p>
  
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
  
        <div className="remember_me">
          <div
            className={`switch ${formData.rememberMe ? 'active' : ''}`}
            onClick={toggleSwitch}
          >
            <div className="switchball"></div>
          </div>
          <p>Remember me</p>
        </div>
  
        <button type="submit" className="btn_signIn">
          {
            loading?<Loader />: "Sign In"
          }
        </button>
  
        <p className="ln_register">
          Don't have an account?{' '}
          <span onClick={() => navigate('/auth/register')}>Sign up</span>
        </p>
      </form>
    );
}

export default Login