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
      <div className="row row-cols-1 row-col-md-3 g-4">
        {data.me.books.map((book, i) => (
          <div key={i}>
            <div key={book.bookId} className="col mb-4 libbooks">
            <Link to={`/Library/${book.bookId}`} className='text-decoration-none'>
            <div className="card" style={{width:"300px", marginLeft:"10px", marginRight:'10px'}}>
              <img src={book.isRead ? book.image:'/readmecover.jpg'} className="card-img-top centered-image readme" alt={book.title} style={{height:'175px', width:'125px', paddingTop:'10px'}}/>
              <div className="card-body">
                <h5 className="card-title">{book.title}</h5>
                <p className="card-text">Author: {book.authors.join(', ')}</p>
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
