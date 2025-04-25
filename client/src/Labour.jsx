// src/Labour.jsx
import React, { useState } from 'react';
import {
  TextInput,
  NumberInput,
  Button,
  Container,
  Title,
} from '@mantine/core';
import axios from 'axios';

function Labour() {
  const [form, setForm] = useState({
    workerName: '',
    hourlyRate: 0,
    hoursWorked: 0,
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleNumberChange = (name) => (value) => {
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await axios.post('/api/v1/labour', form);
      alert('Labour entry created successfully');
      setForm({ workerName: '', hourlyRate: 0, hoursWorked: 0 });
    } catch (err) {
      setError('Failed to create labour entry');
      console.error(err);
    }
  };

  return (
    <Container size="sm" mt="xl">
      <Title order={2} mb="md">New Labour Entry</Title>
      <form onSubmit={handleSubmit}>
        <TextInput
          label="Worker Name"
          name="workerName"
          value={form.workerName}
          onChange={handleChange}
          required
        />
        <NumberInput
          label="Hourly Rate"
          value={form.hourlyRate}
          onChange={handleNumberChange('hourlyRate')}
          mt="md"
        />
        <NumberInput
          label="Hours Worked"
          value={form.hoursWorked}
          onChange={handleNumberChange('hoursWorked')}
          mt="md"
        />
        {error && <div style={{ color: 'red', marginTop: 8 }}>{error}</div>}
        <Button type="submit" mt="md">Save Labour</Button>
      </form>
    </Container>
  );
}
export default Labour;
