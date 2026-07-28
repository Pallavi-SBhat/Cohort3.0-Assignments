import React, { createContext, useState, useEffect, useContext } from 'react';

const ProductContext = createContext();

export const useProducts = () => useContext(ProductContext);

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const res = await fetch('https://fakestoreapi.com/products');
        if (!res.ok) throw new Error('Failed to fetch products');
        const data = await res.json();
        
        // Map FakeStore data to match our app's existing structure
        const formattedProducts = data.map(item => ({
          id: item.id,
          name: item.title,
          category: item.category,
          price: item.price,
          rating: item.rating.rate,
          reviews: item.rating.count,
          image: item.image,
          description: item.description,
          // Arbitrarily flag some items as new for the UI
          isNew: item.id > 15
        }));
        
        setProducts(formattedProducts);
        
        // Dynamically extract unique categories and count items
        const catMap = formattedProducts.reduce((acc, p) => {
          acc[p.category] = (acc[p.category] || 0) + 1;
          return acc;
        }, {});
        
        const formattedCategories = Object.keys(catMap).map(c => ({
          id: c,
          name: c,
          count: catMap[c]
        }));
        
        setCategories(formattedCategories);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchProducts();
  }, []);

  return (
    <ProductContext.Provider value={{ products, categories, isLoading, error }}>
      {children}
    </ProductContext.Provider>
  );
};
