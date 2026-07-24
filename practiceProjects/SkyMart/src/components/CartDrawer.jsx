import React from 'react';
import { useCart } from '../context/CartContext';
import { X, Minus, Plus, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CartDrawer = () => {
  const { cart, removeFromCart, updateQuantity, clearCart, cartTotal, isCartOpen, setIsCartOpen } = useCart();
  const navigate = useNavigate();

  if (!isCartOpen) return null;

  const handleCheckout = () => {
    clearCart();
    setIsCartOpen(false);
    alert('Checkout successful! Thank you for your purchase.');
  };

  const handleBrowse = () => {
    setIsCartOpen(false);
    navigate('/products');
  };

  return (
    <>
      <div 
        className="fixed inset-0 w-screen h-screen bg-black/50 backdrop-blur-sm z-[100] animate-fade-in"
        onClick={() => setIsCartOpen(false)}
      ></div>
      <div 
        className={`fixed top-0 right-0 w-full max-w-[400px] h-screen bg-bg-card shadow-[-5px_0_15px_rgba(0,0,0,0.3)] z-[101] flex flex-col transition-transform duration-300 ease-in-out ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex justify-between items-center p-6 border-b border-border-color">
          <h2 className="text-xl font-bold m-0">Your Cart</h2>
          <button 
            className="bg-transparent text-text-muted flex items-center justify-center transition-colors duration-200 hover:text-text-main"
            onClick={() => setIsCartOpen(false)}
          >
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center text-text-muted gap-4">
              <p>Cart is empty. Go shop something cool!</p>
              <button className="btn-primary" onClick={handleBrowse}>Browse Products</button>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {cart.map(item => (
                <div key={item.id} className="flex gap-4 pb-4 border-b border-border-color">
                  <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg bg-bg-dark" />
                  <div className="flex-1 flex flex-col justify-between">
                    <h3 className="text-sm font-semibold mb-1 line-clamp-2">{item.name}</h3>
                    <div className="text-primary-accent font-bold text-sm mb-2">${item.price.toFixed(2)}</div>
                    
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3 bg-bg-dark px-2 py-1 rounded border border-border-color">
                        <button 
                          className="bg-transparent text-text-muted flex items-center justify-center hover:text-primary-accent"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus size={16} />
                        </button>
                        <span className="text-sm font-medium min-w-[1.2rem] text-center">{item.quantity}</span>
                        <button 
                          className="bg-transparent text-text-muted flex items-center justify-center hover:text-primary-accent"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                      <button 
                        className="bg-transparent text-text-muted transition-colors hover:text-danger"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {cart.length > 0 && (
          <div className="p-6 border-t border-border-color bg-bg-card">
            <div className="flex justify-between items-center mb-4 text-lg font-semibold">
              <span>Subtotal:</span>
              <span className="text-primary-accent text-xl">${cartTotal.toFixed(2)}</span>
            </div>
            <div className="flex gap-4">
              <button className="btn-secondary flex-1" onClick={clearCart}>Clear Cart</button>
              <button className="btn-primary flex-1" onClick={handleCheckout}>Checkout</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;
