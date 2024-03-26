import { Link } from "react-router-dom";

function CurrentlyReadingBook({ book }) {
  return (
    <div key={book.bookId} className="col-md">
      <Link to={`/library/${book.bookId}`} className="text-decoration-none">
        <div className="card currentRead">
          <img
            src={book.image}
            className="card-img-top centered-image currentBook"
            alt={book.title}
          />
          <div className="card-body">
            <h5 className="card-title">{book.title}</h5>
            <p className="card-text">Author: {book.authors.join(', ')}</p>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default CurrentlyReadingBook;
