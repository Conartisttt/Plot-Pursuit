import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';



import { QUERY_SINGLE_BOOK } from '../utils/queries';

const Book = () => {
  const { bookId } = useParams();

  const { loading, data } = useQuery(QUERY_SINGLE_BOOK, {
    variables: { bookId: bookId },
  });

  const book = data?.book || {};

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <h2 className="card-header">
        {book.title} by {book.author}
      </h2>
  
      <div className="card-body">
        <img src={book.imageUrl} alt={`Cover of ${book.title}`} className="book-cover" />
        <p><strong>Title:</strong> {book.title}</p>
        <p><strong>Author:</strong> {book.author}</p>
        <p><strong>Pages:</strong> {book.pages}</p>
        <p><strong>Genre:</strong> {book.genre}</p>
      </div>
      <div>
        <label>
          Have you read this book?
          <input
            type="radio"
            name="readStatus"
            value="yes"
            checked={book.read}
            onChange={() => handleReadChange(book._id, true)}
          />
          Yes
        </label>
        <label>
          <input
            type="radio"
            name="readStatus"
            value="no"
            checked={!book.read}
            onChange={() => handleReadChange(book._id, false)}
          />
          No
        </label>
      </div>

    </div>


  );
};

export default Book;
