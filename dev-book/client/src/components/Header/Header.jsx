import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDev } from "@fortawesome/free-brands-svg-icons";

import style from "./Header.module.css";
import { AuthContext } from "../../contexts/authContext";
import { ThemeToggle } from "../ThemeButton/ThemeButton";
import { ThemeContext } from "../../contexts/ThemeContext";

export const Header = () => {
    const { isLog } = useContext(AuthContext);
    const { theme } = useContext(ThemeContext);

    const colorLink = (name, link) => {
        return (
            <NavLink
                style={({ isActive }) => ({
                    color: isActive ? "#0077cc" : theme === "Light" ? "#2db583" : "#000",
                })}
                to={link}
            >
                {name}
            </NavLink>
        );
    };

    return (
        <header className={style["header"]}>
            <nav className={style["nav-bar"]}>
                <Link to="/">
                    Dev-Book
                    <div className={style["flav-icon"]}>
                        <FontAwesomeIcon icon={faDev} />
                    </div>
                </Link>

                <ul role="list" className={style["ul-list"]}>
                    <li className={style["li-element"]}>
                        {colorLink("Home", "/")}
                    </li>

                    <li className={style["li-element"]}>
                        {colorLink("Catalog", "/catalog")}
                    </li>

                    {isLog && (
                        <>
                            <li className={style["li-element"]}>
                                {colorLink("Add Book", "/create-books")}
                            </li>

                            <li className={style["li-element"]}>
                                {colorLink("Logout", "/logout")}
                            </li>
                        </>
                    )}
                    {!isLog && (
                        <>
                            <li className={style["li-element"]}>
                                {colorLink("Login", "/login")}
                            </li>

                            <li className={style["li-element"]}>
                                {colorLink("Register", "/register")}
                            </li>
                        </>
                    )}
                    <li>
                        <ThemeToggle />
                    </li>
                </ul>
            </nav>
        </header>
    );
};
