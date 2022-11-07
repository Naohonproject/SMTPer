import { RiCloseLine } from "react-icons/ri";
import { FiAlertOctagon } from "react-icons/fi";
import { useContext } from "react";

import styles from "./Modal.module.css";
import { NavBarContext } from "../../context/NavBarContext";
import { FormContext } from "../../context/FormContext";
import { MESSAGE_SHOW_OFF } from "../../reducer/constant";

const Modal = ({ headerContent, mainContent }) => {
  const { setModalOpen } = useContext(NavBarContext);
  const { dispatch } = useContext(FormContext);
  const handleOnclick = () => {
    if (headerContent === "Message") {
      dispatch({ type: MESSAGE_SHOW_OFF });
    }
    setModalOpen(null);
  };
  return (
    <>
      <div className={styles.darkBG} onClick={handleOnclick} />
      <div className={styles.centered}>
        <div
          className={
            styles.modal +
            " " +
            "w-300px md:w-[650px] lg:w-[800px] min-w-min h-[600px] md:h-[400px] mt-[300px] md:mt-0"
          }
        >
          <div className={styles.modalHeader}>
            <div className={styles.heading + " " + "flex items-center content-center"}>
              <div className="flex grow items-center relative">
                <FiAlertOctagon className="absolute right-0 text-2xl" />
              </div>
              <div className="flex grow items-center content-start">
                <span className="ml-2 text-2xl">{headerContent}</span>
              </div>
            </div>
          </div>
          <button className={styles.closeBtn} onClick={handleOnclick}>
            <RiCloseLine style={{ marginBottom: "-3px" }} />
          </button>
          <div className={styles.modalContent + " " + "text-[16px] md:text-lg"}>{mainContent}</div>
          <div className={styles.modalActions + " " + "border-t-2 border-t-slate-500"}>
            <div className={styles.actionsContainer}>
              <p className="ml-5 text-black">
                For more information, contact us at team (at) nanogenesis.xyz
              </p>
              <button className={styles.cancelBtn} onClick={handleOnclick}>
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
