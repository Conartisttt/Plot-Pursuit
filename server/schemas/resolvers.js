const { Profile } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
  Query: {
    profiles: async () => {
      return Profile.find();
    },

    profile: async (parent, { profileId }) => {
      return Profile.findOne({ _id: profileId });
    },
  },

  Mutation: {
    addProfile: async (parent, { name, email, password }) => {
      const profile = await Profile.create({ name, email, password });
      const token = signToken(profile);

      return { token, profile };
    },
    login: async (parent, { email, password }) => {
      const profile = await Profile.findOne({ email });

      if (!profile) {
        throw AuthenticationError;
      }

      const correctPw = await profile.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError ('Incorret email or password');
      }

      const token = signToken(profile);
      return { token, profile };
    },

    addBook: async (parent, { profileId, book  }) => {
      return Profile.findOneAndUpdate(
        { _id: profileId },
        {
          $addToSet: { books: book },
        },
        {
          new: true,
          runValidators: true,
        }
      );

    },
    removeProfile: async (parent, { profileId }) => {
      return Profile.findOneAndDelete({ _id: profileId });
    },
    removeBook: async (parent, { profileId, book }) => {
      return Profile.findOneAndUpdate(
        { _id: profileId },
        { $pull: { books: book } },
        { new: true }
      );
    },
  },
};

module.exports = resolvers;
