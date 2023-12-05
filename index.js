const util = require('util');
const redis = require('redis');
const fs = require('fs/promises');
const { ClientClosedError } = require('@redis/client');

const products = require('./products');
const orders = require('./orders');

const app = express();
const port = process.env.PORT || 5000;

const redisExternalURL = 'rediss://red-clni7ipll56s73ficld0:szMWcB5aCxZoI7OSH7HvWdYJw2wLrfno@frankfurt-redis.render.com:6379';
const client = redis.createClient(redisExternalURL);

// Promisify operacje Redis
const incrAsync = util.promisify(client.incr).bind(client);
const setAsync = util.promisify(client.set).bind(client);

client.on('connect', () => {
    console.log('Połączono z Redis');
});

client.on('error', (err) => {
    console.error(`Błąd połączenia z Redis: ${err}`);
});

app.post('/orders', async (req, res) => {
    try {
        const newOrder = req.body;

        // Pobierz autoinkrementowany indeks z Redis asynchronicznie
        const orderId = await incrAsync('orderIndex');

        // Dodaj nowe zamówienie z autoinkrementowanym indeksem
        const orderWithId = { id: orderId, ...newOrder };
        orders.push(orderWithId);

        // Zapisz zamówienia w pliku
        const updatedOrders = JSON.stringify(orders, null, 2);
        await fs.writeFile('orders.js', `module.exports = ${updatedOrders};`, 'utf-8');

        // Dodaj zamówienie do Redis asynchronicznie
        await setAsync(`order:${orderId}`, JSON.stringify(orderWithId));

        res.json({ message: 'Zamówienie dodane pomyślnie' });
    } catch (error) {
        if (error instanceof ClientClosedError) {
            console.error('Błąd: Klient Redis został zamknięty');
            res.status(500).json({ error: 'Błąd podczas zapisywania zamówienia' });
        } else {
            console.error(error);
            res.status(500).json({ error: 'Błąd podczas zapisywania zamówienia' });
        }
    }
});

app.listen(port, () => {
    console.log(`Serwer działa na porcie ${port}`);
});
