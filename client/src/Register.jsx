// src/Register.jsx
import React, { useState } from 'react';
import axios from 'axios';
import {
  Container,
  Title,
  TextInput,
  PasswordInput,
  Button,
  Group,
  Anchor,
  useMantineTheme
} from '@mantine/core';
import { Link, useNavigate } from 'react-router-dom';

function Register() {
  const navigate = useNavigate();
  const theme = useMantineTheme();
  const [formData, setFormData] = useState({ username: '', password: '', email: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/v1/auth/register', formData);
      setSuccess('Registration successful! Redirecting to login...');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      const msg = err.response?.data?.message || 'Registration failed. Please try again.';
      setError(msg);
    }
  };

  return (
    <div style={{
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : '#000',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <Container
        size="xs"
        p="xl"
        style={{
          backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : '#111',
          borderRadius: '8px'
        }}
      >
        <Title
          align="center"
          mb="xl"
          style={{ color: theme.colors.green[4], fontSize: '2.5rem' }}
        >
          Register
        </Title>
        {error && (
          <p style={{ color: theme.colors.red[6], textAlign: 'center' }}>{error}</p>
        )}
        {success && (
          <p style={{ color: theme.colors.green[4], textAlign: 'center' }}>{success}</p>
        )}
        <form
          onSubmit={handleSubmit}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
        >
          <TextInput
            label="Username"
            name="username"
            placeholder="Choose a username"
            value={formData.username}
            onChange={handleChange}
            required
            mb="sm"
            styles={{ input: { color: theme.colors.green[4] }, label: { color: theme.colors.green[4] } }}
            style={{ width: '100%' }}
          />

          <TextInput
            label="Email"
            name="email"
            type="email"
            placeholder="Your email address"
            value={formData.email}
            onChange={handleChange}
            required
            mb="sm"
            styles={{ input: { color: theme.colors.green[4] }, label: { color: theme.colors.green[4] } }}
            style={{ width: '100%' }}
          />

          <PasswordInput
            label="Password"
            name="password"
            placeholder="Choose a password"
            value={formData.password}
            onChange={handleChange}
            required
            mb="sm"
            styles={{ input: { color: theme.colors.green[4] }, label: { color: theme.colors.green[4] } }}
            style={{ width: '100%' }}
          />

          <Group position="center" mt="md" spacing={50}>
            <Anchor
              component={Link}
              to="/login"
              size="sm"
              style={{ color: theme.colors.green[4] }}
            >
              Already have an account? Login
            </Anchor>

            <Button type="submit" variant="outline" color="green">
              <span style={{ color: theme.colors.green[4] }}>Register</span>
            </Button>
          </Group>
        </form>
      </Container>
    </div>
  );
}

export default Register;
