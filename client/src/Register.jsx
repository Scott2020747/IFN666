// src/Register.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { Container, Title, TextInput, PasswordInput, Button, Group, Anchor } from '@mantine/core';
import { Link, useNavigate } from 'react-router-dom';

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/v1/auth/register', formData);
      setSuccess('Registration successful! Redirecting to login...');
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <Container size="xs" my={40}>
      <Title align="center" mb="xl">
        Register
      </Title>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
      <form onSubmit={handleSubmit}>
        <TextInput
          label="Username"
          name="username"
          placeholder="Choose a username"
          value={formData.username}
          onChange={handleChange}
          required
          mb="sm"
        />
        <PasswordInput
          label="Password"
          name="password"
          placeholder="Choose a password"
          value={formData.password}
          onChange={handleChange}
          required
          mb="sm"
        />
        <Group position="apart" mt="md">
          <Anchor component={Link} to="/login" size="sm">
            Already have an account? Login
          </Anchor>
          <Button type="submit">Register</Button>
        </Group>
      </form>
    </Container>
  );
}

export default Register;
