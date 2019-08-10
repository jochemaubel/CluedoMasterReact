import React from 'react';
import '../bootstrap.min.css';
import {UncontrolledAlert, Form, FormGroup, Input} from 'reactstrap';
import NextButton from '../components/NextButton'

class SetPlayers extends React.Component {

  onChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    this.props.onChange(name,value);
  };

  render() {
    let fields = [];
    let placeholder = "Enter your name";

    for (let i = 1; i < 7; i++) {
      if (i > 1) {
        placeholder = "Enter name of player " + i;
      }
      let name = i - 1;

      //TODO: pre fill value if available
      fields = fields.concat(
        <FormGroup key={i}>
          <Input className="form-control"
                 name={name}
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
        <div className="row">
          <div className="col-sm">
            <Form>
              <fieldset>
                <legend>Player's names</legend>
                {fields}
                <NextButton onClick={this.props.onClick}>
                  Next
                </NextButton>
              </fieldset>
            </Form>
          </div>
        </div>
      </div>

    );
  }
}

export default SetPlayers;