// src/Project.jsx
import React, { useState } from 'react';
import {
  TextInput,
  Textarea,
  NumberInput,
  Button,
  Container,
  Title,
} from '@mantine/core';
import axios from 'axios';

function Project() {
  const [form, setForm] = useState({
    name: '',
    description: '',
    estimatedCost: 0,
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleCostChange = (value) => {
    setForm((f) => ({ ...f, estimatedCost: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await axios.post('/api/v1/projects', form);
      alert('Project created successfully');
      setForm({ name: '', description: '', estimatedCost: 0 });
    } catch (err) {
      setError('Failed to create project');
      console.error(err);
    }
  };

  return (
    <Container size="sm" mt="xl">
      <Title order={2} mb="md">New Project</Title>
      <form onSubmit={handleSubmit}>
        <TextInput
          label="Name"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <Textarea
          label="Description"
          name="description"
          value={form.description}
          onChange={handleChange}
          mt="md"
        />
        <NumberInput
          label="Estimated Cost"
          value={form.estimatedCost}
          onChange={handleCostChange}
          mt="md"
          parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
          formatter={(value) =>
            !Number.isNaN(parseFloat(value))
              ? `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
              : '$ '
          }
        />
        {error && <div style={{ color: 'red', marginTop: 8 }}>{error}</div>}
        <Button type="submit" mt="md">Save Project</Button>
      </form>
    </Container>
  );
}
export default Project;
