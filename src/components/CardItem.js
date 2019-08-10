import React from 'react';
import '../bootstrap.min.css';

function Badge(props) {
  const className = "badge badge-pill mx-1 " + props.color;
  return <span className={className} >{props.badgeText}</span>
}

function CardIcon(props) {
  if(props.cardType) {
    return <img src={require("../images/" + props.cardType + ".png")} alt="" className="resize mr-2" />
  }
  return null;
}

function CardItem(props) {

  let className = "d-flex flex-row list-group-item list-group-item-action justify-content-end align-items-center";
  if (props.selected) {className = className + " active"};
  const card = props.card;
  let badge = null;

  if (props.cards) {
    if (props.cards.solution && props.cards.solution.includes(card)) {
      className = className + " list-group-item-success";
      badge = <Badge badgeText="Solution" color="badge-primary"/>
    } else if (props.cards.cardsInHand && card in props.cards.cardsInHand) {
      className = className + " list-group-item-danger";
      badge = <Badge badgeText={props.cards.cardsInHand[card]} color="badge-primary"/>
    } else if (props.cards.cardsNotInHand && card in props.cards.cardsNotInHand) {
      badge=[];
      for (const player of props.cards.cardsNotInHand[card]) {
        badge=badge.concat(<Badge key={player} badgeText={player} color="badge-danger"/>)
      }
    }
  }

  return (
    <li className={className} onClick={props.onClick}>
      <CardIcon cardType={props.image}/>
      <span className="mr-auto">{card}</span>
      {badge}
    </li>
  );
}

export default CardItem;