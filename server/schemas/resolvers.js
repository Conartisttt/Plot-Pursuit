const { User} = require('../models')
const { signToken, AuthenticationError } = require('../utils/auth')

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                const user = await User.findOne({ _id: context.user._id });
                return user;
            }
            throw AuthenticationError;
        },
    },

    Mutation: {
        addUser: async (parent, { username, email, password }) => {
            const user = await User.create({ username, email, password });
            const token = signToken(user);

            return { token, user };
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw AuthenticationError;
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw AuthenticationError;
            }

            const token = signToken(user);
            return { token, user };
        },
        saveBook: async (parent, { book }, context) => {
            if (context.user) {
                const user = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    {
                        $addToSet: { books: book }
                    },
                    {
                        new: true,
                        runValidators: true
                    }
                )
                return user;
            }
            throw AuthenticationError;
        },
        removeBook: async (parent, { bookId }, context) => {
            if (context.user) {
                return User.findOneAndUpdate(
                    { _id: context.user._id },
                    {
                        $pull: {
                            books: {bookId}
                        },
                    },
            { new: true }
                )
            }
throw AuthenticationError;
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