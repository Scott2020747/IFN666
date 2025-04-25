// src/Material.jsx
import React, { useState } from 'react';
import {
  TextInput,
  NumberInput,
  Button,
  Container,
  Title,
} from '@mantine/core';
import axios from 'axios';

function Material() {
  const [form, setForm] = useState({
    name: '',
    costPerUnit: 0,
    quantity: 0,
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
      await axios.post('/api/v1/materials', form);
      alert('Material created successfully');
      setForm({ name: '', costPerUnit: 0, quantity: 0 });
    } catch (err) {
      setError('Failed to create material');
      console.error(err);
    }
  };

  return (
    <Container size="sm" mt="xl">
      <Title order={2} mb="md">New Material</Title>
      <form onSubmit={handleSubmit}>
        <TextInput
          label="Name"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <NumberInput
          label="Cost per Unit"
          value={form.costPerUnit}
          onChange={handleNumberChange('costPerUnit')}
          mt="md"
        />
        <NumberInput
          label="Quantity"
          value={form.quantity}
          onChange={handleNumberChange('quantity')}
          mt="md"
        />
        {error && <div style={{ color: 'red', marginTop: 8 }}>{error}</div>}
        <Button type="submit" mt="md">Save Material</Button>
      </form>
    </Container>
  );
}
export default Material;