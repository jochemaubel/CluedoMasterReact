import React from 'react';
import '../bootstrap.min.css';
import CardList from "../components/CardList";
import PlayerItem from "../components/PlayerItem";
import CardItem from "../components/CardItem";
import {UncontrolledAlert} from 'reactstrap';
import {
  playerHasOneOfTheseCards,
  playerHasNoneOfTheseCards,
  cardDictToArray
} from "../services/checkCardsService"

function setShowPlayers(turnPlayer, players, turnCards, cards) {
  const index = players.indexOf(turnPlayer);
  const length = players.length;
  let showPlayers = [];
  if (index < length - 1) {
    for (let i = index + 1; i < length; i++) {
      if (!playerHasNoneOfTheseCards(cardDictToArray(turnCards), players[i], cards.notInHand)) {
        showPlayers = showPlayers.concat(players[i])
      }
    }
  }
  if (index > 0) {
    for (let i = 0; i < index; i++) {
      if (!playerHasNoneOfTheseCards(cardDictToArray(turnCards), players[i], cards.notInHand)) {
        showPlayers = showPlayers.concat(players[i])
      }
    }
  }
  showPlayers = showPlayers.concat("Nobody");
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
    this.backToSuggestion = this.backToSuggestion.bind(this);
    this.submitTurn = this.submitTurn.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  doSuggestion() {
    let turn = JSON.parse(JSON.stringify(this.state.turn));
    if (turn.turnPlayer && turn.cards.location && turn.cards.suspect && turn.cards.weapon) {
      this.setState({
        suggest: false,
        suggestAlert: false,
      });
      const showPlayers = setShowPlayers(turn.turnPlayer, this.props.players, turn.cards, this.props.cards);
      for (const player of showPlayers) {
        if(playerHasOneOfTheseCards(cardDictToArray(turn.cards),player,this.props.cards.inHand)) {
          turn["showPlayer"] = player;
          this.setState({turn: turn});
          break
        }
      }
    } else {
      this.setState({suggestAlert: true});
    }
    window.scrollTo(0, 0);
  }

  backToSuggestion() {
    let turn = this.state.turn;
    if (turn.showPlayer) {
      delete turn.showPlayer
    }
    if (turn.cardShowed) {
      delete turn.cardShowed
    }
    this.setState({suggest: true})
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
    let turn = JSON.parse(JSON.stringify(this.state.turn));
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
    const players = this.props.players;
    const myName = players[0];

    if (this.state.suggest) {
      const turnPlayerList = players.map((player, index) => {
        return player === this.state.turn.turnPlayer ?
          <PlayerItem key={index} player={player} onClick={() => this.onClick(player, "turnPlayer")} selected/> :
          <PlayerItem key={index} player={player} onClick={() => this.onClick(player, "turnPlayer")}/>
      });
      return (
        <div className="container mt-3">
          {this.state.suggestAlert &&
          <UncontrolledAlert color="warning">First select a player and three cards.</UncontrolledAlert>}
          <div id="suggestion" className=" row">
            <div className=" col-sm mb-3">
              <h3>Players</h3>
              {turnPlayerList}
            </div>
            <CardList title="Locations" cardList={this.props.cards.location} cards={this.props.cards}
                      selected={this.state.turn.cards.location}
                      onClick={(card) => this.onClick(card, "location")}/>
            <CardList title="Suspects" cardList={this.props.cards.suspect} cards={this.props.cards}
                      selected={this.state.turn.cards.suspect}
                      onClick={(card) => this.onClick(card, "suspect")}/>
            <CardList title="Weapons" cardList={this.props.cards.weapon} cards={this.props.cards}
                      selected={this.state.turn.cards.weapon}
                      onClick={(card) => this.onClick(card, "weapon")}/>
          </div>
          <div className="row d-flex justify-content-between mx-2 mb-3">
            <button className="btn btn-secondary btn-fixed-width" onClick={this.props.onBack}>Back</button>
            <button className="btn btn-primary btn-fixed-width" onClick={this.doSuggestion}>Do suggestion</button>
          </div>
        </div>
      )
    } else {
      let showPlayerList;
      let showPlayers;
      if (this.state.turn.turnPlayer) {
        const turnPlayer = this.state.turn.turnPlayer;
        showPlayers = setShowPlayers(turnPlayer, players, this.state.turn.cards, this.props.cards);
        showPlayerList = showPlayers.map((player, index) => {
          return player === this.state.turn.showPlayer ?
            <PlayerItem key={index} player={player} cards={this.props.cards} turnCards={this.state.turn.cards}
                        onClick={() => this.onClick(player, "showPlayer")} selected/> :
            <PlayerItem key={index} player={player} cards={this.props.cards} turnCards={this.state.turn.cards}
                        onClick={() => this.onClick(player, "showPlayer")}/>
        });
      }
      let showCardsBool = false;
      if (this.state.turn.showPlayer && this.state.turn.showPlayer === myName) {
        showCardsBool = true
      }
      if (this.state.turn.turnPlayer && this.state.turn.turnPlayer === myName
        && this.state.turn.showPlayer && this.state.turn.showPlayer !== "Nobody") {
        showCardsBool = true
      }

      let turnCards = [];
      const showPlayer = this.state.turn.showPlayer;
      if (showCardsBool) {
        const cardsNotInHand = this.props.cards.notInHand;
        const cards = this.state.turn.cards;

        let categories = this.props.cards.categories.slice();
        for (const category in cards) {
          if (cardsNotInHand[cards[category]]
            && cardsNotInHand[cards[category]].includes(showPlayer)) {
            const index = categories.indexOf(category);
            categories.splice(index, 1);
          }
        }
        if (categories.length === 0) {
          turnCards = <UncontrolledAlert color="danger">{showPlayer} has no cards to show.</UncontrolledAlert>
        } else {
          turnCards = categories.map((category) =>
            this.state.turn.cardShowed && this.state.turn.cardShowed === cards[category] ?
              <CardItem key={category} card={cards[category]} image={category}
                        selected
                        onClick={() => this.onClick(cards[category], "cardShowed")}/> :
              <CardItem key={category} card={cards[category]} image={category}
                        onClick={() => this.onClick(cards[category], "cardShowed")}/>
          );

        }
      }

      const showCards = (
        <div className=" col-sm mb-3">
          <h3>Card shown</h3>
          {turnCards}
        </div>
      );

      return (
        <div className="container mt-3">
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
          <div className="row d-flex justify-content-between mx-2 mb-3">
            <button className="btn btn-secondary btn-fixed-width" onClick={this.backToSuggestion}>Back</button>
            <button className="btn btn-primary btn-fixed-width" onClick={this.submitTurn}>Submit turn</button>
          </div>
        </div>
      );
    }
  }
}

export default Suggestion