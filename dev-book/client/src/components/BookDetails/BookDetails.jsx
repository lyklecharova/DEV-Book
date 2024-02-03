import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import * as BookService from '../../../service/BookService';
import style from './BookDetails.module.css'

export const BookDetails = () => {
    const [book, setBook] = useState({});
    const { bookId } = useParams();

    useEffect(() => {
        BookService.getOneBook(bookId)
            .then(result => setBook(result))
    }, [bookId]);

    return (
        <>
            {book && <div className={style['details-container']}>
                <div className={style['details-content']}>
                    <img className={style['details-image']} src={book.image} alt={book.title} />
                    <div className={style['details-info']}>
                        <h2 className={style['details-title']}>{book.title}</h2>
                        <Link to={book.url} className={style['details-url']} target="_blank" rel="noopener noreferrer">
                            <p>{book.url}</p>
                        </Link>
                    </div>
                </div>
                <div className={style['details-description']}>
                    <h2 className={style['desc-info']}>Description:</h2>
                    <p>{book.additionalInfo}</p>
                </div>
            </div>}
        </>
    );
};