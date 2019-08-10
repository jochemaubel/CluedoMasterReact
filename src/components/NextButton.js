import React from 'react';
import '../bootstrap.min.css';

function NextButton(props) {

  const className = (window.innerWidth < 576) ?
    "btn btn-primary btn-block " : "btn btn-primary btn-fixed-width float-right ";

  return (
    <button className={className} onClick={props.onClick}>
      {props.children}
    </button>
  )
}

export default NextButton;