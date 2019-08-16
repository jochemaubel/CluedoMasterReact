import React from "react";
import '../bootstrap.min.css';

function NavBarBottom(props) {
  return (
    <nav className="navbar fixed-bottom navbar-expand-lg navbar-dark bg-primary d-sm-none">
      <button type="button" className="btn btn-secondary btn-fixed-width" onClick={props.onSecondaryClick}>
        Undo turn
      </button>
      <button type="button" className="btn btn-success btn-fixed-width float-right" onClick={props.onClick}>
        New turn
      </button>
    </nav>
  )

}

export default NavBarBottom