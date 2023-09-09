import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button, Form, Card, Container, Alert,
} from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';

const SignUp = () => {
  const navigate = useNavigate();
  // eslint-disable-next-line no-unused-vars
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const emailRef = useRef();
  const passwdRef = useRef();
  const confirmPasswdRef = useRef();
  const btnRef = useRef();
  const firstNameRef = useRef();
  const lastNameRef = useRef();

  const { signUp } = useAuth();

  const handleHover = () => {
    btnRef.current.style.transition = 'all 1s ease-in-out';
    btnRef.current.innerText = 'Sign In';
  };
  const handleMouseOut = () => {
    btnRef.current.style.transition = 'all 1s ease-in-out';
    btnRef.current.style.backgroundColor = '';
    btnRef.current.innerText = 'Already have an account?';
  };

  // eslint-disable-next-line consistent-return
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (passwdRef.current.value !== confirmPasswdRef.current.value) {
      return setError('Passwords do not match!');
    }
    try {
      setError('');
      setLoading(true);
      const user = await signUp(
        emailRef.current.value,
        passwdRef.current.value,
      );

      const userData = {
        email: user.user.email,
        firstName: firstNameRef.current.value,
        lastName: lastNameRef.current.value,
      };
      localStorage.setItem('user', JSON.stringify(userData));

      navigate('/home');
    } catch (error) {
      setError('Failed to create an account');
    }
    setLoading(false);
  };

  const handleHasAccount = () => {
    navigate('/login');
  };

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    if (userData) {
      setEmail(userData.email);
    }
  }, []);

  return (
    <Container className="login">
      <h2 style={{ color: '#d89' }}>Sign Up </h2>
      <Card>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form.Group className="mb-3" controlId="formBasicFirstName">
              <Form.Control
                ref={firstNameRef}
                type="text"
                placeholder="First Name"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicLastName">
              <Form.Control
                ref={lastNameRef}
                type="text"
                placeholder="Last Name"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control
                ref={emailRef}
                type="email"
                placeholder="Enter email"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Control
                ref={passwdRef}
                type="password"
                placeholder="Password"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formConfirmPassword">
              <Form.Control
                ref={confirmPasswdRef}
                type="password"
                placeholder="Confirm Password"
              />
            </Form.Group>
            <Button disabled={loading} variant="primary" type="submit">
              Sign Up
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <Button
        className="btn"
        ref={btnRef}
        type="button"
        onMouseOut={handleMouseOut}
        onMouseOver={handleHover}
        onClick={handleHasAccount}
      >
        Already have an account?
      </Button>
    </Container>
  );
};

export default SignUp;
