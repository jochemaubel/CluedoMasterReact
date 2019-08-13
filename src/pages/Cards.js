import React, {Fragment} from 'react';
import '../bootstrap.min.css';
import CardList from "../components/CardList";
import NavBarBottom from "../components/NavBarBottom";

function Cards(props) {

  return (
    <Fragment>
      <div className="container mt-3 pb-5 mb-5">
        <div className="row">
          <CardList title="Locations" cardList={props.cards.location} cards={props.cards}/>
          <CardList title="Suspects" cardList={props.cards.suspect} cards={props.cards}/>
          <CardList title="Weapons" cardList={props.cards.weapon} cards={props.cards}/>
        </div>
      </div>
      <NavBarBottom/>
    </Fragment>
  )
}

export default Cards