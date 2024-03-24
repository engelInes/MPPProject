import '@testing-library/jest-dom';
import {fireEvent, render, screen} from '@testing-library/react';
import {expect, test, vi} from 'vitest';
import {BookCard} from '../features/Display Books/BookCard';
import {Book} from '../models/Book';
import {BrowserRouter} from 'react-router-dom';

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

test('test user card rendering', () => {
    const testBook = new Book(
        1,
        'Walter Isaacson',
        'Leonardo Da Vinci',
        'biografie',
        'sergiu.jpeg',
    );
    const mockRemoveMethod = vi.fn();

    render(
        <BrowserRouter>
            <BookCard givenBook={testBook} removeMethod={mockRemoveMethod} />
        </BrowserRouter>,
    );

    const bookCard = screen.getByTestId('user-card');
    const removeButton = screen.getByTestId('remove-button');

    const userId = screen.getByText('Number: 1');
    const bookTitle = screen.getByText('Title: Walter Isaacson');
    const userImage = screen.getByAltText('user profile');

    expect(bookCard).toBeInTheDocument();
    expect(removeButton).toBeInTheDocument();
    expect(userId).toBeInTheDocument();
    expect(bookTitle).toBeInTheDocument();
    expect(userImage).toBeInTheDocument();
});

test('test user card remove method to be called', () => {
    const testUser = new Book(
        1,
        'Walter Isaacson',
        'Leonardo Da Vinci',
        'biografie',
        'sergiu.jpeg',
    );
    const mockRemoveMethod = vi.fn();

    render(
        <BrowserRouter>
            <BookCard givenBook={testUser} removeMethod={mockRemoveMethod} />
        </BrowserRouter>,
    );

    const bookCard = screen.getByTestId('user-card');
    const removeButton = screen.getByTestId('remove-button');
    fireEvent.click(removeButton);
    fireEvent.click(bookCard);

    expect(mockRemoveMethod.mock.calls.length).toBe(1);
    expect(mockedUseNavigate).toBeCalledWith('/editUser/1');
});
