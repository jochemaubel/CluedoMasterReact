export default function updateCards(turns, cards, players) {
  const turn = turns[turns.length - 1];
  const numberOfPlayers = players.length;
  let updatedCards = JSON.parse(JSON.stringify(cards));
  let foundCards = {};

  // Add showed card to cards_in_hand
  if (turn.cardShowed) {
    updatedCards.inHand[turn.cardShowed] = turn.showPlayer;
  }

  // Add players that didn't show a card to cards_not_in_hand
  let player = nextPlayer(turn.turnPlayer, players);
  while (turn.showPlayer !== player && turn.turnPlayer !== player) {
    const addCards = cards.categories.map((category) => turn.cards[category]);
    const gameUpdate = updateCardsNotInHand(addCards, player, updatedCards, numberOfPlayers);
    updatedCards = gameUpdate.cards;
    for (const key in gameUpdate.foundCards) {
      foundCards[key] = gameUpdate.foundCards[key]
    }
    player = nextPlayer(player, players)
  }

  // Check every turn for cards we can know
  let gameUpdate = checkAllTurns(turns, updatedCards);
  updatedCards = gameUpdate.updatedCards;
  for (const key in gameUpdate.foundCards) {
    foundCards[key] = gameUpdate.foundCards[key]
  }

  // Update cardsNotInHand for solution & cardsInHand
  gameUpdate = fillCardsNotInHand(updatedCards, players);
  updatedCards = gameUpdate.updatedCards;
  for (const key in gameUpdate.foundCards) {
    foundCards[key] = gameUpdate.foundCards[key]
  }

  return {
    cards: updatedCards,
    foundCards: foundCards
  };

}

function nextPlayer(player, players) {
  let i = players.indexOf(player) + 1;
  if (i === players.length) {
    i = 0
  }
  return players[i]
}

function updateCardsInHand(addCards, player, cards) {
  let updatedCards = JSON.parse(JSON.stringify(cards));
  let foundCards = {};
  for (const card of addCards) {
    if (!(card in updatedCards.inHand) || updatedCards.inHand[card] === "Unknown") {
      updatedCards.inHand[card] = player;
      foundCards[card] = player
    }
  }
  return {cards: updatedCards, foundCards: foundCards}
}

function updateCardsNotInHand(addCards, player, cards, numberOfPlayers) {
  let updatedCards = JSON.parse(JSON.stringify(cards));
  let foundCards = {};
  for (const card of addCards) {
    if (!(card in updatedCards.notInHand)) {
      updatedCards.notInHand[card] = player
    } else {
      if (!updatedCards.notInHand[card].includes(player)) {
        updatedCards.notInHand[card] = updatedCards.notInHand[card].concat(player)
      }
    }
    if (updatedCards.notInHand[card].length === numberOfPlayers && !(card in updatedCards.inHand)) {
      const gameUpdate = updateSolution(card, updatedCards.solution);
      updatedCards.solution = gameUpdate.solution;
      for (const key in gameUpdate.foundCards) {
        foundCards[key] = gameUpdate.foundCards[key]
      }
    }
  }
  return {
    cards: updatedCards,
    foundCards: foundCards,
  }
}

function updateSolution(card, solution) {
  let updatedSolution = JSON.parse(JSON.stringify(solution));
  let foundCards = {};
  if (!solution.includes(card)) {
    updatedSolution = updatedSolution.concat(card);
    foundCards[card] = "solution";
  }
  return {
    solution: updatedSolution,
    foundCards: foundCards
  }
}

function checkAllTurns(turns, cards) {
  let updatedCards = JSON.parse(JSON.stringify(cards));
  let foundCards = {};
  let addedCard = true;
  let stopLooping = 0;
  while (addedCard || stopLooping > 50) {
    addedCard = false;
    for (const turn of turns) {
      if (turn.showPlayer !== "Nobody") {
        const player = turn.showPlayer;
        const turnCards = turn.cards;
        const card = checkHasOneCard(turnCards, player, updatedCards.notInHand);
        if (card) {
          let gameUpdate = updateCardsInHand([card], player, updatedCards);
          updatedCards = gameUpdate.cards;
          for (const key in gameUpdate.foundCards) {
            foundCards[key] = gameUpdate.foundCards[key];
            addedCard = true
          }
        }
      }
    }
    let gameUpdate = checkSolutionCards(updatedCards);
    updatedCards = gameUpdate.updatedCards;
    for (const key in gameUpdate.foundCards) {
      foundCards[key] = gameUpdate.foundCards[key]
    }
  }
  return {
    updatedCards: updatedCards,
    foundCards: foundCards,
  }
}

function checkHasOneCard(turnCards, player, cardsNotInHand) {
  let numberOfCardsNotInHand = 0;
  let canHaveCard = null;
  for (const category in turnCards) {
    const card = turnCards[category];
    if (card in cardsNotInHand) {
      if (cardsNotInHand[card].includes(player)) {
        numberOfCardsNotInHand++
      } else {
        canHaveCard = card
      }
    }
  }
  if (numberOfCardsNotInHand === 2) {
    return canHaveCard
  }
  return null
}

function checkSolutionCards(cards) {
  let updatedCards = JSON.parse(JSON.stringify(cards));
  let foundCards = {};
  for (const category of cards.categories) {
    const catCards = cards[category];
    let numberOfCardsInHand = 0;
    let solution;
    for (const card of catCards) {
      if (card in cards.inHand) {
        numberOfCardsInHand++
      } else {
        solution = card
      }
    }
    if (numberOfCardsInHand === catCards.length - 1) {
      const gameUpdate = updateSolution(solution, cards.solution);
      updatedCards.solution = gameUpdate.solution;
      for (const key in gameUpdate.foundCards) {
        foundCards[key] = gameUpdate.foundCards[key]
      }
    }
  }

  return {
    updatedCards: updatedCards,
    foundCards: foundCards
  }
}

function fillCardsNotInHand(cards, players) {
  let updatedCards = JSON.parse(JSON.stringify(cards));
  let foundCards = {};
  for (const card in cards.inHand) {
    if (!cards.inHand[card] === "Unknown") {
      for (const player of players) {
        if (player !== cards.inHand[card]) {
          const gameUpdate = updateCardsNotInHand([card], player, updatedCards, players.length);
          updatedCards = gameUpdate.cards;
          for (const key in gameUpdate.foundCards) {
            foundCards[key] = gameUpdate.foundCards[key]
          }
        }
      }
    }
  }
  for (const card of cards.solution) {
    for (const player of players) {
      const gameUpdate = updateCardsNotInHand([card], player, updatedCards, players.length);
      updatedCards = gameUpdate.cards;
      for (const key in gameUpdate.foundCards) {
        foundCards[key] = gameUpdate.foundCards[key]
      }
    }
  }
  return {
    updatedCards: updatedCards,
    foundCards: foundCards
  }
}