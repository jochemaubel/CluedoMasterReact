import React from 'react';
import '../bootstrap.min.css';
import Badge from "./Badge";

function PlayerItem(props) {

  let className = "d-flex flex-row list-group-item list-group-item-action justify-content-end align-items-center";
  if (props.selected) {
    className = className + " active"
  }

  const player = props.player;
  console.log("playerItem");
  console.log(player);
  let badge = [];
  let doesNotHaveCard = 0;
  if (props.cards && props.turnCards) {
    const turnCards = props.turnCards;
    console.log(turnCards);
    for (const category in turnCards) {
      const card = turnCards[category];
      if (props.cards.cardsInHand
        && card in props.cards.cardsInHand
        && props.cards.cardsInHand[card] === player) {
        badge = badge.concat(<Badge badgeText={card} color="badge-primary"/>)
      }
      console.log(props.cards.cardsNotInHand);
      console.log(card)
      console.log(card in props.cards.cardsNotInHand);
      if (card in props.cards.cardsNotInHand) {
        console.log(props.cards.cardsNotInHand[card].includes(player))
      }
      if ((props.cards.cardsNotInHand
        && card in props.cards.cardsNotInHand
        && props.cards.cardsNotInHand[card].includes(player))
        || (props.cards.solution && props.cards.solution.includes(card))) {
        badge = badge.concat(<Badge key={card} badgeText={card} color="badge-danger"/>);
        doesNotHaveCard++;
      }
    }
    if (doesNotHaveCard === 3) {
      className = className + " list-group-item-danger";
      badge = null;
    }
  }
  console.log(badge);

  return (
    <li className={className} onClick={props.onClick}>
      <span className="mr-auto">{player} </span>
      {badge}
    </li>
  );
}

export default PlayerItem;