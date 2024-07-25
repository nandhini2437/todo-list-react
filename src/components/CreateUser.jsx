import React, { useState } from 'react';
import axios from '../api/axiosConfig';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import { ArrowLeft } from 'react-bootstrap-icons';
import '../styles/CreateUser.css';
import { CgUserAdd } from "react-icons/cg";

const CreateUser = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateUsername = (username) => {
    if (username.length < 3) {
      return 'Username must be at least 3 characters long.';
    }
    return '';
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return 'Invalid email format.';
    }
    return '';
  };

  const validatePassword = (password) => {
    if (password.length < 6) {
      return 'Password must be at least 6 characters long.';
    }
    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const usernameError = validateUsername(username);
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);

    if (usernameError || emailError || passwordError) {
      setErrors({
        username: usernameError,
        email: emailError,
        password: passwordError,
        form: 'Please fill in all fields correctly.',
      });
      return;
    }

    try {
      const response = await axios.post('/user', {
        username,
        email,
        password,
      });
      console.log(response.data);
      navigate('/login');
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        form: error.response?.data?.detail || 'An error occurred. Please try again.',
      }));
    }
  };

  return (
    <Container className="create-user-container">
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6} className="create-user-form">
          <div className="align-items-center mb-4">
            <ArrowLeft className="back-icon" onClick={() => navigate('/login')} />
            <CgUserAdd color='white' size={48} />
          </div>
          <h2>Create User</h2>
          <Form onSubmit={handleSubmit}>
            {errors.form && <Alert variant="danger" className="form-error">{errors.form}</Alert>}
            <Form.Group controlId="formUsername" className="form-group mb-4">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                isInvalid={!!errors.username}
                onBlur={() => setErrors((prev) => ({ ...prev, username: validateUsername(username) }))}
              />
              <Form.Control.Feedback type="invalid">
                {errors.username}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="formEmail" className="form-group mb-4">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                isInvalid={!!errors.email}
                onBlur={() => setErrors((prev) => ({ ...prev, email: validateEmail(email) }))}
              />
              <Form.Control.Feedback type="invalid">
                {errors.email}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="formPassword" className="form-group mb-4">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                isInvalid={!!errors.password}
                onBlur={() => setErrors((prev) => ({ ...prev, password: validatePassword(password) }))}
              />
              <Form.Control.Feedback type="invalid">
                {errors.password}
              </Form.Control.Feedback>
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100">
              Create User
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default CreateUser;
