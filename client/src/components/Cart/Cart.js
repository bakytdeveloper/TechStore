// Cart.js
import React from 'react';
import './Cart.css';

const Cart = ({ isOpen, closeCart, cartItems, buyItems }) => {
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
                        <ul>
                            {cartItems.map((item) => (
                                <li key={item.id}>
                                    {/* Отобразите информацию о товаре в корзине, например, item.name, item.price и т.д. */}
                                    {item.name} - {item.price} руб.
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                <button className="buy-button" onClick={buyItems}>
                    Купить
                </button>
            </div>
        </div>
    );
};

export default Cart;
