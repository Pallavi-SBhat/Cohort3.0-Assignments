import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import { useCart } from './context/CartContext';
import Header from './components/Header';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import ProtectedRoute from './components/ProtectedRoute';
import { Check } from 'lucide-react';

import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import About from './pages/About';

function App() {
  const { user } = useAuth();
  const { toastMessage } = useCart();

  return (
    <div className="app relative">
      <Header />
      <CartDrawer />
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-[200] bg-[#1c1c1c] text-white border border-white/5 rounded-full pl-2 pr-5 py-2 flex items-center gap-3 shadow-2xl animate-fade-in shadow-black/50">
          <div className="bg-volt text-ink rounded-full p-1.5 flex items-center justify-center">
            <Check size={16} strokeWidth={4} />
          </div>
          <span className="text-base font-medium">{toastMessage}</span>
        </div>
      )}
      
      <main className="main-content">
        <Routes>
          {/* Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Protected Routes */}
          <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/products" element={<ProtectedRoute><Products /></ProtectedRoute>} />
          <Route path="/products/:id" element={<ProtectedRoute><ProductDetails /></ProtectedRoute>} />
          <Route path="/about" element={<ProtectedRoute><About /></ProtectedRoute>} />
          
          {/* Redirects */}
          <Route path="/" element={user ? <Navigate to="/home" /> : <Navigate to="/login" />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
      
      {user && <Footer />}
    </div>
  );
}

export default App;
