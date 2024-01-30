import { useEffect, useState } from 'react';

import * as BookService from '../../../service/BookService';
import { CatalogItem } from './CatalogItem/CatalogItem';
import style from './Catalog.module.css'


export const Catalog = () => {
    const [books, setBooks] = useState()
    console.log(books)
    useEffect(() => {
        BookService.getAllBooks()
            .then(res => {
                setBooks(res)
            });
    }, [])

    return (
        <div className={style['container']}>
            {books && <>{
                books.map((books) => {
                    return <CatalogItem key={books._id} {...books} />
                })
            }</>}
        </div>
    );
};