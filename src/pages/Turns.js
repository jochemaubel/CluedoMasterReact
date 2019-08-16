import React, {Fragment} from 'react';
import '../bootstrap.min.css';
import Turn from "../components/Turn";
import NavBarBottom from "../components/NavBarBottom";
import {UncontrolledAlert} from 'reactstrap';
import confirm from 'reactstrap-confirm';

class Turns extends React.Component {
  constructor(props) {
    super(props);
    this.undoTurn = this.undoTurn.bind(this);
  }


  async undoTurn() {
    if (this.props.turns.length === 0) {
      await confirm({
        title: null,
        message: "There are no turns to undo",
        cancelText: null,
      });
      return
    }
    let confirmation = await confirm({
      title: "Are you sure?",
      message: "If you undo the last turn, all the data of this turn will be lost.",
      confirmText: "Undo last turn",
    });
    if (confirmation) {
      this.props.undoTurn()
    }
  }

  render() {
    const turns = this.props.turns;
    let turnsContent;
    if (turns.length === 0) {
      turnsContent =
        <UncontrolledAlert color="warning">There are no turns yet. Start the first turn.</UncontrolledAlert>
    } else {
      turnsContent = turns.map((turn, index) => <Turn key={index} turnData={turn} cards={this.props.cards}/>)
    }

    let foundCardAlerts = [];
    for (const card in this.props.foundCards)
      if (this.props.foundCards[card] === "solution") {
        foundCardAlerts.push(
          <UncontrolledAlert key={card} color="success">
            CluedoMaster found out that {card} is in the solution.
          </UncontrolledAlert>)
      } else {
        foundCardAlerts.push(
          <UncontrolledAlert key={card} color="success">
            CluedoMaster found out that {this.props.foundCards[card]} has [card].
          </UncontrolledAlert>
        )
      }

    return (
      <Fragment>
        <div className="container mt-3 pb-5 mb-5">
          {foundCardAlerts}
          {turnsContent}
          <div className="row d-flex justify-content-between mx-2 mb-3">
            <button className="btn btn-secondary btn-fixed-width d-none d-md-block" onClick={this.undoTurn}>Undo turn
            </button>
            <button className="btn btn-primary btn-fixed-width d-none d-md-block" onClick={this.props.newTurn}>New
              turn
            </button>
          </div>
        </div>
        <NavBarBottom onClick={this.props.newTurn} onSecondaryClick={this.undoTurn}/>
      </Fragment>
    );
  }
}

export default Turns