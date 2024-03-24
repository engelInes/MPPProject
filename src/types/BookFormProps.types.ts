import {Book} from '../models/Book';

export type BookFormType = {
    idInput: React.RefObject<HTMLInputElement>;
    titleInput: React.RefObject<HTMLInputElement>;
    authorInput: React.RefObject<HTMLInputElement>;
    genreInput: React.RefObject<HTMLInputElement>;
    urlInput: React.RefObject<HTMLInputElement>;
    givenBook?: Book;
};
