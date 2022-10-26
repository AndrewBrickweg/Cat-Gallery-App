import { useState, useEffect, useRef } from "react";
import { Multiselect } from "multiselect-react-dropdown";
import CatCard from "./CatCard";
import ToTop from "./ToTop";
import axios from "axios";
import "./app.css";

function App() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [scrollPosition, setSrollPosition] = useState(0);
  const [showToTop, setshowToTop] = useState("toTopHidden");
  const [breeds, setBreeds] = useState([]);
  const [selectedBreed, setSelectedBreed] = useState("");

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios(
          `https://api.thecatapi.com/v1/images/search?limit=${21}&breed_ids=beng&api_key=live_xuxUWz06FBdtUkfSsCXyIueFAIuxN4Nsv6huKVPlpZ3fDCyvCermW950ldUfhjMg`
        );
        setData(res.data);
      } catch (e) {
        setError(true);
      }
    };
    fetchPost();
  }, []);

  useEffect(() => {
    const fetchBreeds = async () => {
      try {
        const res = await axios("https://api.thecatapi.com/v1/breeds");
        setBreeds(res.data);
      } catch (e) {
        setError(true);
      }
    };

    fetchBreeds();
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleVisibleButton);
  });

  const refScrollUp = useRef();

  const handleScrollUp = () => {
    refScrollUp.current.scrollIntoView({ behavior: "smooth" });
  };

  const handleVisibleButton = () => {
    const position = window.pageYOffset;
    setSrollPosition(position);

    if (scrollPosition > 50) {
      return setshowToTop("toTop");
    } else if (scrollPosition < 50) {
      return setshowToTop("toTopHidden");
    }
  };

  const selectBreed = useRef(null);
  const onSelect = () => {
    setSelectedBreed(selectBreed.current.getSelectedItems()[0].id);
    console.log(selectedBreed);
  };

  if (error) {
    return (
      <div>
        <p>broke</p>
      </div>
    );
  }

  return (
    <>
      <div ref={refScrollUp}></div>
      <h1>Cat Gallery</h1>
      <h2> Select Breed</h2>
      <Multiselect
        singleSelect
        options={breeds}
        displayValue="name"
        onSelect={onSelect}
        closeOnSelect={true}
        ref={selectBreed}
      />
      <div className="cardContainer">
        {data.map((cats, i) => (
          <CatCard key={i} img={cats.url} />
        ))}
      </div>
      <ToTop showToTop={showToTop} scrollUp={handleScrollUp} />
    </>
  );
}

export default App;
