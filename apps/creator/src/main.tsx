import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import { tauriWindowGateway } from './platform/tauriWindowGateway';
import './app.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App windowGateway={tauriWindowGateway} />
  </StrictMode>,
);
