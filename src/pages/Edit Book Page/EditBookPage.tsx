import {Button} from '../../components/button/Button';
import {Layout} from '../../components/layout/Layout';
import {BooksContext} from '../../context/BooksContext';
import {BookForm} from '../../features/CRUD/Book Form/BookForm';
import {Book} from '../../models/Book';

import {useContext, useRef} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import axios from 'axios';
function handleOnClick(
    idInput: React.RefObject<HTMLInputElement>,
    titleInput: React.RefObject<HTMLInputElement>,
    authorInput: React.RefObject<HTMLInputElement>,
    genreInput: React.RefObject<HTMLInputElement>,
    urlInput: React.RefObject<HTMLInputElement>,
) {
    if (
        !idInput.current ||
        !titleInput.current ||
        !authorInput.current ||
        !genreInput.current ||
        !urlInput.current
    )
        throw new Error('Inputs references are null');

    if (
        !idInput.current.value ||
        !titleInput.current.value ||
        !authorInput.current.value ||
        !genreInput.current.value ||
        !urlInput.current.value
    )
        throw new Error('You must provide values for each field!');

    const bookId: number = parseInt(idInput.current.value),
        bookTitle: string = titleInput.current.value,
        bookAuthor: string = authorInput.current.value,
        bookGenre: string = genreInput.current.value,
        bookUrl: string = urlInput.current.value;

    return new Book(bookId, bookTitle, bookAuthor, bookGenre, bookUrl);
}

export function EditBookPage() {
    document.title = 'Edit Book';

    const idInput = useRef<HTMLInputElement>(null);
    const titleInput = useRef<HTMLInputElement>(null);
    const authorInput = useRef<HTMLInputElement>(null);
    const genreInput = useRef<HTMLInputElement>(null);
    const urlInput = useRef<HTMLInputElement>(null);

    const navigate = useNavigate();
    const booksContext = useContext(BooksContext)!;

    const {bookId} = useParams();
    if (!bookId) {
        navigate('/');
        return;
    }

    const givenBook = booksContext.books.find(
        (book: Book) => book.id === parseInt(bookId),
    );
    const handleOnClickWrapper = () => {
        try {
            const newBook = handleOnClick(
                idInput,
                titleInput,
                authorInput,
                genreInput,
                urlInput,
            );
            //     booksContext.removeBook(newBook.getId());
            //     booksContext.addBook(newBook);

            //     navigate('/');
            // } catch (error) {
            //     alert(error);
            axios
                .put(
                    `http://localhost:3000/api/books/${newBook.id}`,
                    newBook,
                )
                .then((response) => {
                    booksContext.removeBook(newBook.id);
                    booksContext.addBook(
                        new Book(
                            response.data.id,
                            response.data.title,
                            response.data.author,
                            response.data.genre,
                            response.data.image,
                        ),
                    );
                    navigate('/');
                })
                .catch((error) => {
                    console.error('Error updating book:', error);
                });
        } catch (error) {
            alert(error);
        }
    };

    return (
        <Layout>
            <div className='main-page-container'>
                <BookForm
                    idInput={idInput}
                    titleInput={titleInput}
                    authorInput={authorInput}
                    genreInput={genreInput}
                    urlInput={urlInput}
                    givenBook={givenBook}
                />

                <Button
                    type='submit'
                    data_test_id='edit-user-button'
                    buttonMessage='Edit Book'
                    onClick={handleOnClickWrapper}
                />
            </div>
        </Layout>
    );
}
