import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation, useLazyQuery } from '@apollo/client';
import Auth from '../utils/auth';
import { useParams } from 'react-router-dom';
import { GET_ME } from '../utils/queries';
import { UPDATE_BOOK_STATUS, REMOVE_BOOK } from '../utils/mutations';
import { Button } from 'react-bootstrap';

const Book = () => {
  const [currentBook, setCurrentBook] = useState({});
  const navigate = useNavigate();
  const { bookId } = useParams();
  const [getUser, { loading, error, data }] = useLazyQuery(GET_ME);
  const [updateBook] = useMutation(UPDATE_BOOK_STATUS);
  const [removeBook] = useMutation(REMOVE_BOOK);

  //if user does not have valid token in their local storage, return them to the homepage
  useEffect(() => {
    try {
      Auth.getProfile();
    } catch (_) {
      navigate('/');
    }
    //this use effect will only run once when the componenet mounts
  }, []);

  useEffect(() => {
    //get user from database
    getUser();
    if (data) {
      // set the current book by comparing the array of books stored in the user to the bookId passed in the params
      const bookArr = data.me.books;
      setCurrentBook(
        bookArr.find((singleBook) => singleBook.bookId === bookId)
      );
    }
    //this use effect will run whenever the data variable changes its value
  }, [data]);

  const handleIsRead = async (bookId, isRead) => {
    //validate user by getting jwt token from local storage
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    // const token = Auth.getToken() || null;

    if (!token) {
      return false;
    }
    //set isReading variable to false
    const isReading = false;

    try {
      //update book isRead and isReading values based on checkbox selected
      const { data } = await updateBook({
        variables: { bookId, isRead, isReading },
      });

      if (!data) {
        throw new Error('something went wrong!');
      }
      navigate('/Library');
    } catch (e) {
      console.error(e);
    }
  };

  const handleIsReading = async (bookId, isReading) => {
    //validate user by getting jwt token from local storage
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }
    //set isRead variable to false
    const isRead = false;

    try {
      //update book isReading and isRead values based on checkbox selected
      const { data } = await updateBook({
        variables: { bookId, isRead, isReading },
      });

      if (!data) {
        throw new Error('something went wrong!');
      }
      navigate('/Library');
    } catch (e) {
      console.log(e);
    }
  };

  const handleBookDelete = async (bookId) => {
    //validate user by getting jwt token from local storage
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }
    //remove book using bookId
    try {
      const { data } = await removeBook({
        variables: { bookId },
      });

      if (!data) {
        throw new Error('something went wrong!');
      }
      navigate('/Library');
    } catch (e) {
      console.error(e);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <>
      {currentBook && (
        <div>
          <h2 className="card-header">
            {currentBook.title} by {currentBook.author}
          </h2>

          <div className="card-body">
            <img
              src={currentBook.image}
              alt={`Cover of ${currentBook.title}`}
              className="book-cover"
              style={{
                height: '300px',
                width: '200px',
                display: 'block',
                marginLeft: 'auto',
                marginRight: 'auto',
              }}
            />
            <p className="single" style={{ fontSize: '20px' }}>
              <strong>Title:</strong> {currentBook.title}
            </p>
            <p className="single" style={{ fontSize: '20px' }}>
              <strong>Author:</strong> {currentBook.author}
            </p>
            <p className="single" style={{ fontSize: '20px' }}>
              <strong>Pages:</strong> {currentBook.pages}
            </p>
          </div>
          <div className="text-center">
            <label>
              Have you read this book?
              <input
                type="radio"
                name="readStatus"
                value="yes"
                style={{ marginLeft: '10px' }}
                onChange={() => handleIsRead(currentBook.bookId, true)}
              />
              Yes
            </label>
            <label>
              <input
                type="radio"
                name="readStatus"
                value="no"
                onChange={() => handleIsRead(currentBook.bookId, false)}
              />
              No
            </label>
          </div>
          <div className="text-center">
            <label>
              Are you currently reading this book?
              <input
                type="radio"
                name="readStatus"
                value="yes"
                style={{ marginLeft: '10px' }}
                onChange={() => handleIsReading(currentBook.bookId, true)}
              />
              Yes
            </label>
            <label>
              <input
                type="radio"
                name="readStatus"
                value="no"
                onChange={() => handleIsReading(currentBook.bookId, false)}
              />
              No
            </label>
          </div>

          <div className="text-center mt-3">
            <Button
              onClick={() => handleBookDelete(currentBook.bookId)}
              variant="primary"
              style={{
                cursor: 'pointer',
                fontFamily: 'IM Fell DW Pica',
                fontSize: '20px',
                backgroundColor: 'gray',
              }}
            >
              Remove
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default Book;
