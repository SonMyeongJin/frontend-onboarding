import type { FC } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import IndexPage from './pages/index/index';

export const Router: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<IndexPage />} path="/" />
      </Routes>
    </BrowserRouter>
  );
};
