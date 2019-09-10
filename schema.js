exports.typeDefs = `
type Query {
    getAllRecipes: [Recipe]
    searchRecipes(searchTerm: String): [Recipe]
}

type Mutation {
    addRecipe(name: String!, category: String!, description: String!, instructions: String!): Recipe
    signupUser(username: String!, email: String!, password: String!): Token
}

type Recipe {
    _id: ID
    name: String!
    category: String!
    description: String!
    instructions: String!
    createAt: String
    likes: Int
    username: String
}

type Token {
    token: String!
}

type User {
    _id: ID
    username: String!  
    email: String!
    password: String!  
    createAt: String  
    favorites: [Recipe]
}   
`;