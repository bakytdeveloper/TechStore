
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

    const [cartItems, setCartItems] = useState([]);

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

    // const addToCart = (productId) => {
    //     axios.post('http://localhost:5500/cart/add', { productId })
    //         .then(response => {
    //             console.log(response.data.message);
    //             // Обновление корзины после успешного добавления товара
    //             axios.get('http://localhost:5500/cart')
    //                 .then(response => setCartItems(response.data))
    //                 .catch(error => console.error('Error fetching cart:', error));
    //         })
    //         .catch(error => console.error('Error adding to cart:', error));
    // };


    const addToCart = (productId) => {
        const token = localStorage.getItem('token');

        if (!token) {
            console.error('No token available');
            return;
        }

        axios.post('http://localhost:5500/cart/add', { productId }, {
            headers: {
                'Authorization': token,
            },
        })
            .then(response => {
                console.log(response.data.message);
                // Обновление корзины после успешного добавления товара
                axios.get('http://localhost:5500/cart', {
                    headers: {
                        'Authorization': token,
                    },
                })
                    .then(response => setCartItems(response.data))
                    .catch(error => console.error('Error fetching cart:', error));
            })
            .catch(error => console.error('Error adding to cart:', error));
    };


    return (
        <div className="app">
            <Header onSearch={handleSearch} cartItems={cartItems} />
            {/*<Header onSearch={handleSearch} />*/}
            <div className="content">
                <Sidebar
                    onTypeChange={handleTypeChange}
                    onAllProductsClick={handleAllProductsClick}
                />
                <ProductList products={filteredProducts} addToCart={addToCart} />

                {/*<ProductList products={filteredProducts} />*/}
            </div>
        </div>
    );
};

export default App;
