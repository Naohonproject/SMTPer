import { useContext, useState } from "react";
import { BsCheck2 } from "react-icons/bs";

import style from "./style.module.css";
import { NavBarContext } from "../../../context/NavBarContext";
import { ThemeContext } from "../../../context/ThemeContext";

const NavDropDown = ({ id, dropDownItemList }) => {
  const {
    isDropdownHide,
    setIsDropdownHide,
    showItemId,
    setModalOpen,
    setIsMainFormShow,
    setShowItemId,
  } = useContext(NavBarContext);
  const { setTheme, theme } = useContext(ThemeContext);

  const { icons, contents } = dropDownItemList;
  const themeContent = contents.map((content) => content.toLowerCase());

  const handleOnClick = (e) => {
    const content = e.target.getAttribute("data-name");
    setIsDropdownHide(true);
    setShowItemId(0);
    if (content == "Dark Mode") {
      setTheme("dark");
    } else if (content === "Light Mode") {
      setTheme("light");
    } else if (content === "Auto") {
      setTheme("auto");
    } else if (content === "Disclaimer") {
      setModalOpen("disclaimer");
      setIsMainFormShow(false);
    } else {
      setModalOpen("about");
      setIsMainFormShow(false);
    }
  };

  return (
    <div
      className={
        isDropdownHide && showItemId !== id
          ? style.dropdown
          : showItemId === id
          ? style.dropdownFlex + " " + style.dropdown + " " + "shadow-2xl bg-yellow-50"
          : style.dropdown
      }
    >
      {icons.map((icon, index) => {
        return (
          <div
            data-name={contents[index]}
            onClick={handleOnClick}
            style={{
              display: "flex",
              justifyContent: "start",
              padding: "12px",
              alignItems: "center",
            }}
            key={index}
            className="hover:opacity-50"
          >
            {themeContent[index].includes(theme) ? <BsCheck2 /> : icon}{" "}
            <span data-name={contents[index]} onClick={handleOnClick} style={{ marginLeft: "6px" }}>
              {contents[index] === "Postman" ? (
                <a href="https://www.postman.com/" target="_blank">
                  {contents[index]}
                </a>
              ) : (
                contents[index]
              )}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default NavDropDown;
