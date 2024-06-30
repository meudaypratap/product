import React, { useEffect, useState } from 'react';
import ProductItem from './ProductItem';
import Pagination from './Pagination';
import './ProductList.css';
import { Product } from '../entities/Product';
import CreateProduct from './CreateProduct';
import ProductDetail from './ProductDetail';

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const pageSize = 3;
  useEffect(() => {
    fetchProducts(currentPage);
  }, [currentPage]);

  const fetchProducts = (page: number) => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/products/${page - 1}/${pageSize}`)
      .then(response => response.json())
      .then(data => {
        setProducts(data.content);
        setTotalPages(Math.ceil(data.total / pageSize));
      })
      .catch(error => console.error('Error fetching data:', error));
  };
  const handleProductAdded = () => {
    fetchProducts(currentPage);
  };
  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
  };
  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    fetchSearchResults(suggestion);
  };
  const handleCloseDetail = () => {
    setSelectedProduct(null);
  };
  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    fetchSearchResults(query);
  };
  const fetchSearchResults = (query:string) => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/search?query=${query}`)
      .then(response => response.json())
      .then(data => {
        setProducts(data.content);
        setTotalPages(1);
        setSuggestions(data.suggestions);
      })
      .catch(error => console.error('Error fetching data:', error));
  };
  return (
    <div>
      <form onSubmit={handleFormSubmit} className='search-bar-container'>
        <input
          className="search-bar-input"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search..."
        />
        <button type="submit" className="search-bar-button">Search</button>
        {suggestions.length > 0 && (
          <p className="suggestions-container">Did you mean:
            {suggestions.map((suggestion) => (
              <a key={suggestion} onClick={() => handleSuggestionClick(suggestion)} href="#">
                {suggestion}
              </a>
            ))}</p>
        )}
      </form>
      <div className="product-list-container">
        <div className="sidebar">
          <h1>Add Product</h1>
          <CreateProduct onProductAdded={handleProductAdded} />
        </div>
        <div className="main-content">
          <h1>Product Listing</h1>
          <div className="product-list">
            {products.map(product => (
              <ProductItem key={product.id} product={product} onClick={() => handleProductClick(product)} active={selectedProduct?.id == product.id} />
            ))}
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
        <div className="sidebar">
          <h1>Product Details</h1>
          <ProductDetail product={selectedProduct} onClose={handleCloseDetail} />
        </div>
      </div>
    </div>

  );
};

export default ProductList;