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
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from 'reactstrap';

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      modal: false,
    };
    this.toggle = this.toggle.bind(this);
    this.modalToggle = this.modalToggle.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  toggle() {
    this.setState({isOpen: !this.state.isOpen})
  }

  modalToggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  onClick() {
    this.setState({isOpen: false});
    this.modalToggle();
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
                <NavLink>
                  Start new game
                </NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
        <Modal isOpen={this.state.modal} toggle={this.modalToggle}>
          <ModalHeader toggle={this.modalToggle}>Are you sure to start a new game?</ModalHeader>
          <ModalBody>
            All the data of the current game will be deleted.
          </ModalBody>
          <div className="row d-flex justify-content-between mx-2 mb-3">
            <button type="button" className="btn btn-secondary btn-fixed-width" onClick={this.modalToggle}>
              Cancel
            </button>
            <button type="button" className="btn btn-primary btn-fixed-width float-right" onClick={this.onClick}>
              Start new game
            </button>
          </div>
        </Modal>
      </Fragment>
    )
  }
}

export default NavBar;