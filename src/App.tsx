import React from 'react';
import ProductList from './components/ProductList';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="App">
      <h1>Product Listing</h1>
      <ProductList />
    </div>
  );
}

export default App;