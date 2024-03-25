const { User } = require('../models')
const { signToken, AuthenticationError } = require('../utils/auth')

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            // Check if the user is authenticated
            if (context.user) {
                // Find the user by its ID
                const user = await User.findOne({ _id: context.user._id });
                //return the user
                return user;
            }
            throw new Error('User not found');
        },
    },

    Mutation: {
        addUser: async (parent, { username, email, password }) => {
            //create usr with username, email, and passsword
            const user = await User.create({ username, email, password });
            //sign token and return it to token variable
            const token = signToken(user);
            //return the token and the user
            return { token, user };
        },
        login: async (parent, { email, password }) => {
            // Find the user by its email
            const user = await User.findOne({ email });

            // If the user is not found, throw an error
            if (!user) {
                throw new Error('User not found');
            }
            //check if password is correct and return true or false
            const correctPw = await user.isCorrectPassword(password);

            //if password is not correct, throw error
            if (!correctPw) {
                throw new Error('Password not correct');
            }
            //sign token and return it to token variable
            const token = signToken(user);
            //return the token and the user
            return { token, user };
        },
        saveBook: async (parent, { book }, context) => {
            // Check if the user is authenticated
            if (context.user) {
                //find user by ID saved in context
                const user = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    //Add book to bookSchema saved as books [bookSchema] on user
                    {
                        $addToSet: { books: book }
                    },
                    //Return updated information with book added, and will validate that the rules defined in the schema are followed
                    {
                        new: true,
                        runValidators: true
                    }
                )
                //return the updated user
                return user;
            }
            throw new Error('Unable to perform task');
        },
        removeBook: async (parent, { bookId }, context) => {
            // Check if the user is authenticated
            if (context.user) {
                return User.findOneAndUpdate(
                //find user by ID saved in context
                    { _id: context.user._id },
                    //remove book from books array based on bookId
                    {
                        $pull: {
                            books: { bookId }
                        },
                    },
                    //Return updated information with book removed from user
                    { new: true }
                )
            }
            throw new Error('Unable to perform task');
        },
        updateBookStatus: async (_, { bookId, isRead, isReading }, context) => {
            // Check if the user is authenticated
            if (!context.user) {
                throw new AuthenticationError('You must be logged in to update book status');
            }

            try {
                // Find the user by its ID
                const user = await User.findById(context.user._id);

                // If the user is not found, throw an error
                if (!user) {
                    throw new Error('User not found');
                }

                // Find the book in the user's books array
                const bookToUpdate = user.books.find(book => book.bookId === bookId);

                // If the book is not found, throw an error
                if (!bookToUpdate) {
                    throw new Error('Book not found');
                }

                // Update the book's status
                bookToUpdate.isRead = isRead;
                bookToUpdate.isReading = isReading;

                // Save the updated user document
                await user.save();

                // Return the updated book
                return bookToUpdate;
            } catch (error) {
                throw new Error(`Failed to update book status: ${error.message}`);
            }
        },
    },
};

module.exports = resolvers;