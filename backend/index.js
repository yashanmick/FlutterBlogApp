const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Port = process.env.port || 5000;

//Make database connectio
mongoose.connect('mongodb+srv://mickey:mick7797@cluster0.ypmxn.mongodb.net/TestRestAPI?retryWrites=true&w=majority',
    { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true },
    () => {
        console.log('Connect to DB');
    }
);

// mongoose.connect('mongodb+srv://mickey:mick7797@cluster0.ypmxn.mongodb.net/TestRestAPI?retryWrites=true&w=majority',
//     { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true }
// );

// const connection = mongoose.connection;
// connection.once('open', () => {
//     console.log('Connect to DB');
// });


//middleware
app.use(express.json());
const userRoute = require("./routes/user");
app.use("/user", userRoute);

app.route('/').get((req, res) => res.json('your first rest api'));

app.listen(Port, () => console.log('Server is running at localhost:' + '${Port}'));

