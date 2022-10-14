import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ToTop = ({ showToTop, scrollUp }) => {
  return (
    <div className={showToTop} onClick={scrollUp}>
      <button className="toTop">
        <FontAwesomeIcon icon="fa-sharp fa-solid fa-arrow-up" />
      </button>
    </div>
  );
};

export default ToTop;