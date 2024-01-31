import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import style from './CreateBook.module.css';
import * as BookService from '../../../service/BookService';

export const CreateBook = () => {

    const nav = useNavigate();
    const [book, setBook] = useState({
        title: '',
        image: '',
        url: '',
        additionalInfo: ''
    });

    const [bookError, setBookError] = useState({});
    const err = {};

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setBook((book) => ({
            ...book,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (book.image.trim() === '') {
            err.imageError = 'You should upload image!'
        }

        if (book.title.trim() === '') {
            err.titleError = 'You should write title of book!'
        }

        if (book.url.trim() === '') {
            err.urlError = 'You should upload URL link!'
        }

        if (book.additionalInfo.trim() === '') {
            err.additionalInfoError = 'You should write additional information!'
        }
        setBookError(err);

        if (Object.keys(err).length === 0) {
            const book = Object.fromEntries(new FormData(e.currentTarget));
            try {
                await BookService.addBook(book);
                nav('/catalog');
            } catch (err) {
                console.log(`Please try again ${err}`);
            }
        }

        // Clear form after submission
        // setBook({
        //     title: '',
        //     image: '',
        //     url: '',
        // });
    };

    return (
        <div className={style['main']}>
            <form onSubmit={handleSubmit} className={style['create-form']} method="post">
                <div>
                    <label htmlFor="title" className={style['create-textarea']}>
                        Title
                    </label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={book.title}
                        onChange={handleInputChange}
                        className={style['create-input']}
                        placeholder="Enter title..."

                    />
                </div>

                {bookError.titleError && (
                    <p className={style['error']}>{bookError.titleError}</p>
                )}

                <div>
                    <label htmlFor="image" className={style['create-textarea']}>
                        Image
                    </label>
                    <input
                        type="text"
                        id="image"
                        name="image"
                        value={book.image}
                        onChange={handleInputChange}
                        className={style['create-input']}
                        placeholder="Upload image..."

                    />
                </div>

                {bookError.imageError && (
                    <p className={style['error']}>{bookError.imageError}</p>
                )}

                <div>
                    <label htmlFor="documentationURL" className={style['create-textarea']}>
                        URL
                    </label>
                    <input
                        type="text"
                        id="url"
                        name="url"
                        value={book.url}
                        onChange={handleInputChange}
                        className={style['create-input']}
                        placeholder="Enter documentation URL..."
                    />
                </div>

                {bookError.urlError && (
                    <p className={style['error']}>{bookError.urlError}</p>
                )}


                <div>
                    <label htmlFor="additionalInfo" className={style['create-textarea']}>
                        Additional information
                    </label>
                    <input
                        type="text"
                        id="info"
                        name="additionalInfo"
                        value={book.additionalInfo}
                        onChange={handleInputChange}
                        className={style['create-input']}
                        placeholder="Enter additional information...."
                    />
                </div>

                {bookError.additionalInfoError && (
                    <p className={style['error']}>{bookError.additionalInfoError}</p>
                )}

                <button type="submit">Create</button>
            </form>
        </div>
    );
};
