import React from "react";
import '../bootstrap.min.css';

function NavBarBottom(props) {
  return (
    <nav className="navbar fixed-bottom navbar-expand-lg navbar-dark bg-primary d-sm-none">
      <button type="button" className="btn btn-secondary" data-toggle="modal" data-target="#newTurnModal">
        New suggestion
      </button>
      <button type="button" className="btn btn-success float-right" data-toggle="modal"
              data-target="#newAccusationModal">
        Make accusation
      </button>
    </nav>
  )

}

export default NavBarBottom