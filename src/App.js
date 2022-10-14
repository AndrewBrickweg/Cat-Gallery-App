import axios from "axios";
import { useState, useEffect, useRef } from "react";
import CatCard from "./CatCard";
import ToTop from "./ToTop";
import "./app.css";
function App() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [scrollPosition, setSrollPosition] = useState(0);
  const [showToTop, setshowToTop] = useState("toTopHidden");
  useEffect(() => {
    window.addEventListener("scroll", handleVisibleButton);
  });
  const refScrollUp = useRef();
  const handleScrollUp = () => {
    refScrollUp.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios(
          "https://api.thecatapi.com/v1/images/search?limit=21&api_key=live_xuxUWz06FBdtUkfSsCXyIueFAIuxN4Nsv6huKVPlpZ3fDCyvCermW950ldUfhjMg"
        );
        setData(res.data);
      } catch (e) {
        setError(true);
      }
    };
    fetchPost();
  }, []);

  if (error) {
    return (
      <div>
        <p>broke</p>
      </div>
    );
  }

  const handleVisibleButton = () => {
    const position = window.pageYOffset;
    setSrollPosition(position);

    if (scrollPosition > 50) {
      return setshowToTop("toTop");
    } else if (scrollPosition < 50) {
      return setshowToTop("toTopHidden");
    }
  };

  return (
    <>
      <div ref={refScrollUp}></div>
      <h1>CHECK OUT MY CATS</h1>
      <button>Show New Cats</button>
      <div className="cardContainer">
        {data.map((cats, i) => (
          <CatCard key={i} id={cats.id} img={cats.url} />
        ))}
      </div>
      <ToTop showToTop={showToTop} scrollUp={handleScrollUp} />
    </>
  );
}

export default App;
