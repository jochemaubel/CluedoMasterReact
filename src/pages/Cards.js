import React, {Fragment} from 'react';
import '../bootstrap.min.css';
import CardList from "../components/CardList";
import NavBarBottom from "../components/NavBarBottom";

function Cards(props) {

  const LOCATIONS = ['Ballroom', 'Billiard Room', 'Conservatory', 'Dining Room', 'Hall', 'Kitchen', 'Library', 'Lounge',
    'Study'];
  const SUSPECTS = ['Green', 'Mustard', 'Peacock', 'Plum', 'Scarlett', 'White'];
  const WEAPONS = ['Candlestick', 'Knife', 'Lead Pipe', 'Revolver', 'Rope', 'Wrench'];

  //TODO: alert for found cards
  //TODO: define const LOCATIONS etc. just once

  return (
    <Fragment>
      <div className="container mt-3 pb-5 mb-5">
        <div className="row">
          <CardList title="Locations" cardList={LOCATIONS} cards={props.cards}/>
          <CardList title="Suspects" cardList={SUSPECTS} cards={props.cards}/>
          <CardList title="Weapons" cardList={WEAPONS} cards={props.cards}/>
        </div>
      </div>
      <NavBarBottom/>
    </Fragment>
  )
}

export default Cards