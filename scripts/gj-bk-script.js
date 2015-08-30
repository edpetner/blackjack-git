//(function(){
//--------------------
// -- VARIABLES
//--------------------
var liveDeck = [];
var player = {
  name: "Player",
  cards: [],
  score: 100
};
var dealer = {
  name: "Dealer",
  cards: [],
  score:  100
};
var hands = [dealer,player];
//--------------------
//--------------------

  // --------------------
  // -- Fills liveDeck w/ Cards (value 1-52 repeated "arg" times)
  // --------------------
  function makeDeck(arg){
    for (var j=0; j<arg; j++){
      for (var i=0; i<52; i++){
        liveDec.push(i);
      }
    }
  }


  // --------------------------
  // -- Initiates a new hand
  // -- alternates deal (like in a real casino!)
  // --------------------------
  function newHand(){
    resetHands();
    dealCard(0);
    dealCard(1);
    dealCard(0);
    dealCard(1);
    // refreshes UI after dealing new cards
    updateUI(0,false);
    updateUI(1,false);
  }

  function resetHands(){
    hands[0].cards.splice(0,hands[0].cards.length);
    hands[1].cards.splice(0,hands[1].cards.length);
  }

  // --------------------------
  // - Gets card from liveDeck[] and pushes it to
  // - the player/dealers hand
  // --------------------------
  function dealCard(arg){
    var max = liveDeck.length-1;
    var cID = Math.round(Math.random()*max);
    var card = liveDeck[cID];
    liveDeck.splice(cID,1);
    hands[arg].cards.push(card);
  }
  // ---------------------
  // -- Utility FUNCTIONS
  // ---------------------

  function totalScore(arg){
    var total = 0;
    var temp = [];
      // ----------- temp is filled with value of players hand
      for (var i=0; i<hands[arg].cards.length; i++){
        temp.push(convertBase(hands[arg].cards[i]));
      }
      // ----------- sorts temp so Aces[1s] are always last to be processed
      temp.sort(function(a,b){ return b-a; });
      // ----------- increments total via function to handle aces
      for (var j=0; j<temp.length; j++){
        total = gameValue(temp,j,total);
      }
    return total;
  }

  function convertBase(arg){
    return (val%13)+1;
  }

  function gameValue(arr,dex,total){
    //--------------
    // -- This handles aces:
    // -- if total value + 11 + remaining number of aces > 21 ace = 1
    if (arr[dex] === 1){
      var aceCheck = total + 11 + arr.length-(dex+1);
      if (aceCheck > 21){
        total += 1;
      } else {
        total += 11;
      }
    } else if (arr[dex]===11 || arr[dex]===12 || arr[dex]===13){
      total += 10;
    } else {
      total += arr[dex];
    }
    return total;
  }

  function winCheck(){
    var dealer = totalScore(0);
    var player = totalScore(1);
    if (dealer === player){

    } else if (dealer > player){
      hands[0].score++;
      hands[1].score--;
    } else {
      hands[1].score++;
      hands[0].score--;
    }
  }



















//});
