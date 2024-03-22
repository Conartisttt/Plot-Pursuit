import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_ME } from "../utils/queries";

const Library = () => {
  const { loading, error, data } = useQuery(GET_ME);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="container">
      <h1 className="text-center">Library</h1>
      <div className="row">
        {data.me.books.map((book, i) => (
          <div key={i}>
            <div key={book.bookId} className="col-md-3 mb-4">
              <Link
                to={`/Library/${book.bookId}`}
                className="text-decoration-none"
              >
                <div className="card">
                  <img
                    src={book.image}
                    className="card-img-top centered-image"
                    alt={book.title}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{book.title}</h5>
                    <p className="card-text">
                      Author: {book.authors.join(", ")}
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Library;
