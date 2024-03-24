import {useNavigate} from 'react-router-dom';
import {BookCardPropsType} from '../../types/BookCardProps.types';

import './BookCard.css';

export function BookCard({
    givenBook: givenBook,
    removeMethod,
}: BookCardPropsType) {
    let path: string =  givenBook.getPictureUrl();

    const navigate = useNavigate();

    const handleCardOnClick = () => {
        navigate('/editUser/' + givenBook.getId());
    };

    return (
        <div
            className='card'
            data-testid='user-card'
            onClick={handleCardOnClick}
        >
            <button
                className='remove-button'
                data-testid='remove-button'
                onClick={(e) => {
                    e.stopPropagation();
                    removeMethod(givenBook.getId());
                }}
            >
                X
            </button>

            <div className='card-info' data-testid='card-info'>
                <div className='picture'>
                    <img src={path} alt='user profile' />
                </div>

                <div className='book-info'>
                    <div className='book-id'>
                        <b>Number: {givenBook.getId()}</b>
                    </div>
                    <div className='title'>Title: {givenBook.getTitle()}</div>
                    <div className='author'>
                        Author: {givenBook.getAuthor()}
                    </div>
                    <div className='genre'>Genre: {givenBook.getGenre()}</div>
                </div>
            </div>
        </div>
    );
}
