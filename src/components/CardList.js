import React from 'react';
import '../bootstrap.min.css';
import CardItem from '../components/CardItem';

function CardList(props) {

  //TODO: Refactor to map() method
  //TODO: Refactor Active property to CardItem

  const cardList = props.cardList;
  const list = cardList.map((card) => {return card === props.selected ?
        <CardItem key={card} card={card} cards={props.cards} onClick={() => props.onClick(card)} selected/> :
        <CardItem key={card} card={card} cards={props.cards} onClick={() => props.onClick(card)}/>
    });

  return (
    <div className="col-sm mb-3">
      <ul className="list-group" id={props.title}>
        <h3>{props.title}</h3>
        {list}
      </ul>
    </div>
  )
}

export default CardList;

