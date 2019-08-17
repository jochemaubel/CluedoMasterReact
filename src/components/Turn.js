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

  return (
    <div className="card my-3">
      <div className="card-header d-sm-flex flex-row justify-content-end align-items-center">
        <div className="mr-auto h4">{turn.turnNumber}. {turn.turnPlayer}</div>
        <div>
          <img src={require("../images/showed_card.png")} alt="" className="resize mr-2"/>
          {turn.showPlayer} showed {cardShowed}.
          </div>
      </div>
      <div className="card-body row">
        {turnCards}
      </div>
    </div>
  )
}

export default Turn;