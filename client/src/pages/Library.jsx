import { useNavigate } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_ME } from '../utils/queries';
import { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Auth from '../utils/auth';
import LibraryBook from '../components/LibraryBook';

const Library = () => {
  const { loading, error, data, refetch } = useQuery(GET_ME);
  const [showUnreadBooks, setShowUnreadBooks] = useState(false);
  const [storeUnreadBooks, setStoreUnreadBooks] = useState([]);
  const navigate = useNavigate();

  //if user does not have valid token in their local storage, return them to the homepage
  useEffect(() => {
    try {
      if (!Auth.getProfile()) {
        navigate('/');
      }
    } catch (_) {
      navigate('/');
    }
  }, []);

  useEffect(() => {
    // Manually trigger a refetch for the query when the component mounts
    refetch();
  }, []);

  //store unread books in state whenever data changes
  useEffect(() => {
    if (data) {
      setStoreUnreadBooks(data.me.books.filter((book) => !book.isRead));
    }
  }, [data]);

  // Toggle function to switch between showing all books and only unread books
  const handleToggle = () => {
    setShowUnreadBooks(!showUnreadBooks);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <Form>
        <Form.Check
          type="switch"
          id="custom-switch"
          label="Show Unread Books Only"
          onChange={handleToggle}
        />
      </Form>
      <div className="container">
        <h1 className="text-center">Library</h1>
        {/* Display unread books if showUnreadBooks is true */}
        {showUnreadBooks && (
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
            {storeUnreadBooks.map((book, i) => (
              //inject componenet passing props
              <LibraryBook key={i} book={book} />
            ))}
          </div>
        )}

        {/* Display all books if showUnreadBooks is false */}
        {!showUnreadBooks && (
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
            {data.me.books.map((book, i) => (
              //inject componenet passing props
              <LibraryBook key={i} book={book} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Library;
