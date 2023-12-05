const express = require("express");
const cors = require("cors");
const fs = require('fs/promises');

const products = require("./products")
var orders = require("./orders")

const app = express();

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
      orders.push(newOrder);
  
      const updatedOrders = JSON.stringify(orders, null, 2);
      await fs.writeFile('orders.js', `module.exports = ${updatedOrders};`, 'utf-8');
  
      res.json({ message: 'Zamówienie dodane pomyślnie' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Błąd podczas zapisywania zamówienia' });
    }
  });

const port = process.env.PORT || 5000;

app.listen(port, console.log(`Serwer dziala na porcie ${port}`));