//Feel free to change this page however you'd like! All functionality is working.
//You might need to change the way I am hiding the divs on save when you begin reworking the page in the handlebooksave function line 91

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useLazyQuery } from "@apollo/client";
import Auth from "../utils/auth";
import { googleBooks } from "../utils/API";
import { SAVE_BOOK } from "../utils/mutations";
import { GET_ME } from "../utils/queries";
import { Form, Button, Card,Row,Col } from "react-bootstrap";

const Search = () => {
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState("");
  const [searchData, setSearchData] = useState("");
  const [savedBookIds, setSavedBookIds] = useState([]);
  const [saveBook] = useMutation(SAVE_BOOK);
  const [getProfile, { loading, error, data }] = useLazyQuery(GET_ME);

  //when the page loads, check to see if the user has a profile. If not, redirect to homepage.
  useEffect(() => {
    try {
      Auth.getProfile();
    } catch (_) {
      navigate("/");
    }
  }, []);

  //when data variable changes, get current user information from db and get saved book id's to state
  useEffect(() => {
    getProfile();
    if (data) {
      setSavedBookIds(data.me.books.map((book) => book.bookId));
      console.log(data);
    }
  }, [data]);

  //commented this out but could come in handy for debugging.
  // useEffect(()=> console.log(savedBookIds), [savedBookIds])

  //this function searches using API to return books not already saved in out database
  const handleFormSubmit = async (event) => {
    if (event) {
      event.preventDefault();
    }
    if (!searchInput) {
      console.log("nothing in search input");
      return;
    }
    try {
      const response = await googleBooks(searchInput);
      const body = await response.json();
      const books = body.items;
      console.log(books);
      const filtered = books.filter((book) => !savedBookIds.includes(book.id));
      console.log(filtered);
      const newBooks = filtered.map((book) => ({
        bookId: book.id,
        authors: book.volumeInfo.authors || ["No author to display"],
        title: book.volumeInfo.title,
        pages: book.volumeInfo.pageCount?.toString() || "unknown",
        image: book.volumeInfo.imageLinks?.thumbnail || "",
      }));
      setSearchData(newBooks);
    } catch (err) {
      console.error(err);
    }
  };

  //this function saves a book to db and hides the div
  const handleBookSave = async (event, book) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const { data } = await saveBook({
        variables: { book },
      });

      if (!data) {
        throw new Error("something went wrong!");
      } else {
        const card = event.target.parentElement.parentElement;
        card.classList.add("hide");
        const button = event.target;
        button.disabled = true;
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
              <Form.Label className='col-lg-10'style={{fontFamily:'IM Fell DW Pica', fontSize:'30px', backgroundColor:'#52796f'}}>Search</Form.Label>
              <Form.Control className="col-lg-10"
                value={searchInput}
                style={{fontFamily:'IM Fell DW Pica', fontSize:'25px'}}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="enter book"
              />
            </Form.Group>
            <Button variant="primary" type="submit" style={{ cursor: 'pointer',fontFamily:'IM Fell DW Pica',fontSize:'25px',backgroundColor:'gray' }}>
              Submit
            </Button>
          </Form>
          {searchData &&(
            <Row className="justify-content-center">
              {searchData.map((book) => (
                <Col key={book.bookId} className="mb-4" md={4}>
                  <Card style={{ width: "18rem", paddingTop:'15px' }}>
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
                      <Button onClick={(e) => handleBookSave(e, book)} variant="primary"
                      style={{ cursor: 'pointer',fontFamily:'IM Fell DW Pica',fontSize:'25px',backgroundColor:'gray' }}>
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
