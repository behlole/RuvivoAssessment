const express = require('express')
const mainRoutes = require('./Routes/mainRoutes')
const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');
const bodyparser = require('body-parser');

dotenv.config();
const cors = require('cors');

const app = express()

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(bodyparser.json());
app.use(cors());
const port = 3000

/**
 * Routes
 */
app.use('/', mainRoutes);

/**
 * DB Connection
 */
let mongoDB = process.env.DB_CONNECTION_STRING;
mongoose.connect(mongoDB,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
    /**
     * Start Server when db is connected
     */
    app.listen(port, () => {
        console.log(`Ruvivo assessment server is listening on ${port}`)
    })
}).catch((e) => {
    console.log(e.message);
});


