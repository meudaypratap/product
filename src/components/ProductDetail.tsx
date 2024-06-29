import React from 'react';
import './ProductDetail.css';
import { Product } from '../entities/Product';

interface ProductDetailProps {
    product: Product | null;
    onClose: () => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product, onClose }) => {
    if (!product) {
        return <div className="product-detail">Select a product to see the details</div>;
    }

    return (
        <div className="product-item">
            <img src={product.imageUrl} alt={product.name} className="product-image" />
            <h2>{product.name}</h2>
            <p>Category: ${product.category}</p>
            <p>Price: ${product.price.toFixed(2)}</p>
            <p>Description: ${product.description}</p>
            <button className="close-button" onClick={onClose}>Close</button>
        </div>
    );
};

export default ProductDetail;