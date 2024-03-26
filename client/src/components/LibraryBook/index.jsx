import { Link } from "react-router-dom";


function LibraryBook({ book }) {


    return (
        <div>
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
    )
}

export default LibraryBook;