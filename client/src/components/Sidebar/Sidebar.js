

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Sidebar.css';

const Sidebar = ({ onTypeChange, onAllProductsClick }) => {
    const [types, setTypes] = useState([]);
    const [selectedType, setSelectedType] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:5500/api/products/types')
            .then(response => {
                const uniqueTypes = [...new Set(response.data)];
                setTypes(uniqueTypes);
            })
            .catch(error => console.error('Error fetching types:', error));
    }, []);

    const handleTypeClick = (type) => {
        setSelectedType(type);
        onTypeChange(type);
    };

    const handleAllProductsClick = () => {
        setSelectedType(null); // Сбросить выбранный тип
        onAllProductsClick();
    };

    return (
        <div className="sidebar">
            <h2>Типы товаров</h2>
            <ul>
                <li
                    className={!selectedType ? 'selected' : ''}
                    onClick={handleAllProductsClick}
                >
                    Все товары
                </li>
                {types.map((type, index) => (
                    <li
                        key={index}
                        className={type === selectedType ? 'selected' : ''}
                        onClick={() => handleTypeClick(type)}
                    >
                        {type}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Sidebar;





