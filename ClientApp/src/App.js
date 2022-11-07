import { useContext } from "react";

import "./App.css";
import NavBar from "./components/Nav/NavBar/NavBar";
import Title from "./components/Slogan/Slogan";
import Footer from "./components/Footer/Footer";
import MainForm from "./components/MainForm/MainForm";
import AboutModal from "./components/AboutModal/AboutModal";
import About from "./components/AboutModal/About/About";
import ResponseMessage from "./components/AboutModal/ResponseMessage/ResponseMessage";
import Disclaimer from "./components/AboutModal/Disclaimer/Disclaimer";
import Loading from "./components/Loading/Loading";

import { NavBarContext } from "./context/NavBarContext";
import { FormContext } from "./context/FormContext";

function App() {
  const { ModalOpen } = useContext(NavBarContext);
  const { setIsDropdownHide, setShowItemId } = useContext(NavBarContext);
  const {
    postState: { postLoading, isModalShow },
  } = useContext(FormContext);
  return (
    <div
      onClick={() => {
        setIsDropdownHide((prev) => !prev);
        setShowItemId(0);
      }}
      className="App"
    >
      <NavBar />
      <Title />
      {ModalOpen === "disclaimer" && (
        <AboutModal mainContent={<Disclaimer />} headerContent="Disclaimer" />
      )}
      {ModalOpen === "about" && <AboutModal mainContent={<About />} headerContent="About" />}
      {isModalShow && <AboutModal mainContent={<ResponseMessage />} headerContent="Message" />}
      <MainForm />
      {postLoading && <Loading />}
      <Footer />
    </div>
  );
}

export default App;
