import React from 'react';
import '../bootstrap.min.css';
import Badge from "./Badge";
import CardIcon from "./CardIcon";

function CardItem(props) {

  let className = "d-flex flex-row list-group-item list-group-item-action justify-content-end align-items-center";
  if (props.selected) {className = className + " active"}

  const card = props.card;
  let badge = null;
  if (props.cards) {
    if (props.cards.solution.includes(card)) {
      className = className + " list-group-item-success";
      badge = <Badge badgeText="Solution" color="badge-primary"/>
    } else if (card in props.cards.inHand) {
      className = className + " list-group-item-danger";
      badge = <Badge badgeText={props.cards.inHand[card]} color="badge-primary"/>
    } else if (card in props.cards.notInHand) {
      badge=[];
      badge = props.cards.notInHand[card].map((player) => {
          return player !== props.cards.myName && <Badge key={player} badgeText={player} color="badge-danger"/>
      }
      )
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