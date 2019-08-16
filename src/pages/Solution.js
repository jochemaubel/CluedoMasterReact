import React from 'react';
import '../bootstrap.min.css';
import CardItem from "../components/CardItem";

function Solution(props) {
  const solution = props.cards.solution;
  const categories = props.cards.categories;
  let solutionDict = {};
  for (const category of categories) {
    for (const card of solution) {
      if (props.cards[category].includes(card)) {
        solutionDict[category] = card
      }
    }
  }
  const solutionList = categories.map((category) => <CardItem key={category}
                                                              card={solutionDict[category]}
                                                              cards={props.cards}
                                                              image={category}/>);

  return (
    <div className="container mt-3">
      <div className="card my-3">
        <div className="card-header d-flex flex-row justify-content-end align-items-center">
          <span className="mr-auto h4">CluedoMaster found the solution!</span>
        </div>
        <div className="card-body row">
          <div className="col-sm">
            {solutionList}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Solution