import React, {Fragment} from 'react';
import './bootstrap.min.css'
import NavBar from "./components/NavBar";
import SetPlayers from './pages/SetPlayers';
import SelectCards from './pages/SelectCards';
import Cards from './pages/Cards';
import Turns from "./pages/Turns";
import Suggestion from "./pages/Suggestion";
import Solution from "./pages/Solution";

//TODO: Navigation desktop & mobile
//TODO: Remove Accusation
//TODO: Eliminate card
//TODO: Update turn / delete turn
//TODO: Add more details to CardItem


class Game extends React.Component {

  constructor(props) {
    super(props);
    this.startNewGame = this.startNewGame.bind(this);
    this.setPlayers = this.setPlayers.bind(this);
    this.selectCards = this.selectCards.bind(this);
    this.addTurn = this.addTurn.bind(this);
    this.initialState = {
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
    };
    this.state = this.initialState;
  }

  startNewGame() {
    this.setState(this.initialState)
  }

  setPlayers(players) {
    let cards = this.state.cards;
    cards.myName = players[0];
    this.setState({players: players, cards: cards, game: "selectCards"});
  }

  selectCards(cardsInHand) {
    let cards= this.state.cards;
    for (const card of cardsInHand) {
      cards.inHand[card] = cards.myName;
    }
    for(const category of cards.categories) {
      for(const card of cards[category]) {
        if(!(card in cards.inHand)) {
          cards.notInHand[card] = [cards.myName]
        }
      }
    }
    console.log(cards.inHand);
    console.log(cards.notInHand);
    this.setState({cards:cards, game: "turns"})
  }

  addTurn(turn) {
    let turns = this.state.turns;
    turn.turnNumber = turns.length + 1;
    turns = turns.concat(turn);
    this.setState({
      turns: turns,
    });
    const foundSolution = this.updateCards(turn);
    console.log(foundSolution);
    if (foundSolution) {
      this.setState({game: "solution"})
    } else {
      this.setState({game: "turns"})
    }
  }

  updateCards(turn) {
    const turns = this.state.turns;
    const cards = this.state.cards;
    this.setState({foundCards: {}});

    // Add showed card to cards_in_hand
    if (turn.cardShowed) {
      cards.inHand[turn.cardShowed] = turn.showPlayer
    }

    // Add players that didn't show a card to cards_not_in_hand
    console.log("Add players that didn't show a card to cards_not_in_hand");
    let player = this.nextPlayer(turn.turnPlayer);
    while (turn.showPlayer !== player && turn.turnPlayer !== player) {
      const addCards = cards.categories.map((category) => turn.cards[category]);
      this.updateCardsNotInHand(addCards, player);
      player = this.nextPlayer(player)
    }

    // Check every turn for cards we can know
    console.log("Check every turn for cards we can know")
    this.checkAllTurns(turns);

    // Update cardsNotInHand for solution & cardsInHand
    console.log("Update cardsNotInHand for solution & cardsInHand")
    this.fillCardsNotInHand();

    // Check if solution has been found
    return this.state.cards.solution.length === 3;

  }

  nextPlayer(player) {
    const players = this.state.players;
    let i = players.indexOf(player) + 1;
    if (i === players.length) {
      i = 0
    }
    return players[i]
  }

  updateCardsInHand(addCards, player) {
    const cards = this.state.cards;
    const foundCards = this.state.foundCards;
    for (const card of addCards) {
      if (!(card in cards.inHand)) {
        cards.inHand[card] = player;
        foundCards[card] = player
      }
    }
    this.setState({cards: cards, foundCards: foundCards})
  }

  updateCardsNotInHand(addCards, player) {
    let cards = this.state.cards;
    for (const card of addCards) {
      if (!(card in cards.notInHand)) {
        cards.notInHand[card] = player
      } else {
        if (!cards.notInHand[card].includes(player)) {
          cards.notInHand[card] = cards.notInHand[card].concat(player)
        }
      }
      if (cards.notInHand[card].length === this.state.players.length && !(card in cards.inHand)) {
        this.updateSolution(card);
      }
    }
    this.setState({cards: cards})
  }

  updateSolution(card) {
    let cards = this.state.cards;
    let foundCards = this.state.foundCards;
    if (!cards.solution.includes(card)) {
      cards.solution = cards.solution.concat(card);
      foundCards[card] = "solution";
      this.setState({cards: cards, foundCards: foundCards})
    }
  }

  checkAllTurns(turns) {
    let addedCard = true;
    while (addedCard) {
      addedCard = false;
      for (const turn in turns) {
        if (turn.showPlayer) {
          const player = turn.showPlayer;
          const turnCards = turn.cards;
          const card = this.checkHasOneCard(turnCards, player);
          if (card) {
            this.updateCardsInHand([card], player);
            addedCard = true
          }
        }
      }
      this.checkSolutionCards();
    }
  }

  checkHasOneCard(turnCards, player) {
    const cardsNotInHand = this.state.cards.notInHand;
    let numberOfCardsNotInHand = 0;
    let canHaveCard = null;
    for (const category of turnCards) {
      const card = turnCards[category];
      if (card in cardsNotInHand) {
        if (cardsNotInHand.includes(player)) {
          numberOfCardsNotInHand++
        } else {
          canHaveCard = card
        }
      }
    }
    if (numberOfCardsNotInHand === 2) {
      return canHaveCard
    }
    return null
  }

  checkSolutionCards() {
    const categories = ["location", "suspect", "weapon"];
    let cards = this.state.cards;
    for (const category of categories) {
      const catCards = cards[category];
      let numberOfCardsInHand = 0;
      let solution;
      for (const card of catCards) {
        if (card in cards.inHand) {
          numberOfCardsInHand++
        } else {
          solution = card
        }
      }
      if (numberOfCardsInHand === catCards.length - 1) {
        this.updateSolution(solution)
      }
    }
  }

  fillCardsNotInHand() {
    let cards = this.state.cards;
    const players = this.state.players;
    for (const card in cards.inHand) {
      for (const player in players) {
        if (player !== cards.inHand[card]) {
          this.updateCardsNotInHand([card], player)
        }
      }
    }
    for (const card of cards.solution) {
      for (const player in players) {
        this.updateCardsNotInHand([card], player)
      }
    }
  }

  render() {
    return (
      <Fragment>
        <NavBar onClick={this.startNewGame}/>
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
               newTurn={() => this.setState({game: "suggestion"})}/>}
        {this.state.game === "suggestion" &&
        <Suggestion cards={this.state.cards}
                    players={this.state.players}
                    onBack={() => this.setState({game: "turns"})}
                    onSubmit={(turn) => this.addTurn(turn)}/>}
        {this.state.game === "solution" &&
        <Solution cards={this.state.cards}/>}
      </Fragment>
    );
  }
}

export default Game;
