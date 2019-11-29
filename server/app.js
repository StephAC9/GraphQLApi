require('dotenv').config()
const express = require('express')
const graphqlHTTP = require('express-graphql')
const schema = require('./schema/schema')
const mongoose = require('mongoose')
const isAuth = require('./is_auth');

const app = express()

app.use(isAuth)

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
    graphiql: true // This is set to true sothat we can access graphiql UI to test the API as a client.
}))


app.listen(port, () => {
    console.log('Server Express now listening at port 4000 ...')
})