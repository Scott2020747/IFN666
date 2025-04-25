// src/Login.jsx
import React, { useState } from 'react';
import {
  TextInput,
  PasswordInput,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Button,
} from '@mantine/core';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import classes from './AuthenticationTitle.module.css';

export default function Login({ onLogin }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await axios.post('/api/v1/auth/login', formData);
      localStorage.setItem('token', res.data.token);
      onLogin(res.data.token);
      navigate('/', { replace: true });
    } catch (err) {
      setError('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className={classes.wrapper}>
      <Container size={420}>
        <Title align="center" mb="sm" className={classes.title} style={{ color: '#3d920d' }}>
          Construction Cost Estimator
        </Title>
        <Text className={classes.subtitle} align="center">
          Welcome back!
        </Text>
        <Text c="dimmed" size="sm" align="center" className={classes.subtitle}>
          Don’t have an account?
          {' '}
          <Anchor component={Link} to="/register" size="sm" className={classes.link}>
            Create account
          </Anchor>
        </Text>

        <Paper withBorder shadow="md" p={30} mt={30} radius="md" className={classes.form}>
          <form onSubmit={handleSubmit}>
            <TextInput
              label="Username"
              placeholder="Your username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              mb="md"
            />
            <PasswordInput
              label="Password"
              placeholder="Your password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              mb="md"
            />

            {error && (
              <Text className={classes.errorText} size="sm" mb="md">
                {error}
              </Text>
            )}

            <Button fullWidth mt="xl" type="submit">
              Sign in
            </Button>
          </form>
        </Paper>
      </Container>
    </div>
  );
}
