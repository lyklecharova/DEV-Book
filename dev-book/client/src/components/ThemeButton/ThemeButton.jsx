import { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button
      style={{
        backgroundColor: theme === "Light" ? "black" : "white",
        color: theme === "Light" ? "white" : "black",
        padding: "8px 16px",
        borderRadius: "4px",
        cursor: "pointer",
        fontSize: "25px",
      }}
      onClick={toggleTheme}
    >
      {theme === "Light" ? (
        <FontAwesomeIcon icon={faMoon} style={{ color: "#74C0FC" }} />
      ) : (
        <FontAwesomeIcon icon={faSun} style={{ color: "#FFD43B" }} />
      )}
    </button>
  );
};
