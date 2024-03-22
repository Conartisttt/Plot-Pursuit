import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useLazyQuery } from "@apollo/client";
import Auth from "../utils/auth";
import { useParams } from "react-router-dom";
import { GET_ME } from "../utils/queries";
import { UPDATE_BOOK_STATUS, REMOVE_BOOK } from "../utils/mutations";
import { Button } from "react-bootstrap";

const Book = () => {
  const [currentBook, setCurrentBook] = useState({});
  const navigate = useNavigate();
  const { bookId } = useParams();
  const [getProfile, { loading, error, data }] = useLazyQuery(GET_ME);
  const [updateBook] = useMutation(UPDATE_BOOK_STATUS);
  const [removeBook] = useMutation(REMOVE_BOOK);

  useEffect(() => {
    try {
      Auth.getProfile();
    } catch (_) {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    getProfile();
    if (data) {
      const bookArr = data.me.books;
      setCurrentBook(
        bookArr.find((singleBook) => singleBook.bookId === bookId)
      );
    }
  }, [data]);

  const handleIsRead = async (bookId, isRead) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }
    const isReading = false;

    try {
      const { data } = await updateBook({
        variables: { bookId, isRead, isReading },
      });

      if (!data) {
        throw new Error("something went wrong!");
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleIsReading = async (bookId, isReading) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }
    const isRead = false;

    try {
      const { data } = await updateBook({
        variables: { bookId, isRead, isReading },
      });

      if (!data) {
        throw new Error("something went wrong!");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleBookDelete = async (bookId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const { data } = await removeBook({
        variables: { bookId },
      });

      if (!data) {
        throw new Error("something went wrong!");
      }
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
            />
            <p>
              <strong>Title:</strong> {currentBook.title}
            </p>
            <p>
              <strong>Author:</strong> {currentBook.author}
            </p>
            <p>
              <strong>Pages:</strong> {currentBook.pages}
            </p>
          </div>
          <div>
            <label>
              Have you read this book?
              <input
                type="radio"
                name="readStatus"
                value="yes"
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
          <div>
            <label>
              Are you currently reading this book?
              <input
                type="radio"
                name="readStatus"
                value="yes"
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
            <Button
              onClick={() => handleBookDelete(currentBook.bookId)}
              variant="primary"
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
