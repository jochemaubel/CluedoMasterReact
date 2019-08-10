import React from "react";
import '../bootstrap.min.css';

function CardIcon(props) {
  if(props.cardType) {
    return <img src={require("../images/" + props.cardType + ".png")} alt="" className="resize mr-2" />
  }
  return null;
}

export default CardIcon