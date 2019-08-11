import React from 'react';
import '../bootstrap.min.css';

function SelectCardList(props) {

  //TODO: Refactor Active property to CardItem
  //TODO: Refactor SelectCardList to map() function
  //TODO: generalization for CardList?

  const cardList = props.cardList;
  let list = [];
  for (const card of cardList) {
    let status = 'Inactive';
    if (props.hand.includes(card)) {
      status = 'Active'
    }
    list = list.concat(
      <SelectCardItem key={card} card={card} status={status} onClick={() => props.onClick(card)}/>
    )
  }
  return (
    <div className="col-sm mb-3">
      <ul className="list-group" id="locations">
        <h4>{props.title}</h4>
        {list}
      </ul>
    </div>
  )
}

class SelectCardItem extends React.Component {

  //TODO: rewrite to function
  //TODO: check if key can be removed here

  render() {
    let className = "d-flex flex-row list-group-item list-group-item-action justify-content-end align-items-center";
    if (this.props.status === 'Active') {
      className = className + " active"
    }

    return (
      <li className={className}
          key={this.props.id}
          onClick={this.props.onClick}
      >
        <span className="mr-auto">{this.props.card}</span>
      </li>
    )
  }
}

export default SelectCardList