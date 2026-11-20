import { useEffect, useState } from 'react';
import {
    getPendingBooks,
    approveBook,
    rejectBook,
} from '../../../service/BookService';

import styles from './AdminDashboard.module.css';

export function AdminDashboard() {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [processingId, setProcessingId] = useState(null);

    useEffect(() => {
        async function loadBooks() {
            try {
                const pendingBooks = await getPendingBooks();
                setBooks(pendingBooks);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        loadBooks();
    }, []);

    async function handleApprove(id) {
        const confirmed = window.confirm(
            'Are you sure you want to approve this book?',
        );

        if (!confirmed) return;

        setProcessingId(id);
        setError('');

        try {
            await approveBook(id);

            setBooks((currentBooks) =>
                currentBooks.filter((book) => book._id !== id),
            );
        } catch (err) {
            setError(err.message);
        } finally {
            setProcessingId(null);
        }
    }

    async function handleReject(id) {
        const confirmed = window.confirm(
            'Are you sure you want to reject this book?',
        );

        if (!confirmed) return;

        setProcessingId(id);
        setError('');

        try {
            await rejectBook(id);

            setBooks((currentBooks) =>
                currentBooks.filter((book) => book._id !== id),
            );
        } catch (err) {
            setError(err.message);
        } finally {
            setProcessingId(null);
        }
    }

    if (loading) {
        return (
            <section className={styles['admin-dashboard']}>
                <p>Loading pending books...</p>
            </section>
        );
    }

    return (
        <section className={styles['admin-dashboard']}>
            <h1>Admin Dashboard</h1>
            <h2>Pending Books ({books.length})</h2>

            {error && (
                <p className={styles['admin-error']} role="alert">
                    {error}
                </p>
            )}

            {books.length === 0 ? (
                <p className={styles['admin-empty']}>
                    No books waiting for approval.
                </p>
            ) : (
                <div className={styles['admin-books']}>
                    {books.map((book) => (
                        <article
                            key={book._id}
                            className={styles['admin-book-card']}
                        >
                            <h3>{book.title}</h3>

                            <p>
                                Submitted by:{' '}
                                {book.submittedByEmail || 'Unknown'}
                            </p>

                            <p>Status: {book.status}</p>

                            {book.image && (
                                <img
                                    src={book.image}
                                    alt={book.title}
                                    className={styles['admin-book-image']}
                                />
                            )}

                            <div className={styles['admin-book-actions']}>
                                <button
                                    type="button"
                                    className={styles['approve-btn']}
                                    onClick={() => handleApprove(book._id)}
                                    disabled={processingId !== null}
                                >
                                    {processingId === book._id
                                        ? 'Processing...'
                                        : 'Approve'}
                                </button>

                                <button
                                    type="button"
                                    className={styles['reject-btn']}
                                    onClick={() => handleReject(book._id)}
                                    disabled={processingId !== null}
                                >
                                    Reject
                                </button>
                            </div>
                        </article>
                    ))}
                </div>
            )}
        </section>
    );
}
