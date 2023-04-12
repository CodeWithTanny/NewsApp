const connectToMongo = require('./db');
const express = require('express');
connectToMongo();

const app = express(); //these can be taken from the officeal webiste "express"
const port = 5000

app.use(express.json());

app.use('/api/auth', require('./routers/auth'));
app.use('/api/notes', require('./routers/notes'))

app.listen(port, () => {
  console.log(` app listening at http://localhost:${port}`);
})
