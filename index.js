import express from 'express';
import cors from 'cors';
import { createClient } from 'redis';
import fs from 'fs/promises';

const products = require('./products');
const orders = require('./orders');

const app = express();

app.use(express.json());
app.use(cors());

// Connect to Redis
const redisClient = createClient({
  url: 'redis://red-clni7ipll56s73ficld0',
  port: '6379'
});

redisClient.on('error', (err) => console.log('Redis Client Error', err));

app.get('/', (req, res) => {
  res.send('Witam w API sklepu');
});

app.get('/products', (req, res) => {
  res.send(products);
});

app.get('/orders', async (req, res) => {
  try {
    const ordersFromRedis = await redisClient.hgetall('orders');

    const ordersArray = Object.values(ordersFromRedis).map((order) =>
      JSON.parse(order)
    );

    res.json(ordersArray);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Błąd podczas odczytu zamówień' });
  }
});

app.post('/orders', async (req, res) => {
  try {
    const newOrder = req.body;

    const currentIndex = await redisClient.incr('orderIndex');

    await redisClient.hset('orders', currentIndex, JSON.stringify(newOrder));

    orders[currentIndex] = newOrder;
    const updatedOrders = JSON.stringify(orders, null, 2);
    await fs.writeFile('orders.js', `module.exports = ${updatedOrders};`, 'utf-8');

    res.json({ message: 'Zamówienie dodane pomyślnie' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Błąd podczas zapisywania zamówienia' });
  }
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Serwer działa na porcie ${port}`);
});
