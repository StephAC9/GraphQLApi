require('dotenv').config()
const express = require('express')
const graphqlHTTP = require('express-graphql')
const schema = require('./schema/user_schema')
    //const schema = require('./schema/admin_schema')
const mongoose = require('mongoose')
const userIsAuth = require('./user_is_auth');
const adminIsAuth = require('./admin_is_auth');

const app = express()

app.use(userIsAuth)
app.use(adminIsAuth)

// CORS middleware
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", '*'); // restrict it to the required domain
    // Set custom headers for CORS
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
    res.header("Access-Control-Allow-Headers", "Content-type,Accept,X-Custom-Header,Authorization");

    if (req.method === "OPTIONS") {
        return res.status(200).end();
    }

    return next();
});

const ConnectionString = process.env.DB_CONNECTION_STRING
const port = process.env.PORT

mongoose.connect(ConnectionString, { useNewUrlParser: true })
    .then(() => {
        mongoose.connection.once('open', () => {
            console.log('Connected to the database...')
        })
    })
    .catch(err => {
        console.log(err)
    })

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}))


app.listen(port, () => {
    console.log('Express server up running ...')
})