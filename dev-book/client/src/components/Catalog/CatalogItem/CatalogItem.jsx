import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useContext, useState } from "react";

import { AuthContext } from "../../../contexts/authContext";
import * as BookService from '../../../../service/BookService';
import style from './CatalogItem.module.css';

export const CatalogItem = React.memo(({ // using for optimization
    _id,
    title,
    image,
    additionalInfo,
    ownerId,
    deleteHandler
}) => {
    const { userId } = useContext(AuthContext);
    const nav = useNavigate();
    // State to expand the book information
    const [expanded, setExpanded] = useState(false);
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
            {/* onClick event to expand/collapse the book */}
            <div className={style['card']} onClick={() => setExpanded(!expanded)}>
                <img className={style['items-image']} src={image} alt={title} />
                <div className={`${style['card-details']} ${expanded ? style['expanded'] : ''}`}>
                    <h2 className={style['items-title']}>{title}</h2>
                    {additionalInfo.length > 50 ? (
                        <div>
                            {/* Show shorter content and extended content on click */}
                            <p className={style['items-description']}>{expanded ? additionalInfo : `${additionalInfo.slice(0, 50)}...`}</p>
                            {/* Button to open another page */}
                            <button onClick={() => nav(`/books/${_id}`)}>Read More</button>
                        </div>
                    ) : (
                        <p className={style['items-description']}>{additionalInfo}</p>
                    )}
                    {userId === ownerId && (
                        <div className={style['content-btn']}>
                            <Link className={style['items-edit']} to={`/books/${_id}/edit`}>
                                Edit
                            </Link>
                            <button className={style['delete-button']} onClick={deleteClickHandler}>Delete</button>
                        </div>
                    )}
                </div>
            </div>

        </div>
    );
});
CatalogItem.displayName = 'CatalogItem';