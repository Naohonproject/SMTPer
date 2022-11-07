import style from "./style.module.css";

const Slogan = () => {
  return (
    <div className={style.slogan + " " + "hidden md:block "}>
      “Simplicity is the Ultimate Sophistication”{" "}
      <span className={style.author}>Leonardo Da Vinci</span>
    </div>
  );
};

export default Slogan;
