import React, {Fragment} from 'react';
import './bootstrap.min.css'
import NavBar from "./components/NavBar";
import SetPlayers from './pages/SetPlayers';
import SelectCards from './pages/SelectCards';
import Cards from './pages/Cards';
import Turns from "./pages/Turns";
import Suggestion from "./pages/Suggestion";

//TODO: Suggestion
//TODO: Intelligence
//TODO: Functions for states
//TODO: Navigation
//TODO: Refactor Data Model
//TODO: Accusation
//TODO: Alerts

class Game extends React.Component {

  constructor(props) {
    super(props);
    this.updateHand = this.updateHand.bind(this);
    this.addTurn = this.addTurn.bind(this);
    this.state = {
      game: "suggestion",
      players: ["Jochem", "Koen", "Daan"],
      cardsInMyHand: [],
      cards: {
        cardsInHand: {"Ballroom": "Jochem"},
        cardsNotInHand: {"Dining Room": ["Koen", "Daan"]},
        solution: ["Conservatory"],
      },
      turns: [
        {
          turnNumber: 1, cards: {location: "Ballroom", suspect: "Green", weapon: "Knife"},
          turnPlayer: "Daan", showPlayer: "Jochem", cardShowed: "Ballroom"
        },
        {
          turnNumber: 2, cards: {suspect: "White", location: "Dining Room", weapon: "Revolver"},
          turnPlayer: "Jochem", showPlayer: "Koen", cardShowed: "White"
        },
      ],
      suggestion: [],
    };
  }

  handleChange(name, value) {
    let players = this.state.players;
    const length = parseInt(name) + 1 - players.length;
    if (length > 0) {
      players = players.concat(Array(length).fill(null))
    }
    players[name] = value;

    this.setState({
      players: players
    });
    console.log(players);
  };

  updateHand(card) {
    let hand = this.state.cardsInMyHand;
    let index = hand.indexOf(card);
    if (index > -1) {
      hand.splice(index, 1)
    } else {
      hand = hand.concat(card);
    }
    console.log(hand);
    this.setState({cardsInMyHand: hand});
  }

  addTurn(turn) {
    let turns = this.state.turns;
    turn.turnNumber = turns.length + 1;
    turns = turns.concat(turn);
    this.setState({
      turns: turns,
      game: "turns",
    });
  }

  render() {
    return (
      <Fragment>
        <NavBar/>
        {this.state.game === "setPlayers" &&
        <SetPlayers onChange={this.handleChange.bind(this)}/>}
        {this.state.game === "selectCards" &&
        <SelectCards hand={this.state.cardsInMyHand} onSelectCard={(card) => this.updateHand(card)}/>}
        {this.state.game === "cards" &&
        <Cards cards={this.state.cards}/>}
        {this.state.game === "turns" &&
        <Turns cards={this.state.cards} turns={this.state.turns}/>}
        {this.state.game === "suggestion"
        && <Suggestion cards={this.state.cards} players={this.state.players} onSubmit={(turn) => this.addTurn(turn)} />}
      </Fragment>
    );
  }

}

export default Game;
