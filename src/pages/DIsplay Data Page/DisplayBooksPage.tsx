import {useContext} from 'react';

import {Layout} from '../../components/layout/Layout';
import {BooksContext} from '../../context/BooksContext';
import {BookCard} from '../../features/Display Books/BookCard';
import {Book} from '../../models/Book';

import './DisplayBooksPage.css';

export function DisplayBooksPage() {
    document.title = 'My Library';

    const usersContext = useContext(BooksContext)!;

    let usersArray: Book[] = usersContext.books;
    const removeMethod = usersContext.removeBook;

    return (
        <Layout>
            <div className='main-page-container'>
                <div className='users-list' data-testid='users-list'>
                    {usersArray.map((user) => (
                        <BookCard
                            givenBook={user}
                            removeMethod={removeMethod}
                            key={user.getId()}
                        />
                    ))}
                </div>
            </div>
        </Layout>
    );
}
