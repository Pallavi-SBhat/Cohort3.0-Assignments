import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { categories, products } from '../data/products';
import ProductCard from '../components/ProductCard';
import { Package, Truck, ShoppingBag, CreditCard, Star, Layers } from 'lucide-react';

const Home = () => {
  const { user } = useAuth();
  const { cartCount, cartTotal } = useCart();
  const navigate = useNavigate();

  const firstName = user?.name?.split(' ')[0] || 'User';

  const topRated = [...products].sort((a, b) => b.rating - a.rating).slice(0, 4);
  const newArrivals = [...products].filter(p => p.isNew).slice(0, 5);

  return (
    <div className="animate-fade-in pb-16">
      {/* Hero Section */}
      <section className="py-16 bg-[radial-gradient(circle_at_10%_20%,rgba(59,130,246,0.15)_0%,transparent_50%)]">
        <div className="w-full max-w-[1200px] mx-auto px-6 flex flex-col gap-8">
          <div className="flex flex-col gap-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-2">
              Good morning 👋<br/>
              Welcome back, <span className="text-primary-accent">{firstName}</span>!
            </h1>
            <p className="text-lg md:text-xl text-text-muted max-w-[600px] mb-4">
              Discover today's picks tailored just for you. Explore the latest trends and exclusive offers.
            </p>
            <div className="flex gap-4">
              <button className="btn-primary" onClick={() => navigate('/products')}>Shop Now</button>
              <button className="btn-secondary" onClick={() => navigate('/products')}>View All Products</button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="w-full max-w-[1200px] mx-auto px-6 mb-16 mt-8">
        <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-6">
          <div className="flex items-center gap-6 bg-bg-card p-6 rounded-2xl border border-border-color">
            <div className="bg-primary-accent/10 text-primary-accent w-12 h-12 rounded-full flex items-center justify-center shrink-0">
              <Package size={24} />
            </div>
            <div>
              <h3 className="text-base font-bold mb-1">20+ Products</h3>
              <p className="text-sm text-text-muted m-0">Available</p>
            </div>
          </div>
          <div className="flex items-center gap-6 bg-bg-card p-6 rounded-2xl border border-border-color">
            <div className="bg-primary-accent/10 text-primary-accent w-12 h-12 rounded-full flex items-center justify-center shrink-0">
              <Truck size={24} />
            </div>
            <div>
              <h3 className="text-base font-bold mb-1">Free Delivery</h3>
              <p className="text-sm text-text-muted m-0">On orders $50+</p>
            </div>
          </div>
          <div className="flex items-center gap-6 bg-bg-card p-6 rounded-2xl border border-border-color">
            <div className="bg-primary-accent/10 text-primary-accent w-12 h-12 rounded-full flex items-center justify-center shrink-0">
              <ShoppingBag size={24} />
            </div>
            <div>
              <h3 className="text-base font-bold mb-1">{cartCount} Items</h3>
              <p className="text-sm text-text-muted m-0">In your bag</p>
            </div>
          </div>
          <div className="flex items-center gap-6 bg-bg-card p-6 rounded-2xl border border-border-color">
            <div className="bg-primary-accent/10 text-primary-accent w-12 h-12 rounded-full flex items-center justify-center shrink-0">
              <CreditCard size={24} />
            </div>
            <div>
              <h3 className="text-base font-bold mb-1">${cartTotal.toFixed(2)} Value</h3>
              <p className="text-sm text-text-muted m-0">Ready to checkout</p>
            </div>
          </div>
          <div className="flex items-center gap-6 bg-bg-card p-6 rounded-2xl border border-border-color">
            <div className="bg-primary-accent/10 text-primary-accent w-12 h-12 rounded-full flex items-center justify-center shrink-0">
              <Star size={24} />
            </div>
            <div>
              <h3 className="text-base font-bold mb-1">5 Top Products</h3>
              <p className="text-sm text-text-muted m-0">Highly rated</p>
            </div>
          </div>
          <div className="flex items-center gap-6 bg-bg-card p-6 rounded-2xl border border-border-color">
            <div className="bg-primary-accent/10 text-primary-accent w-12 h-12 rounded-full flex items-center justify-center shrink-0">
              <Layers size={24} />
            </div>
            <div>
              <h3 className="text-base font-bold mb-1">6 Categories</h3>
              <p className="text-sm text-text-muted m-0">To explore</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="w-full max-w-[1200px] mx-auto px-6 mb-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">Shop by Category</h2>
        </div>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-6">
          {categories.map(cat => (
            <div 
              key={cat.id} 
              className="card text-center cursor-pointer flex flex-col justify-center py-8 px-4 group"
              onClick={() => navigate(`/products?category=${cat.id}`)}
            >
              <h3 className="text-lg font-bold mb-2 capitalize group-hover:text-primary-accent transition-colors">{cat.name}</h3>
              <p className="text-sm text-text-muted">{cat.count} items</p>
            </div>
          ))}
        </div>
      </section>

      {/* Top Rated */}
      <section className="w-full max-w-[1200px] mx-auto px-6 mb-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">Top Rated</h2>
          <button 
            className="text-primary-accent bg-transparent font-semibold hover:underline" 
            onClick={() => navigate('/products?sort=rating')}
          >
            See all
          </button>
        </div>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-8">
          {topRated.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* New Arrivals */}
      <section className="w-full max-w-[1200px] mx-auto px-6 mb-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">New Arrivals</h2>
          <button 
            className="text-primary-accent bg-transparent font-semibold hover:underline" 
            onClick={() => navigate('/products')}
          >
            See all
          </button>
        </div>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-8">
          {newArrivals.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
