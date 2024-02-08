export async function register(user) {
    const url = `http://localhost:3030/user/register`;

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user)
        });
        if (!response.ok) {
            throw new Error('Invalid registration');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error('Invalid registration');
    }
};

export async function login(user) {
    const url = `http://localhost:3030/user/login`;

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user)
        });
        if (!response.ok) {
            throw new Error('Invalid login');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error('Invalid login');
    }
};