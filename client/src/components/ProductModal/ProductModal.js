// ProductModal.js

import React, {useEffect} from 'react';
import './ProductModal.css';

const ProductModal = ({ isOpen, closeModal, product }) => {

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }

        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isOpen]);

    if (!isOpen || !product) {
        return null;
    };


    const handleOverlayClick = (e) => {
        // Закрываем модальное окно только при клике на overlay
        if (e.target.classList.contains('modal-overlay')) {
            closeModal();
        }
    };


    // Деструктуризация данных о продукте
    const { imageUrl, name, description, features } = product;

    const  handleOrder = () => {
        console.log(product)
    }


    return (
        <div className="modal-overlay"  onClick={handleOverlayClick}>
            <div className="modal-content">
                <div className="modal-header">
                    <img src={imageUrl} alt={name} className="modal-image" />
                    <div className="modal-header-text">
                        <h3>{name}</h3>
                        <p>{description}</p>
                    </div>
                </div>
                <div className="modal-body">
                    <h4>Характеристики:</h4>
                    <table>
                        <tbody>
                        {Object.entries(features).map(([key, value]) => (
                            <tr key={key}>
                                <td>{key}</td>
                                <td>{value}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
                <div className="modal-footer">
                    <button onClick={closeModal}>Выход</button>
                    <button onClick={() => handleOrder(product)}>Добавить в корзину</button>
                </div>
            </div>
        </div>
    );
};

export default ProductModal;
