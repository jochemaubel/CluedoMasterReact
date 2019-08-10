import React from 'react';
import '../bootstrap.min.css';
import Badge from "./Badge";

function PlayerItem(props) {

  let className = "d-flex flex-row list-group-item list-group-item-action justify-content-end align-items-center";
  if (props.selected) {
    className = className + " active"
  }

  const player = props.player;

  let badge = [];
  if (player !== "Nobody") {
    let doesNotHaveCard = 0;
    if (props.cards && props.turnCards) {
      const turnCards = props.turnCards;
      for (const category in turnCards) {
        const card = turnCards[category];
        if (card in props.cards.cardsInHand
          && props.cards.cardsInHand[card] === player) {
          badge = badge.concat(<Badge badgeText={card} color="badge-primary"/>)
        } else if (card in props.cards.cardsNotInHand
          && props.cards.cardsNotInHand[card].includes(player)) {
          badge = badge.concat(<Badge key={card} badgeText={card} color="badge-danger"/>);
          doesNotHaveCard++;
        }
      }
      if (doesNotHaveCard === 3) {
        className = className + " list-group-item-danger";
        badge = null;
      }
    }
  }

  return (
    <li className={className} onClick={props.onClick}>
      <span className="mr-auto">{player} </span>
      {badge}
    </li>
  );
}

export default PlayerItem;