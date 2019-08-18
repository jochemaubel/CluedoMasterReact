export function playerHasOneOfTheseCards(checkCards,player,cardsInHand) {
  for(const card of checkCards) {
    if(card in cardsInHand && cardsInHand[card] === player) {
      return true
    }
  }
  return false
}

export function playerHasNoneOfTheseCards(checkCards, player, cardsNotInHand) {
  for(const card of checkCards) {
    if(!(card in cardsNotInHand) || !(cardsNotInHand[card].includes(player))) {
      return false
    }
  }
  return true
}

export function cardDictToArray(cardDict) {
  let cardArray=[];
  for(const category in cardDict) {
    cardArray.push(cardDict[category])
  }
  return cardArray
}
