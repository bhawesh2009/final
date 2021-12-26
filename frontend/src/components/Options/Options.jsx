import React from "react";

import "./Options.css";

const Options = (props) => {
  const options = [
    {
      text: "Rajsthani Tiffin",
      handler: props.actionProvider.Accessories,
      id: 1,
    },
    { 
      text: "Gujrati Tiffin", 
      handler: props.actionProvider.Clothing, 
      id: 2 },
    { 
      text: "Other Tiffin", 
      handler: props.actionProvider.Other, 
      id: 3 },
  ];

  const buttonsMarkup = options.map((option) => (
    <button key={option.id} onClick={option.handler} className="option-button">
      {option.text}
    </button>
  ));

  return <div className="options-container">{buttonsMarkup}</div>;
};

export default Options;