//
//
// const express = require('express');
// const mongoose = require('mongoose');
// const dotenv = require('dotenv');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const Product = require('./models/Product');
// const User = require('./models/User');
// const cors = require('cors');
//
// // const ProductType = require('./models/ProductType');
//
//
// const { body, validationResult } = require('express-validator');
//
// const morgan = require('morgan');
//
// dotenv.config();
//
// console.log('PORT:', process.env.PORT);
// console.log('MONGODB_URI:', process.env.MONGODB_URI);
//
// const app = express();
// app.use(cors());
// app.use(morgan('combined'));
// app.use(express.json());
//
// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*'); // Разрешить все источники (не рекомендуется для продакшена)
//     res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//     res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
//
//     // Разрешаем обработку метода OPTIONS без проверки аутентификации
//     if (req.method === 'OPTIONS') {
//         return res.sendStatus(200);
//     }
//
//     // Продолжаем выполнение цепочки middleware
//     next();
// });
//
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
// // Middleware для проверки, является ли пользователь администратором
// const isAdmin = (req, res, next) => {
//     if (req.user && req.user.isAdmin) {
//         next();
//     } else {
//         res.status(403).json({ error: 'Запрещено – требуется доступ администратора.' });
//     }
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
//         res.json({ message: 'Registration successful' });
//     } catch (error) {
//         console.error('Error registering user:', error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });
//
//
//
//
//
//
//
//
// // Вход пользователя
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
//         const { _id, username, role, email: userEmail } = user;
//         const tokenPayload = { id: _id, username, role };
//
//         // Проверка, является ли пользователь администратором по email или паролю
//         if (userEmail.includes('admin_') || password.includes('admin_')) {
//             tokenPayload.isAdmin = true;
//         }
//
//         const token = jwt.sign(tokenPayload, process.env.JWT_SECRET);
//         res.json({ message: 'Авторизация успешна', token, user: { ...user._doc, isAdmin: tokenPayload.isAdmin } });
//     } catch (error) {
//         console.error('Error logging in user:', error);
//         res.status(500).json({ error: error.message });
//     }
// });
//
// // Маршруты для клиентов
// app.get('/products', async (req, res) => {
//     try {
//         const products = await Product.find();
//         res.json(products);
//     } catch (error) {
//         console.error('Error getting products for clients:', error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });
//
// app.post('/create-product', authenticateToken, async (req, res) => {
//     const { name, description, price, quantity, imageUrl, features } = req.body;
//     const userId = req.user.id;
//
//     try {
//         const newProduct = new Product({ name, description, price, quantity, imageUrl, features, userId });
//         await newProduct.save();
//         res.json({ message: 'Product created successfully' });
//     } catch (error) {
//         console.error('Error creating product for clients:', error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });
//
// // Маршруты для административной панели
// app.get('/admin/products', authenticateToken, isAdmin, async (req, res) => {
//     try {
//         const products = await Product.find();
//         res.json(products);
//     } catch (error) {
//         console.error('Error getting products for admin:', error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });
//
// app.post('/admin/create-product', authenticateToken, isAdmin,
//     [
//         body('name').notEmpty(),
//         body('description').notEmpty(),
//         body('price').isNumeric(),
//         body('quantity').isNumeric(),
//         body('imageUrl').isURL(),
//         body('features').isObject(), // Проверяем, что features является объектом
//         body('type').notEmpty(),
//         // Добавьте другие правила валидации по необходимости
//     ],
//     async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//         return res.status(400).json({ errors: errors.array() });
//     }
//
//     const { name, description, price, quantity, imageUrl, features, type } = req.body;
//     const userId = req.user.id;
//
//     try {
//         const newProduct = new Product({ name, description, price, quantity, imageUrl, features, type, userId });
//         await newProduct.save();
//         res.json({ message: 'Product created successfully' });
//     } catch (error) {
//         console.error('Error creating product for admin:', error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });
//
//
//
//
//
//
// app.get('/api/products/types', async (req, res) => {
//     try {
//         const types = await Product.distinct('type');
//         res.json(types);
//     } catch (error) {
//         console.error('Error fetching product types:', error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });
//
//
//
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
const cors = require('cors');

const { body, validationResult } = require('express-validator');

const morgan = require('morgan');

dotenv.config();

console.log('PORT:', process.env.PORT);
console.log('MONGODB_URI:', process.env.MONGODB_URI);

const app = express();
app.use(cors());
app.use(morgan('combined'));
app.use(express.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }

    next();
});

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

const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ error: 'Unauthorized' });

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ error: 'Forbidden' });
        req.user = user;
        next();
    });
};

const isAdmin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        res.status(403).json({ error: 'Запрещено – требуется доступ администратора.' });
    }
};

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

app.get('/admin/products', authenticateToken, isAdmin, async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        console.error('Error getting products for admin:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/admin/create-product', authenticateToken, isAdmin,
    [
        body('name').notEmpty(),
        body('description').notEmpty(),
        body('price').isNumeric(),
        body('quantity').isNumeric(),
        body('imageUrl').isURL(),
        body('features').isObject(),
        body('type').notEmpty(),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, description, price, quantity, imageUrl, features, type } = req.body;
        const userId = req.user.id;

        try {
            const newProduct = new Product({ name, description, price, quantity, imageUrl, features, type, userId });
            await newProduct.save();
            res.json({ message: 'Product created successfully' });
        } catch (error) {
            console.error('Error creating product for admin:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });

app.get('/api/products/types', async (req, res) => {
    try {
        const types = await Product.distinct('type');
        res.json(types);
    } catch (error) {
        console.error('Error fetching product types:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
