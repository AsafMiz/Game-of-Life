var run = false;
var grid;
var tmpGrid;
var cols; //width
var rows; //height
var w = 10; //size of each cell
var playButton;
var resetButton;
var clearButton;
var savebutton;
var lastConfig = 2;


function setup() {
  createCanvas(601, 401);
  frameRate(15);
  cols = floor(width / w);
  rows = floor(height / w);
  grid = make2DArray(cols, rows);
  tmpGrid = make2DArray(cols, rows);
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j] = new Cell(i, j, w);
      tmpGrid[i][j] = 0;
    }
  }
  playButton = createButton("Play");
  resetButton = createButton("Reset");
  clearButton = createButton("Clear");
  saveButton = createButton("Save");
  playButton.mousePressed(play);
  resetButton.mousePressed(resetConfig);
  clearButton.mousePressed(resetBoard);
  saveButton.mousePressed(saveCanv);
  resetConfig(); //[configID <= 0]: resetBoard , [configID > 0]: presets
}

function make2DArray(cols, rows) {
  var arr = new Array(cols);
  for (var i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
  }
  return arr;
}

function setConfig(configID) {
  resetBoard();
  lastConfig = configID;
  var tmpX = floor(cols / 2);
  var tmpY = floor(rows / 2);

  switch (configID) {
    case 1:
      for (var i = 0; i < 8; i++) {
        for (var j = 0; j < 6; j++) {
          if (
            (j == 0 && i == 6) ||
            (j == 1 && i >= 4 && i != 5) ||
            (j == 2 && (i == 4 || i == 6)) ||
            (j == 3 && i == 4) ||
            (j == 4 && i == 2) ||
            (j == 5 && (i == 0 || i == 2))) {
            grid[tmpX - 4 + i][tmpY - 3 + j].flip();
          }
        }
      }
      break;

    case 2:
      for (var i = 0; i < 5; i++) {
        for (var j = 0; j < 5; j++) {
          if (
            (j == 0 && i != 3) ||
            (j == 1 && i == 0) ||
            (j == 2 && i >= 3) ||
            (j == 3 && i != 0 && i != 3) ||
            (j == 4 && i != 1 && i != 3)) {
            grid[tmpX - 3 + i][tmpY - 3 + j].flip();
          }
        }
      }
      break;

    case 3:
      for (var i = 0; i < 39; i++) {
        if (i != 8 && (i < 14 || i > 16) && (i < 20 || i > 25) && i != 33) {
          grid[tmpX - 20 + i][tmpY].flip();
        }
      }
      break;
      // default:
      //   resetBoard();
  }
}

function draw() {
  //background(0);
  if (run) {
    update();
  }
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j].show();
    }
  }
}

update = function() {
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      var neighbors = 0;
      for (var x = -1; x <= 1; x++) {
        for (var y = -1; y <= 1; y++) {
          //update neighbors from grid
          neighbors += grid[(i + x + cols) % cols][(j + y + rows) % rows].alive;
        }
      }

      neighbors = neighbors - grid[i][j].alive;
      //update liveness in tmpGrid
      //rules of life
      if ((grid[i][j].alive == 1) && (neighbors < 2)) {
        tmpGrid[i][j] = 0;
      } // Loneliness
      else if ((grid[i][j].alive == 1) && (neighbors > 3)) {
        tmpGrid[i][j] = 0;
      } // Overpopulation
      else if ((grid[i][j].alive == 0) && (neighbors == 3)) {
        tmpGrid[i][j] = 1;
      } // Reproduction
      else if ((grid[i][j].alive == 1) && (neighbors == 2 || neighbors == 3)) {
        tmpGrid[i][j] = 1;
      } // Default
    }
  }
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      //update state
      grid[i][j].alive = tmpGrid[i][j];
    }
  }
}

function mousePressed() {
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      if (grid[i][j].contains(mouseX, mouseY)) {
        grid[i][j].flip();
      }
    }
  }
}

function play() {
  run = !run;
  if (run) {
    playButton.html("Pause");
  } else {
    playButton.html("Play");
  }
}

function resetConfig() {
  setConfig(lastConfig);
}

function resetBoard() {
  run = false;
  playButton.html("Play");
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j].alive = 0;
      tmpGrid[i][j] = 0;
    }
  }
}

function saveCanv() {
  save('canvas.png');
}
