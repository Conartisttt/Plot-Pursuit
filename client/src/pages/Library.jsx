import { Link, useNavigate } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_ME } from '../utils/queries';
import { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Auth from '../utils/auth';

const Library = () => {
  const { loading, error, data, refetch } = useQuery(GET_ME);
  const [showUnreadBooks, setShowUnreadBooks] = useState(false);
  const [storeUnreadBooks, setStoreUnreadBooks] = useState([]);
  const navigate = useNavigate();

  //if user does not have valid token in their local storage, return them to the homepage
  useEffect(() => {
    try {
      Auth.getProfile();
    } catch (_) {
      navigate('/');
    }
  }, []);

  useEffect(() => {
    // Manually trigger a refetch when the component mounts
    refetch();
  }, []);

  //store unread books in state whenever data changes
  useEffect(() => {
    if (data) {
      setStoreUnreadBooks(data.me.books.filter((book) => !book.isRead));
    }
  }, [data]);

  const handleToggle = () => {
    setShowUnreadBooks(!showUnreadBooks);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      <Form>
        <Form.Check
          type="switch"
          id="custom-switch"
          label="Show Unread Books Only"
          onChange={handleToggle}
        />
      </Form>
      <div className="container">
        <h1 className="text-center">Library</h1>
        {showUnreadBooks && (
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
            {storeUnreadBooks.map((book, i) => (
              <div key={i}>
                <div key={book.bookId} className="col mb-4 libbooks">
                  <Link
                    to={`/Library/${book.bookId}`}
                    className="text-decoration-none"
                  >
                    <div
                      className="card"
                      style={{
                        width: '250px',
                        marginLeft: '10px',
                        marginRight: '10px',
                      }}
                    >
                      <img
                        src={book.isRead ? book.image : '/readmecover.jpg'}
                        className="card-img-top centered-image readme"
                        alt={book.title}
                        style={{
                          height: '175px',
                          width: '125px',
                          paddingTop: '10px',
                        }}
                      />
                      <div className="card-body">
                        <h5 className="card-title">{book.title}</h5>
                        <p className="card-text">
                          Author: {book.authors.join(', ')}
                        </p>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {!showUnreadBooks && (
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
            {data.me.books.map((book, i) => (
              <div key={i}>
                <div key={book.bookId} className="col mb-4 libbooks">
                  <Link
                    to={`/Library/${book.bookId}`}
                    className="text-decoration-none"
                  >
                    <div
                      className="card"
                      style={{
                        width: '300px',
                        marginLeft: '10px',
                        marginRight: '10px',
                      }}
                    >
                      <img
                        src={book.isRead ? book.image : '/readmecover.jpg'}
                        className="card-img-top centered-image readme"
                        alt={book.title}
                        style={{
                          height: '175px',
                          width: '125px',
                          paddingTop: '10px',
                        }}
                      />
                      <div className="card-body">
                        <h5 className="card-title">{book.title}</h5>
                        <p className="card-text">
                          Author: {book.authors.join(', ')}
                        </p>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Library;
