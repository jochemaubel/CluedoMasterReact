import React, {Fragment} from 'react';
import '../bootstrap.min.css';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';
import confirm from 'reactstrap-confirm';

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
    this.toggle = this.toggle.bind(this);
    this.onStartNewGame = this.onStartNewGame.bind(this);
    this.onEliminateCard = this.onEliminateCard.bind(this);
  }

  toggle() {
    this.setState({isOpen: !this.state.isOpen})
  }


  async onStartNewGame() {
    let confirmation = await confirm({
      title: "Are you sure?",
      message: "If you start a new game, all the data of the current game will be lost.",
      confirmText: "Start new game",
    });
    if (confirmation) {
      this.props.onStartNewGame()
    }
    this.toggle();
  }

  onEliminateCard() {
    this.props.onEliminateCard();
    this.toggle()
  }

  render() {

    return (
      <Fragment>
        <Navbar style={{backgroundColor: '#2c3e50'}} dark sticky="top">
          <NavbarBrand style={{color: "white"}}>CluedoMaster</NavbarBrand>
          <NavbarToggler onClick={this.toggle} className="mr-2"/>
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem style={{color: "white"}} onClick={this.onStartNewGame}>
                <NavLink>
                  Start new game
                </NavLink>
              </NavItem>
              <NavItem style={{color: "white"}} onClick={this.onEliminateCard}>
                <NavLink>
                  Eliminate card
                </NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </Fragment>
    )
  }
}

export default NavBar;