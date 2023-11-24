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
//
//
// const { body, validationResult } = require('express-validator');
//
// const morgan = require('morgan');
// const CartItem = require("./models/CartItem");
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
//         console.log('Подключение к MongoDB...');
//         await mongoose.connect(process.env.MONGODB_URI, {
//             useNewUrlParser: true,
//             useUnifiedTopology: true,
//         });
//         console.log('MongoDB ПОДКЛЮЧЁН!!!!');
//     } catch (error) {
//         console.error('Ошибка подключения к MongoDB:', error);
//     }
// };
//
// connectDB();
//
// // Middleware для проверки аутентификации
// const authenticateToken = (req, res, next) => {
//     const token = req.header('Authorization');
//     if (!token) return res.status(401).json({ error: 'Несанкционированный' });
//
//     jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
//         if (err) return res.status(403).json({ error: 'Запрещенный' });
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
//     const { username, email, password } = req.body;
//
//     try {
//         const newUser = new User({ username, email, password, role: 'user' });  // Добавляем роль 'user'
//         await newUser.save();
//
//         // Создание уникальной корзины для нового пользователя
//         const newCartItem = new CartItem({ user: newUser._id });
//
//         await newCartItem.save();
//
//         res.json({ message: 'РЕГИСТРАЦИЯ ПРОШЛА УСПЕШНО!!!' });
//     } catch (error) {
//         console.error('Ошибка регистрации пользователя:', error);
//         res.status(500).json({ error: 'Внутренняя ошибка сервера' });
//     }
// });
//
//
//
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
//         const { _id, username, role, email: userEmail } = user;
//         const tokenPayload = { id: _id, username, role };
//
//         // Проверка, является ли пользователь администратором по email или паролю
//         if (userEmail.includes('admin_') || password.includes('admin_')) {
//             tokenPayload.isAdmin = true;
//         }
//
//         const token = jwt.sign(tokenPayload, process.env.JWT_SECRET);
//         res.json({ message: 'АВТОРИЗАЦИЯ ПРОШЛА УСПЕШНО!!!', token, user: { ...user._doc, isAdmin: tokenPayload.isAdmin } });
//     } catch (error) {
//         console.error('Ошибка входа пользователя:', error);
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
//         console.error('Ошибка при получении продуктов для клиентов:', error);
//         res.status(500).json({ error: 'Внутренняя ошибка сервера' });
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
//         res.json({ message: 'ПРОДУКТ УСПЕШНО СОЗДАН!!!' });
//     } catch (error) {
//         console.error('Ошибка при создании продукта для клиентов:', error);
//         res.status(500).json({ error: 'Внутренняя ошибка сервера' });
//     }
// });
//
// // Маршруты для административной панели
// app.get('/admin/products', authenticateToken, isAdmin, async (req, res) => {
//     try {
//         const products = await Product.find();
//         res.json(products);
//     } catch (error) {
//         console.error('Ошибка при получении продуктов для администратора.:', error);
//         res.status(500).json({ error: 'Внутренняя ошибка сервера' });
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
//         const errors = validationResult(req);
//         if (!errors.isEmpty()) {
//             return res.status(400).json({ errors: errors.array() });
//         }
//
//         const { name, description, price, quantity, imageUrl, features, type } = req.body;
//         const userId = req.user.id;
//
//         try {
//             const newProduct = new Product({ name, description, price, quantity, imageUrl, features, type, userId });
//             await newProduct.save();
//             res.json({ message: 'ПРОДУКТ УСПЕШНО СОЗДАН!!!' });
//         } catch (error) {
//             console.error('Ошибка создания продукта для администратора:', error);
//             res.status(500).json({ error: 'Внутренняя ошибка сервера' });
//         }
//     });
//
// app.get('/api/products/types', async (req, res) => {
//     try {
//         const types = await Product.distinct('type');
//         res.json(types);
//     } catch (error) {
//         console.error('Ошибка при получении типов продуктов.:', error);
//         res.status(500).json({ error: 'Внутренняя ошибка сервера' });
//     }
// });
//
//
//
//
//
//
// // Получение корзины пользователя
// app.get('/cart', authenticateToken, async (req, res) => {
//     try {
//         const cartItems = await CartItem.find({ user: req.user.id }).populate('product');
//         res.json(cartItems);
//     } catch (error) {
//         console.error('Ошибка при получении корзины пользователя:', error);
//         res.status(500).json({ error: 'Внутренняя ошибка сервера' });
//     }
// });
//
//
// // Добавление товара в корзину
// app.post('/cart/add', authenticateToken, async (req, res) => {
//     const { productId, quantity } = req.body;
//     const userId = req.user.id;
//
//     try {
//         const cartItem = await CartItem.findOne({ user: userId, product: productId });
//
//         if (cartItem) {
//             // Если товар уже есть в корзине, увеличиваем количество
//             cartItem.quantity += quantity || 1;
//             await cartItem.save();
//         } else {
//             // Если товара нет в корзине, создаем новую запись
//             await CartItem.create({ user: userId, product: productId, quantity });
//         }
//
//         res.json({ message: 'Товар успешно добавлен в корзину' });
//     } catch (error) {
//         console.error('Ошибка при добавлении товара в корзину:', error);
//         res.status(500).json({ error: 'Внутренняя ошибка сервера' });
//     }
// });
//
//
// app.listen(process.env.PORT, () => {
//     console.log(`СЕРВЕР РАБОТАЕТ НА ${process.env.PORT} ПОРТУ!!!`);
// });
//


