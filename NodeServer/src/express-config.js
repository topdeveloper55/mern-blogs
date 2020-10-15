const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const gqlServer = require('./graphql/graphqlServer');
const userRoutes = require('./routes');
require('dotenv').config();

const url = `mongodb+srv://${process.env.CLUSTER_UNAME}:${process.env.CLUSTER_PSWD}@${process.env.CLUSTER_URL}/${process.env.DB_NAME}?retryWrites=true&w=majority`;

mongoose
    .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB Cloud...'));

app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use('/', userRoutes);

gqlServer.applyMiddleware({ app });

module.exports = app;
