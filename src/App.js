import axios from "axios";
import { useState, useEffect } from "react";
import CatCard from "./CatCard";
import "./app.css";

function App() {
  const [data, setData] = useState([]);
  const [error, setError] = useState();

  useEffect(() => {
    try {
      const fetchPost = async () => {
        const res = await axios(
          "https://api.thecatapi.com/v1/images/search?limit=21&api_key=live_xuxUWz06FBdtUkfSsCXyIueFAIuxN4Nsv6huKVPlpZ3fDCyvCermW950ldUfhjMg"
        );

        setData(res.data);
      };

      fetchPost();
    } catch (error) {
      console.log(error);
      setError("broke");
    }
  }, []);

  if (error === "broke") {
    <p>broke</p>;
  }

  return (
    <>
      <h1>CHECK OUT MY CATS</h1>
      <button>Show New Cats</button>
      <div className="cardContainer">
        {data.map((cats, i) => (
          <CatCard key={i} id={cats.id} img={cats.url} />
        ))}
      </div>
    </>
  );
}

export default App;
