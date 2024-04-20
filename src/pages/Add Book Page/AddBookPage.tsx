import {Layout} from '../../components/layout/Layout';
import {BookForm} from '../../features/CRUD/Book Form/BookForm';
import {Book} from '../../models/Book';

import {useContext, useRef} from 'react';
import {useNavigate} from 'react-router-dom';

import axios from 'axios';
import {BooksContext} from '../../context/BooksContext';
import './AddBookPage.css';

function handleOnClick(
    idInput: React.RefObject<HTMLInputElement>,
    titleInput: React.RefObject<HTMLInputElement>,
    authorInput: React.RefObject<HTMLInputElement>,
    genreInput: React.RefObject<HTMLInputElement>,
    urlInput: React.RefObject<HTMLInputElement>,
): Book {
    if (
        !idInput.current!.value ||
        !titleInput.current!.value ||
        !authorInput.current!.value ||
        !genreInput.current!.value ||
        !urlInput.current!.value
    )
        throw new Error('Cannot submit empty fields');

    const bookId: number = parseInt(idInput.current!.value),
        bookTitle: string = titleInput.current!.value,
        bookAuthor: string = authorInput.current!.value,
        bookGenre: string = genreInput.current!.value,
        bookUrl: string = urlInput.current!.value;

    return new Book(bookId, bookTitle, bookAuthor, bookGenre, bookUrl);
}

export function AddBookPage() {
    document.title = 'Add book';

    const idInput = useRef<HTMLInputElement>(null);
    const titleInput = useRef<HTMLInputElement>(null);
    const authorInput = useRef<HTMLInputElement>(null);
    const genreInput = useRef<HTMLInputElement>(null);
    const urlInput = useRef<HTMLInputElement>(null);

    const navigate = useNavigate();
    const booksContext = useContext(BooksContext)!;

    const handleOnClickWrapper = () => {
        try {
            const inputBook = handleOnClick(
                idInput,
                titleInput,
                authorInput,
                genreInput,
                urlInput,
            );

            axios
                .post('http://localhost:3000/api/addBook', inputBook)
                .then((response) => {
                    booksContext.addBook(response.data);
                    navigate('/');
                })
                .catch((error) => {
                    console.error('Error adding book:', error);
                });
        } catch (error) {
            console.error('Error handling input:', error);
        }
    };

    return (
        <Layout>
            <div
                className='main-page-container'
                data-testid='main-page-container'
            >
                <div className='main-title'>Add book</div>

                <BookForm
                    idInput={idInput}
                    titleInput={titleInput}
                    authorInput={authorInput}
                    genreInput={genreInput}
                    urlInput={urlInput}
                    data-testid='book-form'
                />

                <button
                    type='submit'
                    className='form-button'
                    onClick={handleOnClickWrapper}
                >
                    Add book
                </button>
            </div>
        </Layout>
    );
}
