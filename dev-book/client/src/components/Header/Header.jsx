import { Link, NavLink } from 'react-router-dom';

import style from './Header.module.css'
export const Header = () => {
    return (

        <header className={style['header']}>
            <nav className={style['nav-bar']}>
                <Link to="/">Dev-Book</Link>
                <ul role="list" className={style['ul-list']}>
                    <li className={style['li-element']}>
                        <NavLink style={({ isActive }) => ({
                            color: isActive ? "#0077cc" : "#3F3F3F"
                        })} to="/">
                            Home
                        </NavLink>

                    </li>

                    <li className={style['li-element']}>
                        <NavLink style={({ isActive }) => ({
                            color: isActive ? "#0077cc" : "#3F3F3F"
                        })} to="/catalog">
                            Catalog
                        </NavLink>
                    </li>

                    <li className={style['li-element']}>
                        <NavLink style={({ isActive }) => ({
                            color: isActive ? "#0077cc" : "#3F3F3F"
                        })} to="/create-books">
                            {/* create */}
                            Add Book
                        </NavLink>
                    </li>

                    <li className={style['li-element']}>
                        <NavLink style={({ isActive }) => ({
                            color: isActive ? "#0077cc" : "#3F3F3F"
                        })} to="/login">
                            Login
                        </NavLink>
                    </li>

                    <li className={style['li-element']}>
                        <NavLink style={({ isActive }) => ({
                            color: isActive ? "#0077cc" : "#3F3F3F"
                        })} to="/register">
                            Register
                        </NavLink>
                    </li>

                    <li className={style['li-element']}>
                        <NavLink style={({ isActive }) => ({
                            color: isActive ? "#0077cc" : "#3F3F3F"
                        })} to="/logout">
                            Logout
                        </NavLink>
                    </li>


                </ul>
            </nav>
        </header>


    )
};