import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../styles/Login.css';
import logo from '../assets/login-logo.png';
import { fetchTodos } from '../store/todoSlice';
import { setUsername } from '../store/userSlice';
import { IoIosLogIn } from "react-icons/io";

const Login = () => {
  const [usernameLocal, setUsernameLocal] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const params = new URLSearchParams();
      params.append('grant_type', 'password');
      params.append('username', usernameLocal);
      params.append('password', password);

      const response = await axios.post('http://35.95.212.85/login', params, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      const token = response.data.access_token;
      localStorage.setItem('authToken', token);

      dispatch(setUsername(usernameLocal));

      await dispatch(fetchTodos(usernameLocal));

      navigate('/todos');
    } catch (error) {
      console.error(error);
      if (error.response && error.response.status === 401) {
        setError('Invalid username or password. Please try again.');
      } else {
        setError('An unexpected error occurred. Please try again later.');
      }
    }
  };

  return (
    <Container className="login-container bg-dark text-white py-5">
      <Row className="justify-content-center">
        <Col xs={12} className="text-center mb-4">
          <h1 className="title">TODO LIST APP</h1>
        </Col>
      </Row>

      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6} className="login-form  p-4 rounded">
        <IoIosLogIn size={48} />
          <h2>Login</h2>
          <Form onSubmit={handleSubmit}>
            {error && <Alert variant="danger" className="form-error">{error}</Alert>}
            <Form.Group controlId="formUsername" className="form-group mb-4">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                value={usernameLocal}
                onChange={(e) => setUsernameLocal(e.target.value)}
                isInvalid={!!error}
              />
              <Form.Control.Feedback type="invalid">
                {error}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="formPassword" className="form-group mb-4">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                isInvalid={!!error}
              />
              <Form.Control.Feedback type="invalid">
                {error}
              </Form.Control.Feedback>
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100">
              Login
            </Button>
            <div className="mt-3 text-center">
              <Link to="/create-user" className="text-white">Don't have an account? Create User</Link>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
