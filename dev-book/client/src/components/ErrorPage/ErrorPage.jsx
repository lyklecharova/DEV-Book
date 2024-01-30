import style from './ErrorPage.module.css';
export const ErrorPage = () => {
    return (
        <div className={style['error']}>
            <img className={style['error-image']} src="/img/404-2.png" alt="error-page" />
        </div>
    );
};