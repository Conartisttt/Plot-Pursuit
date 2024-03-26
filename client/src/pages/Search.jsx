import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation, useLazyQuery } from '@apollo/client';
import Auth from '../utils/auth';
import { googleBooks } from '../utils/API';
import { SAVE_BOOK } from '../utils/mutations';
import { GET_ME } from '../utils/queries';
import { Form, Button, Card, Row, Col } from 'react-bootstrap';

const Search = () => {
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState('');
  const [searchData, setSearchData] = useState('');
  const [savedBookIds, setSavedBookIds] = useState([]);
  const [saveBook] = useMutation(SAVE_BOOK);
  const [getUser, { loading, error, data }] = useLazyQuery(GET_ME);

  //if user does not have valid token in their local storage, return them to the homepage
  useEffect(() => {
    try {
      Auth.getProfile();
    } catch (_) {
      navigate('/');
    }
  }, []);

  //when data variable changes, get current user information from db and set saved book id's to state
  useEffect(() => {
    getUser();
    if (data) {
      setSavedBookIds(data.me.books.map((book) => book.bookId));
    }
  }, [data]);

  //search functionality
  const handleFormSubmit = async (event) => {
    if (event) {
      event.preventDefault();
    }
    if (!searchInput) {
      console.log('Nothing in search input');
      return;
    }
    try {
      //search API using search input
      const response = await googleBooks(searchInput);
      //parses JSON body
      const body = await response.json();
      //filter books to be rendered only if they are not already saved in db
      const filtered = body.items.filter(
        (book) => !savedBookIds.includes(book.id)
      );
      //create an array of the filtered book objects with only necessary data
      const newBooks = filtered.map((book) => ({
        bookId: book.id,
        authors: book.volumeInfo.authors || ['No author to display'],
        title: book.volumeInfo.title,
        pages: book.volumeInfo.pageCount?.toString() || 'unknown',
        image: book.volumeInfo.imageLinks?.thumbnail || '',
      }));
      //save to searchData state
      setSearchData(newBooks);
    } catch {
      console.log('Something went wrong!');
    }
  };

  //this function saves a book to db and hides the div
  const handleBookSave = async (event, book) => {
  //validate user by getting jwt token from local storage and checking if it is expired
    const token = Auth.getProfile() || null;

    if (!token) {
      return false;
    }
    try {
      //check if book being saved is already saved
      if (savedBookIds.includes(book.bookId)) {
        console.log('already saved in database!');
      } else {
        const { data } = await saveBook({
          variables: { book },
        });

        if (!data) {
          throw new Error('something went wrong!');
        } else {
          //hide disable save button and hide book to prevent being saved twice
          const card = event.target.parentElement.parentElement.parentElement;
          card.classList.add('hide');
          const button = event.target;
          button.disabled = true;
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      {loading ? (
        <div>Loading Database...</div>
      ) : (
        <div>
          <Form onSubmit={handleFormSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label
                className="col-lg-10"
                style={{
                  fontFamily: 'IM Fell DW Pica',
                  fontSize: '30px',
                  backgroundColor: '#52796f',
                }}
              >
                Search
              </Form.Label>
              <Form.Control
                className="col-lg-10"
                value={searchInput}
                style={{ fontFamily: 'IM Fell DW Pica', fontSize: '25px' }}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="enter book"
              />
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
              style={{
                cursor: 'pointer',
                fontFamily: 'IM Fell DW Pica',
                fontSize: '25px',
                backgroundColor: 'gray',
              }}
            >
              Submit
            </Button>
          </Form>
          {searchData && (
            <Row className="justify-content-center">
              {searchData.map((book) => (
                <Col key={book.bookId} className="mb-4" md={4}>
                  <Card style={{ width: '18rem', paddingTop: '15px' }}>
                    <Card.Img variant="top" src={book.image} />
                    <Card.Body>
                      <Card.Title>
                        Title:
                        <br />
                        {book.title}
                      </Card.Title>
                      <Card.Text>
                        Authors:
                        <br />
                        {book.authors}
                      </Card.Text>

                      <Card.Text>Pages: {book.pages}</Card.Text>
                      <Button
                        onClick={(e) => handleBookSave(e, book)}
                        variant="primary"
                        style={{
                          cursor: 'pointer',
                          fontFamily: 'IM Fell DW Pica',
                          fontSize: '25px',
                          backgroundColor: 'gray',
                        }}
                      >
                        Save
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          )}
        </div>
      )}
    </>
  );
};

export default Search;
