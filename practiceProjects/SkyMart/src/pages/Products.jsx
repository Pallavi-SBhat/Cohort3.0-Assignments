import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { products, categories } from '../data/products';
import ProductCard from '../components/ProductCard';
import { Search, X } from 'lucide-react';

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('all');
  const [sortBy, setSortBy] = useState('default');
  const [filteredProducts, setFilteredProducts] = useState(products);

  useEffect(() => {
    const queryCat = searchParams.get('category');
    const querySort = searchParams.get('sort');
    
    if (queryCat) setCategory(queryCat);
    if (querySort) setSortBy(querySort);
  }, [searchParams]);

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
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6 mb-12">
        <div>
          <h1 className="text-3xl font-bold mb-1">All Products</h1>
          <span className="text-sm text-text-muted">{filteredProducts.length} products found</span>
        </div>
        
        <div className="flex flex-wrap items-center gap-4">
          <div className="relative flex-1 min-w-[250px]">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" />
            <input 
              type="text" 
              placeholder="Search products..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-field pl-11 w-full"
            />
          </div>
          
          <select 
            value={category} 
            onChange={(e) => setCategory(e.target.value)}
            className="input-field min-w-[150px] cursor-pointer appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3csvg_xmlns=%22http://www.w3.org/2000/svg%22_viewBox=%220_0_24_24%22_fill=%22none%22_stroke=%22%2394a3b8%22_stroke-width=%222%22_stroke-linecap=%22round%22_stroke-linejoin=%22round%22%3e%3cpolyline_points=%226_9_12_15_18_9%22%3e%3c/polyline%3e%3c/svg%3e')] bg-no-repeat bg-[position:right_1rem_center] bg-[length:1em] pr-10"
          >
            <option value="all">All Categories</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
          
          <select 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
            className="input-field min-w-[150px] cursor-pointer appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3csvg_xmlns=%22http://www.w3.org/2000/svg%22_viewBox=%220_0_24_24%22_fill=%22none%22_stroke=%22%2394a3b8%22_stroke-width=%222%22_stroke-linecap=%22round%22_stroke-linejoin=%22round%22%3e%3cpolyline_points=%226_9_12_15_18_9%22%3e%3c/polyline%3e%3c/svg%3e')] bg-no-repeat bg-[position:right_1rem_center] bg-[length:1em] pr-10"
          >
            <option value="default">Sort by</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Top Rated</option>
          </select>
          
          {isFiltering && (
            <button 
              className="flex items-center gap-1 bg-danger/10 text-danger px-4 py-3 rounded-lg transition-colors hover:bg-danger/20" 
              onClick={handleClearFilters} 
              title="Clear Filters"
            >
              <X size={18} />
              <span className="text-sm font-medium">Clear</span>
            </button>
          )}
        </div>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="text-center py-16 px-8 bg-bg-card rounded-2xl border border-border-color mt-8">
          <h2 className="text-2xl font-bold mb-2">No products found</h2>
          <p className="text-text-muted mb-8">Try adjusting your search or filters.</p>
          <button className="btn-primary" onClick={handleClearFilters}>Clear All Filters</button>
        </div>
      ) : (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-8">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;
