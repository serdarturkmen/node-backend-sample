const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {type: String, required: true},
    price: {type: Number, required: true},
    productImage: {type: String, required: true},
    order:
        [
            {type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true}
        ]
});

module.exports = mongoose.model('Product', productSchema);
