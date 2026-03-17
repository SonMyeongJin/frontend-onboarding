import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Router } from './app/routes';

export const renderApp = () => {
  const idElement = document.getElementById('root');
  const root = idElement && createRoot(idElement);
  if (!root) {
    throw new Error('React render target is not found');
  }
  root.render(
    <StrictMode>
      <Router />
    </StrictMode>,
  );
};
