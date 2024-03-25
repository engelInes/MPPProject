import {useContext, useState} from 'react';

import {Layout} from '../../components/layout/Layout';
import {BooksContext} from '../../context/BooksContext';
import {BookCard} from '../../features/Display Books/BookCard';
import {Book} from '../../models/Book';

import './DisplayBooksPage.css';

export function DisplayBooksPage() {
    document.title = 'My Library';
    const[filterValue, setFilterValue]=useState("");

    const booksContext = useContext(BooksContext)!;

    let booksArray: Book[] = booksContext.books;
    const removeMethod = booksContext.removeBook;


    const filteredBooksList=booksArray.filter((book)=>book.getAuthor().toLowerCase().includes(filterValue.toLowerCase()));
    const onFilterChange=(event:any)=>{setFilterValue(event.target.value)}
    return (
        <Layout>
            <div className='main-page-container'>
                <div className='books-list' data-testid='books-list'>
                    {filteredBooksList.map((book) => (
                        <BookCard
                            givenBook={book}
                            removeMethod={removeMethod}
                            key={book.getId()}
                        />
                    ))}
                </div>
                <div className='filter-section'>
                    <input
                        type='text'
                        value={filterValue}
                        onChange={onFilterChange}
                        placeholder='filter by author'
                    />
                </div>
            </div>
        </Layout>
    );
}
