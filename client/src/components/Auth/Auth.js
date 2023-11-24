

// Auth.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Auth.css';

const Auth = ({ isOpen, closeAuth, closeLogin }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLogin, setIsLogin] = useState(true);
    const [message, setMessage] = useState(null);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden'; // Запрещаем скролл при открытии окна логина
            setUsername('');
            setEmail('');
            setPassword('');
            setMessage(null);
        } else {
            document.body.style.overflow = 'auto'; // Разрешаем скролл при закрытии окна логина
        }
    }, [isOpen]);

    const handleLoginToggle = () => {
        setIsLogin(!isLogin);
        setMessage(null);
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

            console.log(response.data);

            if (response.data.message) {
                setMessage(response.data.message);
                closeAuth();
                if (isLogin) {
                    closeLogin();
                }
            }
        } catch (error) {
            console.error(error);
            setMessage('Ошибка при входе или регистрации. Пожалуйста, попробуйте еще раз.');
        }
    };

    const title = isLogin ? 'Авторизоваться' : 'Регистрация';

    return (
        <div className={`auth-modal ${isOpen ? 'open' : ''}`}>
            <div className="auth-content">
                <button className="close-auth" onClick={closeAuth}>
                    Закрыть
                </button>
                <h2 className="register-head">{title}</h2>
                {message && (
                    <p className={`message ${message.includes('ошибка') ? 'error' : 'success'}`}>
                        {message}
                    </p>
                )}
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
                <p onClick={handleLoginToggle}>
                    {isLogin ? 'Зарегистрироваться' : 'Войти'}
                </p>
            </div>
        </div>
    );
};

export default Auth;