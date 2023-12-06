const express = require("express");
const cors = require("cors");
const redis = require('redis');

const products = require('./products');
const orders = require('./orders');

const app = express();

app.use(express.json());
app.use(cors());

const redisClient = redis.createClient({
  url: 'redis://red-clni7ipll56s73ficld0',
  port: '6379'
});

client.on('connect', () => {
  console.log('Połączono z Redis');
});

client.on('error', (err) => {
  console.error(`Błąd połączenia z Redis: ${err}`);
});

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