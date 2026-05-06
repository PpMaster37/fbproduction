import mongoose, { Schema, model } from 'mongoose';

const flavorSchema = new Schema({
    name : String
});

const FlavorModel = mongoose.model('Flavor', flavorSchema);

export default FlavorModel;