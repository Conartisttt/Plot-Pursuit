import { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_ME } from '../utils/queries';
import CurrentlyReadingBook from '../components/CurrentlyReadingBook';

const Home = () => {
  const { loading, data, _, refetch } = useQuery(GET_ME);

  useEffect(() => {
    // Manually trigger a refetch for the query when the component mounts
    refetch();
  }, []);

  if (loading) return <div>Loading...</div>;

  const isLoggedIn = data && data.me;

  if (!isLoggedIn) {
    return (
      <div
        className="container align-items-center header"
        style={{ paddingBottom: '10px' }}
      >
        <h1 style={{ fontSize: '30px' }}>✧･ﾟ✧ Welcome to Plot Pursuit ✧･ﾟ✧</h1>
        <p style={{ fontSize: '20px' }}>
          Plot Pursuit is the one stop destination for all your personal library
          and TBR tracking needs! please login or signup to continue!
        </p>
        <div className='image-container'>
        <img
          src="/homecover.jpg"
          alt="Girl reading book under moon"
        />
      </div>
      </div>
    );
  }

  // Filter books based on the isReading property
  const currentlyReadingBooks = data.me.books.filter((book) => book.isReading);

  return (
    <div className="container">
      <h1 className="text-center">Currently Reading</h1>
      <div className="row">
        {currentlyReadingBooks.length > 0 ? (
          // Render books if there are books being currently read
          currentlyReadingBooks.map((book, i) => (
            //inject componenet passing props
            <CurrentlyReadingBook key={i} book={book} />
          ))
        ) : (
          // Render alternative image if there are no books being currently read
          <div className="col-md text-center">
            <img
              src="/homecover.jpg"
              className="centered-image"
              alt="Alternative Image"
              style={{
                maxHeight: '600px',
                display: 'block',
                marginLeft: 'auto',
                marginRight: 'auto',
              }}
            />
            <p style={{ fontSize: '20px' }}>
              No books are currently being read
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
