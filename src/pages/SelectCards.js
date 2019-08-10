import React from 'react';
import '../bootstrap.min.css';
import {UncontrolledAlert} from 'reactstrap'
import SelectCardList from "../components/SelectCardList";

function SelectCards(props) {

  const LOCATIONS = ['Ballroom', 'Billiard Room', 'Conservatory', 'Dining Room', 'Hall', 'Kitchen', 'Library', 'Lounge',
    'Study'];
  const SUSPECTS = ['Green', 'Mustard', 'Peacock', 'Plum', 'Scarlett', 'White'];
  const WEAPONS = ['Candlestick', 'Knife', 'Lead Pipe', 'Revolver', 'Rope', 'Wrench'];

  //TODO: AddTurn pattern for SelectCards?

  return (
    <div className="container mt-3">
      <UncontrolledAlert color="info">Select the cards you have in your hand.</UncontrolledAlert>
      <div className="row">
        <SelectCardList title="Locations"
                        cardList={LOCATIONS}
                        hand={props.hand}
                        onClick={(card) => props.onSelectCard(card)}/>
        <SelectCardList title="Suspects"
                        cardList={SUSPECTS}
                        hand={props.hand}
                        onClick={(card) => props.onSelectCard(card)}/>
        <SelectCardList title="Weapon"
                        cardList={WEAPONS}
                        hand={props.hand}
                        onClick={(card) => props.onSelectCard(card)}/>
      </div>

      <div className="row d-flex justify-content-between mx-2 mb-3">
        <input type="hidden" id="startGame" name="cards_in_hand" value=""/>
          <button className="btn btn-secondary btn-fixed-width">Back to players</button>
          <button className="btn btn-primary btn-fixed-width">
            Start game
          </button>
      </div>
    </div>
  )
}

export default SelectCards