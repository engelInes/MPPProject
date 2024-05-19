import {useNavigate} from 'react-router-dom';
import {BookCardPropsType} from '../../types/BookCardProps.types';

import axios from 'axios';
import './BookCard.css';
export function BookCard({givenBook, removeMethod}: BookCardPropsType) {
    let path: string = givenBook.pictureUrl;
    const navigate = useNavigate();

    const handleCardOnClick = () => {
        navigate('/editBook/' + givenBook.id);
    };
    const seeCriticsOnClick = () => {
        navigate(`/seeCritics/${givenBook.id}`);
    };
    const handleRemoveClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        axios
            .delete(`http://localhost:3000/api/books/${givenBook.id}`)
            .then(() => {
                removeMethod(givenBook.id);
            })
            .catch((error) => {
                console.error('Error deleting book:', error);
            });
    };

    return (
        <div
            className='card'
            data-testid='book-card'
            //onClick={handleCardOnClick}
        >
            <button
                className='remove-button'
                data-testid='remove-button'
                // onClick={(e) => {
                //     e.stopPropagation();
                //     removeMethod(givenBook.getId());
                // }}
                onClick={handleRemoveClick}
            >
                X
            </button>

            <div className='card-info' data-testid='card-info'>
                <div className='picture'>
                    <img src={path} alt='book pic' />
                </div>

                <div className='book-info'>
                    <div className='book-id'>
                        <b>Number: {givenBook.id}</b>
                    </div>
                    <div className='title'>Title: {givenBook.title}</div>
                    <div className='author'>Author: {givenBook.author}</div>
                    <div className='genre'>Genre: {givenBook.genre}</div>
                </div>
                <a className='editButton' onClick={handleCardOnClick}>
                    Update
                </a>
                <a className='seeReviewsButton' onClick={seeCriticsOnClick}>
                    Critics
                </a>
            </div>
        </div>
    );
}
