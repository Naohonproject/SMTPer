import { FiSend } from "react-icons/fi";
import { AiOutlineMenu } from "react-icons/ai";
import { useContext, useRef, useState, useEffect } from "react";

import { NavBarContext } from "../../../context/NavBarContext";
import { ThemeContext } from "../../../context/ThemeContext";
import { FormContext } from "../../../context/FormContext";

import "./FormBody.css";

const FormBody = () => {
  // contexts usage
  const { isMiniForm, setIsMainFormShow } = useContext(NavBarContext);
  const { theme } = useContext(ThemeContext);
  const {
    postMail,
    postState: { postLoading, isModalShow },
  } = useContext(FormContext);

  // local states

  // useAuthentication state
  const [isUseAuthentication, setIsUseAuthentication] = useState(false);
  // extendMenu state
  const [isExtendMenu, setIsExtendMenu] = useState(false);
  // mail details state
  const [mailDetails, setMailDetails] = useState({
    Host: "",
    Port: 25,
    Email: "",
    Password: "",
    From: "",
    To: "",
  });
  // error state
  const [formErrors, setFormError] = useState({
    Host: null,
    Port: null,
    Email: null,
    Password: null,
    From: null,
    To: null,
  });

  // states to validate the form
  const [isHostValid, setIsHostValid] = useState(false);
  const [isPortValid, setIsPortValid] = useState(true);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isFromValid, setIsFromValid] = useState(false);
  const [isToValid, setIsToValid] = useState(false);

  // Form Valid state is true just all required input valid
  const [isFormValid, setIsFormValid] = useState(false);

  // destructuring,local variables
  const { Host, Port, Email, Password, From, To } = mailDetails;
  const [isSecurity, setIsSecurity] = useState(true);
  let mailerSender;

  // use useRef hook to store the fields and field value ref
  const checkForm = useRef();
  const fieldName = useRef();
  const fieldValue = useRef();

  // set up mailer information base authentication
  if (isUseAuthentication) {
    mailerSender = { ...mailDetails, IsSecurity: isSecurity };
  } else {
    mailerSender = { Host, Port, From, To };
  }

  // validate fields after onchange event change the value of each field
  useEffect(() => {
    validateField(fieldName.current, fieldValue.current);
  }, [Host, Port, Email, Password, From, To]);

  // validate the form after validate the input fields
  useEffect(() => {
    validateForm();
    setIsFormValid(checkForm.current);
  }, [isHostValid, isEmailValid, isFromValid, isToValid, isPortValid, isPasswordValid]);

  // validate the from against after the check authentication change
  useEffect(() => {
    validateForm();
    setIsFormValid(checkForm.current);
  }, [isUseAuthentication]);

  // validate function definition
  const validateForm = () => {
    if (isUseAuthentication) {
      checkForm.current =
        isHostValid && isPortValid && isEmailValid && isPasswordValid && isFromValid && isToValid;
    } else {
      checkForm.current = isHostValid && isPortValid && isFromValid && isToValid;
    }
  };

  // validate fields
  const validateField = (fieldName, value) => {
    switch (fieldName) {
      case "Host":
        const checkHost = value.length > 0 && value.includes("smtp");
        const hostErrorMessage = checkHost ? "" : "Invalid Host Format";
        setIsHostValid(checkHost);
        setFormError({ ...formErrors, Host: hostErrorMessage });
        break;
      case "Email":
        if (isUseAuthentication) {
          const checkEmail = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
          const mailErrorMessage = checkEmail ? "" : "inValid";
          setIsEmailValid(Boolean(checkEmail));
          setFormError((prev) => ({ ...prev, Email: mailErrorMessage }));
          break;
        } else {
          setFormError((prev) => ({ ...prev, Email: "" }));
          break;
        }
      case "Port":
        const checkPort = Number.isInteger(Number(value));
        const portErrorMessage = checkPort ? "" : "inValid";
        setIsPortValid(checkPort);
        setFormError((prev) => ({ ...prev, Port: portErrorMessage }));
        break;
      case "Password":
        if (isUseAuthentication) {
          const checkPassword = value.length > 8;
          const passwordErrorMessage = checkPassword ? "" : "inValid";
          setIsPasswordValid(checkPassword);
          setFormError((prev) => ({ ...prev, Password: passwordErrorMessage }));
          break;
        } else {
          setFormError((prev) => ({ ...prev, Password: "" }));
          break;
        }
      case "From":
        const checkEmailFrom = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        const mailFromErrorMessage = checkEmailFrom ? "" : "inValid";
        setIsFromValid(Boolean(checkEmailFrom));
        setFormError((prev) => ({ ...prev, From: mailFromErrorMessage }));
        break;
      case "To":
        const checkEmailTo = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        const mailToErrorMessage = checkEmailTo ? "" : "inValid";
        setIsToValid(Boolean(checkEmailTo));
        setFormError((prev) => ({ ...prev, To: mailToErrorMessage }));
        break;
      default:
        break;
    }
  };

  // handle onClick event of use Authentication checkbox
  const handleOnclick = () => {
    setIsExtendMenu((prev) => !prev);
  };

  // handle onChange input fields
  const handleOnChangeInput = (event) => {
    setMailDetails({ ...mailDetails, [event.target.name]: event.target.value });
    fieldName.current = event.target.name;
    fieldValue.current = event.target.value;
  };

  // handle onChange Authentication using cases to validate the form
  const handleOnChangeAuthenticationCheckbox = (e) => {
    setIsUseAuthentication((prev) => !prev);
  };

  // handle on Submit the form
  const handleSendMail = async (e) => {
    e.preventDefault();
    await postMail(mailerSender);
    setIsMainFormShow(false);
  };

  return (
    <div
      className={
        "grid grid-cols-12 md:grid-cols-4 h-max relative" +
        " " +
        (isMiniForm ? " " : "-mt-[4px] toBottom")
      }
    >
      <div
        className={
          "md:col-span-1 col-span-1 bg-gray-300" + " " + (theme === "dark" ? "!bg-zinc-600" : " ")
        }
      >
        <div
          className={
            "fixed z-[1000000] w-[220px] h-[570px] bg-trans md:hidden" +
            " " +
            (isExtendMenu ? "block" : "hidden")
          }
        >
          {" "}
          <div className="h-[40px] flex items-center">
            <AiOutlineMenu onClick={handleOnclick} className="ml-auto mr-3 cursor-pointer" />
          </div>
          <div className="bg-slate-800  h-[42px] flex items-center content-between px-3 text-white ">
            <p>Test & Check</p>
            <FiSend className="ml-auto mr-1" />
          </div>
        </div>
        <div
          className={
            "flex md:flex-row flex-col items-center justify-between md:justify-start h-20 md:h-10 pb-3 p-1 md:p-3  md:bg-gray-700 text-white" +
            " " +
            (theme === "dark" ? "!bg-zinc-800" : " ")
          }
        >
          <AiOutlineMenu
            onClick={handleOnclick}
            className={
              "md:hidden text-center h-10 text-white cursor-pointer hover:opacity-80" +
              " " +
              (isExtendMenu ? "hidden" : "block")
            }
          />
          <span className="hidden md:block">Test & Check</span>
          <FiSend
            className={
              "text-center md:ml-auto text-white  sm:text-white hover:opacity-80 cursor-pointer" +
              " " +
              (isExtendMenu ? "hidden" : "block")
            }
          />
        </div>
      </div>
      <div
        className={
          "bg-yellow-50 p-3 col-span-11 md:col-span-3  grid grid-cols-1 lg:grid-cols-2 gap-1 border-t-2 border-l-2 border-l-gray-300 border-t-gray-300" +
          " " +
          (theme === "dark" ? "!bg-zinc-600" : " ")
        }
      >
        <div>
          <form onSubmit={handleSendMail}>
            <div className="col-span-1 p-3">
              <label htmlFor="Host" className="text-red-600">
                SMTP host
              </label>
              <input
                onChange={handleOnChangeInput}
                value={Host}
                name="Host"
                placeholder="required"
                type="text"
                id="Host"
                className={
                  "border-b-2 w-full border-gray-400 bg-yellow-50" +
                  " " +
                  (theme === "dark" ? "bg-zinc-600 text-white" : "text-gray-500")
                }
                required
              />

              <p
                className={
                  "text-red-500" +
                  " " +
                  (Host.length === 0 || formErrors.Host === "" ? "hidden" : " ")
                }
              >
                {formErrors.Host}
              </p>
            </div>
            <div className="col-span-1 p-3">
              <label htmlFor="Port" className={theme === "dark" ? "text-white" : "text-gray-600"}>
                Port
              </label>
              <input
                onChange={handleOnChangeInput}
                value={Port}
                name="Port"
                placeholder="required"
                type="text"
                id="Port"
                className={
                  "border-b-2 w-full border-gray-400 bg-yellow-50" +
                  " " +
                  (theme === "dark" ? "bg-zinc-600 text-white" : "text-gray-500")
                }
                required
              />
              <p
                className={
                  "text-red-500" +
                  " " +
                  (Port.length === 0 || formErrors.Port === "" ? "hidden" : " ")
                }
              >
                {formErrors.Port}
              </p>
            </div>
            <div className="col-span-1 px-3 py-5 flex items-center content-around">
              <input
                checked={isSecurity}
                onChange={() => setIsSecurity((prev) => !prev)}
                name="IsSecurity"
                type="checkbox"
              />
              <span className="text-xs ml-3">Use Secured Access Connection</span>
            </div>
            <div className="col-span-1 px-3 py-5 flex items-center content-around">
              <input
                onChange={handleOnChangeAuthenticationCheckbox}
                checked={isUseAuthentication}
                type="checkbox"
              />
              <span className="text-xs ml-3">Use Authentication</span>
            </div>
            <div className="col-span-1 px-3 ml-5">
              <label
                htmlFor="EmailLogin"
                className={theme === "dark" ? "text-white" : "text-gray-600"}
              >
                Login
              </label>
              <input
                onChange={handleOnChangeInput}
                name="Email"
                value={Email}
                placeholder={isUseAuthentication ? "required" : "not required"}
                required={isUseAuthentication}
                type="email"
                id="EmailLogin"
                className={
                  "border-b-2 w-full border-gray-400 bg-yellow-50" +
                  " " +
                  (theme === "dark" ? "bg-zinc-600 text-white" : "text-gray-500")
                }
              />
              <p
                className={
                  "text-red-500" +
                  " " +
                  (Email.length === 0 || formErrors.Email === "" ? "hidden" : " ")
                }
              >
                {formErrors.Email}
              </p>
            </div>
            <div className="col-span-1 px-3 ml-5 lg:mt-8 myScreen:mt-0">
              <label
                htmlFor="Password"
                className={theme === "dark" ? "text-white" : "text-gray-600"}
              >
                Password
              </label>
              <input
                onChange={handleOnChangeInput}
                name="Password"
                value={Password}
                placeholder={isUseAuthentication ? "required" : "not required"}
                required={isUseAuthentication}
                type="password"
                id="Password"
                className={
                  "border-b-2 w-full border-gray-400 bg-yellow-50" +
                  " " +
                  (theme === "dark" ? "bg-zinc-600" : "")
                }
              />

              <p
                className={
                  "text-red-500" +
                  " " +
                  (Password.length === 0 || formErrors.Password === "" ? "hidden" : " ")
                }
              >
                {formErrors.Password}
              </p>
            </div>
            <div className="col-span-1 p-3">
              <label htmlFor="EmailFrom" className="text-gray-600">
                <span className="text-yellow-400 text-[14px]">Email from</span>
              </label>
              <input
                onChange={handleOnChangeInput}
                name="From"
                value={From}
                placeholder="required"
                type="email"
                id="EmailFrom"
                className={
                  "border-b-2 w-full border-gray-400 bg-yellow-50" +
                  " " +
                  (theme === "dark" ? "bg-zinc-600 text-white" : "text-gray-500")
                }
              />
              <p
                className={
                  "text-red-500" +
                  " " +
                  (From.length === 0 || formErrors.From === "" ? "hidden" : " ")
                }
              >
                {formErrors.From}
              </p>
            </div>
            <div className="col-span-1 p-3">
              <label htmlFor="EmailTo" className="text-gray-600">
                <span className="text-yellow-400 text-[14px]">Email to</span>
              </label>
              <input
                onChange={handleOnChangeInput}
                name="To"
                value={To}
                placeholder="required"
                type="email"
                id="EmailTo"
                className={
                  "border-b-2 w-full border-gray-400 bg-yellow-50" +
                  " " +
                  (theme === "dark" ? "bg-zinc-600 text-white" : "text-gray-500")
                }
              />
              <p
                className={
                  "text-red-500" + " " + (To.length === 0 || formErrors.To === "" ? "hidden" : " ")
                }
              >
                {formErrors.To}
              </p>
            </div>
            <button
              // disable submit button when form validate fail or forms is transferring
              disabled={!isFormValid || postLoading}
              type="submit"
              className={
                "absolute bg-red-500 px-3 py-1 lg:right-[450px] lg:bottom-[45px] myScreen:bottom-5 myScreen:right-5 rounded-md bottom-5 right-5 flex items-center w-20 content-between text-white hover:cursor-pointer" +
                " " +
                // button is disabled effect when form validate successfully and out of transferring time
                (isFormValid && !postLoading ? " " : "opacity-50")
              }
            >
              <FiSend className="mr-auto" />
              Send
            </button>
          </form>
        </div>
        <div className="hidden lg:block">
          <p
            className={"p-3 text-sm text-gray-400 mt-3 lg:mt-6" + " " + (isMiniForm ? " " : "mt-9")}
          >
            host or ip address of your smtp server (example:
            <span className="text-green-500">smtp.company.com</span>)
          </p>
          <p className={"p-3 text-sm text-gray-400 mt-3" + " " + (isMiniForm ? " " : "mt-8")}>
            the default port is <span className="text-green-500">25</span>, but some smtp servers
            use a custom port (example: <span className="text-green-500">587</span>)
          </p>
          <p
            className={
              "p-3 text-sm text-gray-400 -mt-2 lg:-mt-4 myScreen:-mt-2" +
              " " +
              (isMiniForm ? " " : "-mt-4")
            }
          >
            checked it only if the smtp server needs a secured connection (
            <span className="text-green-500">ssl, tsl</span>)
          </p>
          <p
            className={
              "p-3 text-sm text-gray-400 -mt-2 lg:-mt-3 myScreen:-mt-2" +
              " " +
              (isMiniForm ? " " : "-mt-1")
            }
          >
            Most of smtp servers need an authentication (
            <span className="text-green-500"> login/password</span>
            ). Check it if required
          </p>
          <p
            className={"p-3 text-gray-400 mt-3 myScreen:-mt-1" + " " + (isMiniForm ? " " : "mt-3")}
          >
            Required if 'Use authentication' is checked (ex:{" "}
            <span className="text-green-500">account</span> or{" "}
            <span className="text-green-500">account@foo.com</span>)
          </p>
          <p className={"p-3 text-gray-400 -mt-4" + " " + (isMiniForm ? " " : "mt-5")}>
            Required if 'Use authentication' is checked
          </p>{" "}
          <p
            className={
              "p-3 text-gray-400 mt-2 lg:mt-0 myScreen:mt-2" + " " + (isMiniForm ? " " : "mt-5")
            }
          >
            The sender's email address (example:{" "}
            <span className="text-green-500">account@foo.com</span>)
          </p>
          <p
            className={
              "p-3 text-gray-400 mt-3 lg:mt-1 myScreen:mt-3" + " " + (isMiniForm ? " " : "mt-4")
            }
          >
            very important : the test mail will be sent to this address (ex:{" "}
            <span className="text-green-500">account@foo.com</span>)
          </p>
        </div>
        <div className="text-gray-600 mx-3 my-1">
          <p>Test Your Mail Server</p>
        </div>
      </div>
    </div>
  );
};

export default FormBody;
