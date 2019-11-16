const express = require('express')
const graphqlHTTP = require('express-graphql')
const schema = require('./schema/schema')

const app = express()

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true // This is set to thrue sothat we can access graphiql UI to test the API as a client.
}))

app.listen(4000, () => {
    console.log('Server Express now listening at port 4000 ...')
})