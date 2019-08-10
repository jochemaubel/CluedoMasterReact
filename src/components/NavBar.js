import React, {Fragment} from 'react';
import '../bootstrap.min.css';


class NavBar extends React.Component {

  //TODO: show only if game has started

  render() {

    return (
      <Fragment>
        <nav className="navbar sticky-top navbar-expand-lg navbar-dark bg-primary">
            <button className="navbar-brand btn btn-primary">
              CluedoMaster
            </button>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01"
                  aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarColor01">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <button className="btn btn-link">Cards</button>
              </li>
              <li className="nav-item active">
                <button className="btn btn-link">Turns</button>
              </li>
              <li className="nav-item ">
                <button className="nav-link d-sm-none">Start new game</button>
              </li>
            </ul>

            <form className="form-inline my-2 my-lg-0 d-none d-sm-block">
              <button type="button" className="btn btn-secondary mr-4" data-toggle="modal" data-target="#newTurnModal">
                New suggestion
              </button>
              <button type="button" className="btn btn-success mr-4" data-toggle="modal"
                      data-target="#newAccusationModal">
                Make accusation
              </button>
              <button className="btn btn-warning my-2 my-sm-0 max-4" >Start new game</button>
            </form>

          </div>
        </nav>
      </Fragment>
    )
  }
}

export default NavBar;