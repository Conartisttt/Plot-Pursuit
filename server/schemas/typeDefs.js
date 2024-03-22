const typeDefs = `
type User {
    _id: ID
    username: String
    email: String
    books: [Book]
}

type Book {
    bookId: String
    authors: [String]
    pages: String
    title: String
    image: String
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
    pages: String
    title: String
  }

type Query {
    me: User
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(book: BookData): User
    removeBook(bookId: String): User
    updateBookStatus(bookId: String!, isRead: Boolean, isReading: Boolean): Book
  }
`;

module.exports = typeDefs;
