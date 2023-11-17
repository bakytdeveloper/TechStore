
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
                setFilteredProducts(response.data); // Начальное значение - все товары
            })
            .catch(error => console.error('Error fetching products:', error));
    }, []);

    const handleTypeChange = (selectedType) => {
        // Фильтруем товары по выбранному типу
        const filtered = products.filter(product => product.type === selectedType);
        setFilteredProducts(filtered);
    };

    const handleAllProductsClick = () => {
        // Показываем все товары
        setFilteredProducts(products);
    };

    return (
        <div className="app">
            <Header />
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
