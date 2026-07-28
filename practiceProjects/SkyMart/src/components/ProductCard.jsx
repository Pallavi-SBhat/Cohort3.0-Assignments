import React from 'react';
import { useCart } from '../context/CartContext';
import { Star, ShoppingCart } from 'lucide-react';
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
      className="bg-[#111] border border-white/5 rounded-[1.5rem] overflow-hidden flex flex-col cursor-pointer h-full animate-fade-in group hover:border-white/20 transition-colors"
      onClick={handleCardClick}
    >
      <div className="relative w-full pt-[100%] bg-white overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name} 
          className="absolute top-0 left-0 w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-105" 
          loading="lazy" 
        />
        <span className="absolute top-3 left-3 bg-black/60 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1 rounded-full capitalize z-10">
          {product.category}
        </span>
        {product.isNew && (
          <span className="absolute top-3 right-3 bg-volt text-ink text-[10px] font-bold px-3 py-1 rounded-full uppercase z-10">
            New
          </span>
        )}
      </div>
      
      <div className="p-5 flex flex-col flex-1">
        <div className="text-xs text-white/50 capitalize mb-1">{product.category}</div>
        <h3 className="text-base font-semibold text-white mb-2 line-clamp-2 flex-1">{product.name}</h3>
        
        <div className="flex items-center gap-1 text-sm font-medium text-white mb-4">
          <Star size={14} className="text-volt fill-volt" />
          <Star size={14} className="text-volt fill-volt" />
          <Star size={14} className="text-volt fill-volt" />
          <Star size={14} className="text-volt fill-volt" />
          <Star size={14} className="text-volt/30 fill-volt/30" />
          <span className="ml-1 text-white/50 font-normal">({product.reviews})</span>
        </div>
        
        <div className="flex justify-between items-center mt-auto border-t border-white/5 pt-4">
          <div className="text-lg font-bold text-volt">${product.price.toFixed(2)}</div>
          <button 
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl font-semibold text-sm transition-all duration-200 ${
              isAdded 
                ? 'bg-white/10 text-white cursor-default' 
                : 'bg-volt text-ink hover:bg-volt-light'
            }`}
            onClick={handleAddToCart}
            disabled={isAdded}
          >
            <ShoppingCart size={16} />
            {isAdded ? 'Added' : 'Add'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
