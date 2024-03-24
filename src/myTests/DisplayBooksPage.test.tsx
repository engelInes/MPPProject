import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';
import {BrowserRouter} from 'react-router-dom';
import {expect, test, vi} from 'vitest';
import { DisplayBooksPage } from '../pages/DIsplay Data Page/DisplayBooksPage';
import {BooksContextProvider} from '../context/BooksContext';
import {Book} from '../models/Book';

test('test display users page render', () => {
    render(
        <BooksContextProvider
            bookContext={{
                books: [new Book(1, 'Walter Isaacson', 'Leonardo Da Vinci','biografie','sergiu.jpeg')],
                addBook: vi.fn(),
                removeBook: vi.fn(),
            }}
        >
            <BrowserRouter>
                <DisplayBooksPage />
            </BrowserRouter>
        </BooksContextProvider>,
    );

    const booksListDiv = screen.getByTestId('users-list');

    expect(booksListDiv.childNodes.length).toBe(1);
});
