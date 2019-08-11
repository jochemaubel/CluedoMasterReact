import React, {Fragment} from 'react';
import '../bootstrap.min.css';
import Turn from "../components/Turn";
import NavBarBottom from "../components/NavBarBottom";
import {UncontrolledAlert} from 'reactstrap'

function Turns(props) {

  const turns = props.turns;
  let turnsContent;
  if (turns.length === 0) {
    turnsContent = <UncontrolledAlert color="warning">There are no turns yet. Start the first turn.</UncontrolledAlert>
  } else {
    turnsContent = turns.map((turn, index) => <Turn key={index} turnData={turn} cards={props.cards}/>)
  }

  let foundCardAlerts = [];
  for (const card in props.foundCards)
    if (props.foundCards[card] === "solution") {
      foundCardAlerts.push(
        <UncontrolledAlert color="success">
          CluedoMaster found out that {card} is in the solution.
        </UncontrolledAlert>)
    } else {
      foundCardAlerts.push(
        <UncontrolledAlert color="success">
          CluedoMaster found out that {props.foundCards[card]} has [card].
        </UncontrolledAlert>
      )
    }


  return (
    <Fragment>
      <div className="container mt-3 pb-5 mb-5">
        {foundCardAlerts}
        {turnsContent}
      </div>
      <NavBarBottom onClick={props.newTurn}/>
    </Fragment>
  );
}

export default Turns