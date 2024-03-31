import {useContext, useEffect, useState} from 'react';

import {Button} from '../../components/button/Button';
import {Layout} from '../../components/layout/Layout';
import {BooksContext} from '../../context/BooksContext';
import {PaginationContext} from '../../context/PaginationContext';
import {BookCard} from '../../features/Display Books/BookCard';
import {Book} from '../../models/Book';

import './DisplayBooksPage.css';

export function DisplayBooksPage() {
    document.title = 'My Library';
    const [filterValue, setFilterValue] = useState('');

    //let [isAscending, setIsAscending] = useState<boolean>(true);
    let [showNext, setShowNext] = useState<boolean>(true);
    const paginationContext = useContext(PaginationContext)!;
    const booksContext = useContext(BooksContext)!;

    let booksArray: Book[] = booksContext.books;
    const removeMethod = booksContext.removeBook;

    let currentBook: Book[] = paginationContext.currentBooks;
    let setCurrentPage = paginationContext.setCurrentPage;
    let setCurrentBooks = paginationContext.setCurrentBooks;
    let currentPage = paginationContext.currentPage;
    let pageSize = paginationContext.pageSize;

    const filteredBooksList = currentBook.filter((book) =>
        book.getAuthor().toLowerCase().includes(filterValue.toLowerCase()),
    );
    const onFilterChange = (event: any) => {
        setFilterValue(event.target.value);
    };

    // useEffect(() => {
    //     currentBook.sort((firstBook, secondBook) => {
    //         return firstBook.getId() - secondBook.getId();
    //     });
    //     if (!isAscending) currentBook.reverse();
    // }, [isAscending]);

    const handleOnClick = () => {
        console.log(currentPage * pageSize, (currentPage + 1) * pageSize);
        let nextPage = booksArray.slice(
            currentPage * pageSize,
            (currentPage + 1) * pageSize,
        );

        setCurrentBooks([...currentBook, ...nextPage]);
        setCurrentPage(currentPage + 1);
    };
    // const handleOnClick = () => {
    //     const startIndex = currentPage * pageSize;
    //     const endIndex = Math.min(
    //         (currentPage + 1) * pageSize,
    //         booksArray.length,
    //     );
    //     const nextPage = booksArray.slice(startIndex, endIndex);

    //     setCurrentBooks(nextPage);
    //     setCurrentPage(currentPage + 1);
    // };
    useEffect(() => {
        if (currentPage * pageSize >= booksArray.length) {
            setShowNext(false);
            return;
        }
    }, [currentPage]);
    return (
        <Layout>
            <div className='main-page-container'>
                {/* <Button
                    type='button'
                    onClick={() => setIsAscending(!isAscending)}
                    buttonMessage='Ascending/Descending'
                /> */}
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
                {showNext ? (
                    <>
                        <div>
                            {currentPage * pageSize} out of {booksArray.length}
                        </div>

                        <Button
                            onClick={handleOnClick}
                            type='button'
                            buttonMessage='Show more'
                        />
                    </>
                ) : (
                    <div>
                        {booksArray.length} out of {booksArray.length}
                    </div>
                )}
            </div>
        </Layout>
    );
}
