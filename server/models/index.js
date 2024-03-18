const Profile = require('./Profile');
class Profile {
  constructor(bio, website) {
    this.bio = bio;
    this.website = website;
  }

  displayProfile() {
    console.log(`Bio: ${this.bio}`);
    console.log(`Website: ${this.website}`);
  }
}
module.exports = { Profile };
class Author {
  constructor(name, nationality, profile) {
    this.name = name;
    this.nationality = nationality;
    this.profile = profile;
  }
}

class Book {
  constructor(title, author, pages, publicationYear) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.publicationYear = publicationYear;
  }

  displayInfo() {
    console.log(`Title: ${this.title}`);
    console.log(`Author: ${this.author.name}`);
    console.log(`Author Nationality: ${this.author.nationality}`);
    console.log(`Author Profile:`);
    this.author.profile.displayProfile();
    console.log(`Pages: ${this.pages}`);
    console.log(`Publication Year: ${this.publicationYear}`);
  }
}

class Library {
  constructor(name) {
    this.name = name;
    this.books = [];
  }

  addBook(book) {
    this.books.push(book);
  }

  displayBooks() {
    console.log(`Books in ${this.name}:`);
    this.books.forEach(book => {
      console.log(`- ${book.title} by ${book.author.name}`);
    });
  }
}

// Example usage:
const author1Profile = new Profile(
  "American author famous for his novel 'The Great Gatsby'.",
  "http://www.fscottfitzgerald.com"
);
const author1 = new Author("F. Scott Fitzgerald", "American", author1Profile);
const author2Profile = new Profile(
  "American novelist best known for her book 'To Kill a Mockingbird'.",
  "http://www.harperlee.com"
);
const author2 = new Author("Harper Lee", "American", author2Profile);

const book1 = new Book("The Great Gatsby", author1, 180, 1925);
const book2 = new Book("To Kill a Mockingbird", author2, 281, 1960);

const library = new Library("Local Library");
library.addBook(book1);
library.addBook(book2);

library.displayBooks();
