import React from "react";
import BookProps from "./components/BookProps";
import Book from "../../models/Book";

const List: React.FC = ()=>{
    const books: Book[] = [
        {
            id: 1,
            title: 'Book 1',
            description: 'Description for Book 1',
            originailPrice: 50000,
            price: 45000,
            imageUrl: 'images/books/1.png'
        },
        {
            id: 2,
            title: 'Book 2',
            description: 'Description for Book 2',
            originailPrice: 50000,
            price: 45000,
            imageUrl: 'images/books/2.png'
        },
        {
            id: 3,
            title: 'Book 3',
            description: 'Description for Book 3',
            originailPrice: 50000,
            price: 45000,
            imageUrl: 'images/books/4.webp'
        }
    ];
    return(
        <div className="container">
            <div className="row mt-4">
                {
                    books.map((book)=>(
                        <BookProps book={book}/>
                    ))
                }
            </div>
        </div>
    );
}

export default List