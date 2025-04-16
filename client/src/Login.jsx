// src/Login.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { Container, Title, TextInput, PasswordInput, Button, Group, Anchor } from '@mantine/core';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Use a relative URL so that the Vite proxy (if configured) can forward the request
      const response = await axios.post('/api/v1/auth/login', formData);
      // Save the token received from the server into localStorage
      localStorage.setItem('token', response.data.token);
      navigate('/'); // Redirect to the home page upon successful login
    } catch (err) {
      console.error('Login error:', err);
      setError('Invalid credentials. Please try again.');
    }
  };

  return (
    <Container size="xs" my={40}>
      <Title align="center" mb="xl">Login</Title>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <TextInput
          label="Username"
          name="username"
          placeholder="Enter your username"
          value={formData.username}
          onChange={handleChange}
          required
          mb="sm"
        />
        <PasswordInput
          label="Password"
          name="password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleChange}
          required
          mb="sm"
        />
        <Group position="apart" mt="md">
          <Anchor component={Link} to="/register" size="sm">
            Register
          </Anchor>
          <Button type="submit">Login</Button>
        </Group>
      </form>
    </Container>
  );
}

export default Login;
