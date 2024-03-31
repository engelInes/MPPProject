import './App.css';
import {Book} from './models/Book';
import {AddBookPage} from './pages/Add Book Page/AddBookPage';
import {DisplayBooksPage} from './pages/DIsplay Data Page/DisplayBooksPage';

import {Suspense, useEffect, useState} from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {BooksContextProvider} from './context/BooksContext';
import {EditBookPage} from './pages/Edit Book Page/EditBookPage';
import { ChartPage } from './pages/Chart Page/ChartPage';
import { PaginationContextProvider } from './context/PaginationContext';
import LoadingPage from './pages/Loading Page/LoadingPage';

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
let book5: Book = new Book(
    5,
    'Acolo unde canta racii',
    'Delia Owens',
    'Fictiune',
    'https://media.elefant.ro/mnresize/1000/-/is/product-images/cartero/ac5aee85/6934/4b94/a2a0/79a403abbff4/ac5aee85-6934-4b94-a2a0-79a403abbff4_1.jpg',
);
let book6: Book = new Book(
    6,
    'Diana',
    'Andrew Morton',
    'Biografie',
    'https://media.elefant.ro/mnresize/1000/-/is/product-images/cartero/f55cd878/001a/4393/b323/08267823bcbf/f55cd878-001a-4393-b323-08267823bcbf_1.jpg?v=10',
);
let book7: Book = new Book(
    7,
    'Printre tonuri cenusii',
    'Ruta Sepetys',
    'Fictiune',
    'https://media.elefant.ro/mnresize/1000/-/images/32/219532/printre-tonuri-cenusii_1_fullsize.jpg',
);
let book8: Book = new Book(
    8,
    'Sotia Bancherului',
    'Cristina Alger',
    'Fictiune',
    'https://nemira.ro/media/catalog/product/cache/1/image/363x/040ec09b1e35df139433887a97daa66f/c/r/cristina-alger---sotia-bancherului_c1.jpg',
);

const pageSize=3;
function App() {
    let [books, setBooks] = useState<Book[]>([book1, book2, book3, book4,book5, book6, book7, book8]);

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

    let [currentBooks, setCurrentBooks]=useState<Book[]>(books.slice(0, pageSize));
    let [currentPage, setCurrentPage]=useState<number>(1);
    return (
        <BooksContextProvider
            bookContext={{
                books: books,
                addBook: addBook,
                removeBook: removeBook,
            }}
        >
            <PaginationContextProvider
                paginationContext={{
                    currentBooks,
                    setCurrentBooks,
                    currentPage,
                    setCurrentPage,
                    pageSize: pageSize,
                }}
            >
                <BrowserRouter>
                    <Routes>
                        <Route path='/loading' element={<LoadingPage />} />
                        <Route
                            path='/'
                            element={
                                <Suspense fallback={<LoadingPage />}>
                                    <DisplayBooksPage />
                                </Suspense>
                            }
                        />

                        <Route
                            path='/addBook'
                            element={
                                <Suspense fallback={<LoadingPage />}>
                                    <AddBookPage />
                                </Suspense>
                            }
                        />
                        <Route
                            path='/editBook/:bookId'
                            element={
                                <Suspense fallback={<LoadingPage />}>
                                    <EditBookPage />
                                </Suspense>
                            }
                        />
                        <Route path='/charts' element={<ChartPage />} />
                    </Routes>
                </BrowserRouter>
            </PaginationContextProvider>
        </BooksContextProvider>
    );
}

export default App;
