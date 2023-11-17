import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Sidebar.css';

const Sidebar = () => {
    const [types, setTypes] = useState([]);

    useEffect(() => {
        // Получаем типы товаров из базы данных
        axios.get('http://localhost:5500/products') // Замените PORT на фактический порт вашего сервера
            .then(response => {
                // Убираем дубликаты и устанавливаем в состояние
                const uniqueTypes = [...new Set(response.data.map(item => item.type))];
                setTypes(uniqueTypes);
            })
            .catch(error => console.error('Error fetching types:', error));
    }, []);

    return (
        <div className="sidebar">
            <h2>Типы товаров</h2>
            <ul>
                {types.map((type, index) => (
                    <li key={index}>{type}</li>
                ))}
            </ul>
        </div>
    );
};

export default Sidebar;
