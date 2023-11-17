

// App.js
import React, { useState, useEffect } from 'react';
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import ProductList from './components/ProductList/ProductList';
import './App.css';
import axios from 'axios';

const App = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5500/products')
            .then(response => {
                setProducts(response.data);
            })
            .catch(error => console.error('Error fetching products:', error));
    }, []);

    return (
        <div className="app">
            <Header />
            <div className="content">
                <Sidebar />
                <ProductList products={products} />
            </div>
        </div>
    );
};

export default App;







// import React, {useEffect, useState} from 'react';
// import Header from './components/Header/Header';
// import Sidebar from './components/Sidebar/Sidebar';
// import './App.css';
// import ProductCard from "./components/ProductCard/ProductCard";
//
// const App = () => {
//     const [products, setProducts] = useState([]);
//
//     useEffect(() => {
//         // Получаем товары из базы данных
//         // Замените URL на актуальный URL вашего сервера
//         fetch('http://localhost:5500/products')
//             .then(response => response.json())
//             .then(data => setProducts(data))
//             .catch(error => console.error('Error fetching products:', error));
//     }, []);
//
//
//     return (
//         <div className="app">
//
//             <Header />
//
//             <div className="main-content">
//                 <Sidebar />
//                 <div className="product-grid">
//                     {products.map(product => (
//                         <ProductCard key={product._id} product={product} />
//                     ))}
//                 </div>
//             </div>
//
//         </div>
//     );
// };
//
// export default App;
