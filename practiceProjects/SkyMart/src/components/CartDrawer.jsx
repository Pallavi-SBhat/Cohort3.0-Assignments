import React from 'react';
import { useCart } from '../context/CartContext';
import { X, Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CartDrawer = () => {
  const { cart, removeFromCart, updateQuantity, clearCart, cartTotal, isCartOpen, setIsCartOpen, showToast } = useCart();
  const navigate = useNavigate();

  if (!isCartOpen) return null;

  const handleCheckout = () => {
    clearCart();
    setIsCartOpen(false);
    if (showToast) {
      showToast('Order placed! 🎉 (Demo)');
    }
  };

  const handleBrowse = () => {
    setIsCartOpen(false);
    navigate('/products');
  };

  return (
    <>
      <div 
        className="fixed inset-0 w-screen h-screen bg-black/60 backdrop-blur-sm z-[100] animate-fade-in"
        onClick={() => setIsCartOpen(false)}
      ></div>
      <div 
        className={`fixed top-0 right-0 w-full max-w-[420px] h-screen bg-[#111] shadow-2xl z-[101] flex flex-col transition-transform duration-300 ease-in-out border-l border-white/5 ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex justify-between items-center p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <ShoppingBag className="text-volt" size={20} />
            <h2 className="text-xl font-bold text-white m-0">Cart</h2>
            <span className="bg-[#1a2300] text-volt text-[11px] font-bold px-2 py-0.5 rounded-full">{cart.length} Items</span>
          </div>
          <button 
            className="bg-transparent text-white/50 flex items-center justify-center transition-colors duration-200 hover:text-white"
            onClick={() => setIsCartOpen(false)}
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center text-white/50 gap-4">
              <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center text-white/30 mb-2">
                <ShoppingBag size={24} />
              </div>
              <p>Your cart is empty. Let's find something cool!</p>
              <button className="bg-volt text-ink px-6 py-2 rounded-full font-bold mt-2" onClick={handleBrowse}>Browse Products</button>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {cart.map(item => (
                <div key={item.id} className="flex gap-4 p-4 border border-white/10 rounded-2xl bg-transparent relative">
                  <div className="w-16 h-16 bg-white rounded-xl overflow-hidden shrink-0 border border-white/5">
                    <img src={item.image} alt={item.name} className="w-full h-full object-contain p-1" />
                  </div>
                  <div className="flex-1 flex flex-col">
                    <h3 className="text-sm font-medium text-white mb-0.5 pr-6 line-clamp-1">{item.name}</h3>
                    <div className="text-volt font-bold text-sm leading-tight">${item.price.toFixed(2)}</div>
                    <div className="text-white/30 text-[10px] mb-3">${item.price.toFixed(2)} each</div>
                    
                    <div className="flex items-center gap-4 border border-white/10 rounded-full px-3 py-1 w-fit">
                      <button 
                        className="text-white/50 hover:text-white transition-colors"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        <Minus size={12} />
                      </button>
                      <span className="text-xs font-bold text-white min-w-[1rem] text-center">{item.quantity}</span>
                      <button 
                        className="text-white/50 hover:text-white transition-colors"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                  </div>
                  <button 
                    className="absolute bottom-4 right-4 text-white/30 hover:text-red-400 transition-colors"
                    onClick={() => removeFromCart(item.id)}
                    title="Remove item"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {cart.length > 0 && (
          <div className="p-6 border-t border-white/10">
            <div className="flex justify-between items-center mb-6">
              <span className="text-white/50 text-sm">Total</span>
              <span className="text-white font-bold text-2xl">${cartTotal.toFixed(2)}</span>
            </div>
            <div className="flex flex-col gap-3">
              <button className="bg-volt text-ink font-bold py-3.5 rounded-xl hover:bg-volt-light transition-colors w-full" onClick={handleCheckout}>
                Checkout &rarr;
              </button>
              <button className="text-white/30 text-xs hover:text-white transition-colors py-2" onClick={clearCart}>
                Clear cart
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;
