import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

//  Homework:
// make a new CRA, toss the boilerplate, rebuild similar app using a new API that has images.
// include try/catch for if the API Server is down. useState error, SetError
// add media queries 3-2-1 grid
// use css to style App
// create scroll back to top button on page

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
