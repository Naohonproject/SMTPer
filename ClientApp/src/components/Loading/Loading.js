import ReactLoading from "react-loading";

const Loading = () => {
  return (
    <div>
      <ReactLoading
        className="absolute z-[100000000000] bottom-1 left-[50%]"
        type="spinningBubbles"
        height="60px"
        width="60px"
      />
    </div>
  );
};

export default Loading;
