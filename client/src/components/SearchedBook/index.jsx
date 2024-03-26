import { Button, Card, Col } from 'react-bootstrap';
import { SAVE_BOOK } from '../../utils/mutations';
import { useMutation } from '@apollo/client';
import Auth from '../../utils/auth';

function SearchedBook({ book, savedBookIds }) {
  const [saveBook] = useMutation(SAVE_BOOK);

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
  );
}

export default SearchedBook;
