import {Book} from '../models/Book';

import {ReactNode} from 'react';

export type BookContextType = {
    books: Book[];
    addBook: (book: Book) => void;
    removeBook: (bookId: number) => void;
};

export type ProviderType = {
    bookContext: BookContextType;
    children: ReactNode;
};
