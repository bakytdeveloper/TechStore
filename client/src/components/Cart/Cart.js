

// Cart.js

import React from 'react';
import './Cart.css';

const Cart = ({ isOpen, closeCart, cartItems }) => {
    console.log(cartItems)

    return (
        <div className={`cart-overlay ${isOpen ? 'open' : ''}`}>
            <div className="cart-content">
                <button className="close-cart-button" onClick={closeCart}>
                    Закрыть корзину
                </button>
                <div className="cart-items">
                    {cartItems.length === 0 ? (
                        <p>Вы пока что ничего не заказали.</p>
                    ) : (
                        cartItems.map((item) => (
                            <div key={item._id} className="cart-item">
                                <img src={item.product.imageUrl} alt={item.product.name} className="cart-item-image" />
                                <div className="cart-item-details">
                                    <p className="cart-item-name">{item.product.name}</p>
                                    <p className="cart-item-price">{item.product.price} руб.</p>
                                </div>
                            </div>
                        ))
                    )}
                </div>
                <button className="buy-button">Купить</button>
            </div>
        </div>
    );
};

export default Cart;
