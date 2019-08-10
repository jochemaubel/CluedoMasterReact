import React, {Fragment} from 'react';
import '../bootstrap.min.css';
import CardList from "../components/CardList";
import PlayerItem from "../components/PlayerItem";
import NextButton from "../components/NextButton";
import CardItem from "../components/CardItem";
import {UncontrolledAlert} from 'reactstrap'

function setShowPlayers(turnPlayer, players) {
  const index = players.indexOf(turnPlayer);
  const length = players.length;
  let showPlayers = [];
  if (index < length - 1) {
    for (let i = index + 1; i < length; i++) {
      showPlayers = showPlayers.concat(players[i])
    }
  }
  if (index > 0) {
    for (let i = 0; i < index; i++) {
      showPlayers = showPlayers.concat(players[i])
    }
  }
  showPlayers = showPlayers.concat("Nobody");
  console.log(showPlayers);
  return showPlayers;
}

class Suggestion extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      suggest: true,
      suggestAlert: false,
      showAlertPlayer: false,
      showAlertCard: false,
      turn: {cards: {},},
    };
    this.doSuggestion = this.doSuggestion.bind(this);
    this.submitTurn = this.submitTurn.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  doSuggestion() {
    const turn = this.state.turn;
    if (turn.turnPlayer && turn.cards.location && turn.cards.suspect && turn.cards.weapon) {
      this.setState({
        suggest: false,
        suggestAlert: false,
      })
    } else {
      this.setState({suggestAlert: true});
    }
    window.scrollTo(0, 0);
  }

  submitTurn() {
    const turn = this.state.turn;
    const myName = this.props.players[0];
    if (turn.showPlayer) {
      this.setState({showAlertPlayer: false});
      if (turn.cardShowed || (turn.turnPlayer !== myName && turn.showPlayer !== myName) || turn.showPlayer === "Nobody") {
        this.setState({showAlertCard: false});
        this.props.onSubmit(this.state.turn);
      } else {
        this.setState({showAlertCard: true})
      }
    } else {
      this.setState({showAlertPlayer: true});
    }
  }

  onClick(value, key) {
    console.log(value);
    console.log(key);
    let turn = this.state.turn;
    if (["location", "suspect", "weapon"].includes(key)) {
      turn.cards[key] = value;
    } else {
      turn[key] = value;
    }
    if (key === "showPlayer" && value === "Nobody") {
      if ("cardShowed" in turn) {
        delete turn.cardShowed
      }
    }
    this.setState({turn: turn});
  }

  render() {
    const LOCATIONS = ['Ballroom', 'Billiard Room', 'Conservatory', 'Dining Room', 'Hall', 'Kitchen', 'Library', 'Lounge',
      'Study'];
    const SUSPECTS = ['Green', 'Mustard', 'Peacock', 'Plum', 'Scarlett', 'White'];
    const WEAPONS = ['Candlestick', 'Knife', 'Lead Pipe', 'Revolver', 'Rope', 'Wrench'];

    const players = this.props.players;
    console.log(players.length);
    const myName = players[0];
    const turnPlayerList = players.map((player, index) => {
      return player === this.state.turn.turnPlayer ?
        <PlayerItem key={index} player={player} onClick={() => this.onClick(player, "turnPlayer")} selected/> :
        <PlayerItem key={index} player={player} onClick={() => this.onClick(player, "turnPlayer")}/>
    });

    let showPlayerList;
    let showPlayers;
    if (this.state.turn.turnPlayer) {
      const turnPlayer = this.state.turn.turnPlayer;
      showPlayers = setShowPlayers(turnPlayer, players);
      showPlayerList = showPlayers.map((player, index) => {
        return player === this.state.turn.showPlayer ?
          <PlayerItem key={index} player={player} onClick={() => this.onClick(player, "showPlayer")} selected/> :
          <PlayerItem key={index} player={player} onClick={() => this.onClick(player, "showPlayer")}/>
      });
    }

    const suggest = (
      <Fragment>
        {this.state.suggestAlert &&
        <UncontrolledAlert color="warning">First select a player and three cards.</UncontrolledAlert>}
        <div id="suggestion" className=" row">
          <div className=" col-sm mb-3">
            <h3>Players</h3>
            {turnPlayerList}
          </div>
          <CardList title="Locations" cardList={LOCATIONS} cards={this.props.cards}
                    selected={this.state.turn.cards.location}
                    onClick={(card) => this.onClick(card, "location")}/>
          <CardList title="Suspects" cardList={SUSPECTS} cards={this.props.cards}
                    selected={this.state.turn.cards.suspect}
                    onClick={(card) => this.onClick(card, "suspect")}/>
          <CardList title="Weapons" cardList={WEAPONS} cards={this.props.cards}
                    selected={this.state.turn.cards.weapon}
                    onClick={(card) => this.onClick(card, "weapon")}/>
        </div>
        <NextButton onClick={this.doSuggestion}>Do suggestion</NextButton>
      </Fragment>
    );

    let turnCards = [];
    const categories = ["location","suspect","weapon"];
    const cards = this.state.turn.cards;

    turnCards = categories.map((category) =>
        this.state.turn.cardShowed && this.state.turn.cardShowed === cards[category] ?
          <CardItem key={category} card={cards[category]} cards={this.props.cards} image={category}
                    selected
                    onClick={() => this.onClick(cards[category], "cardShowed")}/> :
          <CardItem key={category} card={cards[category]} cards={this.props.cards} image={category}
                    onClick={() => this.onClick(cards[category], "cardShowed")}/>
      );

    let showCardsBool = false;
    if (this.state.turn.showPlayer && this.state.turn.showPlayer === myName) {
      showCardsBool = true
    }
    if (this.state.turn.turnPlayer && this.state.turn.turnPlayer === myName
      && this.state.turn.showPlayer && this.state.turn.showPlayer !== "Nobody") {
      showCardsBool = true
    }

    const showCards = (
      <div className=" col-sm mb-3">
        <h3>Card shown</h3>
        {turnCards}
      </div>
    );

    const show = (
      <Fragment>
        {this.state.showAlertPlayer &&
        <UncontrolledAlert color="warning">First select a player.</UncontrolledAlert>}
        {this.state.showAlertCard &&
        <UncontrolledAlert color="warning">First select a card.</UncontrolledAlert>}
        <div id="show" className=" row">
          <div className=" col-sm mb-3">
            <h3>Player who showed</h3>
            {showPlayerList}
          </div>
          {showCardsBool && showCards}
        </div>
        <NextButton onClick={this.submitTurn}>Submit turn</NextButton>
      </Fragment>
    );

    return (
      <Fragment>
        <div className="container mt-3">
          {this.state.suggest ? suggest : show}
        </div>
      </Fragment>
    )
  }
}

export default Suggestion