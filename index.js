const express = require("express");
const cors = require("cors");
const Redis = require("ioredis");

const products = require('./products');
const orders = require('./orders');

const app = express();

app.use(express.json());
app.use(cors());

const redis = new Redis('rediss://red-clo9ofuqc21c73e58jeg:r6ebGwEtL0mNRyBls7YzsQQzMMRYrKJy@frankfurt-redis.render.com:6379');

let currentIndex = 0;

async function getCurrentIndex() {
  const storedIndex = await redis.get('currentOrderIndex');
  if (storedIndex) {
    currentIndex = parseInt(storedIndex, 10);
  }
}

getCurrentIndex();

redis.on('connect', () => {
  console.log('Połączono z Redis');
});

redis.on('error', (err) => {
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
    let ordersFromRedis = await redis.hgetall('orders');

    const ordersArray = Object.values(ordersFromRedis).map((order) =>
      JSON.parse(order)
    );

    res.json(ordersArray);

    console.log('Udało się odczytać wszystkie zamówienia');
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Błąd podczas odczytu zamówień' });
    console.log('Nie udało się odczytać wszystkich zamówień');
  }
});

app.post('/orders', async (req, res) => {
  try {
    const newOrder = req.body;

    await redis.hset('orders', currentIndex, JSON.stringify(newOrder));
    console.log(`Dodane nowe zamówienie, nr: ${currentIndex}`);

    currentIndex += 1;

    await redis.set('currentOrderIndex', currentIndex);

    res.json({ message: 'Zamówienie dodane pomyślnie' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Błąd podczas zapisywania zamówienia' });
    console.log(`Nie udało się dodać zamówienia, nr: ${currentIndex}`);
  }
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Serwer działa na porcie ${port}`);
});