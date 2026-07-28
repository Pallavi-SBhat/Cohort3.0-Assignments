import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import ProductCard from '../components/ProductCard';
import { SlidersHorizontal, Search, Loader2, X } from 'lucide-react';

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { products, categories, isLoading, error } = useProducts();
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('all');
  const [sortBy, setSortBy] = useState('default');
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    if (!products.length) return;
    
    const queryCat = searchParams.get('category');
    const querySort = searchParams.get('sort');
    
    if (queryCat) setCategory(queryCat);
    if (querySort) setSortBy(querySort);
  }, [searchParams, products]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-volt gap-4 animate-fade-in">
        <Loader2 size={48} className="animate-spin" />
        <h2 className="text-white font-heading font-bold text-xl">Loading Products...</h2>
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

  useEffect(() => {
    let result = [...products];

    if (searchQuery) {
      result = result.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        p.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (category !== 'all') {
      result = result.filter(p => p.category === category);
    }

    if (sortBy === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    }

    setFilteredProducts(result);
  }, [searchQuery, category, sortBy]);

  const handleClearFilters = () => {
    setSearchQuery('');
    setCategory('all');
    setSortBy('default');
    setSearchParams({});
  };

  const isFiltering = searchQuery || category !== 'all' || sortBy !== 'default';

  return (
    <div className="w-full max-w-[1200px] mx-auto px-6 py-8 pb-16 animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-heading font-bold text-white mb-2">All Products</h1>
        <span className="text-sm text-white/50">{filteredProducts.length} products found</span>
      </div>
      
      {/* Search and Filter Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center bg-[#111] border border-white/10 rounded-2xl md:rounded-full overflow-hidden mb-12">
        
        {/* Search Input */}
        <div className="relative flex-1 flex items-center min-w-[250px] px-6 py-4 md:border-r border-white/10">
          <Search size={18} className="text-white/40 mr-3 shrink-0" />
          <input 
            type="text" 
            placeholder="Search products..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent border-none outline-none text-white w-full text-sm placeholder:text-white/30"
          />
        </div>
        
        {/* Category Dropdown */}
        <div className="relative md:border-r border-white/10 px-4 py-4 md:py-0">
          <select 
            value={category} 
            onChange={(e) => setCategory(e.target.value)}
            className="w-full md:w-auto bg-transparent border-none outline-none text-sm text-white/80 cursor-pointer appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3csvg_xmlns=%22http://www.w3.org/2000/svg%22_viewBox=%220_0_24_24%22_fill=%22none%22_stroke=%22%23ffffff%22_stroke-opacity=%220.5%22_stroke-width=%222%22_stroke-linecap=%22round%22_stroke-linejoin=%22round%22%3e%3cpolyline_points=%226_9_12_15_18_9%22%3e%3c/polyline%3e%3c/svg%3e')] bg-no-repeat bg-[position:right_center] bg-[length:1em] pr-8"
          >
            <option value="all" className="bg-[#111]">All Categories</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.id} className="bg-[#111]">{cat.name}</option>
            ))}
          </select>
        </div>
        
        {/* Sort Dropdown */}
        <div className="relative px-4 py-4 md:py-0 md:pr-6">
          <select 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full md:w-auto bg-transparent border-none outline-none text-sm text-white/80 cursor-pointer appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3csvg_xmlns=%22http://www.w3.org/2000/svg%22_viewBox=%220_0_24_24%22_fill=%22none%22_stroke=%22%23ffffff%22_stroke-opacity=%220.5%22_stroke-width=%222%22_stroke-linecap=%22round%22_stroke-linejoin=%22round%22%3e%3cpolyline_points=%226_9_12_15_18_9%22%3e%3c/polyline%3e%3c/svg%3e')] bg-no-repeat bg-[position:right_center] bg-[length:1em] pr-8"
          >
            <option value="default" className="bg-[#111]">Featured</option>
            <option value="price-low" className="bg-[#111]">Price: Low to High</option>
            <option value="price-high" className="bg-[#111]">Price: High to Low</option>
            <option value="rating" className="bg-[#111]">Top Rated</option>
          </select>
        </div>
        
        {/* Clear Filters Button */}
        {isFiltering && (
          <div className="px-4 py-3 md:py-0 border-t md:border-t-0 border-white/10 flex items-center justify-center md:border-l">
            <button 
              className="flex items-center gap-1 text-xs font-semibold text-red-400 hover:text-red-300 transition-colors" 
              onClick={handleClearFilters} 
              title="Clear Filters"
            >
              <X size={14} /> Clear
            </button>
          </div>
        )}
      </div>

      {filteredProducts.length === 0 ? (
        <div className="text-center py-20 px-8 bg-[#111] rounded-[2rem] border border-white/5 mt-8">
          <h2 className="text-2xl font-heading font-bold text-white mb-2">No products found</h2>
          <p className="text-white/50 mb-8 max-w-md mx-auto">We couldn't find anything matching your current search or filters. Try adjusting them.</p>
          <button className="btn-volt inline-flex" onClick={handleClearFilters}>Clear All Filters</button>
        </div>
      ) : (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-6">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;
