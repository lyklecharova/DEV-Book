import { Link } from 'react-router-dom';
import style from './Home.module.css';

export const Home = () => {
    return (
        <div className={style['home-page']}>
            <h1 className={style['home-title']}>Welcome to DEV-Book</h1>
            <Link className={style['books-link']} to="/catalog">
                Explore programming books and resources for developers
            </Link>
        </div>
    );
};
