// // ProductList.js
// import React, {useState} from 'react';
// import ProductCard from './../ProductCard/ProductCard';
// import ProductModal from './../ProductModal/ProductModal';
// import './ProductList.css';
//
// const ProductList = ({ products }) => {
//
//     const [selectedProduct, setSelectedProduct] = useState(null);
//     const [isModalOpen, setIsModalOpen] = useState(false);
//
//     const openModal = (product) => {
//         setSelectedProduct(product);
//         setIsModalOpen(true);
//     };
//
//     const closeModal = () => {
//         setIsModalOpen(false);
//     };
//
//     return (
//         <div className="product-list">
//             {products.map((product) => (
//                 <ProductCard key={product._id} product={product}
//                              onCardClick={() => openModal(product)} />
//             ))}
//             <ProductModal isOpen={isModalOpen} closeModal={closeModal}
//                           product={selectedProduct} />
//         </div>
//     );
// };
//
// export default ProductList;




// ProductList.js

import React, { useState } from 'react';
import ProductModal from '../ProductModal/ProductModal';
import './ProductList.css'; // Подключаем стили для списка товаров

const ProductList = ({ products }) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const openModal = (product) => {
        setSelectedProduct(product);
        setModalOpen(true);
    };

    const closeModal = () => {
        setSelectedProduct(null);
        setModalOpen(false);
    };

    return (
        <div className="product-list">
            {products.map((product) => (
                <div key={product._id} className="product-card">
                    <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="product-image"
                        onClick={() => openModal(product)}
                    />
                    <div className="product-details">
                    <h3 className="product-name">{product.name}</h3>
                    <p className="product-description">{product.description.slice(0, 50)}</p>
                    <p className="product-price">${product.price}</p>
                    <button className="add-to-cart-button">Добавить в корзину</button>
                </div>
                </div>
            ))}

            {/* Передаем данные выбранного продукта в ProductModal */}
            <ProductModal isOpen={modalOpen} closeModal={closeModal} product={selectedProduct} />
        </div>
    );
};

export default ProductList;
