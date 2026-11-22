import { useContext, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDev } from '@fortawesome/free-brands-svg-icons';

import style from './Header.module.css';
import { AuthContext } from '../../contexts/authContext';
import { ThemeToggle } from '../ThemeButton/ThemeButton';

export const Header = () => {
    const { isLog, role, email } = useContext(AuthContext);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const colorLink = (name, link) => {
        return (
            <NavLink
                onClick={() => setIsMenuOpen(false)}
                style={({ isActive }) => ({
                    color: isActive ? 'var(--accent-color)' : 'var(--text-color)',
                })}
                to={link}
            >
                {name}
            </NavLink>
        );
    };

    return (
        <header className={style['header']}>
            <nav className={style['nav-bar']}>
                <Link to="/" onClick={() => setIsMenuOpen(false)}>
                    Dev-Book
                    <div className={style['flav-icon']}>
                        <FontAwesomeIcon icon={faDev} />
                    </div>
                </Link>
                <button
                    type="button"
                    className={style['menu-toggle']}
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
                    aria-expanded={isMenuOpen}
                    aria-controls="main-navigation"
                >
                    {isMenuOpen ? '✕' : '☰'}
                </button>

                <ul
                    id="main-navigation"
                    role="list"
                    className={`${style['ul-list']} ${
                        isMenuOpen ? style['menu-open'] : ''
                    }`}
                >
                    <li className={style['li-element']}>
                        {colorLink('Home', '/')}
                    </li>

                    <li className={style['li-element']}>
                        {colorLink('Catalog', '/catalog')}
                    </li>

                    {isLog && (
                        <>
                            <li className={style['li-element']}>
                                {colorLink('Add Book', '/create-books')}
                            </li>
                            {role === 'admin' && (
                                <li className={style['li-element']}>
                                    {colorLink('Admin', '/admin')}
                                </li>
                            )}
                            <li className={style['li-element']}>
                                {colorLink('Logout', '/logout')}
                            </li>
                        </>
                    )}
                    {!isLog && (
                        <>
                            <li className={style['li-element']}>
                                {colorLink('Login', '/login')}
                            </li>

                            <li className={style['li-element']}>
                                {colorLink('Register', '/register')}
                            </li>
                        </>
                    )}
                    {isLog && email && (
                        <li className={style['li-element']}>
                            <span className={style['user-email']} title={email}>
                                {email}
                            </span>
                        </li>
                    )}
                    <li>
                        <ThemeToggle />
                    </li>
                </ul>
            </nav>
        </header>
    );
};
