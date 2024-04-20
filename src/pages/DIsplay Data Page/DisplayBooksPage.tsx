import {useContext, useEffect, useState} from 'react';

//import {Button} from '../../components/button/Button';
import {Layout} from '../../components/layout/Layout';
import {BooksContext} from '../../context/BooksContext';
import {BookCard} from '../../features/Display Books/BookCard';
import {Book} from '../../models/Book';
import './DisplayBooksPage.css';
import {useIsOnline} from 'react-use-is-online';

const booksPerPage=4;

export function DisplayBooksPage() {
    document.title = 'My Library';
    const [filterValue, setFilterValue] = useState('');

    //let [isAscending, setIsAscending] = useState<boolean>(true);
    //let [showNext, setShowNext] = useState<boolean>(true);
    //const paginationContext = useContext(PaginationContext)!;
    const booksContext = useContext(BooksContext)!;
    const [displayedBooks, setDisplayedBooks]=useState(booksPerPage);
    let booksArray: Book[] = booksContext.books;
    const removeMethod = booksContext.removeBook;

    // let currentBook: Book[] = paginationContext.currentBooks;
    // let setCurrentPage = paginationContext.setCurrentPage;
    // let setCurrentBooks = paginationContext.setCurrentBooks;
    // let currentPage = paginationContext.currentPage;
    // let pageSize = paginationContext.pageSize;

    const filteredBooksList = booksArray.filter(book =>
        book.author.toLowerCase().includes(filterValue.toLowerCase())
    ).sort((book1, book2)=>book1.author.localeCompare(book2.author));

    const currentBooks=filteredBooksList.slice(0, displayedBooks);

    const onFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFilterValue(event.target.value);
        setDisplayedBooks(booksPerPage);
    };
    const handleShowMore=()=>{
        setDisplayedBooks(prevDisplayedBooks=>Math.min(prevDisplayedBooks+booksPerPage, filteredBooksList.length));
    }
    // useEffect(() => {
    //     currentBook.sort((firstBook, secondBook) => {
    //         return firstBook.getId() - secondBook.getId();
    //     });
    //     if (!isAscending) currentBook.reverse();
    // }, [isAscending]);

    // const handleOnClick = () => {
    //     console.log(currentPage * pageSize, (currentPage + 1) * pageSize);
    //     let nextPage = booksArray.slice(
    //         currentPage * pageSize,
    //         (currentPage + 1) * pageSize,
    //     );

    //     setCurrentBooks([...currentBook, ...nextPage]);
    //     setCurrentPage(currentPage + 1);
    // };
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
    const{isOnline, isOffline, error}=useIsOnline();
    // useEffect(() => {
    //     const handleStatusChange=()=>{
    //         setIsOnline(navigator.onLine);
    //     }
    //     // if (currentPage * pageSize >= booksArray.length) {
    //     //     setShowNext(false);
    //     //     return;
    //     // }
    //     window.addEventListener('online', handleStatusChange);
    //     window.addEventListener('offline',handleStatusChange);
    //     return()=>{
    //         window.removeEventListener('online', handleStatusChange);
    //         window.removeEventListener('offline', handleStatusChange);
    //     }
    // }, []);
    //  const removeBook = async (bookId: number) => {
    //      try {
    //          await axios.delete(`/api/books/${bookId}`);
    //          booksContext.removeBook(bookId);
    //          setCurrentBooks((prevState: Book[]) =>
    //              prevState.filter((book) => book.id !== bookId),
    //          );
    //      } catch (error) {
    //          console.error('Error removing book:', error);
    //      }
    //  };
    return (
        <Layout>
            {isOnline && (
                <div className='main-page-container'>
                    <div className='filter-section'>
                        <input
                            className='filter-fields'
                            type='text'
                            value={filterValue}
                            onChange={onFilterChange}
                            placeholder='filter by author'
                        />
                    </div>
                    {/* {showNext ? (
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
                    )} */}
                    <div className='books-list' data-testid='books-list'>
                        {/* {filteredBooksList.map((book) => (
                            <BookCard
                                givenBook={book}
                                removeMethod={removeMethod}
                                key={book.getId()}
                            />
                        ))} */}
                        {currentBooks.map((element) => (
                            <BookCard
                                givenBook={element}
                                removeMethod={removeMethod}
                                key={element.id}
                            />
                        ))}
                    </div>
                    {filteredBooksList.length > displayedBooks && (
                        <div className='show-more-container'>
                            <span>{`${displayedBooks} out of ${filteredBooksList.length}`}</span>
                            {/* <button className='show-more-button' onClick={handleShowMore}>Show more books</button> */}
                            <button className='show-more-button' onClick={handleShowMore}>Show more</button>
                        </div>
                    )}
                </div>
            )}
            {isOffline && (
                <h1>Offline</h1>
            )}
        </Layout>
    );
}
