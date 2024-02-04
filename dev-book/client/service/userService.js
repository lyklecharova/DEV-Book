export async function register(user) {
    const url = `http://localhost:3030/user/register`;

    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user)
    });
    const data = await response.json();
    console.log(data)
    return data;
};

export async function login(user) {
    const url = `http://localhost:3030/user/login`;

    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user)
    });
    const data = await response.json();
    console.log(data)
    return data;
};