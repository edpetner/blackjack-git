//(function(){
var liveDeck = [];
var decks; // stores number of decks for this game
var dealer = {
  name: "dealer",
  cards: []
};
var player = {
  name: "player",
  cards: [],
  cardsb: []
};
var hands = [dealer,player];

var theCards = ['', 'Ace of Clubs', '2 of Clubs', '3 of Clubs', '4 of Clubs', '5 of Clubs', '6 of Clubs', '7 of Clubs',
'8 of Clubs', '9 of Clubs', '10 of Clubs', 'Jack of Clubs', 'Queen of Clubs', 'King of Clubs',
'Ace of Hearts', '2 of Hearts', '3 of Hearts', '4 of Hearts', '5 of Hearts', '6 of Hearts', '7 of Hearts',
'8 of Hearts', '9 of Hearts', '10 of Hearts', 'Jack of Hearts', 'Queen of Hearts', 'King of Hearts',
'Ace of Spades', '2 of Spades', '3 of Spades', '4 of Spades', '5 of Spades', '6 of Spades', '7 of Spades',
'8 of Spades', '9 of Spades', '10 of Spades', 'Jack of Spades', 'Queen of Spades', 'King of Spades',
'Ace of Diamonds', '2 of Diamonds', '3 of Diamonds', '4 of Diamonds', '5 of Diamonds', '6 of Diamonds', '7 of Diamonds',
'8 of Diamonds', '9 of Diamonds', '10 of Diamonds', 'Jack of Diamonds', 'Queen of Diamonds', 'King of Diamonds'];


function mainGame(){
  makeDeck(2);
  dealHands();
  while (true){
    playHand();
    var again = prompt("Play again? [y/n]");
    if (again === "y"){
      resetHands();
      dealHands();
    } else {
      break;
    }
  }
}

function resetHands(){
  hands[0].cards.splice(0,hands[0].cards.length);
  hands[1].cards.splice(0,hands[1].cards.length);
}

function playHand(){
  var endPlay = true;
  var playerScore = playerPlay();
  var dealerScore = dealerPlay();
  console.log("--------------------------------------");
  console.log("--------------------------------------");
  console.log("Dealer's hand: " + currentHand(0) + "Score: "+dealerScore);
  console.log("Player's hand: " + currentHand(1) + "Score: "+playerScore);
  if (playerScore > 21){
    if (dealerScore > 21){
      alert("Dealer also busted, this one is a draw!");
    } else {
      alert("You have busted, the Dealer wins this one.");
    }
  } else if (dealerScore <= playerScore || dealerScore > 21){
    alert("You have won!");
  } else {
    alert("The Dealer Won!");
  }
}
function playerPlay(){
  while (true){
    var playerTotal = getTotal(1);
    if (playerTotal > 21){
      alert("You busted with: "+playerTotal);
      //endPlay = false;
      break;
    }
    if (playerTotal === 21){
      alert("FUCK YAH! That is blackjack soN!");
      break;
    }
    console.log("Player's hand: " + currentHand(1) + "Score: "+getTotal(1));
    var hitQ = prompt("Total: "+playerTotal+" - Would you like to hit? [y/n]");
    if (hitQ === "y"){
      hands[1].cards.push(dealCard());
    } else {
      alert("You have chosen to stay on: " + playerTotal);
      break;
    }
  }
  return getTotal(1);
}
function dealerPlay(){
  //var total = getTotal(0);
  while (true){
    console.log("Dealer's hand: " + currentHand(0) + "Score: "+getTotal(0));
    if (getTotal(0) < 17){
      alert("Dealers hits on " + getTotal(0));
      hands[0].cards.push(dealCard());
    } else if(getTotal(0) > 21) {
      alert("Dealer has busted with " + getTotal(0));
      return getTotal(0);
    } else {
      alert("Dealer has stayed on " + getTotal(0));
      return getTotal(0);
    }
    total = getTotal(0);
  }
}

function getTotal(plyr){
  var total = 0;
  var temp = [];
  for (var i=0; i<hands[plyr].cards.length; i++){
    var arr = hands[plyr].cards[i];
    temp.push(translateNewVal(arr));
  }
  temp.sort(function(a,b){ return b-a; });
  for (var j=0; j<temp.length; j++){
    total = translateValue(temp[j],total);
  }
  return total;
}

function translateNewVal(val){
  if (val > 13 && val < 27){ return val-13; }
  else if (val > 26 && val < 39){ return val-26; }
  else if (val > 39){ return val-39; }
  else { return val; }
}

function translateValue(val,total){
  if (val === 1){
    var qq = total + 11;
    if (qq > 21){
      total += 1;
    } else {
      total += 11;
    }
  } else if (val === 11 || val === 12 || val === 13){
    total += 10;
  } else {
    total += val;
  }
  return total;
}

function dealHands(){
  var dealer = [];
  var player = [];
    hands[0].cards.push(dealCard());
    hands[1].cards.push(dealCard());
    hands[0].cards.push(dealCard());
    hands[1].cards.push(dealCard());
}

function currentHand(plyr){
  var hand = "";
  for (var i=0; i<hands[plyr].cards.length; i++){
    var card = translate(hands[plyr].cards[i]);
    hand = hand + card + " - ";
  }
  return hand;
}

/*
 *   Makes the deck for play, this function gets called everytime a new game
 *   starts or when the previous deck falls below 20 cards
 *   -- "decks" = number of decks to include in "liveDeck[]"
 */
function makeDeck(decks){
  for (var i=0; i<(decks*52); i++){
    liveDeck.push(i+1);
  }
}

 /*
  * Takes card's # value & translates it into the image displayed
  * or value of card
  */
function translate(card){
  //return ("../css/images/"+(card)+".png
  return (theCards[card]);
}


  /*
   *  returns value of a card that has now been "dealt"
   *  removes that card from liveDeck[]
   *
   */
function dealCard(){
    var max = liveDeck.length;
    var cardGen = Math.round(Math.random()*max);
    var dealt = liveDeck[cardGen];
    if (dealt > 52){
      dealt = Math.floor(dealt/2);
    }
    //console.log(translate(dealt));
    liveDeck.splice(cardGen,1);
    return dealt;
}
mainGame();
//});
