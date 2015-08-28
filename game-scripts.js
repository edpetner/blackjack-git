
function mainGame(players){
  dealHands(players);



}
$('#start-game').on('click',function(){
  buildGame(('#number-of-players').val());

});

$('#hit-button').on('click',function(){
  paintCard(drawCard(player[x]),1);
});

$('#stay-button').on('click',function(){
  clearBoard();
  x = nextPlayer(x);
  paintCard(drawCard(player[x]),1);
});

$('#split-button').on('click',function(){
  playerSplit(x);
});

$('#double-button').on('click',function(){
  playerDouble(x);
});

function buildGame(arg){
  for (var i=0; i<arg; i++){
    initPlayer(i);
  }
  paintCard(drawCard(),0));
}
