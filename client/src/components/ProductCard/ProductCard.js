// ProductCard.js

import React from 'react';
import './ProductCard.css';

const ProductCard = ({ product, addToCart }) => {



    return (
        <div className="product-card">
            <img className="product-image" src={product.imageUrl} alt={product.name} />
            <div className="product-details">
                <h3 className="product-name">{product.name}</h3>
                <p className="product-description">{product.description.slice(0, 50)}</p>
                <p className="product-price">${product.price}</p>
                <button className="add-to-cart-button" onClick={() => addToCart(product._id)}>
                    Добавить в корзину
                </button>
            </div>
        </div>
    );
};

export default ProductCard;




