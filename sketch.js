// var board = [
//   [7, 8, 0, 4, 0, 0, 1, 2, 0],
//   [6, 0, 0, 0, 7, 5, 0, 0, 9],
//   [0, 0, 0, 6, 0, 1, 0, 7, 8],
//   [0, 0, 7, 0, 4, 0, 2, 6, 0],
//   [0, 0, 1, 0, 5, 0, 9, 3, 0],
//   [9, 0, 4, 0, 6, 0, 0, 0, 5],
//   [0, 7, 0, 3, 0, 0, 0, 1, 2],
//   [1, 2, 0, 0, 0, 7, 4, 0, 0],
//   [0, 4, 9, 2, 0, 6, 0, 0, 7]
// ];
var board = [[3, 0, 6, 5, 0, 8, 4, 0, 0],
[5, 2, 0, 0, 0, 0, 0, 0, 0],
[0, 8, 7, 0, 0, 0, 0, 3, 1],
[0, 0, 3, 0, 1, 0, 0, 8, 0],
[9, 0, 0, 8, 6, 3, 0, 0, 5],
[0, 5, 0, 0, 9, 0, 6, 0, 0],
[1, 3, 0, 0, 0, 0, 2, 5, 0],
[0, 0, 0, 0, 0, 0, 0, 7, 4],
[0, 0, 5, 2, 0, 6, 3, 0, 0]];
var cells = [];
var w = 50;
var closeSet = [];
var startNum = 1;
var current;

function setup() {
  let myCanvas=createCanvas(550, 550);
  myCanvas.parent("sudokuSolver");
  cells = new Array(9)
  for (i = 0; i < cells.length; i++) {
    cells[i] = new Array(9);
  }
  for (var i = 0; i < 9; i++) {
    for (var j = 0; j < 9; j++) {
      var val = board[i][j];
      let c;
      c = new cell(i, j, val);
      cells[i][j] = c;

    }
  }
  // print(nextSpot(board))
  //print(solve(board))
  let spot = nextSpot();
  current = cells[spot.x][spot.y];
}
function start(b){
 if(b) {if (current.val == 0) {
    if (validate(createVector(current.i, current.j), startNum) & startNum < 10) {
      current.val = startNum;
      closeSet.push(current);
      let n = nextSpot();
      if (n == safety) {
        noLoop();
      } else {
        current = cells[n.x][n.y];
      }
      startNum = 0
    } else {
      if (startNum > 8) {
        current.val = 0;
        current = closeSet.pop();
        startNum = current.val;
        current.val = 0;
      }
    }
  } else {
    let n = nextSpot();
    if (n == safety) {
      noLoop();
    } else {
      current = cells[n.x][n.y];
    }
    startNum = 0;
  }
  startNum++;}
}
function draw() {
  //frameRate(5)
  background(247, 247, 247);
  translate(50, 50);
  let safety = createVector(8, 8);
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      //cells[i][j].val=floor(random(1,9));
      cells[i][j].show();


    }
  }
 
}
function nextSpot() {
  for (var i = 0; i < 9; i++) {
    for (var j = 0; j < 9; j++) {
      if (cells[i][j].val == 0)
        return createVector(i, j);
    }
  }
  return createVector(8, 8);  //safety
}
function validate(pos, val) {
  // if(pos.x>8||pos.y>8)
  //   return none;
  //row
  for (let i = 0; i < 9; i++)
    if (cells[pos.x][i].val == val)
      return false;
  //col
  for (let i = 0; i < 9; i++)
    if (cells[i][pos.y].val == val)
      return false;
  //box
  let x = floor((pos.x) / 3)
  let y = floor((pos.y) / 3)
  for (var i = x * 3; i < x * 3 + 3; i++) {
    for (var j = y * 3; j < y * 3 + 3; j++) {
      if (cells[i][j].val == val)
        return false;
    }
  }
  return true;
}
// function solve(bo){
//   pos=nextSpot(bo);
//   if(pos==createVector(-1,-1))
//     return true;
//   for(let i=1;i<10;i++){
//     if(validate(pos,i)){
//       bo[pos.x][pos.y]=i;
//       if(solve(bo))
//         return true;
//       bo[pos.x][pos.y]=0;
//     }
//   }
//   return false
// }

function cell(i, j, val) {
  this.i = i;
  this.j = j;
  this.val = val;
  this.show = function () {
    noFill();
    strokeWeight(0.5)
    stroke(176, 176, 176);
    if (current.i == i && current.j == j) {
      fill(147, 176, 250)
    }
    if (closeSet.includes(this)) {
      fill(146, 172, 182)
    }
    rect(j * w, i * w, w - 2, w - 2)
    textSize(20)
    fill(31, 29, 26)
    if (current.i == i && current.j == j || closeSet.includes(this)) {
      fill(247, 247, 247)
    }
    textAlign(CENTER, CENTER)
    textFont("Recursive")
    strokeWeight(0.2)
    if (this.val != 0)
      text(this.val, j * w + 25, i * w + 25)
    stroke(0);
    if (i % 3 == 0 && i != 0) {
      strokeWeight(2)
      line(i * w, j * w, i * w, j * w + w)
    }
    if (j % 3 == 0 && j != 0) {
      strokeWeight(2)
      line(i * w, j * w, i * w + w, j * w)
    }
  }
}