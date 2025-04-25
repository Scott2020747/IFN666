// src/Home.jsx
import React, { useState } from 'react';
import {
  Container,
  Title,
  TextInput,
  Textarea,
  NumberInput,
  Button,
  Group,
  Divider,
  Notification,
  useMantineTheme,
} from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import classes from './AuthenticationTitle.module.css';

export default function Home({ onLogout }) {
  const theme = useMantineTheme();
  const navigate = useNavigate();
   const token = localStorage.getItem('token') || '';

  // -- Project form state & handlers --
  const [project, setProject] = useState({ name: '', description: '', estimatedCost: 0 });
  const [projError, setProjError] = useState('');
  const [projSuccess, setProjSuccess] = useState(false);

  const handleProjectChange = (e) => {
    const { name, value } = e.target;
    setProject(p => ({ ...p, [name]: value }));
  };
  const handleProjectCost = (val) =>
    setProject(p => ({ ...p, estimatedCost: val }));

  const submitProject = async (e) => {
    e.preventDefault();
    setProjError('');
    setProjSuccess(false);

    try {
      await axios.post(
        '/api/v1/projects',
        project,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setProjSuccess(true);
      setProject({ name: '', description: '', estimatedCost: 0 });
    } catch (err) {
      // Log the full error to the console
      console.error('Project creation error:', err);

      if (err.response) {
        // Server responded with a status outside 2xx
        setProjError(
          `Error ${err.response.status}: ` +
          (err.response.data?.message || err.response.statusText)
        );
      } else {
        // Network error or other issue
        setProjError(err.message);
      }
    }
  };


  // -- Material form state & handlers --
  const [material, setMaterial] = useState({ name: '', costPerUnit: 0, quantity: 0 });
  const [matError, setMatError] = useState('');
  const [matSuccess, setMatSuccess] = useState(false);

  const handleMaterialChange = (e) => {
    const { name, value } = e.target;
    setMaterial(m => ({ ...m, [name]: value }));
  };
  const handleMaterialNumber = (field) => (val) =>
    setMaterial(m => ({ ...m, [field]: val }));
  const submitMaterial = async (e) => {
    e.preventDefault();
    setMatError(''); setMatSuccess(false);
    try {
      await axios.post('/api/v1/materials', material, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMatSuccess(true);
      setMaterial({ name: '', costPerUnit: 0, quantity: 0 });
    } catch {
      setMatError('Failed to create material');
    }
  };

  // -- Logout handler --
  const handleLogout = () => {
    // 1) clear stored token
    localStorage.removeItem('token');
    // 2) clear React state in App
    onLogout();
    // 3) navigate into Login
    navigate('/login', { replace: true });
  };

  return (
    <div className={classes.wrapper}>
      <Container size="sm" py="xl" style={{ color: theme.colors.gray[0] }}>
        {/* Dashboard title */}
        <Title
          order={2}
          mb="xl"
          style={{ color: '#3d920d', textAlign: 'center' }}
        >
          Dashboard
        </Title>

        {/* Project Form */}
        <Title order={3} mb="md">New Project</Title>
        {projSuccess && (
          <Notification color="green" mb="sm" onClose={() => setProjSuccess(false)}>
            Project created successfully!
          </Notification>
        )}
        {projError && (
          <Notification color="red" mb="sm" onClose={() => setProjError('')}>
            {projError}
          </Notification>
        )}
        <form onSubmit={submitProject}>
          <TextInput
            label="Name"
            name="name"
            value={project.name}
            onChange={handleProjectChange}
            required
            mb="md"
          />
          <Textarea
            label="Description"
            name="description"
            value={project.description}
            onChange={handleProjectChange}
            mb="md"
          />
          <NumberInput
            label="Estimated Cost"
            value={project.estimatedCost}
            onChange={handleProjectCost}
            mb="md"
            parser={v => v.replace(/\$\s?|(,*)/g, '')}
            formatter={v =>
              !Number.isNaN(parseFloat(v))
                ? `$ ${v}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                : '$ '
            }
          />
          <Button type="submit" fullWidth mb="lg">
            Save Project
          </Button>
        </form>

        <Divider my="xl" />

        {/* Material Form */}
        <Title order={3} mb="md">New Material</Title>
        {matSuccess && (
          <Notification color="green" mb="sm" onClose={() => setMatSuccess(false)}>
            Material created successfully!
          </Notification>
        )}
        {matError && (
          <Notification color="red" mb="sm" onClose={() => setMatError('')}>
            {matError}
          </Notification>
        )}
        <form onSubmit={submitMaterial}>
          <TextInput
            label="Name"
            name="name"
            value={material.name}
            onChange={handleMaterialChange}
            required
            mb="md"
          />
          <NumberInput
            label="Cost per Unit"
            value={material.costPerUnit}
            onChange={handleMaterialNumber('costPerUnit')}
            mb="md"
          />
          <NumberInput
            label="Quantity"
            value={material.quantity}
            onChange={handleMaterialNumber('quantity')}
            mb="md"
          />
          <Button type="submit" fullWidth mb="lg">
            Save Material
          </Button>
        </form>


        <Group position="center" mt="xl">
          <Button
            variant="outline"
            color="red"
            fullWidth
            mt="lg"
            onClick={handleLogout}
          >
            +          Logout
          </Button>
        </Group>
      </Container>
    </div>
  );
}
