import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {Critic} from '../../models/Critic';

export function CriticsList() {
    const {bookId} = useParams<{bookId: any}>();
    //const history = useNavigate();
    const [critics, setCritics] = useState<Critic[]>([]);
    const [newCritic, setNewCritic] = useState({
        criticName: '',
        bookId: bookId ? parseInt(bookId) : 0,
    });

    useEffect(() => {
        axios
            .get<Critic[]>(`http://localhost:3000/api/books/${bookId}/critics`)
            .then((response) => {
                setCritics(response.data);
            })
            .catch((error) => {
                console.error('Error fetching critics:', error);
            });
    }, [bookId]);

    const removeHandlerOnClick = (id: number) => {
        axios
            .delete(`http://localhost:3000/api/critics/${id}`)
            .then(() => {
                setCritics(critics.filter((critic) => critic.criticId !== id));
            })
            .catch((error) => {
                console.error('Error deleting critic:', error);
            });
    };

    const handleNameChange = (id: number, newName: string) => {
        setCritics((prevCritics) =>
            prevCritics.map((critic) =>
                critic.criticId === id
                    ? {...critic, criticName: newName}
                    : critic,
            ),
        );
    };

    const updateCriticOnClick = (id: number) => {
        const criticToUpdate = critics.find((critic) => critic.criticId === id);
        if (criticToUpdate) {
            axios
                .put(`http://localhost:3000/api/critics/${id}`, criticToUpdate)
                .then(() => {
                    console.log('critic updated successfully');
                    alert('critic updated succesfully');
                })
                .catch((error) => {
                    console.error('Error updating critic:', error);
                });
        }
    };

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        const {name, value} = e.target;
        setNewCritic((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const addCritic = () => {
        //console.log(typeof newReview.foodItemId);
        axios
            .post('http://localhost:3000/api/addCritic', newCritic)
            .then((response) => {
                setCritics([...critics, response.data]);
                setNewCritic({
                    criticName: '',
                    bookId: bookId ? parseInt(bookId) : 0,
                });
                alert('Item added succesfully');
            })
            .catch((error) => {
                console.error('Error adding review:', error);
            });
    };

    return (
        <div>
            <div className='critic-form'>
                <h2>Add Critic</h2>
                <div>
                    <label>Name:</label>
                    <input
                        type='text'
                        name='criticName'
                        value={newCritic.criticName}
                        onChange={handleInputChange}
                    />
                </div>
                <button onClick={addCritic}>Submit</button>
            </div>

            {critics.map((critic) => (
                <div
                    className='critic-card'
                    key={critic.criticId}
                    data-testid='critic-card'
                >
                    <button
                        className='remove-button'
                        data-testid='remove-button'
                        onClick={() => removeHandlerOnClick(critic.criticId)}
                    >
                        X
                    </button>
                    <div className='card-info' data-testid='card-info'>
                        <div className='critic-info'>
                            <div className='critic-name'>
                                <b>Name:</b>{' '}
                                <input
                                    type='text'
                                    value={critic.criticName}
                                    onChange={(e) =>
                                        handleNameChange(
                                            critic.criticId,
                                            e.target.value,
                                        )
                                    }
                                />
                            </div>
                            <div className='book-id'>
                                Book ID: {critic.bookId}
                            </div>
                        </div>
                        <button
                            className='editButton'
                            onClick={() => updateCriticOnClick(critic.criticId)}
                        >
                            Update Critic
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}
