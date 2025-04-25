import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import Register from './Register';
import Project   from './Project';
import Material  from './Material';
import Labour    from './Labour';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));

  return (
    <Routes>
      {/* 3) Public pages */}
      <Route
        path="/login"
                element={
                  token
                    ? <Navigate to="/" replace />
                    : <Login onLogin={setToken} />
                }
      />
      <Route path="/register" element={<Register />} />

      {/* Protected layout + nested pages */}
      <Route
        path="/"
        element={
                    token
                      ? <Home onLogout={() => setToken(null)} />
                      : <Navigate to="/login" replace />
                  }
      >
        {/* default when you hit “/” */}
        <Route index       element={<Project />} />
        <Route path="project"  element={<Project />} />
        <Route path="material" element={<Material />} />
        <Route path="labour"   element={<Labour />} />

        {/* catch‐all inside protected */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>

      {/* 5) Catch-all back to either home or login */}
      <Route
        path="*"
        element={<Navigate to={token ? '/' : '/login'} replace />}
      />
    </Routes>
  );
}
export default App;