import {Book} from '../models/Book';

export type BookCardPropsType = {
    givenBook: Book;
    removeMethod: (bookId: number) => void;
};
