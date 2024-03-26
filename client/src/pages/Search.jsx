import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLazyQuery } from '@apollo/client';
import Auth from '../utils/auth';
import { googleBooks } from '../utils/API';
import { GET_ME } from '../utils/queries';
import { Form, Button, Row } from 'react-bootstrap';
import SearchedBook from '../components/SearchedBook'

const Search = () => {
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState('');
  const [searchData, setSearchData] = useState('');
  const [savedBookIds, setSavedBookIds] = useState([]);

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
              {searchData.map((book, i) => (
                //inject componenet passing props
                <SearchedBook key={i} book={book} savedBookIds={savedBookIds} />
              ))}
            </Row>
          )}
        </div>
      )}
    </>
  );
};

export default Search;
