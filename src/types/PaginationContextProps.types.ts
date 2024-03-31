import {Book} from '../models/Book';

export type PaginationContextProps = {
    currentBooks: Book[];
    setCurrentBooks: (newBooks: Book[]) => void;
    currentPage: number;
    setCurrentPage: (newPage: number) => void;
    pageSize: number;
};
