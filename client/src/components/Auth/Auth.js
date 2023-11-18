// // Auth.js
//
// import React, { useState } from 'react';
// import axios from 'axios';
// import './Auth.css';
//
// const Auth = ({ isOpen, closeAuth, closeLogin }) => {
//     const [username, setUsername] = useState('');
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [isLogin, setIsLogin] = useState(true); // Статус для регистрации или входа
//     const [message, setMessage] = useState(null);
//
//     const handleLoginToggle = () => {
//         setIsLogin(!isLogin);
//         setMessage(null); // Очищаем сообщение при смене режима
//     };
//
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             if (isLogin) {
//                 // Логика для отправки данных при входе
//                 const response = await axios.post('http://localhost:5500/login', { email, password });
//                 console.log(response.data);
//                 setMessage('Вы успешно вошли!');
//                 closeLogin(); // Закрыть окно логина
//             } else {
//                 // Логика для отправки данных при регистрации
//                 const response = await axios.post('http://localhost:5500/register', { username, email, password });
//                 console.log(response.data);
//                 setMessage('Вы успешно зарегистрированы!');
//             }
//         } catch (error) {
//             console.error(error);
//             setMessage('Ошибка при входе или регистрации. Пожалуйста, попробуйте еще раз.');
//         }
//     };
//
//     return (
//         <div className={`auth-modal ${isOpen ? 'open' : ''}`}>
//             <div className="auth-content">
//                 <button className="close-auth" onClick={closeAuth}>Закрыть</button>
//                 <h2>{isLogin ? 'Вход' : 'Регистрация'}</h2>
//                 {message && <p className={`message ${message.includes('ошибка') ? 'error' : 'success'}`}>{message}</p>}
//                 <form onSubmit={handleSubmit}>
//                     {!isLogin && (
//                         <div className="input-field">
//                             <label htmlFor="username">Имя пользователя:</label>
//                             <input
//                                 type="text"
//                                 id="username"
//                                 placeholder="Введите имя пользователя"
//                                 value={username}
//                                 onChange={(e) => setUsername(e.target.value)}
//                             />
//                         </div>
//                     )}
//                     <div className="input-field">
//                         <label htmlFor="email">Email:</label>
//                         <input
//                             type="email"
//                             id="email"
//                             placeholder="Введите email"
//                             value={email}
//                             onChange={(e) => setEmail(e.target.value)}
//                         />
//                     </div>
//                     <div className="input-field">
//                         <label htmlFor="password">Пароль:</label>
//                         <input
//                             type="password"
//                             id="password"
//                             placeholder="Введите пароль"
//                             value={password}
//                             onChange={(e) => setPassword(e.target.value)}
//                         />
//                     </div>
//                     <button type="submit">{isLogin ? 'Войти' : 'Зарегистрироваться'}</button>
//                 </form>
//                 <p onClick={handleLoginToggle}>{isLogin ? 'Зарегистрироваться' : 'Войти'}</p>
//             </div>
//         </div>
//     );
// };
//
// export default Auth;






// Auth.js

import React, { useState } from 'react';
import axios from 'axios';
import './Auth.css';

const Auth = ({ isOpen, closeAuth, closeLogin }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLogin, setIsLogin] = useState(true); // Статус для регистрации или входа
    const [message, setMessage] = useState(null);

    const handleLoginToggle = () => {
        setIsLogin(!isLogin);
        setMessage(null); // Очищаем сообщение при смене режима
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let response;
            if (isLogin) {
                response = await axios.post('http://localhost:5500/login', { email, password });
            } else {
                response = await axios.post('http://localhost:5500/register', { username, email, password });
            }

            console.log(response.data); // Выводим ответ сервера в консоль

            // Проверяем, что ответ содержит успешное сообщение
            if (response.data.message) {
                setMessage(response.data.message);
                // Добавляем следующую строку, чтобы закрыть окно авторизации после успешного события
                closeAuth();
                if (isLogin) {
                    closeLogin(); // Закрыть окно логина
                }
            }
        } catch (error) {
            console.error(error);
            setMessage('Ошибка при входе или регистрации. Пожалуйста, попробуйте еще раз.');
        }
    };

    return (
        <div className={`auth-modal ${isOpen ? 'open' : ''}`}>
            <div className="auth-content">
                <button className="close-auth" onClick={closeAuth}>Закрыть</button>
                <h2>{isLogin ? 'Вход' : 'Регистрация'}</h2>
                {message && <p className={`message ${message.includes('ошибка') ? 'error' : 'success'}`}>{message}</p>}
                <form onSubmit={handleSubmit}>
                    {!isLogin && (
                        <div className="input-field">
                            <label htmlFor="username">Имя пользователя:</label>
                            <input
                                type="text"
                                id="username"
                                placeholder="Введите имя пользователя"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                    )}
                    <div className="input-field">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Введите email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="input-field">
                        <label htmlFor="password">Пароль:</label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Введите пароль"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit">{isLogin ? 'Войти' : 'Зарегистрироваться'}</button>
                </form>
                <p onClick={handleLoginToggle}>{isLogin ? 'Зарегистрироваться' : 'Войти'}</p>
            </div>
        </div>
    );
};

export default Auth;