const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Product = require('./models/Product');
const User = require('./models/User');
const CartItem = require("./models/CartItem");

const cors = require('cors');
const morgan = require('morgan');
const Cart = require("./models/Cart");



const { body, validationResult } = require('express-validator');


dotenv.config();

console.log('PORT:', process.env.PORT);
console.log('MONGODB_URI:', process.env.MONGODB_URI);

const app = express();
app.use(cors());
app.use(morgan('combined'));
app.use(express.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // Разрешить все источники (не рекомендуется для продакшена)
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    // Разрешаем обработку метода OPTIONS без проверки аутентификации
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }

    // Продолжаем выполнение цепочки middleware
    next();
});


const connectDB = async () => {
    try {
        console.log('Подключение к MongoDB...');
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB ПОДКЛЮЧЁН!!!!');
    } catch (error) {
        console.error('Ошибка подключения к MongoDB:', error);
    }
};

connectDB();

// Middleware для проверки аутентификации
const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ error: 'Несанкционированный' });

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ error: 'Запрещенный' });
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



// app.post('/register', async (req, res) => {
//     const { username, email, password, productInfo } = req.body;
//
//     try {
//         // Проверяем, существует ли пользователь с таким email
//         const existingUser = await User.findOne({ email });
//         if (existingUser) {
//             return res.status(400).json({ error: 'Пользователь с таким email уже существует' });
//         }
//
//         // Создаем нового пользователя
//         const newUser = new User({ username, email, password, role: 'user' });
//         console.log('Новый пользователь:', newUser);
//         await newUser.save();
//
//         // Создаем пустую корзину для нового пользователя
//         const newCart = new Cart({ user: newUser._id });
//         console.log('Новая корзина:', newCart);
//         await newCart.save();
//
//         // Если есть информация о продукте, добавляем ее в корзину пользователя
//         if (productInfo && productInfo.productId && productInfo.quantity) {
//             const { productId, quantity } = productInfo;
//             const newCartItem = new CartItem({ cart: newCart._id, product: productId, quantity });
//             await newCartItem.save();
//         }
//
//         res.json({ message: 'РЕГИСТРАЦИЯ ПРОШЛА УСПЕШНО!!!' });
//     } catch (error) {
//         console.error('Ошибка регистрации пользователя:', error);
//         res.status(500).json({ error: 'Внутренняя ошибка сервера', details: error.message });
//     }
// });


