
import React, {useState} from 'react';
import './Header.css';

const Header = ({ onSearch }) => {

    const [searchText, setSearchText] = useState('');

    const handleSearchChange = (event) => {
        const text = event.target.value;
        setSearchText(text);
        onSearch(text); // Передаем текст для фильтрации
    };

    return (
        <div className="header">
            <div className="logo">NURStore</div>
            <div className="contact-info">
                <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
                    <i style={{fontSize: "35px"}} className="fab fa-instagram"></i>
                </a>
                <a href="https://t.me/" target="_blank" rel="noopener noreferrer">
                    <i style={{fontSize: "35px"}} className="fab fa-telegram"></i>
                </a>
                <a href="tel:+XXXXXXXXXX">XXX-XX-XX-XX</a>
            </div>
            <div className="search-box">
                <input
                    type="text"
                    placeholder="Поиск товаров..."
                    value={searchText}
                    onChange={handleSearchChange}
                />
                {/*<button>Поиск</button>*/}
            </div>
            <div className="cart">
                <button>Корзина</button>
            </div>
            <div className="user-actions">
                <button>Логин</button>
                <button>Регистрация</button>
            </div>
        </div>
    );
};

export default Header;


