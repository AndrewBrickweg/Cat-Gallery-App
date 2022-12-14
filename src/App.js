import { useState, useEffect, useRef } from "react";
import { Multiselect } from "multiselect-react-dropdown";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import CatCard from "./CatCard";
import ToTop from "./ToTop";
import axios from "axios";
import "./app.css";
import Loading from "./Loading";

// fix css dropdown, look at docs!!!!! check
// use only the breeds call to populate the images
// MUI Sliders to filter the cats by
// at first page load render just no pictures just the slider and text "filter breeds"
// using slider to filter breeds by a property
// query paramater on catAPI for filtering properies values

function App() {
  const [error, setError] = useState(false);
  const [data, setData] = useState([]);
  const [scrollPosition, setSrollPosition] = useState(0);
  const [showToTop, setshowToTop] = useState("toTopHidden");
  const [breeds, setBreeds] = useState([]);
  const [selectedBreed, setSelectedBreed] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [filterValue, setFilterValue] = useState(0);

  // useEffect(() => {
  //   const fetchPost = async () => {
  //     try {
  //       setIsLoading(true);
  //       const res = await axios(
  //         `https://api.thecatapi.com/v1/images/search?limit=${50}&breed_ids=${selectedBreed}&api_key=${
  //           process.env.CATKEY
  //         }`
  //       );
  //       setData(res.data);
  //       setIsLoading(false);
  //     } catch (e) {
  //       setError(true);
  //     }
  //   };
  //   fetchPost();
  // }, [selectedBreed]);

  useEffect(() => {
    const fetchBreeds = async () => {
      try {
        setIsLoading(true);
        const res = await axios("https://api.thecatapi.com/v1/breeds");
        setBreeds(res.data);

        setIsLoading(false);
      } catch (e) {
        setError(true);
      }
    };
    fetchBreeds();
  }, [selectedBreed]);

  // const breedImage = breeds.map((e) => e.image);
  // const breedImageUrl = breedImage.map((e) => (e ? e.url : e));
  // console.log(breeds.map((e) => e.energy_level));
  // console.log(filterValue);
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

  if (error) {
    return (
      <div>
        <p>broke</p>
      </div>
    );
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <div ref={refScrollUp}></div>
      <h1 className="header">Cat Gallery</h1>
      <h2 className="secondaryHeader"> Select Breed</h2>
      <Multiselect
        singleSelect
        options={breeds}
        displayValue="name"
        onSelect={(e) => setSelectedBreed(e[0].id)}
        closeOnSelect={true}
        className="dropdown"
      />
      <div>
        <h2 className="slider-header">Slide to filter cats by energy level</h2>
        <Box
          sx={{
            marginTop: "10px",
            marginLeft: "auto",
            marginRight: "auto",
            width: 400,
            border: "1px dashed grey",
          }}
        >
          <Slider
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
            aria-label="energy level"
            defaultValue={5}
            valueLabelDisplay="auto"
            step={1}
            marks
            min={1}
            max={10}
            onChangeCommitted={(e) => {
              setFilterValue(e.target.innerText);
            }}
          />
        </Box>
      </div>
      <div className="cardContainer">
        {breeds.map((breeds) => (
          <CatCard
            breeds={breeds}
            name={breeds.name}
            origin={breeds.origin}
            description={breeds.description}
            filterValue={filterValue}
          />
        ))}
      </div>
      <ToTop showToTop={showToTop} scrollUp={handleScrollUp} />
    </>
  );
}

export default App;
