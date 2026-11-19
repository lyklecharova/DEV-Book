import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import * as BookService from '../../../service/BookService';
import { URL_PATTERN } from '../../constants/constants';
import style from './CreateBook.module.css';

export const CreateBook = () => {
    const nav = useNavigate();
    const [book, setBook] = useState({
        title: '',
        url: '',
        additionalInfo: '',
    });
    const [imageFile, setImageFile] = useState(null);

    const [bookError, setBookError] = useState({});
    const err = {};

    const handleInputChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'image') {
            setImageFile(files?.[0] ?? null);
            return;
        }
        setBook((book) => ({
            ...book,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!imageFile) {
            err.imageError = 'You should upload image!'
        }

        if (book.title.trim() === '') {
            err.titleError = 'You should write title of book!';
        }

        if (book.url.trim() === '') {
            err.urlError = 'You should upload URL link!';
        } else if (!URL_PATTERN.test(book.url)) {
            err.urlError = 'URL should start with "https://".';
        }

        if (book.additionalInfo.trim() === '') {
            err.additionalInfoError =
                'You should write additional information!';
        }
        setBookError(err);

        if (Object.keys(err).length === 0) {
            try {
                await BookService.addBook({
                    title: book.title,
                    url: book.url,
                    additionalInfo: book.additionalInfo,
                    image: imageFile,
                });
                alert('Your book has been submitted for approval.');
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
            <form
                onSubmit={handleSubmit}
                className={style['create-form']}
                method="post"
            >
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
                        type="file"
                        id="image"
                        name="image"
                        accept="image/png,image/jpeg,image/webp"
                        onChange={handleInputChange}
                        className={style['create-input']}
                    />
                    {imageFile && (
                        <p className={style['file-name']}>Attached: {imageFile.name}</p>
                    )}
                </div>

                {bookError.imageError && (
                    <p className={style['error']}>{bookError.imageError}</p>
                )}

                <div>
                    <label
                        htmlFor="documentationURL"
                        className={style['create-textarea']}
                    >
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
                    <label
                        htmlFor="additionalInfo"
                        className={style['create-textarea']}
                    >
                        Additional information
                    </label>
                    <textarea
                        type="text"
                        id="info"
                        name="additionalInfo"
                        value={book.additionalInfo}
                        onChange={handleInputChange}
                        className={style['create-input']}
                        placeholder="Enter additional information...."
                        rows="4"
                        cols="50"
                    />
                </div>

                {bookError.additionalInfoError && (
                    <p className={style['error']}>
                        {bookError.additionalInfoError}
                    </p>
                )}

                <button type="submit">Create</button>
            </form>
        </div>
    );
};
