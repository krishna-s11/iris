import { useState } from 'react';
import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import AuthPage from './pages/AuthPage/AuthPage';
import DashboardLayout from './layout/DashboardLayout';
import LandingPage from './pages/LandingPage/LandingPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/auth/login" />} />
        <Route path="/auth/:type" element={<AuthPage />} />
        <Route path="/dashboard/:page" element={<PrivateRoute><DashboardLayout /></PrivateRoute>} />
      </Routes>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
}

export default App;
