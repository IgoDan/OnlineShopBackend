const express = require("express");
const cors = require("cors");
const fs = require('fs/promises');
const redis = require('redis');

const products = require("./products");
const orders = require("./orders");

const app = express();

app.use(express.json());
app.use(cors());

const createRedisClient = () => {
    return redis.createClient('redis://red-clni7ipll56s73ficld0:6379');
};

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
        orders.push(newOrder);

        // Zapisywanie zamówień w pliku
        const updatedOrdersFile = JSON.stringify(orders, null, 2);
        await fs.writeFile('orders.js', `module.exports = ${updatedOrdersFile};`, 'utf-8');

        // Dodawanie zamówienia do Redis
        const redisClient = createRedisClient();

        const orderIndex = await new Promise((resolve, reject) => {
            redisClient.incr('orderIndex', (err, orderIndex) => {
                if (err) {
                    console.error(err);
                    reject(err);
                } else {
                    resolve(orderIndex);
                }
            });
        });

        await new Promise((resolve, reject) => {
            redisClient.set(`order:${orderIndex}`, JSON.stringify(newOrder), (err) => {
                if (err) {
                    console.error(err);
                    reject(err);
                } else {
                    resolve();
                }
            });
        });

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
