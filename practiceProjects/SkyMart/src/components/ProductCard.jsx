import React from 'react';
import { useCart } from '../context/CartContext';
import { Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const { cart, addToCart } = useCart();
  const navigate = useNavigate();

  const isAdded = cart.some(item => item.id === product.id);

  const handleCardClick = () => {
    navigate(`/products/${product.id}`);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    if (!isAdded) {
      addToCart(product);
    }
  };

  return (
    <div 
      className="card p-0 overflow-hidden flex flex-col cursor-pointer h-full animate-fade-in group"
      onClick={handleCardClick}
    >
      <div className="relative w-full pt-[100%] bg-[#f1f5f9] overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name} 
          className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
          loading="lazy" 
        />
        {product.isNew && (
          <span className="absolute top-3 left-3 bg-primary-accent text-white text-xs font-bold px-2 py-1 rounded-full uppercase z-10">
            New
          </span>
        )}
      </div>
      
      <div className="p-4 flex flex-col flex-1">
        <div className="text-xs text-text-muted capitalize mb-1">{product.category}</div>
        <h3 className="text-base font-semibold mb-2 line-clamp-2 flex-1">{product.name}</h3>
        
        <div className="flex items-center gap-1 text-sm font-medium text-text-main mb-3">
          <Star size={14} className="text-[#fbbf24]" fill="currentColor" />
          <span>{product.rating}</span>
          <span className="text-text-muted font-normal">({product.reviews})</span>
        </div>
        
        <div className="flex justify-between items-center mt-auto">
          <div className="text-lg font-bold text-primary-accent">${product.price.toFixed(2)}</div>
          <button 
            className={`px-4 py-1.5 rounded-full font-semibold text-sm transition-all duration-200 border ${
              isAdded 
                ? 'bg-success text-white border-success cursor-default' 
                : 'bg-bg-dark text-text-main border-border-color hover:bg-primary-accent hover:text-white hover:border-primary-accent'
            }`}
            onClick={handleAddToCart}
            disabled={isAdded}
          >
            {isAdded ? 'Added' : 'Add'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
