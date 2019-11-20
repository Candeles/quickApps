var gameArr = [];

var inputW = 10;
var inputH = 10;
var mineP = .2;

function getInput(callback){
  inputW = $("#inputW").val();
  inputH = $("#inputH").val();
  mineP = $("#mineP").val()/100;

  console.log(inputW);
  console.log(inputH);
  console.log(mineP);
  callback();
}

function createBoard(bW,bH,bP, callback){
  // this creates a board with no mines
  for (j=0;j<bH;j++){
    gameArr.push([]);
    for (i=0;i<bW;i++){
      gameArr[j].push(0);
    }
  }
  // then, add mines
  var cellsFilled = (bW*bH)-(bW*bH*bP);
  //console.log (cellsFilled); //uncomment to debug

  for(j=0;cellsFilled<(bW*bH);j++){
    for (i=0;i<bW;i++){
      var randy = Math.floor(Math.random()*bW*bH)+1;
      if (randy > cellsFilled) {
        gameArr[j][i] = 1;
        cellsFilled++;
        //console.log (cellsFilled); //uncomment to debug
      }
    }
    if(j+1==bH) j=0;
  }
  callback();
}

function displayBoard(bW,bH, callback){
  var cellsHTML = "";
  for (j=0;j<bH;j++){
    for (i=0;i<bW;i++){
      cellsHTML += "<div id='cell-"+i+"-"+j+"' class='gameCell'>&nbsp;</div>";
    }
  }
  $("#gameInnerBox").remove(); // in case of new game
  $("#gameOuterBox").append("<div id='gameInnerBox'></div>");
  $("#gameInnerBox")
    .css("height", 50*bH) // 50 = cellHeight + margin
    .css("width", 50*bW) // 50 = cellWidth + margin
    .append(cellsHTML);
  callback();
}

function cellAddListeners(callback) {
  $(".gameCell")
    .click(function(event){ //must use "function" for "this"
      // on click check to see if it's a mine, then run the appropriate function
      var x = this.id.split("-")[1];
      var y = this.id.split("-")[2];
      if(gameArr[y][x]) isMine(x,y);
      else if(!gameArr[y][x]) notMine(x,y);
    })
    .hover(
      function(event){ $(this).addClass("hover"); }, // hover on
      function(event){ $(this).removeClass("hover"); } // hover off
    );
  callback();
}

function isMine(x,y,callback){
  //if it is a mine, let's show the whole board
  console.log("FAILURE AT "+x+","+y);
  $("#cell-"+x+"-"+y).addClass("mineHit").removeClass("hover");
  $(".gameCell").off(); //remove all listeners for cells
  for (j=0;j<inputH;j++){
    for (i=0;i<inputW;i++){
      if(gameArr[j][i]) {
        $("#cell-"+i+"-"+j).addClass("mine");
        console.log("mine here: "+i+","+j);
      } else notMine(i,j);
    }
  }
}
function notMine(xx,yy,callback){
  //if it is not a mine, add info to cell
  $("#cell-"+xx+"-"+yy).off() // stop the hover/click stuff and remove hover
    .removeClass("hover");  // ^

  var total = 0;
  //console.log(total);
  if(xx>0        &&        yy>0) total += gameArr[yy-1][xx-1]; // 1
                                                                     //console.log(total);
  if(                      yy>0) total += gameArr[yy-1][xx  ]; // 2
                                                                     //console.log(total);
  if(xx<inputW-1 &&        yy>0) total += gameArr[yy-1][xx+1]; // 3
                                                                     //console.log(total);
  if(xx>0                      ) total += gameArr[yy  ][xx-1]; // 4
                                                                     //console.log(total);
//if(                          ) total += gameArr[yy  ][xx  ]; // 5
  if(xx<inputW-1               ) total += gameArr[yy  ][xx+1]; // 6
                                                                     //console.log(total);
  if(xx>0        && yy<inputH-1) total += gameArr[yy+1][xx-1]; // 7
                                                                     //console.log(total);
  if(               yy<inputH-1) total += gameArr[yy+1][xx  ]; // 8
                                                                     //console.log(total);
  if(xx<inputW-1 && yy<inputH-1) total += gameArr[yy+1][xx+1]; // 9
                                                                     //console.log(total);

  $("#cell-"+xx+"-"+yy).addClass("notMine").text(total);
}

///////////////////////////////////////////////////////////////////////////////
/* BGN MAIN */
$(document).ready(()=>{ //

$("#loadGame").click(()=> {
  /*
   *  1. get input, throw in global vars because I don't understand passing vars through callbacks
   *  2. create the board based on input
   *  3. display the board only after generated
   *  4. add listeners to the cells
   */
  getInput(()=>{
    createBoard(inputW,inputH,mineP, () => {
      displayBoard(inputW,inputH, () => {
        cellAddListeners(()=>{
          console.log("ready to play!");
        });
      });
    });
  });
});

}); //
/* END MAIN */
///////////////////////////////////////////////////////////////////////////////
