import { useQuery } from '@apollo/client';

import CurrentlyReading from '../components/BookList';

import { GET_ME } from '../utils/queries';

const Home = () => {
  const { loading, data } = useQuery(GET_ME);
  console.log(data);

  return (
    <main>
      <div className="flex-row justify-center">
        <div className="col-12 col-md-10 my-3">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <CurrentlyReading
              // book=
              title="Here's the current roster of friends..."
            />
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;
