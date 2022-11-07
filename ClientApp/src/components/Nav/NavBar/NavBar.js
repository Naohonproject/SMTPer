import { FiFeather } from "react-icons/fi";
import { AiOutlineLayout } from "react-icons/ai";
import { IoInformationCircleOutline } from "react-icons/io5";
import { FiZap } from "react-icons/fi";
import { AiOutlineRight } from "react-icons/ai";
import { RiErrorWarningLine } from "react-icons/ri";

import style from "./style.module.css";
import NavbarBrand from "../NavbarBrand/NavbarBrand";
import NavItem from "../NavItem/NavItem";
import NavDropDown from "../NavDropDown/NavDropDown";

const NavBar = () => {
  const dropDownContainer = [
    { icons: [<FiZap />], contents: ["Postman"] },
    {
      icons: [<AiOutlineRight />, <AiOutlineRight />, <AiOutlineRight />],
      contents: ["Auto", "Dark Mode", "Light Mode"],
    },
    {
      icons: [<RiErrorWarningLine />, <RiErrorWarningLine />],
      contents: ["Disclaimer", "About SMTPer"],
    },
  ];
  return (
    <div onClick={(e) => e.stopPropagation()} className={style.nanoMenu}>
      <NavbarBrand p={"16px"} haveBackGround />
      <NavItem
        res="hidden myMdScreen:block"
        id={1}
        dropDown={<NavDropDown dropDownItemList={dropDownContainer[0]} id={1} />}
        content="More App"
        first={<FiFeather />}
      />
      <NavItem
        res="hidden myMdScreen:block"
        id={2}
        dropDown={<NavDropDown dropDownItemList={dropDownContainer[1]} id={2} />}
        content="Themes"
        first={<AiOutlineLayout />}
      />
      <NavItem
        id={3}
        dropDown={<NavDropDown dropDownItemList={dropDownContainer[2]} id={3} />}
        content="About"
        first={<IoInformationCircleOutline />}
      />
    </div>
  );
};

export default NavBar;
