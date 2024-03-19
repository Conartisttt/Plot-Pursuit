const typeDefs = `
type User {
    _id: ID
    username: String
    email: String
    bookCount: Int
    savedBooks: [Book]
}

type Book {
    bookId: String
    authors: [String]
    pages: String
    title: String
    image: String
    link: String
    isRead: Boolean
    isReading: Boolean
}

type Auth {
    token: ID!
    user: User
  }

  input BookData {
    authors: [String]
    bookId: String
    image: String
    title: String
    pages: String
  }

type Query {
    me: User
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(book: BookData): User
    removeBook(bookId: String): User
  }
`;

module.exports = typeDefs;
