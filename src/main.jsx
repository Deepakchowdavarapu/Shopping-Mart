import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { CartProvider } from './assets/pages/CartContext.jsx';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App.jsx';
import Cart from './assets/pages/Cart.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <CartProvider>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </CartProvider>
    </BrowserRouter>
  </StrictMode>,
);