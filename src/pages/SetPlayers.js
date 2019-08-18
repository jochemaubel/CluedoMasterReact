import React from 'react';
import '../bootstrap.min.css';
import {UncontrolledAlert, FormGroup, Input} from 'reactstrap';
import NextButton from '../components/NextButton'

class SetPlayers extends React.Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
    this.state = {
      players: [],
      alertNoPlayers: false,
    }
  }

  onChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    let players = this.state.players;
    const length = parseInt(name) + 1 - players.length;
    if (length > 0) {
      players = players.concat(Array(length).fill(null))
    }
    players[name] = value;

    this.setState({
      players: players
    });
  };

  onClick() {
    if(this.state.players.length < 2) {
      this.setState({alertNoPlayers: true})
    } else {
      this.props.onSubmit(this.state.players)
    }
  }

  render() {
    let fields = [];
    let placeholder = "Enter your name";

    for (let i = 1; i < 7; i++) {
      if (i > 1) {
        placeholder = "Enter name of player " + i;
      }
      let name = i - 1;

      fields = fields.concat(
        <FormGroup key={i}>
          <Input name={name}
                 placeholder={placeholder}
                 onChange={this.onChange}
          />
        </FormGroup>
      )
    }

    return (
      <div className="container mt-3">
        <UncontrolledAlert color="info">
          Enter the player's names clockwise, starting with your own name.
        </UncontrolledAlert>
        {this.state.alertNoPlayers &&
        <UncontrolledAlert color="warning">
          First enter at least two players.
        </UncontrolledAlert>
        }
        <div className="row">
          <div className="col-sm">

              <fieldset>
                <legend>Player's names</legend>
                {fields}
                <NextButton onClick={this.onClick}>
                  Next
                </NextButton>
              </fieldset>

          </div>
        </div>
      </div>

    );
  }
}

export default SetPlayers;