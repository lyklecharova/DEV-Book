import { useEffect, useState } from 'react';

import * as BookService from '../../../service/BookService';
import { CatalogItem } from './CatalogItem/CatalogItem';
import style from './Catalog.module.css'

export const Catalog = () => {
    const [books, setBooks] = useState([]);
    useEffect(() => {
        BookService.getAllBooks()
            .then(res => {
                setBooks(res)
            });
    }, [])

    const deleteHandler = (bookId) => {
        setBooks(oldBooks => oldBooks.filter(b => b._id !== bookId));
    }

    return (
        <div className={style['container']}>
            {books && <>{
                books.map((books) => {
                    return <CatalogItem key={books._id} {...books} deleteHandler={deleteHandler} />
                })
            }</>}
            {books.length === 0 && (
                <div>
                    <h2 className={style['error']}>Sorry, but you can not find book yet &#128543; ! <br></br>Come back later. Thanks for your patience.</h2>
                </div>

            )}

        </div>
    );
};