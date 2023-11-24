// // models/Cart.js
// const mongoose = require('mongoose');
//
// const cartSchema = new mongoose.Schema({
//     user: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'User',
//         required: true,
//     },
//     // Другие поля, если необходимо
// });
//
// const Cart = mongoose.model('Cart', cartSchema);
//
// module.exports = Cart;



// models/Cart.js
const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    items: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'CartItem',
        },
    ],
    // Другие поля, если необходимо
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
