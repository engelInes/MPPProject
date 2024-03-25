import {fireEvent, render, screen} from '@testing-library/react';
import {MemoryRouter, Route, Routes} from 'react-router-dom';
import {expect, test, vi} from 'vitest';
import {BooksContextProvider} from '../context/BooksContext';

import {Book} from '../models/Book';
import {EditBookPage} from '../pages/Edit Book Page/EditBookPage';

const {mockedNavigate} = vi.hoisted(() => {
    return {
        mockedNavigate: vi.fn(),
    };
});

vi.mock('react-router-dom', async () => {
    const router =
        await vi.importActual<typeof import('react-router-dom')>(
            'react-router-dom',
        );
    return {
        ...router,
        useNavigate: () => mockedNavigate,
    };
});

test('test rendering of edit book page', () => {
    const bookId = 1;

    render(
        <BooksContextProvider
            bookContext={{
                books: [new Book(1, 'Walter Isaacson', 'Leonardo Da Vinci','biografie','sergiu.jpeg')],
                addBook: vi.fn(),
                removeBook: vi.fn(),
            }}
        >
            <MemoryRouter initialEntries={['/editBook/' + bookId]}>
                <Routes>
                    <Route
                        path='/editBook/:bookId'
                        element={<EditBookPage />}
                    />
                </Routes>
            </MemoryRouter>
        </BooksContextProvider>,
    );

    const bookForm = screen.getByTestId('book-form');
    expect(bookForm).toBeInTheDocument();
});

test('test rendering of edit book page with invalid bookId', () => {
    render(
        <BooksContextProvider
            bookContext={{
                books: [new Book(1, 'Walter Isaacson', 'Leonardo Da Vinci','biografie','sergiu.jpeg')],
                addBook: vi.fn(),
                removeBook: vi.fn(),
            }}
        >
            <MemoryRouter initialEntries={['/editBook/3']}>
                <Routes>
                    <Route
                        path='/editBook/:bookId'
                        element={<EditBookPage />}
                    />
                </Routes>
            </MemoryRouter>
        </BooksContextProvider>,
    );

    expect(mockedNavigate.call.length).toBe(1);
});

// test('test rendering of submit form', () => {
//     const mockAddBook = vi.fn();
//     const mockRemoveBook = vi.fn();

//     render(
//         <BooksContextProvider
//             bookContext={{
//                 books: [new Book(1, 'Walter Isaacson', 'Leonardo Da Vinci','biografie','sergiu.jpeg')],
//                 addBook: mockAddBook,
//                 removeBook: mockRemoveBook,
//             }}
//         >
//             <MemoryRouter initialEntries={['/editBook/3']}>
//                 <Routes>
//                     <Route
//                         path='/editBook/:bookId'
//                         element={<EditBookPage />}
//                     />
//                 </Routes>
//             </MemoryRouter>
//         </BooksContextProvider>,
//     );

//     const editButton = screen.getByTestId('edit-book-button');
//     expect(editButton).toBeInTheDocument();

//     fireEvent.click(editButton);

//     expect(mockAddBook.call.length).toBe(1);
//     expect(mockRemoveBook.call.length).toBe(1);
// });

// test('test submit with empty field', () => {
//     render(
//         <BooksContextProvider
//             bookContext={{
//                 books: [new Book(1, 'Walter Isaacson', 'Leonardo Da Vinci','biografie','sergiu.jpeg')],
//                 addBook: vi.fn(),
//                 removeBook: vi.fn(),
//             }}
//         >
//             <MemoryRouter initialEntries={['/editBook/3']}>
//                 <Routes>
//                     <Route
//                         path='/editBook/:bookId'
//                         element={<EditBookPage />}
//                     />
//                 </Routes>
//             </MemoryRouter>
//         </BooksContextProvider>,
//     );

//     const titleInput = screen.getByLabelText('Title');
//     const submitButton = screen.getByTestId('edit-book-button');

//     fireEvent.change(titleInput, {
//         target: {
//             value: '',
//         },
//     });

//     window.alert = vi.fn();

//     fireEvent.click(submitButton);

//     expect(window.alert).toBeCalledTimes(1);
// });
