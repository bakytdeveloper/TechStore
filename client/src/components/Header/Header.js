
//
//
//
// import React, {useState} from 'react';
// import './Header.css';
// import Cart from "../Cart/Cart";
//
// const Header = ({ onSearch }) => {
//
//     const [searchText, setSearchText] = useState('');
//
//     const handleSearchChange = (event) => {
//         const text = event.target.value;
//         setSearchText(text);
//         onSearch(text); // Передаем текст для фильтрации
//     };
//
//     const [isCartOpen, setIsCartOpen] = useState(false);
//
//     const handleCartClick = () => {
//         setIsCartOpen(!isCartOpen);
//     };
//
//     const closeCart = () => {
//         setIsCartOpen(false);
//     };
//
//
//     return (
//         <div className="header">
//             <div className="logo">NURStore</div>
//             <div className="contact-info">
//                 <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
//                     <i style={{fontSize: "35px"}} className="fab fa-instagram"></i>
//                 </a>
//                 <a href="https://t.me/" target="_blank" rel="noopener noreferrer">
//                     <i style={{fontSize: "35px"}} className="fab fa-telegram"></i>
//                 </a>
//                 <a href="tel:+XXXXXXXXXX">XXX-XX-XX-XX</a>
//             </div>
//             <div className="search-box">
//                 <input
//                     type="text"
//                     placeholder="Поиск товаров..."
//                     value={searchText}
//                     onChange={handleSearchChange}
//                 />
//                 {/*<button>Поиск</button>*/}
//             </div>
//             <div className="cart">
//                 <button className="cart-button" onClick={handleCartClick}>Корзина</button>
//             </div>
//             <Cart isOpen={isCartOpen} closeCart={closeCart} cartItems={[]} />
//
//             <div className="user-actions">
//                 <button>Логин</button>
//                 <button>Регистрация</button>
//             </div>
//         </div>
//     );
// };
//
// export default Header;













import React, {useState} from 'react';
import './Header.css';
import Cart from "../Cart/Cart";
import Auth from "../Auth/Auth";

const Header = ({ onSearch }) => {

    const [searchText, setSearchText] = useState('');

    const handleSearchChange = (event) => {
        const text = event.target.value;
        setSearchText(text);
        onSearch(text); // Передаем текст для фильтрации
    };

    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isAuthOpen, setIsAuthOpen] = useState(false);


    const handleCartClick = () => {
        setIsCartOpen(!isCartOpen);
    };


    const closeCart = () => {
        setIsCartOpen(false);
    };

    const openAuth = () => {
        setIsAuthOpen(true);
    };

    const closeAuth = () => {
        setIsAuthOpen(false);
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
                <i className="fa-solid fa-cart-shopping cart-button"
                   onClick={handleCartClick}></i>
                {/*<button className="cart-button" onClick={handleCartClick}>Корзина</button>*/}
            </div>
            <Cart isOpen={isCartOpen} closeCart={closeCart} cartItems={[]} />

            <Auth isOpen={isAuthOpen} closeAuth={closeAuth} />

            <div className="user-actions">
                <button className="login-button" onClick={openAuth}>Логин</button>
                <button>Регистрация</button>

            </div>

        </div>

    );
};

export default Header;









