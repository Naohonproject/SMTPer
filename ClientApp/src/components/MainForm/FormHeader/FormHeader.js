import { IoCloseOutline } from "react-icons/io5";
import { CiMaximize1, CiMinimize1 } from "react-icons/ci";
import { useContext } from "react";
import { NavBarContext } from "../../../context/NavBarContext";
import { ThemeContext } from "../../../context/ThemeContext";

import "./FormHeader.css";

import NavBarBrand from "../../Nav/NavbarBrand/NavbarBrand";

const FormHeader = () => {
  const { theme } = useContext(ThemeContext);
  const { setIsMainFormShow, isMiniForm, setIsMiniForm } = useContext(NavBarContext);

  const handleOnClose = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsMainFormShow((prev) => !prev);
  };

  return (
    <div
      className={
        "bg-custom p-3 h-14 flex items-center" + " " + (theme === "dark" ? "!bg-zinc-600" : " ")
      }
    >
      <div className="flex content-between item-center w-full">
        <NavBarBrand className="p-1" />
        <div className="flex content-center items-center ml-auto">
          <CiMaximize1
            onClick={() => {
              setIsMiniForm((prev) => !prev);
            }}
            className={
              "mr-3 text-xl hover:cursor-pointer hover:text-red-600" +
              " " +
              (isMiniForm ? " " : "hidden")
            }
          />
          <CiMinimize1
            onClick={() => {
              setIsMiniForm((prev) => !prev);
            }}
            className={
              "mr-3 text-xl hover:cursor-pointer hover:text-red-500" +
              " " +
              (isMiniForm ? "hidden" : " ")
            }
          />
          <IoCloseOutline
            onClick={handleOnClose}
            className="text-xl hover:cursor-pointer hover:text-red-600"
          />
        </div>
      </div>
    </div>
  );
};

export default FormHeader;
