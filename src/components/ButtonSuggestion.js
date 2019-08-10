import React from 'react';
import '../bootstrap.min.css';

function ButtonSuggestion(props) {

  const className = (window.innerWidth < 576) ?
    "btn btn-primary btn-block " : "btn btn-primary btn-fixed-width float-right ";

  return (
    <button className={className}>Next</button>
  )
}

export default ButtonSuggestion;