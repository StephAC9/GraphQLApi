const express = require('express')
const graphqlHTTP = require('express-graphql')
const schema = require('./schema/schema')
const mongoose = require('mongoose')

const app = express()

mongoose.connect('mongodb://Stephan:Mongodb1111@cluster0-shard-00-00-9jq3m.mongodb.net:27017,cluster0-shard-00-01-9jq3m.mongodb.net:27017,cluster0-shard-00-02-9jq3m.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority', { useNewUrlParser: true })
mongoose.connection.once('open', () => {
    console.log('Connected to the database...')
})

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true // This is set to thrue sothat we can access graphiql UI to test the API as a client.
}))

app.listen(4000, () => {
    console.log('Server Express now listening at port 4000 ...')
})