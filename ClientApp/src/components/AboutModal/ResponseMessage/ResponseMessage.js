import { useContext } from "react";

import { FormContext } from "../../../context/FormContext";

const ResponseMessage = () => {
  const {
    postState: { message },
  } = useContext(FormContext);
  return (
    <div className="flex justify-center items-center">
      <p className="text-lg">{message}</p>
    </div>
  );
};

export default ResponseMessage;
