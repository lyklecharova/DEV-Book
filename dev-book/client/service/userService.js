const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3030';

export async function register(user) {
    const url = `${API_URL}/user/register`;

    let response;

    try {
        response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        });
    } catch {
        throw new Error('Cannot connect to the server. Please try again.');
    }

    if (!response.ok) {
        if (response.status === 409) {
            throw new Error('Email already registered');
        }

        if (response.status === 400) {
            const data = await response.json();
            throw new Error(data.error || 'Invalid registration data');
        }

        throw new Error('Registration failed. Please try again later.');
    }

    return await response.json();
}

export async function login(user) {
    const url = `${API_URL}/user/login`;

    let response;

    try {
        response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        });
    } catch {
        throw new Error('Cannot connect to the server. Please try again.');
    }

    if (!response.ok) {
        if (response.status === 401) {
            throw new Error('Invalid email or password');
        }

        throw new Error('Login failed. Please try again later.');
    }

    return await response.json();
}
