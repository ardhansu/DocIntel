import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import { DocumentProvider } from './contexts/DocumentContext';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <DocumentProvider>
        <App />
      </DocumentProvider>
    </BrowserRouter>
  </StrictMode>
);