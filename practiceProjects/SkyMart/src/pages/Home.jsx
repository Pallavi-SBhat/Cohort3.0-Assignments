import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useProducts } from '../context/ProductContext';
import ProductCard from '../components/ProductCard';
import { Package, Truck, ShoppingBag, TrendingUp, Star, Tag, ArrowRight, Zap, ShoppingCart, Loader2 } from 'lucide-react';

const Home = () => {
  const { user } = useAuth();
  const { cartCount, cartTotal } = useCart();
  const { products, categories, isLoading, error } = useProducts();
  const navigate = useNavigate();

  const firstName = user?.name?.split(' ')[0] || 'User';

  const topRated = [...products].sort((a, b) => b.rating - a.rating).slice(0, 4);
  const newArrivals = [...products].filter(p => p.isNew).slice(0, 5);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-volt gap-4 animate-fade-in">
        <Loader2 size={48} className="animate-spin" />
        <h2 className="text-white font-heading font-bold text-xl">Loading SkyMart...</h2>
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

  return (
    <div className="animate-fade-in pb-16">
      {/* Hero Section */}
      <section className="w-full max-w-[1200px] mx-auto px-6 mt-8">
        <div className="relative w-full rounded-[2rem] border border-white/10 bg-[#111] overflow-hidden p-10 md:p-14 flex flex-col md:flex-row justify-between items-center min-h-[400px]">
          {/* Subtle Grid Background */}
          <div 
            className="absolute inset-0 opacity-20 pointer-events-none" 
            style={{ 
              backgroundImage: 'linear-gradient(rgba(200, 244, 0, 0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(200, 244, 0, 0.15) 1px, transparent 1px)', 
              backgroundSize: '40px 40px' 
            }}
          ></div>
          
          <div className="relative z-10 flex flex-col gap-4 max-w-[600px]">
            <div className="text-volt text-xs font-bold tracking-widest uppercase mb-2">
              GOOD MORNING 👋
            </div>
            <h1 className="text-5xl md:text-6xl font-heading font-extrabold leading-tight mb-2 text-white">
              Welcome back,<br/>
              <span className="text-volt">{firstName}!</span>
            </h1>
            <p className="text-lg text-white/60 mb-6">
              Discover today's picks — hand-curated products across electronics, fashion, and more.
            </p>
            <div className="flex flex-wrap gap-4">
              <button 
                className="btn-volt flex items-center gap-2" 
                onClick={() => navigate('/products')}
              >
                Shop Now <ArrowRight size={16} />
              </button>
              <button 
                className="px-6 py-3 rounded-2xl border border-white/20 text-white font-semibold hover:bg-white/5 transition-colors" 
                onClick={() => navigate('/products')}
              >
                View All Products
              </button>
            </div>
          </div>
          
          {/* Right Floating Badges */}
          <div className="relative z-10 flex flex-col gap-6 mt-10 md:mt-0 md:mr-10">
            <div className="bg-[#1a1a1a] border border-white/10 rounded-2xl p-6 flex flex-col items-center justify-center text-center shadow-xl w-48 hover:border-volt/30 transition-colors">
              <h3 className="text-volt font-heading font-bold text-3xl mb-1">20+</h3>
              <p className="text-xs text-white/60 font-medium">Products Available</p>
            </div>
            <div className="bg-[#1a1a1a] border border-white/10 rounded-2xl p-6 flex flex-col items-center justify-center text-center shadow-xl w-48 hover:border-volt/30 transition-colors">
              <h3 className="text-white font-heading font-bold text-2xl mb-1">Free</h3>
              <p className="text-xs text-white/60 font-medium">Delivery on ₹999+</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="w-full max-w-[1200px] mx-auto px-6 mb-16 mt-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="flex items-center gap-4 bg-[#111] p-5 rounded-[1.5rem] border border-white/10 hover:border-white/20 transition-colors">
            <div className="bg-white/5 text-volt w-12 h-12 rounded-xl flex items-center justify-center shrink-0">
              <Package size={20} />
            </div>
            <div>
              <h3 className="text-xl font-heading font-bold text-white mb-0.5">{cartCount}</h3>
              <p className="text-xs text-white/50 m-0">Cart Items</p>
              <p className="text-[10px] text-white/30 m-0 mt-0.5">In your bag</p>
            </div>
          </div>
          <div className="flex items-center gap-4 bg-[#111] p-5 rounded-[1.5rem] border border-white/10 hover:border-white/20 transition-colors">
            <div className="bg-white/5 text-volt w-12 h-12 rounded-xl flex items-center justify-center shrink-0">
              <TrendingUp size={20} />
            </div>
            <div>
              <h3 className="text-xl font-heading font-bold text-white mb-0.5">${cartTotal.toFixed(2)}</h3>
              <p className="text-xs text-white/50 m-0">Cart Value</p>
              <p className="text-[10px] text-white/30 m-0 mt-0.5">Ready to checkout</p>
            </div>
          </div>
          <div className="flex items-center gap-4 bg-[#111] p-5 rounded-[1.5rem] border border-white/10 hover:border-white/20 transition-colors">
            <div className="bg-white/5 text-volt w-12 h-12 rounded-xl flex items-center justify-center shrink-0">
              <Star size={20} />
            </div>
            <div>
              <h3 className="text-xl font-heading font-bold text-white mb-0.5">5</h3>
              <p className="text-xs text-white/50 m-0">Top Products</p>
              <p className="text-[10px] text-white/30 m-0 mt-0.5">Highly rated</p>
            </div>
          </div>
          <div className="flex items-center gap-4 bg-[#111] p-5 rounded-[1.5rem] border border-white/10 hover:border-white/20 transition-colors">
            <div className="bg-white/5 text-volt w-12 h-12 rounded-xl flex items-center justify-center shrink-0">
              <Tag size={20} />
            </div>
            <div>
              <h3 className="text-xl font-heading font-bold text-white mb-0.5">6</h3>
              <p className="text-xs text-white/50 m-0">Categories</p>
              <p className="text-[10px] text-white/30 m-0 mt-0.5">To explore</p>
            </div>
          </div>
        </div>
      </section>

      {/* White Section for Categories and Products */}
      <div className="bg-white rounded-t-[3rem] px-6 py-16 mt-16 pb-24">
        <div className="w-full max-w-[1200px] mx-auto">
          
          {/* Categories */}
          <section className="mb-16">
            <div className="flex justify-between items-end mb-8">
              <h2 className="text-3xl font-heading font-bold text-ink">Shop by Category</h2>
              <button 
                className="flex items-center gap-1 text-ink/50 text-sm font-semibold hover:text-ink transition-colors" 
                onClick={() => navigate('/products')}
              >
                View All <ArrowRight size={14} />
              </button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {categories.map(cat => (
                <div 
                  key={cat.id} 
                  className="bg-white border border-ink/10 rounded-2xl cursor-pointer flex items-center p-4 group hover:border-volt hover:shadow-lg hover:shadow-volt/10 transition-all duration-300"
                  onClick={() => navigate(`/products?category=${cat.id}`)}
                >
                  <div className="w-10 h-10 mr-3 bg-[#f1f5f9] rounded-xl flex items-center justify-center text-xl group-hover:bg-volt/20 transition-colors shrink-0">
                    {cat.name === 'electronics' ? '💻' : cat.name === 'clothing' ? '👕' : cat.name === 'furniture' ? '🪑' : cat.name === 'home' ? '🏠' : cat.name === 'sports' ? '⚽' : '📦'}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-bold text-ink capitalize line-clamp-1">{cat.name}</h3>
                    <p className="text-[10px] text-ink/50 font-medium">{cat.count} items</p>
                  </div>
                  <ArrowRight size={14} className="text-ink/30 group-hover:text-volt transition-colors shrink-0" />
                </div>
              ))}
            </div>
          </section>

          {/* Two Columns: Top Rated & New Arrivals */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Top Rated */}
            <section>
              <div className="flex justify-between items-end mb-8">
                <h2 className="text-2xl font-heading font-bold text-ink flex items-center gap-2">
                  Top Rated
                </h2>
                <button 
                  className="flex items-center gap-1 text-ink/50 text-sm font-semibold hover:text-ink transition-colors" 
                  onClick={() => navigate('/products?sort=rating')}
                >
                  See all <ArrowRight size={14} />
                </button>
              </div>
              <div className="flex flex-col gap-4">
                {topRated.map(product => (
                  <div key={product.id} className="flex items-center gap-4 p-4 border border-ink/10 rounded-2xl hover:border-ink/30 hover:bg-ink/5 transition-all group cursor-pointer" onClick={() => navigate(`/products/${product.id}`)}>
                    <div className="w-20 h-20 rounded-xl bg-white border border-ink/5 overflow-hidden shrink-0 relative">
                      <img src={product.image} className="w-full h-full object-contain p-2" alt={product.name} />
                      <div className="absolute top-1 left-1 flex items-center gap-0.5 bg-white/90 backdrop-blur-sm px-1.5 py-0.5 rounded text-[10px] font-bold text-ink shadow-sm">
                        <Star size={10} className="text-volt fill-volt" /> {product.rating}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-ink text-sm line-clamp-2 mb-1 group-hover:text-volt-light transition-colors">{product.name}</h4>
                      <p className="text-xs text-ink/50 capitalize mb-2">{product.category}</p>
                      <div className="text-volt font-bold text-base">${product.price.toFixed(2)}</div>
                    </div>
                    <button className="bg-white border border-ink/10 w-10 h-10 rounded-full flex items-center justify-center text-ink shrink-0 group-hover:bg-volt group-hover:border-volt transition-colors" onClick={(e) => { e.stopPropagation(); navigate(`/products/${product.id}`); }}>
                      <ShoppingCart size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </section>

            {/* New Arrivals */}
            <section>
              <div className="flex justify-between items-end mb-8">
                <h2 className="text-2xl font-heading font-bold text-ink flex items-center gap-2">
                  New Arrivals
                </h2>
                <button 
                  className="flex items-center gap-1 text-ink/50 text-sm font-semibold hover:text-ink transition-colors" 
                  onClick={() => navigate('/products')}
                >
                  See all <ArrowRight size={14} />
                </button>
              </div>
              <div className="flex flex-col gap-4">
                {newArrivals.slice(0, 4).map(product => (
                  <div key={product.id} className="flex items-center gap-4 p-4 border border-ink/10 rounded-2xl hover:border-ink/30 hover:bg-ink/5 transition-all group cursor-pointer" onClick={() => navigate(`/products/${product.id}`)}>
                    <div className="w-20 h-20 rounded-xl bg-white border border-ink/5 overflow-hidden shrink-0 relative">
                      <img src={product.image} className="w-full h-full object-contain p-2" alt={product.name} />
                      <span className="absolute top-1 left-1 bg-volt text-ink text-[9px] font-bold px-1.5 py-0.5 rounded uppercase">New</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-ink text-sm line-clamp-2 mb-1 group-hover:text-volt-light transition-colors">{product.name}</h4>
                      <p className="text-xs text-ink/50 capitalize mb-2">{product.category}</p>
                      <div className="text-volt font-bold text-base">${product.price.toFixed(2)}</div>
                    </div>
                    <button className="bg-white border border-ink/10 w-10 h-10 rounded-full flex items-center justify-center text-ink shrink-0 group-hover:bg-volt group-hover:border-volt transition-colors" onClick={(e) => { e.stopPropagation(); navigate(`/products/${product.id}`); }}>
                      <ShoppingCart size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </section>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
