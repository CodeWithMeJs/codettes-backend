const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

// this code looks gay
// I WannaCry

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URL;

mongoose.connect(uri, {useNewUrlParser: true ,useCreateIndex: true , useUnifiedTopology: true });

const connection = mongoose.connection;
connection.once('open', () => {
    console.log('MongoDB connection successful :D');
})

const assignmentRouter = require('../routes/assignments');

app.use('/assignments', assignmentRouter);

app.listen(port, () => {
    console.log('Server running at port :' + port);
});
