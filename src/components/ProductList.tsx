import React, { useEffect, useState } from 'react';
import ProductItem from './ProductItem';
import Pagination from './Pagination';
import './ProductList.css';
import { Product } from '../entities/Product';
import CreateProduct from './CreateProduct';
import ProductDetail from './ProductDetail';

const ProductList: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const pageSize = 3;
    useEffect(() => {
        fetchProducts(currentPage);
    }, [currentPage]);

    const fetchProducts = (page: number) => {
        fetch(`${import.meta.env.VITE_API_BASE_URL}/products/${page - 1}/${pageSize}`)  // Replace with your API endpoint
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
    
      const handleCloseDetail = () => {
        setSelectedProduct(null);
      };
    return (
       <div className="product-list-container">
      <div className="sidebar">
        <CreateProduct onProductAdded={handleProductAdded} />
      </div>
      <div className="main-content">
        <div className="product-list">
          {products.map(product => (
            <ProductItem key={product.id} product={product} onClick={() => handleProductClick(product)} />
          ))}
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
      <div className="detail-view">
        <ProductDetail product={selectedProduct} onClose={handleCloseDetail} />
      </div>
    </div>
    );
};

export default ProductList;