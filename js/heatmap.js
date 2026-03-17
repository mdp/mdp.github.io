/* global d3 */

function splitHex(s) {
  var arr = [], i;
  for (i=0; s.length > i; i=i+2) {
    arr.push(parseInt(s.substr(i, 2), 16));
  }
  return arr;
}

//var colorScale = d3.scale.linear().domain([0,31,63,95,127,159,191,223,255]).range(["#FFF","#FF0","#F90","#F00","#F0F","#00F","#0F0","#0FF","#000"]);
var colorScale = d3.scale.linear().domain([0,255]).range(["#2ba6cb","#f9f9f9"]);

function HeatMap(div) {
  this.div = div;
  this.keyLength = 128;
  this.width = 300;
  this.gridWidth = 8;
  this.squareSize = Math.floor(this.width / this.gridWidth);
  this.height = Math.floor(this.keyLength * this.squareSize / 8);
  this.svg = d3.select(div).append("svg").attr("width", this.width).attr("height", this.height).append("g");
}

HeatMap.prototype.initialize = function (data) {
  var self = this;
  this.heatMap = this.svg.selectAll(".byte")
    .data(data)
    .enter().append("rect")
    .attr("x", function(d,i) { var x = i % self.gridWidth; return (x * self.squareSize) })
    .attr("y", function(d,i) { var y = Math.floor(i/self.gridWidth); return (y * self.squareSize); })
    .attr("ry", 32)
    .attr("rx", 32)
    .attr("class", "hour bordered")
    .attr("width", this.squareSize)
    .attr("height", this.squareSize)
    .style("fill", "#fff");
}

HeatMap.prototype.update = function (data) {
  data = splitHex(data);
  if (this.heatMap === undefined) {
    this.initialize(data)
  } else {
    this.heatMap.data(data).style("fill", function(d){ return colorScale(d)});
  }
};

