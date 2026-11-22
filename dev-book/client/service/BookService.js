const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3030';

function authHeader() {
    return {
        'X-Authorization': JSON.parse(localStorage.getItem('UserInfo'))
            ?.token,
    };
}
function handleUnauthorized(response) {
    if (response.status === 401) {
        window.dispatchEvent(new Event('auth:unauthorized'));
    }
}

export async function addBook(book) {
    const URL = `${API_URL}/book/add`;
    const form = new FormData();
    form.append('title', book.title);
    form.append('url', book.url);
    form.append('additionalInfo', book.additionalInfo);
    form.append('image', book.image);

    const response = await fetch(URL, {
        method: 'POST',
        headers: authHeader(),
        body: form,
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

export async function editBook(bookId, fields) {
    const URL = `${API_URL}/book/${bookId}`;
    const form = new FormData();
    form.append('title', fields.title);
    form.append('url', fields.url);
    form.append('additionalInfo', fields.additionalInfo);
    if (fields.image) {
        form.append('image', fields.image);
    }

    const response = await fetch(URL, {
        method: 'PUT',
        headers: authHeader(),
        body: form,
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
        headers: authHeader(),
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