app.post('/register', async (req, res) => {
    const { username, email, password, productInfo } = req.body;

    try {
        // Проверяем, существует ли пользователь с таким email
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'Пользователь с таким email уже существует' });
        }

        // Создаем нового пользователя
        const newUser = new User({ username, email, password, role: 'user' });
        console.log('Новый пользователь:', newUser);

        // Создаем пустую корзину для нового пользователя
        const newCart = new Cart({ user: newUser._id });
        console.log('Новая корзина:', newCart);
        await newCart.save();

        // Привязываем корзину к пользователю
        newUser.cart = newCart._id;

        // Сохраняем пользователя с привязкой к корзине
        await newUser.save();

        // Если есть информация о продукте, добавляем ее в корзину пользователя
        if (productInfo && productInfo.productId && productInfo.quantity) {
            const { productId, quantity } = productInfo;
            const newCartItem = new CartItem({ cart: newCart._id, product: productId, quantity });
            await newCartItem.save();
        }

        res.json({ message: 'РЕГИСТРАЦИЯ ПРОШЛА УСПЕШНО!!!' });
    } catch (error) {
        console.error('Ошибка регистрации пользователя:', error);
        res.status(500).json({ error: 'Внутренняя ошибка сервера', details: error.message });
    }
});










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
        res.json({ message: 'АВТОРИЗАЦИЯ ПРОШЛА УСПЕШНО!!!', token, user: { ...user._doc, isAdmin: tokenPayload.isAdmin } });
    } catch (error) {
        console.error('Ошибка входа пользователя:', error);
        res.status(500).json({ error: error.message });
    }
});

// Маршруты для клиентов
app.get('/products', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        console.error('Ошибка при получении продуктов для клиентов:', error);
        res.status(500).json({ error: 'Внутренняя ошибка сервера' });
    }
});

app.post('/create-product', authenticateToken, async (req, res) => {
    const { name, description, price, quantity, imageUrl, features } = req.body;
    const userId = req.user.id;

    try {
        const newProduct = new Product({ name, description, price, quantity, imageUrl, features, userId });
        await newProduct.save();
        res.json({ message: 'ПРОДУКТ УСПЕШНО СОЗДАН!!!' });
    } catch (error) {
        console.error('Ошибка при создании продукта для клиентов:', error);
        res.status(500).json({ error: 'Внутренняя ошибка сервера' });
    }
});

// Маршруты для административной панели
app.get('/admin/products', authenticateToken, isAdmin, async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        console.error('Ошибка при получении продуктов для администратора.:', error);
        res.status(500).json({ error: 'Внутренняя ошибка сервера' });
    }
});

app.post('/admin/create-product', authenticateToken, isAdmin,
    [
        body('name').notEmpty(),
        body('description').notEmpty(),
        body('price').isNumeric(),
        body('quantity').isNumeric(),
        body('imageUrl').isURL(),
        body('features').isObject(), // Проверяем, что features является объектом
        body('type').notEmpty(),
        // Добавьте другие правила валидации по необходимости
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
            res.json({ message: 'ПРОДУКТ УСПЕШНО СОЗДАН!!!' });
        } catch (error) {
            console.error('Ошибка создания продукта для администратора:', error);
            res.status(500).json({ error: 'Внутренняя ошибка сервера' });
        }
    });

app.get('/api/products/types', async (req, res) => {
    try {
        const types = await Product.distinct('type');
        res.json(types);
    } catch (error) {
        console.error('Ошибка при получении типов продуктов.:', error);
        res.status(500).json({ error: 'Внутренняя ошибка сервера' });
    }
});






// Получение корзины пользователя
app.get('/cart', authenticateToken, async (req, res) => {
    try {
        const cartItems = await CartItem.find({ user: req.user.id }).populate('product');
        res.json(cartItems);
    } catch (error) {
        console.error('Ошибка при получении корзины пользователя:', error);
        res.status(500).json({ error: 'Внутренняя ошибка сервера' });
    }
});


// Добавление товара в корзину
app.post('/cart/add', authenticateToken, async (req, res) => {
    const { productId, quantity } = req.body;
    const userId = req.user.id;

    try {
        const cartItem = await CartItem.findOne({ user: userId, product: productId });

        if (cartItem) {
            // Если товар уже есть в корзине, увеличиваем количество
            cartItem.quantity += quantity || 1;
            await cartItem.save();
        } else {
            // Если товара нет в корзине, создаем новую запись
            await CartItem.create({ user: userId, product: productId, quantity });
        }

        res.json({ message: 'Товар успешно добавлен в корзину' });
    } catch (error) {
        console.error('Ошибка при добавлении товара в корзину:', error);
        res.status(500).json({ error: 'Внутренняя ошибка сервера' });
    }
});


app.listen(process.env.PORT, () => {
    console.log(`СЕРВЕР РАБОТАЕТ НА ${process.env.PORT} ПОРТУ!!!`);
});

