import { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDev } from '@fortawesome/free-brands-svg-icons';

import style from './Header.module.css';
import { AuthContext } from '../../contexts/authContext';
export const Header = () => {
    const { isLog } = useContext(AuthContext);
    return (

        <header className={style['header']}>
            <nav className={style['nav-bar']}>
                <Link to="/">Dev-Book
                    <div className={style['flav-icon']}>

                        <FontAwesomeIcon icon={faDev} />
                    </div>
                </Link>


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

                    {isLog && (
                        <>
                            <li className={style['li-element']}>
                                <NavLink style={({ isActive }) => ({
                                    color: isActive ? "#0077cc" : "#3F3F3F"
                                })} to="/create-books">
                                    Add Book
                                </NavLink>
                            </li>

                            <li className={style['li-element']}>
                                <NavLink style={({ isActive }) => ({
                                    color: isActive ? "#0077cc" : "#3F3F3F"
                                })} to="/logout">
                                    Logout
                                </NavLink>
                            </li>
                        </>
                    )}
                    {!isLog && (
                        <>
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
                        </>
                    )}
                </ul>
            </nav>
        </header>
    );
};