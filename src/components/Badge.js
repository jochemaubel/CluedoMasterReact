import React from 'react';
import '../bootstrap.min.css';

function Badge(props) {
  const className = "badge badge-pill mx-1 " + props.color;
  return <span className={className} >{props.badgeText}</span>
}

export default Badge