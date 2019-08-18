import React, {Fragment} from "react";
import CardList from "../components/CardList";
import {UncontrolledAlert} from "reactstrap";
import NextButton from "../components/NextButton";
import {Modal, ModalHeader, ModalBody} from "reactstrap";
import PlayerItem from "../components/PlayerItem";
import confirm from "reactstrap-confirm";

class EliminateCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      cardSelected: null,
      playerSelected: null
    };
    this.toggle = this.toggle.bind(this);
    this.onCardClick = this.onCardClick.bind(this);
    this.onPlayerClick = this.onPlayerClick.bind(this);
  }

  onCardClick(card) {
    this.setState({cardSelected: card});
    this.toggle()
  }

  async onPlayerClick(player) {
    this.setState({playerSelected: player});
    const card = this.state.cardSelected;
    const message = "Do you want to eliminate " + card + " for " + player + "?";
    let confirmation = await confirm({
      title: null,
      message: message,
      confirmText: "Eliminate card",
    });
    if (confirmation) {
      this.toggle();
      this.props.onEliminate(card, player)
    }
  }

  toggle() {
    this.setState({
        isOpen: !this.state.isOpen,
      }
    );
  }

  render() {
    const playerList = this.props.players.map((player, index) => {
        return player === this.state.playerSelected ?
          <PlayerItem key={index} player={player} selected onClick={() => this.onPlayerClick(player)}/> :
          <PlayerItem key={index} player={player} onClick={() => this.onPlayerClick(player)}/>
      }
    );

    return (
      <Fragment>
        <div className="container mt-3">
          <UncontrolledAlert color="info">Select the card you want to eliminate.</UncontrolledAlert>
          <div id="eliminate" className=" row">
            <CardList title="Locations" cardList={this.props.cards.location} cards={this.props.cards}
                      selected={this.state.cardSelected}
                      onClick={(card) => this.onCardClick(card)}/>
            <CardList title="Suspects" cardList={this.props.cards.suspect} cards={this.props.cards}
                      selected={this.state.cardSelected}
                      onClick={(card) => this.onCardClick(card)}/>
            <CardList title="Weapons" cardList={this.props.cards.weapon} cards={this.props.cards}
                      selected={this.state.cardSelected}
                      onClick={(card) => this.onCardClick(card)}/>
          </div>
          <NextButton onClick={this.props.toTurns}>
            Back to turns
          </NextButton>
        </div>
        <Modal isOpen={this.state.isOpen} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Who has this card?</ModalHeader>
          <ModalBody>
            {playerList}
            <PlayerItem key="unknown" player="I don't know"
                        selected={this.state.playerSelected === "Unknown"}
                        onClick={() => this.onPlayerClick("Unknown")}/>
          </ModalBody>
        </Modal>
      </Fragment>
    );
  }
}

export default EliminateCard