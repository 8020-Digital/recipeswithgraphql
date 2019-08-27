const jwt = require("jsonwebtoken")

const createToken = (user, secret, expiresIn) => {

    const { username, password } = user

    return jwt.sign({ username, password }, secret, { expiresIn })
}

exports.resolvers = {
    Query: {
        getAllRecipes: async (root, args, context) => {
            let { Recipe } = context

            let documents = await Recipe.find()
            return documents
        }
    },

    Mutation: {
        addRecipe: async (root, args, context) => {
            let { Recipe } = context
            let document = args

            document = await new Recipe(document).save()
            return document
        },

        signupUser: async (root, args, context) => {
            let { User } = context;
            let { username } = args;

            let user = await User.findOne({ username })

            if (user) {
                throw new Error("User already exist")
            }

            try {
                user = await new User(args).save()
            } catch (err) {
                throw new Error("Error on Signup... Try again!")
            }

            return {
                token: createToken(user, process.env.SECRET, '1hr')
            }
        }
    }
}