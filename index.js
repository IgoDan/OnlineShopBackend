const express = require("express");
const cors = require("cors");
const fs = require('fs/promises');
const redis = require('redis');

const products = require("./products");
const orders = require("./orders");

const app = express();
const port = process.env.PORT || 5000;

// Zewnętrzny URL Redis hostowany na render.com
const redisExternalURL = 'rediss://red-clni7ipll56s73ficld0:szMWcB5aCxZoI7OSH7HvWdYJw2wLrfno@frankfurt-redis.render.com:6379';

// Połączenie z bazą Redis
const client = redis.createClient(redisExternalURL);

client.on('connect', () => {
    console.log('Połączono z Redis');
});

client.on('error', (err) => {
    console.error(`Błąd połączenia z Redis: ${err}`);
});

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send("Witam w API sklepu");
});

app.get("/products", (req, res) => {
    res.send(products);
});

app.get('/orders', async (req, res) => {
    try {
        res.json(orders);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Błąd podczas odczytu zamówień' });
    }
});

app.post('/orders', async (req, res) => {
    try {
        const newOrder = req.body;

        // Pobierz autoinkrementowany indeks z Redis
        client.incr('orderIndex', async (err, orderId) => {
            if (err) throw err;

            // Dodaj nowe zamówienie z autoinkrementowanym indeksem
            const orderWithId = { id: orderId, ...newOrder };
            orders.push(orderWithId);

            // Zapisz zamówienia w pliku
            const updatedOrders = JSON.stringify(orders, null, 2);
            await fs.writeFile('orders.js', `module.exports = ${updatedOrders};`, 'utf-8');

            // Dodaj zamówienie do Redis
            client.set(`order:${orderId}`, JSON.stringify(orderWithId));

            res.json({ message: 'Zamówienie dodane pomyślnie' });
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Błąd podczas zapisywania zamówienia' });
    }
});

app.listen(port, () => {
    console.log(`Serwer działa na porcie ${port}`);
});
