const express = require('express')
const conn = require('./config/db')
const app = express()

// connection to mongodb
conn();

// init enable middleware
app.use(express.json({ extended: false }));

app.use('/api/spi', require('./routes/shoppingItem'));

const PORT = process.env.PORT || 5002;

app.listen(
        PORT, 
        () => 
        console.log(`Server start on port ${PORT}`)
    );

