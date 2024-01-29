import { Link } from 'react-router-dom';
import style from './Home.module.css';

export const Home = () => {
    return (
        <div className={style['home-page']}>
            <h1 className={style['home-title']}>Welcome to My Bookstore</h1>
            <Link className={style['books-link']} to="/catalog">
            Find all documentation about programming language
            </Link>
        </div>
    );
};
