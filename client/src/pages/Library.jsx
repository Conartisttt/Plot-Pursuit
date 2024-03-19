import React, { useState, useEffect } from 'react';

const Library = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    // Fetch user's library data when component mounts
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await fetch('/api/books');
      if (!response.ok) {
        throw new Error('Failed to fetch books');
      }
      const data = await response.json();
      setBooks(data);
    } catch (error) {
      console.error('Error fetching books:', error.message);
    }
  };

  return (
    <div>
      <h2>My Library</h2>
      <ul>
        {books.map(book => (
          <li key={book._id}>
            <h3>{book.title}</h3>
            <p>Author: {book.author}</p>
            <p>Pages: {book.pages}</p>
            <p>Genre: {book.genre}</p>
            <p> published:{book.published}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Library;

