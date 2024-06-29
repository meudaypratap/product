import React, { useState } from 'react';
import './CreateProduct.css';

interface CreateProductProps {
    onProductAdded: () => void;
}

const CreateProduct: React.FC<CreateProductProps> = ({ onProductAdded }) => {
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [imageUrl, setImageUrl] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newProduct = { name, price: parseFloat(price), imageUrl, description, category };

        fetch('${import.meta.env.VITE_API_BASE_URL}/products', {  // Replace with your API endpoint
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newProduct),
        })
            .then(response => {
                if (response.ok) {
                    onProductAdded();
                    setName('');
                    setCategory('');
                    setDescription('');
                    setPrice('');
                    setImageUrl('');
                } else {
                    console.error('Error adding product');
                }
            })
            .catch(error => console.error('Error:', error));
    };

    return (
        <form className="add-product-form" onSubmit={handleSubmit}>
            <div>
                <label>Product Name</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div>
                <label>Product Category</label>
                <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} required />
            </div>
            <div>
                <label>Product Description</label>
                <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} required />
            </div>
            <div>
                <label>Price</label>
                <input type="number" step="0.01" value={price} onChange={(e) => setPrice(e.target.value)} required />
            </div>
            <div>
                <label>Image URL</label>
                <input type="text" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} required />
            </div>
            <button type="submit">Add Product</button>
        </form>
    );
};

export default CreateProduct;