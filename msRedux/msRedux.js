var gameArr = [];

var inputW = 5;
var inputH = 5;
var bombPerc = .2;

function createBoard(bW, bH, bP, callback){
  // this creates a board with no bombs
  for (j=0;j<bW;j++){
    gameArr.push([]);
    for (i=0;i<bH;i++){
      gameArr[j].push(0);
    }
  }
  // then, add bombs
  var cellsFilled = (bW*bH)-(bW*bH*bP);
  //console.log (cellsFilled);

  for(j=0;cellsFilled<(bW*bH);j++){
    for (i=0;i<bW;i++){
      var randy = Math.floor(Math.random()*bW*bH)+1;
      if (randy > cellsFilled) {
        gameArr[j][i] = 1;
        cellsFilled++;
        console.log (cellsFilled);
      }
    }
    if(j+1==bH) j=0;
  }
  callback();
}

function displayBoard(bW,bH, callback){
  var cellsHTML = "";
  $(document).ready(()=>{
    for (j=0;j<bW;j++){
      for (i=0;i<bH;i++){
        cellsHTML += "<div id='cell-"+i+","+j+"' class='gameCell'></div>";
      }
      cellsHTML += "<br>";
    }
    $("#gameBox").append(cellsHTML);
  });
  callback();
}

$("#loadGame").click(()=> {
  createBoard(inputW,inputH,bombPerc, () => {
    displayBoard(inputW,inputH, () => {
      console.log(gameArr);
    });
  });
});
