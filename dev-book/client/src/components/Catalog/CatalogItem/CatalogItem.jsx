import React from 'react';
import { Link } from 'react-router-dom';
import { useContext } from 'react';

import { AuthContext } from '../../../contexts/authContext';
import * as BookService from '../../../../service/BookService';
import style from './CatalogItem.module.css';

export const CatalogItem = React.memo(
    ({
        // using for optimization
        _id,
        title,
        image,
        additionalInfo = '',
        ownerId,
        deleteHandler,
    }) => {
        const { userId } = useContext(AuthContext);
        const deleteClickHandler = async () => {
            const confirmDelete = window.confirm(
                'Are you sure you want to delete this book?',
            );
            if (confirmDelete) {
                try {
                    await BookService.deleteBook(_id);
                    deleteHandler(_id);
                } catch (error) {
                    console.error('Error deleting book:', error);
                }
            }
        };

        return (
            <div className={style['items']}>
                <article className={style['card']}>
                    <img
                        className={style['items-image']}
                        src={image || '/book-covers/no-cover.svg'}
                        alt={title}
                        onError={(event) => {
                            event.currentTarget.onerror = null;
                            event.currentTarget.src =
                                '/book-covers/no-cover.svg';
                        }}
                    />
                    <div className={style['card-details']}>
                        <h2 className={style['items-title']}>{title}</h2>
                        {additionalInfo.length > 50 ? (
                            <div>
                                {/* Show shorter content and extended content on click */}
                                <p className={style['items-description']}>
                                    {`${additionalInfo.slice(0, 150)}${additionalInfo.length > 150 ? '...' : ''}`}
                                </p>
                            </div>
                        ) : (
                            <p className={style['items-description']}>
                                {additionalInfo}
                            </p>
                        )}
                        <Link className={style['details-button']} to={`/books/${_id}`}>
                            View details
                        </Link>
                        {userId === ownerId && (
                            <div className={style['content-btn']}>
                                <Link
                                    className={style['items-edit']}
                                    to={`/books/${_id}/edit`}
                                >
                                    Edit
                                </Link>
                                <button
                                    className={style['delete-button']}
                                    onClick={deleteClickHandler}
                                >
                                    Delete
                                </button>
                            </div>
                        )}
                    </div>
                </article>
            </div>
        );
    },
);
CatalogItem.displayName = 'CatalogItem';
