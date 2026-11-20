const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3030';

function handleUnauthorized(response) {
    if (response.status === 401) {
        window.dispatchEvent(new Event('auth:unauthorized'));
    }
}

export async function addBook(book) {
    const URL = `${API_URL}/book/add`;

    const response = await fetch(URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': JSON.parse(localStorage.getItem('UserInfo'))
                ?.token,
        },
        body: JSON.stringify(book),
    });
    if (!response.ok) {
        handleUnauthorized(response);
        throw new Error(`Failed to create book. Status: ${response.status}`);
    }
}

export async function getAllBooks() {
    const URL = `${API_URL}/book`;
    const response = await fetch(URL);
    if (!response.ok) {
        throw new Error(`Failed to load books. Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
}

export async function getOneBook(id) {
    const URL = `${API_URL}/book/${id}`;
    const response = await fetch(URL);
    if (!response.ok) {
        throw new Error(`Failed to load book. Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
}

export async function editBook(book) {
    const URL = `${API_URL}/book/${book._id}`;
    const response = await fetch(URL, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': JSON.parse(localStorage.getItem('UserInfo'))
                ?.token,
        },
        body: JSON.stringify(book),
    });
    if (!response.ok) {
        handleUnauthorized(response);
        throw new Error(`Failed to update book. Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
}

export async function deleteBook(id) {
    const URL = `${API_URL}/book/${id}`;

    const response = await fetch(URL, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': JSON.parse(localStorage.getItem('UserInfo'))
                ?.token,
        },
    });
    if (!response.ok) {
        handleUnauthorized(response);
        throw new Error(`Failed to delete book. Status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);
    return data;
}

// Admin - Get pending books
export async function getPendingBooks() {
    const URL = `${API_URL}/book/admin/pending`;

    const response = await fetch(URL, {
        headers: {
            'X-Authorization': JSON.parse(localStorage.getItem('UserInfo'))
                ?.token,
        },
    });

    if (!response.ok) {
        handleUnauthorized(response);
        throw new Error(
            `Failed to load pending books. Status: ${response.status}`,
        );
    }

    return await response.json();
}

// Admin - Approve book
export async function approveBook(id) {
    const URL = `${API_URL}/book/admin/${id}/approve`;

    const response = await fetch(URL, {
        method: 'PATCH',
        headers: {
            'X-Authorization': JSON.parse(localStorage.getItem('UserInfo'))
                ?.token,
        },
    });

    if (!response.ok) {
        handleUnauthorized(response);
        throw new Error(`Failed to approve book. Status: ${response.status}`);
    }

    return await response.json();
}

// Admin - Reject book
export async function rejectBook(id) {
    const URL = `${API_URL}/book/admin/${id}/reject`;

    const response = await fetch(URL, {
        method: 'PATCH',
        headers: {
            'X-Authorization': JSON.parse(localStorage.getItem('UserInfo'))
                ?.token,
        },
    });

    if (!response.ok) {
        handleUnauthorized(response);
        throw new Error(`Failed to reject book. Status: ${response.status}`);
    }

    return await response.json();
}
