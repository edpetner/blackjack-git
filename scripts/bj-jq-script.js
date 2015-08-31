$(function(){

  //----------------------------------------
  //----- Initiates Game
  //----------------------------------------
  $('#play').on('click',function(){
    makeDeck(8); // liveDeck[] is now comprised of "8" decks
    newHand();   // newHand() deals 2 cards to Dealer/Player
  });

  //----------------------------------------
  //----- Catches the user "hitting"
  //----- dealCard(#) removes a card from liveDeck[]
  //----- -- & places it in the player's hand
  //----- updateUI() takes the player's new hand and draws it
  //----- -- #hit only affects "player" for now passes "1"
  //----------------------------------------
  $('#hit').on('click',function(){
    dealCard(1);
    updateUI(1,false);
  });

  $('#stay').on('click',function(){
    while(totalScore(0) < 17){
      dealCard(0);
      updateUI(0,true);
    }
    winCheck();
    playAgain();
  });

  $('#new').on('click',function(){
    newHand();
  });

//----------------------------------------
//--------- DISPLAY FUNCTIONS ------------
//----------------------------------------
function updateUI(arg,dCheck){
  var target,yAxis;
  var playerHand = hands[arg].cards;
  if (arg === 1){
    yAxis = 350;
    target = $('#player-hand');
  } else {
    yAxis = 80;
    target = $('#dealer-hand');
  }
  target.empty();
  playerHand.forEach(function(c,i){
    target.append(createCard(Math.floor(c/13), (c%13)+1,arg,i,dCheck).css({position: 'absolute', top: yAxis, left: 100+i*160}).prop('outerHTML'));
  });
  if (dCheck===true || arg===1){
    $('<text></text>').text(curScore(arg)).css({position: 'absolute', top: yAxis+50, left: 40, 'font-size': 45}).appendTo(target);
  }
  drawScore();
}// ------------------------------ END updateUI()
function createCard(suit,value,target,i,dCheck){
  // --------------------------------- SVGs & Container
  var hearts = $('<path d="M151.299,93.486 C149.846,87.955 147.772,82.763 145.077,77.912 C142.381,73.06 137.167,65.525 129.432,55.306 C123.76,47.806 120.268,43.049 118.956,41.033 C116.799,37.752 115.241,34.74 114.28,31.998 C113.319,29.256 112.838,26.478 112.838,23.666 C112.838,18.463 114.573,14.103 118.042,10.588 C121.51,7.072 125.799,5.314 130.909,5.314 C136.065,5.314 140.542,7.142 144.338,10.799 C147.198,13.517 149.518,17.572 151.299,22.963 C152.846,17.666 155.026,13.635 157.838,10.869 C161.729,7.119 166.229,5.244 171.338,5.244 C176.401,5.244 180.69,6.99 184.206,10.482 C187.721,13.974 189.479,18.135 189.479,22.963 C189.479,27.182 188.448,31.576 186.385,36.146 C184.323,40.717 180.338,46.705 174.432,54.111 C166.745,63.814 161.143,71.783 157.628,78.017 C154.862,82.939 152.753,88.096 151.299,93.486 L151.299,93.486 z" fill="#D48888 " class="heart"/>');
  var diamonds = $('<path d="M39.419,107.322 C29.928,122.904 19.033,137.607 7.076,151.385 C19.044,165.157 30.124,179.822 39.419,195.541 C48.715,179.822 59.794,165.157 71.763,151.385 C59.806,137.607 48.911,122.904 39.419,107.322 z" fill="#D48888" class="diamond"/>');
  var clubs = $('<path d="M151.143,108.151 C145.612,108.151 140.979,110.01 137.206,113.713 C133.432,117.416 131.549,121.823 131.549,126.932 C131.549,131.104 133.159,135.463 136.393,140.057 C133.591,137.722 130.798,136.338 125.487,136.338 C115.096,136.338 107.643,144.868 107.643,155.526 C107.643,166.827 115.891,175.432 126.893,175.432 C137.909,175.432 146.175,167.918 150.237,158.776 C150.049,166.229 148.917,172.127 146.831,176.463 C144.745,180.799 141.549,184.385 137.237,187.244 C134.331,189.166 129.096,190.854 121.549,192.307 L120.987,194.713 L151.143,194.713 L181.331,194.713 L180.768,192.307 C173.221,190.854 167.987,189.166 165.081,187.244 C160.768,184.385 157.573,180.799 155.487,176.463 C153.401,172.127 152.268,166.229 152.081,158.776 C156.143,167.918 164.409,175.432 175.424,175.432 C186.427,175.432 194.674,166.827 194.674,155.526 C194.674,144.868 187.222,136.338 176.831,136.338 C171.52,136.338 168.726,137.722 165.924,140.057 C169.159,135.463 170.768,131.104 170.768,126.932 C170.768,121.823 168.885,117.416 165.112,113.713 C161.338,110.01 156.674,108.151 151.143,108.151 z" fill="#8888FF " class="club"/>');
  var spades = $('<path d="M39.419,4.459 C38.201,9.521 36.326,14.068 33.794,18.053 C31.263,22.037 26.755,26.951 20.263,32.834 C13.771,38.717 9.654,43.224 7.919,46.365 C6.185,49.506 5.326,52.693 5.326,55.928 C5.326,60.428 6.826,64.178 9.826,67.178 C12.826,70.178 16.482,71.678 20.794,71.678 C28.514,71.678 34.485,66.041 38.419,59.896 C38.12,66.615 37.013,71.993 35.076,76.021 C32.99,80.357 29.796,83.945 25.482,86.803 C22.577,88.726 17.341,90.412 9.794,91.865 L9.232,94.271 L39.388,94.271 L69.576,94.271 L69.013,91.865 C61.466,90.412 56.23,88.726 53.326,86.803 C49.012,83.945 45.818,80.357 43.732,76.021 C41.797,71.999 40.689,66.632 40.388,59.928 C44.322,66.063 50.334,71.678 58.044,71.678 C62.357,71.678 66.013,70.178 69.013,67.178 C72.013,64.178 73.513,60.428 73.513,55.928 C73.513,52.693 72.654,49.506 70.919,46.365 C69.185,43.224 65.068,38.717 58.576,32.834 C52.083,26.951 47.576,22.037 45.044,18.053 C42.513,14.068 40.638,9.521 39.419,4.459 z" fill="#8888FF " class="spade"/>');
  var subDiv = $('<g></g>').css('transform','scale(0.55)');
  // ---------------------------------

  // --------------------------------- Adjust Value of A,J,Q,K
  if (value===11){
    value = "J";
  } else if (value===12){
    value = "Q";
  } else if (value===13){
    value = "K";
  } else if (value===1){
    value = "A";
  }
  // ---------------------------------

  var card;
  if (target===0 && i===0 && dCheck===false){
    card = $('<div class="empty-frame" width="160" height="210"></div>');
    $('<svg width="150" height="200"></svg>').appendTo(card);
  } else {
    card = $('<div class="card-frame" width="160" height="210"></div>');
    var svg = $('<svg width="150" height="200"></svg>').appendTo(card);
    // ------------------------------ Applies Suit SVG to Card
    if (suit === 0) {
      $(subDiv).append(clubs);
      $(svg).append(subDiv);
    } else if(suit === 1) {
      $(subDiv).append(spades);
      $(svg).append(subDiv);
    } else if (suit === 2){
      $(subDiv).append(hearts);
      $(svg).append(subDiv);
    } else {
      $(subDiv).append(diamonds);
      $(svg).append(subDiv);
    }
    // ------------------------------ Applies Card Value to Card
    $('<text x=100 y=40></text>').text(value).css('font-size',45).appendTo(svg);
    $('<text x=20 y=190></text>').text(value).css('font-size',35).appendTo(svg);
  }
  return card; // returns new Card
} // ------------------------------ END createCard()

function playAgain(){
    $('#game-over').toggleClass("hiding");
    }
    $('#go-play').on('click',function(){
      $('#game-over').toggleClass("hiding");
      newHand();
    });
    $('end-play').on('click',function(){
      $('#game-over').toggleClass("hiding");
      resetHands();
    });

//--------------------
// -- VARIABLES
//--------------------
var liveDeck = [];
var player = {
  name: "player",
  cards: [],
  score: 100
};
var dealer = {
  name: "dealer",
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
        liveDeck.push(i);
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
  function drawScore(){
    $('#score-board').empty();
    $('<text></text>').text("Dealer:" + hands[0].score).css('font-size',50).appendTo($('#score-board'));
    $('<text></text>').text("VS Player:" + hands[1].score).css('font-size',50).appendTo($('#score-board'));
    //$('#score-board').append(scores);
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

  function curScore(arg){
    var total = totalScore(arg);
    if (total===21){
      playAgain();
      winCheck();
      return "Black Jack!";
    } else if (total > 21){
      playAgain();
      winCheck();
      return "Busted!";
    } else {
      return total;
    }
  }

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
    return (arg%13)+1;
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


}); // ------- END CLOSURE
