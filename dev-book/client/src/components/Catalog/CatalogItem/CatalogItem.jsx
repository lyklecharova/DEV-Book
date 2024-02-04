import { Link, useNavigate } from 'react-router-dom';
import { useContext } from "react";

import { AuthContext } from "../../../contexts/authContext";
import * as BookService from '../../../../service/BookService';
import style from '../Catalog.module.css';

export const CatalogItem = ({
    _id,
    title,
    image,
    ownerId,
    deleteHandler
}) => {
    const { userId } = useContext(AuthContext);
    const nav = useNavigate();

    const deleteClickHandler = async () => {
        const confirmDelete = window.confirm("Are you sure you want to delete this book?");
        if (confirmDelete) {
            try {
                await BookService.deleteBook(_id);
                deleteHandler(_id);
                nav('/catalog');
            } catch (error) {
                console.error("Error deleting book:", error);
            }
        }
    };
    return (
        <div className={style['items']}>
            <img className={style['items-image']} src={image} alt={image.title} />
            <h2 className={style['items-title']}>{title}</h2>

            <div className={style['items-content']}>
                {userId === ownerId && (
                    <div className={style['content-btn']}>
                        <Link className={style['items-edit']} to={`/books/${_id}/edit`}>
                            Edit
                        </Link>
                        <button className={style['delete-button']} onClick={deleteClickHandler}>Delete</button>
                    </div>
                )}
            </div>

            <div className={style['content-details-btn']}>
                <Link className={style['details-button']} to={`/books/${_id}`}>Details</Link>
            </div>
        </div>
    );
};


