const express = require("express");
const cors = require("cors");
const fs = require('fs/promises');
const redis = require('redis');

const products = require("./products");
const orders = require("./orders");

const app = express();

app.use(express.json());
app.use(cors());

// Tworzenie klienta Redis
const redisClient = redis.createClient({
  host: 'red-clni7ipll56s73ficld0',
  port: 6379
});

redisClient.on('error', (err) => {
    console.error(`Błąd Redis: ${err}`);
});

redisClient.on('connect', function() {
  console.log('Połączono do Redis');
});

app.get("/", (req, res) => {
    res.send("Witam w API sklepu");
});

app.get("/products", (req, res) => {
    res.send(products);
});

app.get('/orders', (req, res) => {
    try {
        res.json(orders);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Błąd podczas odczytu zamówień' });
    }
});

app.post('/orders', (req, res) => {
    try {
        const newOrder = req.body;
        orders.push(newOrder);

        // Zapisywanie zamówień w pliku
        const updatedOrdersFile = JSON.stringify(orders, null, 2);
        fs.writeFile('orders.js', `module.exports = ${updatedOrdersFile};`, 'utf-8')
          .then(() => {
            // Pobieranie indeksu zamówienia
            redisClient.incr('orderIndex', (err, orderIndex) => {
                if (err) {
                    console.error(err);
                    res.status(500).json({ error: 'Błąd podczas zapisywania zamówienia w Redis' });
                } else {
                    // Zapisywanie zamówienia w Redis
                    redisClient.set(`order:${orderIndex}`, JSON.stringify(newOrder), (err, result) => {
                        if (err) {
                            console.error(err);
                            res.status(500).json({ error: 'Błąd podczas zapisywania zamówienia w Redis' });
                        } else {
                            res.json({ message: 'Zamówienie dodane pomyślnie' });
                        }
                    });
                }
            });
          })
          .catch((error) => {
            console.error(error);
            res.status(500).json({ error: 'Błąd podczas zapisywania zamówienia' });
          });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Błąd podczas zapisywania zamówienia' });
    }
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Serwer działa na porcie ${port}`);
});
