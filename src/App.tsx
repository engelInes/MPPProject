import './App.css';
import './assets/sergiu.jpeg';
import {Book} from './models/Book';
import {AddBookPage} from './pages/Add Book Page/AddBookPage';
import {DisplayBooksPage} from './pages/DIsplay Data Page/DisplayBooksPage';

import {useEffect, useState} from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {BooksContextProvider} from './context/BooksContext';
import {EditBookPage} from './pages/Edit Book Page/EditBookPage';
import { ChartPage } from './pages/Chart Page/ChartPage';

let book1: Book = new Book(
    1,
    'Cand corpul spune nu',
    'Gabor Mate',
    'Dezvoltare Personala',
    'https://cdn.dc5.ro/img-prod/1276047538-0.jpeg',
);
let book2: Book = new Book(
    2,
    'Alchimistul',
    'Paulo Coehlo',
    'Fictiune',
    'https://s13emagst.akamaized.net/products/494/493515/images/res_496dcfc856298a95409f6b4852ceb01f.jpg',
);
let book3: Book = new Book(
    3,
    'Caraval',
    'Stephanie Garber',
    'Fictiune',
    'https://cdn.dc5.ro/img-prod/1660607-0.jpeg',
);
let book4: Book = new Book(
    4,
    'Hotul de carti',
    'Markus Zusak',
    'Istorie',
    'https://cdn.dc5.ro/img-prod/9786066096133-1854482-240.jpg',
);

function App() {
    let [books, setBooks] = useState<Book[]>([book1, book2, book3, book4]);

    const addBook = (newBook: Book) => {
        setBooks((prevState: Book[]) => [...prevState, newBook]);
    };

    const removeBook = (bookId: number) => {
        setBooks((prevState: Book[]) =>
            prevState.filter((book) => book.getId() !== bookId),
        );
    };

    useEffect(() => {
        console.log(books);
    });

    return (
        <BooksContextProvider
            bookContext={{
                books: books,
                addBook: addBook,
                removeBook: removeBook,
            }}
        >
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<DisplayBooksPage />} />
                    <Route path='/addUser' element={<AddBookPage />} />
                    <Route
                        path='/editUser/:bookId'
                        element={<EditBookPage />}
                    />
                    <Route path='/charts' element={<ChartPage />} />
                </Routes>
            </BrowserRouter>
        </BooksContextProvider>
    );
}

export default App;
