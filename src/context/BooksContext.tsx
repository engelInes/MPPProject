import {createContext} from 'react';

import {BookContextType, ProviderType} from '../types/BookContextTypes.types';

export const BooksContext = createContext<BookContextType | null>(null);

function BooksContextProvider({bookContext, children}: ProviderType) {
    return (
        <BooksContext.Provider value={bookContext}>
            {children}
        </BooksContext.Provider>
    );
}

export {BooksContextProvider};
// import React, {createContext, useState} from 'react';
// import {BookContextType, ProviderType} from '../types/BookContextTypes.types';
// import { Book } from '../models/Book';

// export const BooksContext = createContext<BookContextType | null>(null);

// function BooksContextProvider({children}: ProviderType) {
//     const [books, setBooks] = useState<Book[]>([]);

//     const addBook = (book: Book) => {
//         setBooks((prevBooks) => [...prevBooks, book]);
//     };

//     const removeBook = (bookId: number) => {
//         setBooks((prevBooks) =>
//             prevBooks.filter((book) => book.getId() !== bookId),
//         );
//     };

//     const bookContext: BookContextType = {
//         books,
//         addBook,
//         removeBook,
//     };

//     return (
//         <BooksContext.Provider value={bookContext}>
//             {children}
//         </BooksContext.Provider>
//     );
// }

// export {BooksContextProvider};


