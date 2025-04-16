// src/Home.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Title, TextInput, Button, Group, Pagination, Stack } from '@mantine/core';
import useDebounce from './hooks/useDebounce';

function Home() {
  const [projects, setProjects] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');
  
  // Debounce the search input to reduce API calls.
  const debouncedSearch = useDebounce(search, 500);

  const fetchProjects = async () => {
    try {
      // Retrieve the token dynamically from localStorage
      const token = localStorage.getItem('token');
      console.log('Token:', token); // Debugging line to check the token
      const response = await axios.get('/api/v1/projects', {
        params: { page, limit: 5, name: debouncedSearch },
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      // Expected response structure: { projects, pages, ... }
      setProjects(response.data.projects);
      setTotalPages(response.data.pages);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [page, debouncedSearch]);

  return (
    <Container size="md" py="xl">
      <Title align="center" mb="xl">Construction Cost Estimator App</Title>
      <Stack spacing="md">
        <TextInput
          placeholder="Search projects by name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          aria-label="Search projects"
        />
        <ul>
          {projects.map((project) => (
            <li key={project._id}>{project.name}</li>
          ))}
        </ul>
        <Group position="apart">
          <Button variant="outline" onClick={() => setPage((prev) => Math.max(prev - 1, 1))}>
            Previous
          </Button>
          <Pagination page={page} onChange={setPage} total={totalPages} />
          <Button variant="outline" onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}>
            Next
          </Button>
        </Group>
      </Stack>
    </Container>
  );
}

export default Home;