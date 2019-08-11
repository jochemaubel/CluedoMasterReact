import React, {Fragment} from 'react';
import './bootstrap.min.css'
import NavBar from "./components/NavBar";
import SetPlayers from './pages/SetPlayers';
import SelectCards from './pages/SelectCards';
import Cards from './pages/Cards';
import Turns from "./pages/Turns";
import Suggestion from "./pages/Suggestion";
import Solution from "./pages/Solution";

//TODO: Intelligence
//TODO: Alerts
//TODO: Functions for states
//TODO: Navigation
//TODO: Accusation
//TODO: eliminate card
//TODO: update turn / delete turn


class Game extends React.Component {

  constructor(props) {
    super(props);
    this.updateHand = this.updateHand.bind(this);
    this.addTurn = this.addTurn.bind(this);
    this.showTurns = this.showTurns.bind(this);
    this.state = {
      game: "suggestion",
      players: ["Jochem", "Koen", "Daan"],
      cards: {
        myName: "Jochem",
        inHand: {"Ballroom": "Jochem", "White": "Koen"},
        notInHand: {
          "Ballroom": ["Koen", "Daan"],
          "Dining Room": ["Koen", "Daan"],
          "Conservatory": ["Jochem", "Koen", "Daan"],
          "Green": ["Koen", "Jochem"],
          "Knife": ["Koen", "Jochem"],
          "White": ["Jochem", "Daan"],
          "Peacock": ["Jochem"],
          "Candlestick": ["Jochem"],
        },
        solution: ["Conservatory"],
        categories: ["location", "suspect", "weapon"],
        location: ['Ballroom', 'Billiard Room', 'Conservatory', 'Dining Room', 'Hall', 'Kitchen', 'Library', 'Lounge',
          'Study'],
        suspect: ['Green', 'Mustard', 'Peacock', 'Plum', 'Scarlett', 'White'],
        weapon: ['Candlestick', 'Knife', 'Lead Pipe', 'Revolver', 'Rope', 'Wrench'],
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
      foundCards: {},
    }
    ;
  }

  // setPlayers
  //TODO: setPlayers after button click and change state
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

  // selectCards
  //TODO: selectCards after button click and change state
  //TODO: also fill cardsNotInHand for player[0]
  updateHand(card) {
    const myName = this.state.players[0];
    let inHand = this.state.cards.inHand;
    if (card in inHand) {
      delete inHand[card]
    } else {
      inHand[card] = myName;
    }
    console.log(inHand);
    this.setState({inHand: inHand});
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
    if(foundSolution) {
      this.setState({game: "solution"})
    } else {
      this.setState({game: "turns"})
    }
  }

  showTurns() {
    this.setState({game: "turns"})
  }

  updateCards(turn) {
    const turns = this.state.turns;
    const cards = this.state.cards;

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
    let foundCards = this.state.foundCards;
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
        <NavBar/>
        {this.state.game === "setPlayers" &&
        <SetPlayers onChange={this.handleChange.bind(this)}/>}
        {this.state.game === "selectCards" &&
        <SelectCards hand={this.state.cards.inHand} onSelectCard={(card) => this.updateHand(card)}/>}
        {this.state.game === "cards" &&
        <Cards cards={this.state.cards}/>}
        {this.state.game === "turns" &&
        <Turns cards={this.state.cards} turns={this.state.turns}/>}
        {this.state.game === "suggestion" &&
        <Suggestion cards={this.state.cards} players={this.state.players}
                       onBack={this.showTurns}
                       onSubmit={(turn) => this.addTurn(turn)}/>}
        {this.state.game === "solution" &&
        <Solution cards={this.state.cards} />}
      </Fragment>
    );
  }
}

export default Game;
