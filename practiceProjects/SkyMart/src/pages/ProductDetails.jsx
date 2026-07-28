import React, { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';
import { Star, Truck, ShieldCheck, RefreshCw, ChevronRight, Loader2 } from 'lucide-react';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { cart, addToCart } = useCart();
  const { products, isLoading, error } = useProducts();
  
  const product = products.find(p => p.id === parseInt(id));
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-volt gap-4 animate-fade-in">
        <Loader2 size={48} className="animate-spin" />
        <h2 className="text-white font-heading font-bold text-xl">Loading Product...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-red-500 gap-4 animate-fade-in">
        <h2 className="text-white font-heading font-bold text-xl">Oops, something went wrong!</h2>
        <p>{error}</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="w-full max-w-[1200px] mx-auto px-6 flex flex-col items-center justify-center min-h-[50vh] gap-8">
        <h2 className="text-2xl font-bold">Product not found</h2>
        <button className="btn-primary" onClick={() => navigate('/products')}>Back to Shop</button>
      </div>
    );
  }

  const isAdded = cart.some(item => item.id === product.id);
  
  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="w-full max-w-[1200px] mx-auto px-6 py-8 pb-16 animate-fade-in">
      <div className="flex items-center gap-2 mb-8 text-sm text-text-muted">
        <Link to="/products" className="hover:text-primary-accent transition-colors">Products</Link>
        <ChevronRight size={16} />
        <Link to={`/products?category=${product.category}`} className="hover:text-primary-accent transition-colors capitalize">{product.category}</Link>
        <ChevronRight size={16} />
        <span className="text-text-main font-medium">{product.name}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20 items-start">
        <div className="relative w-full rounded-2xl overflow-hidden bg-[#f1f5f9] shadow-md">
          <img src={product.image} alt={product.name} className="w-full h-auto aspect-square object-cover block" />
          {product.isNew && (
            <span className="absolute top-6 left-6 bg-primary-accent text-white text-sm font-bold px-4 py-2 rounded-full uppercase z-10 shadow-glow">
              New
            </span>
          )}
        </div>

        <div className="flex flex-col">
          <span className="text-primary-accent uppercase font-bold text-sm tracking-wider mb-2">{product.category}</span>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">{product.name}</h1>
          
          <div className="flex items-center gap-2 mb-6">
            <div className="flex text-[#fbbf24]">
              <Star size={18} fill="currentColor" />
              <Star size={18} fill="currentColor" />
              <Star size={18} fill="currentColor" />
              <Star size={18} fill="currentColor" />
              <Star size={18} className="opacity-50" />
            </div>
            <span className="font-semibold text-text-main">{product.rating}</span>
            <span className="text-text-muted">({product.reviews} reviews)</span>
          </div>
          
          <div className="text-4xl font-extrabold text-text-main mb-8">${product.price.toFixed(2)}</div>
          
          <p className="text-text-muted text-lg leading-relaxed mb-10">{product.description}</p>
          
          <div className="flex gap-4 mb-12">
            <button 
              className={`flex-1 px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-200 border ${
                isAdded 
                  ? 'bg-success text-white border-success cursor-default' 
                  : 'bg-primary-accent text-white border-primary-accent hover:bg-primary-hover hover:shadow-glow'
              }`}
              onClick={() => !isAdded && addToCart(product)}
              disabled={isAdded}
            >
              {isAdded ? 'Added to Cart' : 'Add to Cart'}
            </button>
          </div>

          <div className="flex flex-wrap gap-8 pt-8 border-t border-border-color">
            <div className="flex items-center gap-2 text-text-muted font-medium">
              <Truck size={20} className="text-primary-accent" />
              <span>Free Delivery</span>
            </div>
            <div className="flex items-center gap-2 text-text-muted font-medium">
              <ShieldCheck size={20} className="text-primary-accent" />
              <span>Secure Pay</span>
            </div>
            <div className="flex items-center gap-2 text-text-muted font-medium">
              <RefreshCw size={20} className="text-primary-accent" />
              <span>Easy Returns</span>
            </div>
          </div>
        </div>
      </div>

      {relatedProducts.length > 0 && (
        <div className="mt-20">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Related Products</h2>
          </div>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-8">
            {relatedProducts.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
