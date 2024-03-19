import { useState } from 'react';
import { useQuery } from '@apollo/client';
// import Auth from '../utils/auth';
import { googleBooks } from '../utils/API';
// import { useMutation } from '@apollo/client'
// import { SAVE_BOOK } from '../utils/mutations';
import { GET_ME } from '../utils/queries';
import {
    Form,
    Button,
    Card
} from 'react-bootstrap';

const Search = () => {

  const { loading, data } = useQuery(GET_ME);
  console.log(data);

    const [searchInput, setSearchInput] = useState('');
    const [searchData, setSearchData] = useState('');

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        console.log(searchInput);
        try {
            const response = await googleBooks(searchInput);
            const books = await response.json();
            console.log(books);
            const bookData = books.items.map((book) => ({
                bookId: book.id,
                authors: book.volumeInfo.authors || ['No author to display'],
                title: book.volumeInfo.title,
                pages: book.volumeInfo.pageCount || 'unknown',
                image: book.volumeInfo.imageLinks?.thumbnail || '',
            }))

            setSearchData(bookData);
        } catch (err) {
        console.error(err);
      }
    }

    return (
    <>
    {loading ? (
            <div>Loading...</div>
          ) : (
            <div></div>
          )
}
    <Form onSubmit={handleFormSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Search</Form.Label>
        <Form.Control 
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        placeholder="enter book" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
        {searchData &&
        searchData.map((book, i) => {
            return(
                <Card key={i} style={{ width: '18rem' }}>
                <Card.Img variant="top" src={book.image} />
                <Card.Body>
                  <Card.Title>
                    Title:
                    <br></br>
                    {book.title}
                    </Card.Title>
                  <Card.Text>
                    Authors: 
                    <br></br>
                    {book.authors}
                    </Card.Text>

                    <Card.Text>
                    Pages:
                    {book.pages}
                    </Card.Text>
                  <Button variant="primary">Save To Library</Button>
                </Card.Body>
              </Card>
            )
        })
        }
    </>
    )
}

export default Search;