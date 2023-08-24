require('dotenv').config()
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const router = require('./routes/web')

// **************  Set up View Engine (EJS)  *****************//
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

// ************************  Database Connection  **********************************//
const { connectMonggose } = require('./app/Database/db')
connectMonggose();

// ***************  setup static assets  *****************//
const publicPath = path.join(__dirname, 'public');
app.use(express.static(publicPath));
app.use(bodyParser.urlencoded({ extended: true }));


// ***************  setup middleware  *****************//
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// ***************************  Routes  *************************************//
app.use(router);


// ************************   Port Start   ********************************//
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`My server start on this port ${PORT}`)
})


