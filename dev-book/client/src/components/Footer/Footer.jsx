import style from './Footer.module.css'

export const Footer = () => {

  const currentDate = new Date();

  const currentMonth = currentDate.toLocaleString('en-US', { month: 'long' });

  const currentYear = currentDate.getFullYear();


  return (
    <footer className={style['footer']}>
        <p>
        All rights reserved January 2024 - {currentMonth} {currentYear} &copy;
      </p>
    </footer>
  );
};