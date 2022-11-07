import { useContext } from "react";

import FormHeader from "./FormHeader/FormHeader";
import FormBody from "./FormBody/FormBody";
import { NavBarContext } from "../../context/NavBarContext";

const MainForm = () => {
  const { isMainFormShow, isMiniForm } = useContext(NavBarContext);
  return (
    <div
      className={
        isMainFormShow
          ? isMiniForm
            ? "w-full fixed z-[10001] top-[120px] lg:top-[100px]  myScreen:top-[120px] shadow-sm -mt-[68px] sm:-mt-12 ease-in-out"
            : "w-full fixed z-[10001] top-0 shadow-sm ease-in-out"
          : "hidden"
      }
    >
      <div
        className={
          "w-full bg-gray-50 mx-auto grid overflow-hidden rounded-none" +
          " " +
          (isMiniForm ? "sm:w-11/12 lg:w-4/5 sm:rounded-lg" : "h-screen")
        }
      >
        <FormHeader />
        <FormBody />
      </div>
    </div>
  );
};

export default MainForm;
