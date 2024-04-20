import './App.css';
import {Book} from './models/Book';
import {AddBookPage} from './pages/Add Book Page/AddBookPage';
import {DisplayBooksPage} from './pages/DIsplay Data Page/DisplayBooksPage';

import axios from 'axios';
import {useEffect, useState} from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {BooksContextProvider} from './context/BooksContext';
import {ChartPage} from './pages/Chart Page/ChartPage';
import {EditBookPage} from './pages/Edit Book Page/EditBookPage';

const booksList: Book[] = [];
function App() {
    const [books, setBooks] = useState<Book[]>(booksList);

    const fetchBooks = () => {
        axios
            .get('http://localhost:3000/api/books')
            .then((response) => {
                const books = response.data.map(
                    (book: any) =>
                        new Book(
                            book.id,
                            book.title,
                            book.author,
                            book.genre,
                            book.pictureUrl,
                        ),
                );
                setBooks(books);
            })
            .catch((error) => {
                window.alert(
                    'Server or internet is down. Please try again later.',
                );
                console.error('Error fetching books:', error);
            });
    };
    useEffect(() => {
        fetchBooks();

        const socket = new WebSocket('ws://localhost:3000');

        socket.onopen = () => {
            console.log('WebSocket connection established');
        };

        socket.onmessage = (event) => {
            const data = event.data;
            try {
                const jsonData = JSON.parse(data);
                if (jsonData.type === 'new_book') {
                    setBooks((prevBooks) => {
                        const updatedBooks = [...prevBooks, jsonData.data];
                        const sortedBooks = updatedBooks.sort((a, b) =>
                            a.author.localeCompare(b.author),
                        );
                        return sortedBooks;
                    });
                }
            } catch (error) {
                console.log('Non-JSON message received:', data);
            }
        };
        socket.onclose = () => {
            console.log('WebSocket connection closed');
        };
        return () => {
            socket.close();
        };
    }, []);
    const addBook = (newBook: Book) => {
        setBooks((prevState: Book[]) => [...prevState, newBook]);
    };

    const removeBook = (bookId: number) => {
        setBooks((prevState: Book[]) =>
            prevState.filter((book) => book.id !== bookId),
        );
    };
    useEffect(() => {
        console.log(books);
    }, [books]);

    return (
        <BooksContextProvider
            bookContext={{
                books,
                addBook,
                removeBook,
            }}
        >
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<DisplayBooksPage />} />
                    <Route path='/books' element={<DisplayBooksPage />} />
                    <Route path='/addBook' element={<AddBookPage />} />
                    <Route
                        path='/editBook/:bookId'
                        element={<EditBookPage />}
                    />
                    <Route path='/charts' element={<ChartPage />} />
                </Routes>
            </BrowserRouter>
        </BooksContextProvider>
    );
}

export default App;
