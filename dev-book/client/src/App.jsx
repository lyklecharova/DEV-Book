import { Routes, Route } from "react-router-dom";
import { useState } from "react";

import { AuthContext } from "./contexts/authContext";
import AuthGuard from "./components/guards/AuthGuard";

import { Home } from './components/Home/Home';
import { Header } from './components/Header/Header';
import { Catalog } from './components/Catalog/Catalog';
import { CreateBook } from "./components/Create/CreateBook";
import { EditBook } from "./components/EditBook/EditBook";
import { BookDetails } from "./components/BookDetails/BookDetails";

import { Footer } from './components/Footer/Footer';
import { ErrorPage } from "./components/ErrorPage/ErrorPage";

import { Login } from './components/Login/Login';
import { Register } from './components/Register/Register';
import { Logout } from "./components/Logout/Logout";

function App() {
    const [auth, setAuth] = useState(() => {
        // retrieves the value stored in the browser's local storage under the "UserInfo" key.
        let token = JSON.parse(localStorage.getItem("UserInfo"));
        if (token) {
            const locStToken = token.token;
            const locStrEmail = token.email;
            const locStrId = token.userId;
            if (locStrEmail && locStToken) {
                return { email: locStrEmail, token: locStToken, userId: locStrId };
            }
        }

        return {};
    })

    const isAuthenticated = (info) => {
        setAuth(info)
    };

    const value = {
        email: auth?.email ?? null,
        userId: auth?.userId ?? null,
        isLog: !!auth?.email,
        isAuthenticated
    };

    return (
        <AuthContext.Provider value={value}>
            <Header />
            <main>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/catalog" element={<Catalog />} />
                    <Route path="/books/:bookId" element={<BookDetails />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="*" element={<ErrorPage />} />

                    <Route element={<AuthGuard />}>
                        <Route path="/create-books" element={<CreateBook />} />
                        <Route path='/books/:bookId/edit' element={<EditBook />} />
                        <Route path='/logout' element={<Logout />} />

                    </Route>

                </Routes>
            </main>
            <Footer />

        </AuthContext.Provider >
    )
}
export default App
