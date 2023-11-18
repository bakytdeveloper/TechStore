
// App.js
import React, { useState, useEffect } from 'react';
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import ProductList from './components/ProductList/ProductList';
import './App.css';
import axios from 'axios';

const App = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5500/products')
            .then(response => {
                setProducts(response.data);
                setFilteredProducts(response.data);
            })
            .catch(error => console.error('Error fetching products:', error));
    }, []);

    const handleTypeChange = (selectedType) => {
        const filtered = products.filter(product => product.type === selectedType);
        setFilteredProducts(filtered);
    };

    const handleAllProductsClick = () => {
        setFilteredProducts(products);
    };

    const handleSearch = (text) => {
        const filtered = products.filter(product =>
            product.name.toLowerCase().includes(text.toLowerCase()) ||
            product.type.toLowerCase().includes(text.toLowerCase())
        );
        setFilteredProducts(filtered);
    };

    return (
        <div className="app">
            <Header onSearch={handleSearch} />
            <div className="content">
                <Sidebar
                    onTypeChange={handleTypeChange}
                    onAllProductsClick={handleAllProductsClick}
                />
                <ProductList products={filteredProducts} />
            </div>
        </div>
    );
};

export default App;