import React from 'react';
import '../bootstrap.min.css';

function PlayerItem(props) {

  let className = "d-flex flex-row list-group-item list-group-item-action justify-content-end align-items-center";
  if (props.selected) {
    className = className + " active"
  }

  return (
    <li className={className} onClick={props.onClick}>
      <span className="mr-auto">{props.player} </span>
    </li>
  );
}

export default PlayerItem;