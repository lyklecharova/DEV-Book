import { useEffect, useState } from 'react';

import * as BookService from '../../../service/BookService';
import { CatalogItem } from './CatalogItem/CatalogItem';
import style from './Catalog.module.css';

export const Catalog = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    useEffect(() => {
        BookService.getAllBooks()
            .then((res) => setBooks(res))
            .catch((err) => {
                console.error('Error loading books:', err);
                setError(true);
            })
            .finally(() => setLoading(false));
    }, []);

    const deleteHandler = (bookId) => {
        setBooks((oldBooks) => oldBooks.filter((b) => b._id !== bookId));
    };

    return (
        <div className={style['container']}>
            {loading && (
                <div className={style['loading']}>
                    <div className={style['spinner']}></div>
                    <h2>Loading books...</h2>
                    <p>The server is starting up. This may take a moment.</p>
                </div>
            )}

            {!loading && error && (
                <h2 className={style['error']}>
                    Unable to load books. Please try again later.
                </h2>
            )}

            {!loading &&
                !error &&
                books.map((book) => (
                    <CatalogItem
                        key={book._id}
                        {...book}
                        deleteHandler={deleteHandler}
                    />
                ))}

            {!loading && !error && books.length === 0 && (
                <h2 className={style['error']}>No books available yet.</h2>
            )}
        </div>
    );
};
