import React from 'react';
import './ProductItem.css';
import { Product } from '../entities/Product';

interface ProductItemProps {
    product: Product;
    onClick: () => void;
    active: boolean;
}

const ProductItem: React.FC<ProductItemProps> = ({ product, onClick, active }) => {
    return (
        <div className={`product-item ${active ? "active" : ""}`} onClick={onClick}>
            <img src={product.imageUrl} alt={product.name} className="product-image" />
            <h2>{product.name}</h2>
            <p>${product.price.toFixed(2)}</p>
        </div>
    );
};

export default ProductItem;