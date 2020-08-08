const express = require('express');
const app = express();
const mongoose = require('mongoose');

//Make database connectio
mongoose.connect('mongodb+srv://mickey:mick7797@cluster0.ypmxn.mongodb.net/RestAPI?retryWrites=true&w=majority',
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => {
        console.log('Connect to DB');
    });

const Port = process.env.port || 5000;

app.route('/').get((req, res) => res.json('your first rest api'));

app.listen(Port, () => console.log('Server is running at localhost:' + '${Port}'));

