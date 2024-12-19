require('dotenv').config();
const express = require('express');
const routs = require('./routs');
const mongoose = require('mongoose');
const { authMiddleWare } = require('./middlewares/authMiddleWare');
const cookieParser = require('cookie-parser')
const cors = require('cors');
const { setCors } = require('./middlewares/cors')

const port=process.env.PORT || 3000;
const localDbUrl = process.env.LOCAL_DATABASE_URL;
const productionDb = process.env.PRODUCTION_DATABASE_URL;

const app = express();

app.use(cors({
    origin: function (origin, callback) {
        const allowedOrigins = ['http://localhost:4200', 'https://scstorewithserver-1.onrender.com'];


        if (allowedOrigins.includes(origin) || !origin) {
            callback(null, true);
        } else {
            callback(new Error('CORS not allowed'), false);
        }
    },
    credentials: true
}));
app.use(cookieParser());
app.use(express.json());
app.use(authMiddleWare);
app.use(routs);




mongoose.connect(productionDb);
mongoose.connection.on('connected', () => console.log('connected to db'));
app.listen(port,  ()=> console.log(`Server is listening on port: ${port}`));