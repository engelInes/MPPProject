import '@testing-library/jest-dom';
import {fireEvent, render, screen} from '@testing-library/react';
import {expect, test, vi} from 'vitest';
import {AddBookPage} from '../pages/Add Book Page/AddBookPage';
import {BrowserRouter} from 'react-router-dom';
import {BooksContextProvider} from '../context/BooksContext';

const {mockedUseNavigate} = vi.hoisted(() => {
    return {
        mockedUseNavigate: vi.fn(),
    };
});

vi.mock('react-router-dom', async () => {
    const router =
        await vi.importActual<typeof import('react-router-dom')>(
            'react-router-dom',
        );
    return {
        ...router,
        useNavigate: () => mockedUseNavigate,
    };
});

test('test add user page rendering', () => {
    render(
        <BrowserRouter>
            <AddBookPage />
        </BrowserRouter>,
    );

    const mainPageContainer = screen.getByTestId('main-page-container');
    const addUserButton = screen.getByTestId('button-test-id');

    expect(mainPageContainer).toBeInTheDocument();
    expect(addUserButton).toBeInTheDocument();
});

test('test add user page add button without form data', () => {
    window.alert = vi.fn();

    render(
        <BrowserRouter>
            <AddBookPage />
        </BrowserRouter>,
    );

    const addUserButton = screen.getByTestId('button-test-id');

    fireEvent.click(addUserButton);

    expect(mockedUseNavigate.mock.calls.length).toBe(0);
});

test('test add user page add button with form data', () => {
    window.alert = vi.fn();

    render(
        <BooksContextProvider
            bookContext={{
                books: [],
                addBook: vi.fn(),
                removeBook: vi.fn(),
            }}
        >
            <BrowserRouter>
                <AddBookPage />
            </BrowserRouter>
        </BooksContextProvider>,
    );

    const addUserButton = screen.getByTestId('button-test-id');

    const idFormInput = screen.getByLabelText('ID');
    const titleFormInput = screen.getByLabelText('Title');
    const authorFormInput = screen.getByLabelText('Author');
    const genreFormInput = screen.getByLabelText('Genre');
    const urlFormInput = screen.getByLabelText('URL');

    fireEvent.change(idFormInput, {
        target: {
            value: '1',
        },
    });
    fireEvent.change(titleFormInput, {
        target: {
            value: 'Cand corpul spune nu',
        },
    });
    fireEvent.change(authorFormInput, {
        target: {
            value: 'Gabor Mate',
        },
    });
    fireEvent.change(genreFormInput, {
        target: {
            value: 'Dezvoltare Personala',
        },
    });
    fireEvent.change(urlFormInput, {
        target: {
            value: 'gaborMate.jpeg',
        },
    });

    fireEvent.click(addUserButton);

    expect(mockedUseNavigate).toBeCalledWith('/');
});
