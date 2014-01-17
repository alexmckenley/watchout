var width = window.innerWidth;
var height = window.innerHeight;

var arena = d3.select('body').append('svg').style('width', width).style('height', height);

arena.selectAll('circle').data(d3.range(40)).enter().append('circle').attr({
  'r': 20,
  'cx': function(){return Math.random() * width;},
  'cy': function(){return Math.random() * height;},
});