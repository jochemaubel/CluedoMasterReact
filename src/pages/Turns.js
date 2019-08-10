import React, {Fragment} from 'react';
import '../bootstrap.min.css';
import Turn from "../components/Turn";
import NavBarBottom from "../components/NavBarBottom";

function Turns(props) {

  //TODO: alert for no turns

  const turns = props.turns;
  const turnList = turns.map((turn, index) => <Turn key={index} turnData={turn} cards={props.cards}/>)

  return (
    <Fragment>
      <div className="container mt-3 pb-5 mb-5">
        {turnList}
      </div>
      <NavBarBottom/>
    </Fragment>
  )
}

export default Turns