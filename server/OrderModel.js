import mongoose, { Schema, model } from 'mongoose';

const orderSchema = new Schema({
    scoops: String,
    flavors: [String],
    toppings: [String],
});

const OrderModel = mongoose.model('Order', orderSchema);

export default OrderModel;