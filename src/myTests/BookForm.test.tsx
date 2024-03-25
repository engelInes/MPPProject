import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';
import {expect, test} from 'vitest';
import {BookForm} from '../features/CRUD/Book Form/BookForm';
import React from 'react';
import {Book} from '../models/Book';

test('testing rendering of book form without book', () => {
    let idInput = React.createRef<HTMLInputElement>();
    let titleInput = React.createRef<HTMLInputElement>();
    let authorInput = React.createRef<HTMLInputElement>();
    let genreInput = React.createRef<HTMLInputElement>();
    let urlInput = React.createRef<HTMLInputElement>();

    render(
        <BookForm
            idInput={idInput}
            titleInput={titleInput}
            authorInput={authorInput}
            genreInput={genreInput}
            urlInput={urlInput}
        />,
    );

    const renderedBookForm = screen.getByTestId('book-form');
    const idFormInput = screen.getByPlaceholderText('ID');
    const titleFormInput = screen.getByPlaceholderText('Title');
    const authorFormLabel = screen.getByText('Author');
    const genreFormLabel = screen.getByText('Genre');
    const urlFormLabel = screen.getByText('URL');

    expect(renderedBookForm).toBeInTheDocument();
    expect(idFormInput).toBeInTheDocument();
    expect(titleFormInput).toBeInTheDocument();
    expect(authorFormLabel).toBeInTheDocument();
    expect(genreFormLabel).toBeInTheDocument();
    expect(urlFormLabel).toBeInTheDocument();
});

test('testing rendering of book form with book', () => {
    let idInput = React.createRef<HTMLInputElement>();
    let titleInput = React.createRef<HTMLInputElement>();
    let authorInput = React.createRef<HTMLInputElement>();
    let genreInput = React.createRef<HTMLInputElement>();
    let urlInput = React.createRef<HTMLInputElement>();

    let book1 = new Book(
        1,
        'Walter Isaacson',
        'Leonardo Da Vinci',
        'biografie',
        'sergiu.jpeg',
    );

    render(
        <BookForm
            idInput={idInput}
            titleInput={titleInput}
            authorInput={authorInput}
            genreInput={genreInput}
            urlInput={urlInput}
            givenBook={book1}
        />,
    );

    const renderedBookForm = screen.getByTestId('book-form');
    const idFormInput = screen.getByDisplayValue('1');
    const titleFormInput = screen.getByDisplayValue('Walter Isaacson');
    const idFormLabel = screen.getByText('ID');
    const titleFormLabel = screen.getByText('Title');

    expect(renderedBookForm).toBeInTheDocument();
    expect(idFormInput).toBeInTheDocument();
    expect(titleFormInput).toBeInTheDocument();
    expect(idFormLabel).toBeInTheDocument();
    expect(titleFormLabel).toBeInTheDocument();
});
