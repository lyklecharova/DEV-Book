export async function addBook(book) {
    const URL = 'http://localhost:3030/book/add';

    await fetch(URL, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': JSON.parse(localStorage.getItem('UserInfo'))?.token
        },
        body: JSON.stringify(book)
    })
};

export async function getAllBooks() {
    const URL = 'http://localhost:3030/book';
    const response = await fetch(URL)
    const data = await response.json();
    return data;

};

export async function getOneBook(id) {
    const URL = `http://localhost:3030/book/${id}`;
    const response = await fetch(URL)
    const data = await response.json();
    return data;

};

export async function editBook(book) {
    const URL = `http://localhost:3030/book/${book._id}`;
    const response = await fetch(URL, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            'X-Authorization': JSON.parse(localStorage.getItem('UserInfo'))?.token
        },
        body: JSON.stringify(book)
    })
    const data = await response.json();
    return data;

};

export async function deleteBook(id) {
    console.log(id)
    const URL = `http://localhost:3030/book/${id}`;
    const deleteBook = await fetch(URL, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            'X-Authorization': JSON.parse(localStorage.getItem('UserInfo'))?.token
        },
    });

    const data = await deleteBook.json();
    console.log(data);
    return data;
}
