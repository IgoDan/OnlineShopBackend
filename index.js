const express = require('express');
const cors = require('cors');
const { createClient } = require('redis');
const fs = require('fs').promises;

const products = require('./products');
const orders = require('./orders');

const app = express();

app.use(express.json());
app.use(cors());

// Rozdziel URL i port dla Redis
const redisConfig = {
  host: 'red-clni7ipll56s73ficld0',
  port: '6379',
};

// Funkcja do inicjalizacji klienta Redis
const initializeRedis = () => {
  const redisClient = createClient(redisConfig);

  redisClient.on('error', (err) => console.log('Redis Client Error', err));

  return redisClient;
};

app.get('/', (req, res) => {
  res.send('Witam w API sklepu');
});

app.get('/products', (req, res) => {
  res.send(products);
});

app.get('/orders', async (req, res) => {
  try {
    // Utwórz nowego klienta Redis dla każdego żądania
    const redisClient = initializeRedis();

    const ordersFromRedis = await redisClient.hgetall('orders');
    const ordersArray = Object.values(ordersFromRedis).map((order) =>
      JSON.parse(order)
    );

    // Zamknij klienta Redis po użyciu
    redisClient.quit();

    res.json(ordersArray);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Błąd podczas odczytu zamówień' });
  }
});

app.post('/orders', async (req, res) => {
  try {
    const newOrder = req.body;

    // Utwórz nowego klienta Redis dla każdego żądania
    const redisClient = initializeRedis();

    const currentIndex = await redisClient.incr('orderIndex');
    await redisClient.hset('orders', currentIndex, JSON.stringify(newOrder));

    orders.push(newOrder);
    const updatedOrders = JSON.stringify(orders, null, 2);
    await fs.writeFile('orders.js', `module.exports = ${updatedOrders};`, 'utf-8');

    // Zamknij klienta Redis po użyciu
    redisClient.quit();

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
