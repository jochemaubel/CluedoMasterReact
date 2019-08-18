import React, {Fragment} from 'react';
import './bootstrap.min.css'
import NavBar from "./components/NavBar";
import SetPlayers from './pages/SetPlayers';
import SelectCards from './pages/SelectCards';
import Cards from './pages/Cards';
import Turns from "./pages/Turns";
import Suggestion from "./pages/Suggestion";
import Solution from "./pages/Solution";
import updateCards from "./services/UpdateCardService";
import EliminateCard from "./pages/EliminateCard";

class Game extends React.Component {

  constructor(props) {
    super(props);
    this.startNewGame = this.startNewGame.bind(this);
    this.setPlayers = this.setPlayers.bind(this);
    this.selectCards = this.selectCards.bind(this);
    this.addTurn = this.addTurn.bind(this);
    this.undoTurn = this.undoTurn.bind(this);
    this.eliminateCard = this.eliminateCard.bind(this);
    this.state = {
      game: "setPlayers",
      players: [],
      cards: {
        myName: null,
        inHand: {},
        notInHand: {},
        solution: [],
        // Constants
        categories: ["location", "suspect", "weapon"],
        location: ['Ballroom', 'Billiard Room', 'Conservatory', 'Dining Room', 'Hall', 'Kitchen', 'Library', 'Lounge',
          'Study'],
        suspect: ['Green', 'Mustard', 'Peacock', 'Plum', 'Scarlett', 'White'],
        weapon: ['Candlestick', 'Knife', 'Lead Pipe', 'Revolver', 'Rope', 'Wrench'],
      },
      turns: [],
      foundCards: {},
      cardHistory: [],
    };
  }

  startNewGame() {
    this.setState(
      {
        game: "setPlayers",
        players: [],
        cards: {
          myName: null,
          inHand: {},
          notInHand: {},
          solution: [],
          // Constants
          categories: ["location", "suspect", "weapon"],
          location: ['Ballroom', 'Billiard Room', 'Conservatory', 'Dining Room', 'Hall', 'Kitchen', 'Library', 'Lounge',
            'Study'],
          suspect: ['Green', 'Mustard', 'Peacock', 'Plum', 'Scarlett', 'White'],
          weapon: ['Candlestick', 'Knife', 'Lead Pipe', 'Revolver', 'Rope', 'Wrench'],
        },
        turns: [],
        foundCards: {},
      }
    )
  }

  setPlayers(players) {
    let cards = this.state.cards;
    cards.myName = players[0];
    this.setState({players: players, cards: cards, game: "selectCards"});
  }

  selectCards(cardsInHand) {
    let cards = {...this.state.cards};
    const players = this.state.players.slice(1, this.state.players.length);
    for (const card of cardsInHand) {
      cards.inHand[card] = cards.myName;
      cards.notInHand[card] = players;
    }
    for (const category of cards.categories) {
      for (const card of cards[category]) {
        if (!(card in cards.inHand)) {
          cards.notInHand[card] = [cards.myName]
        }
      }
    }
    const cardHistory = [JSON.parse(JSON.stringify(cards))];
    this.setState({
      cards: cards,
      cardHistory: cardHistory,
      game: "turns"
    })
  }

  addTurn(turn) {
    let turns = this.state.turns.slice();
    turn.turnNumber = turns.length + 1;
    turns = turns.concat(turn);
    this.setState({
      turns: turns,
    });
    this.updateGame(turns, this.state.cards, this.state.players)
  }

  updateGame(turns, cards, players) {
    const gameUpdate = updateCards(turns, cards, players);
    const cards_ = gameUpdate.cards;
    const foundCards = gameUpdate.foundCards;
    this.setState({
      cards: cards_,
      foundCards: foundCards,
    });
    if (cards_.solution.length === 3) {
      this.setState({game: "solution"})
    } else {
      this.setState({game: "turns"})
    }
    let cardHistory = this.state.cardHistory.slice();
    cardHistory = cardHistory.concat(cards_);
    this.setState({
      cardHistory: cardHistory,
    });
  }

  undoTurn() {
    let turns = this.state.turns.slice();
    if (turns.length === 0) {
      return console.log("There are no turns to undo.")
    }
    turns.pop();
    let cardHistory = this.state.cardHistory.slice();
    cardHistory.pop();
    let cards = JSON.parse(JSON.stringify(cardHistory[cardHistory.length - 1]));
    this.setState({
      cards: cards,
      turns: turns,
      cardHistory: cardHistory
    })
  }

  eliminateCard(card, player) {
    let cards = {...this.state.cards};
    cards.inHand[card] = player;
    this.setState({cards: cards});
    const turns = this.state.turns;
    if (turns.length > 0) {
      this.updateGame(this.state.turns, cards, this.state.players);
    }
    this.setState({game: "turns"})
  }

  render() {
    return (
      <Fragment>
        <NavBar onStartNewGame={this.startNewGame}
                onEliminateCard={() => this.setState({game: "eliminateCard"})}/>
        {this.state.game === "setPlayers" &&
        <SetPlayers onSubmit={(players) => this.setPlayers(players)}/>}
        {this.state.game === "selectCards" &&
        <SelectCards cards={this.state.cards}
                     onBack={() => this.setState({game: "setPlayers"})}
                     onSubmit={(cardsInHand) => this.selectCards(cardsInHand)}/>}
        {this.state.game === "cards" &&
        <Cards cards={this.state.cards}/>}
        {this.state.game === "turns" &&
        <Turns cards={this.state.cards}
               turns={this.state.turns}
               foundCards={this.state.foundCards}
               newTurn={() => this.setState({game: "suggestion"})}
               undoTurn={this.undoTurn}
        />}
        {this.state.game === "suggestion" &&
        <Suggestion cards={this.state.cards}
                    players={this.state.players}
                    onBack={() => this.setState({game: "turns"})}
                    onSubmit={(turn) => this.addTurn(turn)}/>}
        {this.state.game === "solution" &&
        <Solution cards={this.state.cards}/>}
        {this.state.game === "eliminateCard" &&
        <EliminateCard cards={this.state.cards}
                       players={this.state.players}
                       toTurns={() => this.setState({game: "turns"})}
                       onEliminate={(card, player) => this.eliminateCard(card, player)}
        />}
      </Fragment>
    );
  }
}

export default Game;
