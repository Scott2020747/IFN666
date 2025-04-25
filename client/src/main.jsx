import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename="/construction-cost-estimator">    
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{ colorScheme: 'dark' }}
      >
        <App />
      </MantineProvider>
    </BrowserRouter>
  </React.StrictMode>
);
