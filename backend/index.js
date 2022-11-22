const connect_to_mongo = require('./db');
const express = require('express');

connect_to_mongo();

const app = express();
const port = 5000;

const cors = require('cors');

app.use(cors());
app.use(express.json());

// Available Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

app.listen(port, ()=>{
    console.log(`App is listening at http://localhost:${port} ...`);
})