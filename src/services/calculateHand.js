function calculateHand(turns, cards, players) {
  console.log("calculateHand");
  const turn = turns(turns.length - 1);
  const c = cards;

  // Add showed card to cards_in_hand
  if (turn.cardShowed) {
    c.cardsInHand[turn.cardShowed] = turn.showPlayer
  }

  // Add players that didn't show a card to cards_not_in_hand
  let player = nextPlayer(turn.turnPlayer, players);
  while (turn.showPlayer !== player && turn.turnPlayer !== player) {
    
  }


  // Check every turn for cards we can know

  // Update cardsNotInHand for solution & cardsInHand

  return c
}

function nextPlayer(player, players) {
  let i = players.indexOf(player) + 1;
  if (i === players.length) {i=0}
  return players[i]
}

function updateCardsNotInHand(cards, player, players) {
  for(const category of cards) {
    const card = cards[category];
  }

}


export default calculateHand