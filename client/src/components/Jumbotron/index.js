import React from "react";

function Jumbotron({ children }) {
  return (
    <div
      style={{ height: 300, clear: "both", paddingTop: 120, textAlign: "center" }}
      className="jumbotron"
    >
      <h1>React Google Book Search</h1>
      <h3>Search for and Save Books of Interest</h3>
    </div>
  );
}

export default Jumbotron;
