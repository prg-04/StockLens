import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import SignUp from './components/SignUp';
import Home from './components/Home';
import { AuthProvider } from './context/AuthContext';
import Login from './components/Login';
import Crypto from './redux/Crypto/Crypto';

function App() {
  return (
    <AuthProvider>
      <Container
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: '100vh' }}
      >
        <Routes>
          <Route path="/" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/crypto" element={<Crypto />} />
        </Routes>
      </Container>
    </AuthProvider>
  );
}

export default App;
