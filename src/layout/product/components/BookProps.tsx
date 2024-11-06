import React from "react";
import Book from "../../../models/Book";

interface BookProps {
    book: Book;
}

const BookProps: React.FC<BookProps> = ({ book }) => {
    return (
        <div className="col-md-3 mt-2">
            <div className="card h-100">
                <img
                    src={book.imageUrl}
                    className="card-img-top"
                    alt={book.title}
                    style={{ 
                        width: '100%', 
                        height: '300px', 
                        objectFit: 'cover', 
                        borderTopLeftRadius: '8px', 
                        borderTopRightRadius: '8px'
                    }}
                />
                <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{book.title}</h5>
                    <p className="card-text">{book.description}</p>
                    <div className="price mt-auto">
                        <span className="original-price text-muted mr-2">
                            <del>{book.originailPrice}</del>
                        </span>
                        <span className="discounted-price text-danger">
                            <strong>{book.price}</strong>
                        </span>
                    </div>
                    <div className="row mt-3" role="group">
                        <div className="col-6">
                            <button className="btn btn-secondary btn-block" title="Add to Wishlist">
                                <i className="fas fa-heart"></i>
                            </button>
                        </div>
                        <div className="col-6">
                            <button className="btn btn-danger btn-block" title="Add to Cart">
                                <i className="fas fa-shopping-cart"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookProps;
