import { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import styles from "./ThemeButton.module.css";

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const isLight = theme === "Light";

  return (
    <button
      type="button"
      className={styles.toggle}
      aria-label={isLight ? "Switch to dark theme" : "Switch to light theme"}
      onClick={toggleTheme}
    >
      <FontAwesomeIcon icon={isLight ? faMoon : faSun} aria-hidden="true" />
    </button>
  );
};
