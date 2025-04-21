// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import Home from './Home';
import Login from './Login';
// If you have a Layout or other pages, import them as well
// import Layout from './Layout';
// import Tasks from './Tasks';
// import Categories from './Categories';
// import About from './About';
 import Register from './Register';
// import NoPage from './NoPage';

function App() {
  // Retrieve token from localStorage to check if the user is authenticated
  const token = localStorage.getItem('token');

  return (
    <MantineProvider>
      <BrowserRouter basename="/construction-cost-estimator">
        <Routes>
          {/* If a token exists, redirect /login to Home; otherwise, render the Login page */}
          <Route path="/login" element={token ? <Navigate to="/" /> : <Login />} />

          {/* Protected Home route: if no token, redirect to /login */}
          <Route path="/" element={token ? <Home /> : <Navigate to="/login" />} />
          <Route path="register" element={<Register />} />

          {/* If you are adding more routes,
              consider wrapping them in a common layout.
              For example:
              <Route path="/" element={<Layout />}>
                <Route path="tasks" element={<Tasks />} />
                <Route path="categories" element={<Categories />} />
                <Route path="about" element={<About />} />
                <Route path="register" element={<Register />} />
                <Route path="*" element={<NoPage />} />
              </Route>
          */}
        </Routes>
      </BrowserRouter>
    </MantineProvider>
  );
}

export default App;
