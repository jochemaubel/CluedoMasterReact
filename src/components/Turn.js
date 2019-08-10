import React from 'react';
import '../bootstrap.min.css';
import CardItem from "./CardItem";

function Turn(props) {

  const turn = props.turnData;
  let cardShowed;
  if ("cardShowed" in turn) {
    cardShowed = ((turn.cardShowed === turn.cards.suspect) ? "" : "the ") + turn.cardShowed
  } else {
    cardShowed = "a card"
  }

  let turnCards = [];
  const categories = ["location","suspect","weapon"];
  turnCards = categories.map((category) =>
      <div key={category} className="col-sm">
        <CardItem card={turn.cards[category]} cards={props.cards} image={category}/>
      </div>
    );

  //TODO: check styling card on mobile

  return (
    <div className="card my-3">
      <div className="card-header d-flex flex-row justify-content-end align-items-center">
        <span className="mr-auto h4">{turn.turnNumber}. {turn.turnPlayer}</span>
        <span className="mx-1">
          <img src={require("../images/showed_card.png")} alt="" className="resize mr-2"/>
          {turn.showPlayer} showed {cardShowed}.
          </span>
      </div>
      <div className="card-body row">
        {turnCards}
      </div>
    </div>
  )
}

export default Turn;