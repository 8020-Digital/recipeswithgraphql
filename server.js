const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")

const Recipe = require("./models/Recipe")
const User = require("./models/User")

const { ApolloServer, gql } = require("apollo-server")

let { typeDefs } = require('./schema')
const { resolvers } = require('./resolvers')

typeDefs = gql(typeDefs)

require("dotenv").config({ path: "variables.env" })

const app = new ApolloServer({
    typeDefs,
    resolvers,
    context: {
        Recipe,
        User
    }
})

mongoose.set('useCreateIndex', true);

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true })
    .then(() => {
        console.log("DB connected")
    })
    .catch((err) => {
        console.error(err)
    })

const PORT = process.env.PORT || 4444

app.listen().then(({ url }) => {
    console.log(`Server running on: ${url}`)
})