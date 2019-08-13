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
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };
    this.toggle = this.toggle.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  toggle() {
    this.setState({isOpen: !this.state.isOpen})
  }

  onClick() {
    this.setState({isOpen: false})
    this.props.onClick()
  }

  render() {

    return (
      <Fragment>
        <Navbar style={{backgroundColor: '#2c3e50'}} dark sticky="top">
          <NavbarBrand style={{color: "white"}}>CluedoMaster</NavbarBrand>
          <NavbarToggler onClick={this.toggle} className="mr-2"/>
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem style={{color: "white"}} onClick={this.onClick}>
                <NavLink className="float-right">
                  Start new game
                </NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
        {/*<nav className="navbar sticky-top navbar-expand-lg navbar-dark bg-primary">*/}
        {/*    <button className="navbar-brand btn btn-primary">*/}
        {/*      CluedoMaster*/}
        {/*    </button>*/}
        {/*  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01"*/}
        {/*          aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">*/}
        {/*    <span className="navbar-toggler-icon"></span>*/}
        {/*  </button>*/}

        {/*  <div className="collapse navbar-collapse" id="navbarColor01">*/}
        {/*    <ul className="navbar-nav mr-auto">*/}
        {/*      <li className="nav-item ">*/}
        {/*        <button className="nav-link d-sm-none">Start new game</button>*/}
        {/*      </li>*/}
        {/*    </ul>*/}

        {/*    <form className="form-inline my-2 my-lg-0 d-none d-sm-block">*/}
        {/*      <button type="button" className="btn btn-secondary btn-fixed-width mr-4">Next turn</button>*/}
        {/*      <button type="button" className="btn btn-success btn-fixed-width mr-4">Make accusation</button>*/}
        {/*      <button className="btn btn-warning btn-fixed-width my-2 my-sm-0 max-4">Start new game</button>*/}
        {/*    </form>*/}

        {/*  </div>*/}
        {/*</nav>*/}
      </Fragment>
    )
  }
}

export default NavBar;