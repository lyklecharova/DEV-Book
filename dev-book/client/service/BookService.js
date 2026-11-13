export async function addBook(book) {
    const URL = 'http://localhost:3030/book/add';

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
        throw new Error(`Failed to create book. Status: ${response.status}`);
    }
}

export async function getAllBooks() {
    const URL = 'http://localhost:3030/book';
    const response = await fetch(URL);
    if (!response.ok) {
        throw new Error(`Failed to load books. Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
}

export async function getOneBook(id) {
    const URL = `http://localhost:3030/book/${id}`;
    const response = await fetch(URL);
    if (!response.ok) {
        throw new Error(`Failed to load book. Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
}

export async function editBook(book) {
    const URL = `http://localhost:3030/book/${book._id}`;
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
        throw new Error(`Failed to update book. Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
}

export async function deleteBook(id) {
    const URL = `http://localhost:3030/book/${id}`;

    const response = await fetch(URL, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': JSON.parse(localStorage.getItem('UserInfo'))
                ?.token,
        },
    });
    if (!response.ok) {
        throw new Error(`Failed to delete book. Status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);
    return data;
}
