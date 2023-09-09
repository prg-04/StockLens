import React, { useEffect, useRef, useState } from 'react';
import { signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import {
  Button, Form, Card, Container, Alert,
} from 'react-bootstrap';
import { auth, provider } from '../utils/firebase';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const emailRef = useRef();
  const passwdRef = useRef();

  const { login } = useAuth();

  const handleclick = () => {
    signInWithPopup(auth, provider).then((data) => {
      localStorage.setItem('email', data.user.email);
      navigate('/');
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError('');
      setLoading(true);
      await login(
        emailRef.current.value,
        passwdRef.current.value,
      );
      navigate('/home');
    } catch {
      setError('Failed to Sign In');
    }
    setLoading(false);
  };

  useEffect(() => {
    setValue(localStorage.getItem('email'));
  }, []);

  return (
    <Container className="login">
      <h2>Login </h2>
      <Card>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control
                ref={emailRef}
                type="email"
                placeholder="Enter email"
                value={value}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Control
                ref={passwdRef}
                type="password"
                placeholder="Password"
              />
            </Form.Group>
            <Button disabled={loading} variant="primary" type="submit">
              Sign In
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <Button
        type="button"
        onClick={handleclick}
      >
        Sign In with Google
      </Button>
    </Container>
  );
};

export default Login;
