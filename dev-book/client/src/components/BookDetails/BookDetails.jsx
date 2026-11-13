import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import * as BookService from '../../../service/BookService';
import style from './BookDetails.module.css';

export const BookDetails = () => {
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);
    const { bookId } = useParams();

    useEffect(() => {
        let ignore = false;

        setLoading(true);
        setBook(null);
        BookService.getOneBook(bookId)
            .then((result) => {
                if (!ignore) {
                    setBook(result);
                }
            })
            .catch((error) => {
                if (!ignore) {
                    console.error('Error loading book:', error);
                    setBook(null);
                }
            })
            .finally(() => {
                if (!ignore) {
                    setLoading(false);
                }
            });
        return () => {
            ignore = true;
        };
    }, [bookId]);

    if (loading) {
        return <p>Loading book...</p>;
    }

    if (!book) {
        return <p>Book not found or could not be loaded.</p>;
    }
    return (
        <>
            {book && (
                <div className={style['details-container']}>
                    <div className={style['details-content']}>
                        <img
                            className={style['details-image']}
                            src={book.image || '/book-covers/no-cover.svg'}
                            alt={book.title || 'Book cover'}
                            onError={(event) => {
                                event.currentTarget.onerror = null;
                                event.currentTarget.src =
                                    '/book-covers/no-cover.svg';
                            }}
                        />
                        <div className={style['details-info']}>
                            <h2 className={style['details-title']}>
                                {book.title}
                            </h2>
                            <Link
                                to={book.url}
                                className={style['details-url']}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <p>{book.url}</p>
                            </Link>
                        </div>
                    </div>
                    <div className={style['details-description']}>
                        <p>{book.additionalInfo}</p>
                    </div>
                </div>
            )}
        </>
    );
};
