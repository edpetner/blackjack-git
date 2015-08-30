//(function(){
var liveDeck = [];
var decks; // stores number of decks for this game
var dealer = {
  name: "dealer",
  cards: [],
  score: 0
};
var player = {
  name: "player",
  cards: [],
  score: 0
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


function resetHands(){
  hands[0].cards.splice(0,hands[0].cards.length);
  hands[1].cards.splice(0,hands[1].cards.length);
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
    total = translateValue(temp,j,total);
  }
  return total;
}

function translateNewVal(val){
  return Math.floor(val%13)+1;
}

function translateValue(val,index,total){
  if (val[index] === 1){
    var gg = val.length-(index+1);
    var qq = total + 11 + gg;
    if (qq > 21){
      total += 1;
    } else {
      total += 11;
    }
  } else if (val[index] === 11 || val[index] === 12 || val[index] === 13){
    total += 10;
  } else {
    total += val[index];
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
    var card = translateC(hands[plyr].cards[i]);
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
  for (var j=0; j<decks; j++){
    for (var i=0; i<(52); i++){
      liveDeck.push(i);
    }
  }
}

 /*
  * Takes card's # value & translates it into the image displayed
  * or value of card
  */
function translateC(card){
  //return ("../css/images/"+(card)+".svg");
  return (theCards[card]);
}


  /*
   *  returns value of a card that has now been "dealt"
   *  removes that card from liveDeck[]
   *
   */
function dealCard(arg){
    var max = liveDeck.length-1;
    var cardGen = Math.round(Math.random()*max);
    var dealt = liveDeck[cardGen];

    //console.log(vv, dealt);
    liveDeck.splice(cardGen,1);
    //return dealt;
    hands[arg].push(dealt);
}
//mainGame();
//});
