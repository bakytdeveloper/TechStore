//
// // ProductList.js
//
// import React, { useState } from 'react';
// import ProductModal from '../ProductModal/ProductModal';
// import './ProductList.css'; // Подключаем стили для списка товаров
//
// const ProductList = ({ products, addToCart }) => {
//     const [modalOpen, setModalOpen] = useState(false);
//     const [selectedProduct, setSelectedProduct] = useState(null);
//
//     const openModal = (product) => {
//         setSelectedProduct(product);
//         setModalOpen(true);
//     };
//
//     const closeModal = () => {
//         setSelectedProduct(null);
//         setModalOpen(false);
//     };
//
//     return (
//         <div className="product-list">
//             {products.map((product) => (
//                 <div key={product._id} className="product-card">
//                     <img
//                         src={product.imageUrl}
//                         alt={product.name}
//                         className="product-image"
//                         onClick={() => openModal(product)}
//                     />
//                     <div className="product-details">
//                         <h3 className="product-name">{product.name}</h3>
//                         <p className="product-description">{product.description.slice(0, 50)}</p>
//                         <p className="product-price">${product.price}</p>
//                         <button className="add-to-cart-button">Добавить в корзину</button>
//                     </div>
//                 </div>
//             ))}
//
//             {/* Передаем данные выбранного продукта в ProductModal */}
//             <ProductModal isOpen={modalOpen} closeModal={closeModal} product={selectedProduct} />
//         </div>
//     );
// };
//
// export default ProductList;

// ProductList.js

import React, { useState } from 'react';
import ProductModal from '../ProductModal/ProductModal';
import './ProductList.css'; // Подключаем стили для списка товаров

const ProductList = ({ products, addToCart }) => {
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
                        <button className="add-to-cart-button" onClick={() => addToCart(product._id)}>
                            Добавить в корзину
                        </button>
                    </div>
                </div>
            ))}

            {/* Передаем данные выбранного продукта в ProductModal */}
            <ProductModal isOpen={modalOpen} closeModal={closeModal} product={selectedProduct} />
        </div>
    );
};

export default ProductList;
