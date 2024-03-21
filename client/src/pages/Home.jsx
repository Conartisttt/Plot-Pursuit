import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_ME } from '../utils/queries';

const Home = () => {
  const { loading, error, data } = useQuery(GET_ME);
  
  if (loading) return <div>Loading...</div>;
  // if (error) return <div>Error: {error.message}</div>;

  const isLoggedIn = data && data.me;

  if(!isLoggedIn){
    return (
      <div className='container text-center'>
        <h1>✧･ﾟ✧  Welcome to Plot Persuit  ✧･ﾟ✧</h1>
        <p>Plot Persuit is the one stop destination for all your personal library and TBR tracking needs! please login or signup to continue!</p>
      </div>
    );
  }

  // Filter books based on the isReading property
  const currentlyReadingBooks = data.me.books.filter(book => book.isReading);

  return (
    <div className="container">
      <h1 className="text-center">Currently Reading</h1>
      <div className="row">
        {currentlyReadingBooks.map(book => (
          <div key={book.bookId} className="col-md">
            <Link to={`/book/${book.bookId}`} className="text-decoration-none">
              <div className="card currentRead">
                <img src={book.image} className="card-img-top centered-image currentBook" alt={book.title} />
                <div className="card-body">
                  <h5 className="card-title">{book.title}</h5>
                  <p className="card-text">Author: {book.authors.join(', ')}</p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;

