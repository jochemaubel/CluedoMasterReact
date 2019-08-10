import React, {Fragment} from 'react';
import '../bootstrap.min.css';
import Turn from "../components/Turn";
import NavBarBottom from "../components/NavBarBottom";
import {UncontrolledAlert} from 'reactstrap'

function Turns(props) {

  const turns = props.turns;
  if (turns.length === 0) {
    return (
      <Fragment>
        <div className="container mt-3 pb-5 mb-5">
          <UncontrolledAlert color="warning">There are no turns yet.</UncontrolledAlert>
        </div>
        <NavBarBottom/>
      </Fragment>
    )
  }

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