

//
// const express = require('express');
// const mongoose = require('mongoose');
// const dotenv = require('dotenv');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const Product = require('./models/Product');
// const User = require('./models/User');
// const path = require('path'); // Добавлен импорт модуля path
//
// // Используйте относительный путь к файлу .env в корневой папке
// const envPath = path.join(__dirname, '../.env');
// dotenv.config({ path: envPath });
//
// console.log('PORT:', process.env.PORT);
// console.log('MONGODB_URI:', process.env.MONGODB_URI);
//
// const app = express();
// app.use(express.json());
//
// const connectDB = async () => {
//     try {
//         console.log('Connecting to MongoDB...');
//         await mongoose.connect(process.env.MONGODB_URI, {
//             useNewUrlParser: true,
//             useUnifiedTopology: true,
//         });
//         console.log('MongoDB Connected!');
//     } catch (error) {
//         console.error('MongoDB Connection Error:', error);
//     }
// };
//
// connectDB();
//
// // Middleware для проверки аутентификации
// const authenticateToken = (req, res, next) => {
//     const token = req.header('Authorization');
//     if (!token) return res.status(401).json({ error: 'Unauthorized' });
//
//     jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
//         if (err) return res.status(403).json({ error: 'Forbidden' });
//         req.user = user;
//         next();
//     });
// };
//
// // Регистрация нового пользователя
// app.post('/register', async (req, res) => {
//     console.log('Request Body:', req.body);
//
//     const { username, email, password } = req.body;
//
//     try {
//         const newUser = new User({ username, email, password });
//         await newUser.save();
//         res.json({ message: 'РЕГИСТРАЦИЯ ПРОШЛА УСПЕШНО!!!' });
//     } catch (error) {
//         console.error('ПРОИЗОШЛА ОШИБКА ПРИ РЕГИСТРАЦИИ:', error);
//         res.status(500).json({ error: 'Внутренняя ошибка сервера' });
//     }
// });
//
// // Вход пользователя
// app.post('/login', async (req, res) => {
//     const { email, password } = req.body;
//
//     try {
//         const user = await User.findOne({ email });
//         if (!user) {
//             return res.status(401).json({ error: 'Invalid email or password' });
//         }
//
//         const isValidPassword = await user.isValidPassword(password);
//         if (!isValidPassword) {
//             return res.status(401).json({ error: 'Invalid email or password' });
//         }
//
//         const { _id, username, role } = user;
//         const token = jwt.sign({ id: _id, username, role }, process.env.JWT_SECRET);
//         res.json({ message: 'Login successful', token, user });
//     } catch (error) {
//         console.error('Error logging in user:', error);
//         res.status(500).json({ error: error.message }); // Обновлено здесь
//     }
// });
//
// // Маршруты для клиентов и административной панели...
// // Ваш оставшийся код для маршрутов продолжает здесь
//
// app.listen(process.env.PORT, () => {
//     console.log(`Server is running on port ${process.env.PORT}`);
// });




const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Product = require('./models/Product');
const User = require('./models/User');

dotenv.config();

console.log('PORT:', process.env.PORT);
console.log('MONGODB_URI:', process.env.MONGODB_URI);

const app = express();
app.use(express.json());

const connectDB = async () => {
    try {
        console.log('Connecting to MongoDB...');
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB Connected!');
    } catch (error) {
        console.error('MongoDB Connection Error:', error);
    }
};

connectDB();

// Middleware для проверки аутентификации
const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ error: 'Unauthorized' });

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ error: 'Forbidden' });
        req.user = user;
        next();
    });
};

// Middleware для проверки, является ли пользователь администратором
const isAdmin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        res.status(403).json({ error: 'Запрещено – требуется доступ администратора.' });
    }
};

// Регистрация нового пользователя
app.post('/register', async (req, res) => {
    console.log('Request Body:', req.body);

    const { username, email, password } = req.body;

    try {
        const newUser = new User({ username, email, password });
        await newUser.save();
        res.json({ message: 'Registration successful' });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});








// Вход пользователя
// Вход пользователя
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const isValidPassword = await user.isValidPassword(password);
        if (!isValidPassword) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const { _id, username, role, email: userEmail } = user;
        const tokenPayload = { id: _id, username, role };

        // Проверка, является ли пользователь администратором по email или паролю
        if (userEmail.includes('admin_') || password.includes('admin_')) {
            tokenPayload.isAdmin = true;
        }

        const token = jwt.sign(tokenPayload, process.env.JWT_SECRET);
        res.json({ message: 'Авторизация успешна', token, user: { ...user._doc, isAdmin: tokenPayload.isAdmin } });
    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).json({ error: error.message });
    }
});



















// app.post('/login', async (req, res) => {
//     const { email, password } = req.body;
//
//     try {
//         const user = await User.findOne({ email });
//         if (!user) {
//             return res.status(401).json({ error: 'Invalid email or password' });
//         }
//
//         const isValidPassword = await user.isValidPassword(password);
//         if (!isValidPassword) {
//             return res.status(401).json({ error: 'Invalid email or password' });
//         }
//
//         const { _id, username, role, isAdmin } = user;
//         const tokenPayload = { id: _id, username, role };
//
//         if (isAdmin) {
//             tokenPayload.isAdmin = true;
//         }
//
//         const token = jwt.sign(tokenPayload, process.env.JWT_SECRET);
//         res.json({ message: 'Login successful', token, user });
//     } catch (error) {
//         console.error('Error logging in user:', error);
//         res.status(500).json({ error: error.message });
//     }
// });

// Маршруты для клиентов
app.get('/products', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        console.error('Error getting products for clients:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/create-product', authenticateToken, async (req, res) => {
    const { name, description, price, quantity, imageUrl, features } = req.body;
    const userId = req.user.id;

    try {
        const newProduct = new Product({ name, description, price, quantity, imageUrl, features, userId });
        await newProduct.save();
        res.json({ message: 'Product created successfully' });
    } catch (error) {
        console.error('Error creating product for clients:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Маршруты для административной панели
app.get('/admin/products', authenticateToken, isAdmin, async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        console.error('Error getting products for admin:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/admin/create-product', authenticateToken, isAdmin, async (req, res) => {
    const { name, description, price, quantity, imageUrl, features } = req.body;
    const userId = req.user.id;

    try {
        const newProduct = new Product({ name, description, price, quantity, imageUrl, features, userId });
        await newProduct.save();
        res.json({ message: 'Product created successfully' });
    } catch (error) {
        console.error('Error creating product for admin:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
