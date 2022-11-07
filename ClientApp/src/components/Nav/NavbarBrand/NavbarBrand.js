import { AiOutlineWindows } from "react-icons/ai";
import { useContext, useState } from "react";

import style from "./style.module.css";
import { NavBarContext } from "../../../context/NavBarContext";

const NavBarBrand = ({ p, haveBackGround }) => {
  const { setIsMainFormShow } = useContext(NavBarContext);
  const [backGround, SetBackGround] = useState(true);

  const handleOnClick = () => {
    setIsMainFormShow((prev) => !prev);
    SetBackGround((prev) => !prev);
  };
  return (
    <div
      onClick={handleOnClick}
      style={{ padding: p }}
      className={style.navBarBrand + " " + (backGround && haveBackGround ? style.navBarColor : "")}
    >
      <AiOutlineWindows /> <span style={{ marginLeft: "6px" }}>SMTPer</span>
    </div>
  );
};

export default NavBarBrand;
