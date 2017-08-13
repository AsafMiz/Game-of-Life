function Cell(i, j, w) {
  this.i = i;
  this.j = j;
  this.x = i * w;
  this.y = j * w;
  this.w = w;

  this.alive = 0;
}

Cell.prototype.show = function() {
  stroke(0);
  if (this.alive == 0) {
    fill(200);
  } else {
    fill(0);
  }
  rect(this.x, this.y, this.w, this.w);
}

Cell.prototype.contains = function(x, y) {
  return (x > this.x && x < this.x + this.w && y > this.y && y < this.y + this.w);
}

Cell.prototype.flip = function() {
  this.alive = (this.alive + 1) % 2;
  tmpGrid[this.i][this.j] = this.alive; //needed?
  this.show();
}
