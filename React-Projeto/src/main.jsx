
import React from 'react';
import { createRoot } from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dashboard from './COMPONENTES/Dashboard';
import { BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Dashboard />
    </BrowserRouter>
  </React.StrictMode>
)
