import arrow from "../src/up-arrow.png";

const ToTop = ({ showToTop, scrollUp }) => {
  return (
    <div className={showToTop} onClick={scrollUp}>
      <button className="toTop">
        <img src={arrow} />
      </button>
    </div>
  );
};

export default ToTop;
