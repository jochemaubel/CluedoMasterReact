import React from 'react';
import '../bootstrap.min.css';
import {UncontrolledAlert} from 'reactstrap'
import SelectCardList from "../components/SelectCardList";

class SelectCards extends React.Component {
  constructor(props) {
    super(props);
    this.onSelectCard = this.onSelectCard.bind(this);
    this.onClick = this.onClick.bind(this);
    this.state = {
      inHand: [],
      alertSelectCards: false
    }
  }

  onSelectCard(card) {
    let inHand = this.state.inHand;
    if (inHand.includes(card)) {
      inHand.splice(inHand.indexOf(card),1)
    } else {
      inHand.push(card)
    }
    console.log(inHand);
    this.setState({inHand: inHand});
  }

  onClick() {
    if(this.state.inHand.length < 3) {
      this.setState({alertSelectCards: true});
      window.scrollTo(0,0)
    } else {
      this.props.onSubmit(this.state.inHand)
    }
  }

  render() {
    const cards = this.props.cards;

    return (
      <div className="container mt-3">
        <UncontrolledAlert color="info">Select the cards you have in your hand.</UncontrolledAlert>
        {this.state.alertSelectCards &&
        <UncontrolledAlert color="warning">
          First enter at least three cards.
        </UncontrolledAlert>
        }
        <div className="row">
          <SelectCardList title="Locations"
                          cardList={cards.location}
                          hand={this.state.inHand}
                          onClick={(card) => this.onSelectCard(card)}/>
          <SelectCardList title="Suspects"
                          cardList={cards.suspect}
                          hand={this.state.inHand}
                          onClick={(card) => this.onSelectCard(card)}/>
          <SelectCardList title="Weapon"
                          cardList={cards.weapon}
                          hand={this.state.inHand}
                          onClick={(card) => this.onSelectCard(card)}/>
        </div>

        <div className="row d-flex justify-content-between mx-2 mb-3">
          <button className="btn btn-secondary btn-fixed-width" onClick={this.props.onBack}>Back to players</button>
          <button className="btn btn-primary btn-fixed-width" onClick={this.onClick}>Start game</button>
        </div>
      </div>
    )
  }
}

export default SelectCards