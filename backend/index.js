const express = require('express');

const app = express();

const Port = process.env.port || 5000;

app.route('/').get((req, res) => res.json('your first rest api'));

app.listen(Port, () => console.log('Server is running at localhost:' + '${Port}'));

