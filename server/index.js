import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import connectDB from './initdb.js';
import FlavorModel from './FlavorModel.js';
import OrderModel from './OrderModel.js';

const app = express();

const port = process.env.PORT;

let flavorArray = [];

app.use(cors());
app.use(express.json());

connectDB();

const server = app.listen(port, () => {
    console.log('Listening on port:', port);
});

async function updateFlavorArray(){
    flavorArray = [];
    const data = await FlavorModel.find({}).lean().exec();
    data.forEach((flavor, index) => {
      flavorArray.push(flavor.name);
    })
}
  
function addingEightFlavors(flavorInputArray){
    flavorInputArray.forEach(async (flavor) => {
      const newFlavor = new FlavorModel({name: flavor});
      await newFlavor.save();
      console.log(flavor + 'added!');
    })
}

// addingEightFlavors([
//   'Chocolate', 
//   'Strawberry',
//   'Vanilla',
//   'Huckleberry',
//   'Dawg Tracks',
//   'Pop Rocks',
//   'Mystery',
//   'Butter Pecan'
// ]);

app.get('/flavors', async (req, res) => {
    await updateFlavorArray();
    res.json(flavorArray);
  })
  
app.post('/orderUpdate', async (req, res) => {
    const newOrder = new OrderModel({
      scoops: req.body.scoops,
      flavors: req.body.flavors,
      toppings: req.body.toppings
    });
    console.log(req.body);
    await newOrder.save();
    res.json({message: 'updated!'})
})
  
app.get('/mongoQuery', async (req, res) => {
    const jsonArray = await OrderModel.find({}).lean().exec();
    console.log(jsonArray);
    res.send(jsonArray);
})
  
app.get('/mongoClear', async (req, res) => {
    await OrderModel.deleteMany({});
    console.log('Database cleared');
    res.send('Database cleared');
})