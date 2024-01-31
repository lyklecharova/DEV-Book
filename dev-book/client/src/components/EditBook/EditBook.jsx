import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import style from './EditBook.module.css';
import * as BookService from '../../../service/BookService';

export const EditBook = () => {

    const nav = useNavigate();
    const { bookId } = useParams();

    const [book, setBook] = useState({
        title: '',
        image: '',
        url: '',
        additionalInfo: ''
    });

    const [bookError, setBookError] = useState({});
    

    //Mount
    useEffect(() => {
        BookService.getOneBook(bookId)
            .then(result => {
                setBook(result);
            });
    }, [bookId])

    const editBookSubmitHandler = async (e) => {
        e.preventDefault();
        const err = {};
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
            // Отстраняване на проблема с имената на полетата в тялото на заявката
        const editedBook = {
            title: e.currentTarget.title.value,
            image: e.currentTarget.image.value,
            url: e.currentTarget.url.value,
            additionalInfo: e.currentTarget.additionalInfo.value
        };
            try {
                await BookService.editBook(book, editedBook);
                nav('/catalog');
            } catch (err) {
                console.log(`Please try again ${err}`);
            }
        }
    };

    const onChange = (e) => {
        setBook(state => ({
            ...state,
            [e.target.name]: e.target.value
        }));
    };

    return (
        <div className={style['main']}>
            <form onSubmit={editBookSubmitHandler} className={style['create-form']}>
                <div>
                    <label htmlFor="title" className={style['create-textarea']}>
                        Title
                    </label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={book.title}
                        onChange={onChange}
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
                        onChange={onChange}
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
                        onChange={onChange}
                        className={style['create-input']}
                        placeholder="Enter documentation URL..."

                    />
                </div>
                        {bookError.urlError && (
                            <p className={style['error']}>{bookError.urlError}</p>
                        )}
                <div>
                    <label htmlFor="additionalInfo" className={style['create-textarea']}>
                        Additional Information
                    </label>
                    <input
                        type="text"
                        id="additionalInfo"
                        name="additionalInfo"
                        value={book.additionalInfo}
                        onChange={onChange}
                        className={style['create-input']}
                        placeholder="Enter additional information..."

                    />
                </div>
                        {bookError.additionalInfoError && (
                            <p className={style['error']}>{bookError.additionalInfoError}</p>
                        )}
                <button type="submit">Edit</button>
            </form>
        </div>
    );

};