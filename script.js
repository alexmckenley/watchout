var width = window.innerWidth;
var height = window.innerHeight;


var arena = d3.select('body').append('svg').style('width', width).style('height', height);

//enemies
arena.selectAll('circle').data(d3.range(40)).enter().append('circle').attr({
  'r': 20,
  'cx': function(){return Math.random() * width;},
  'cy': function(){return Math.random() * height;},
  'class': 'enemy'
});

var move = function() {
  arena.selectAll('.enemy').transition().duration(2000).attr({
    'cx': function(){return Math.random() * width;},
    'cy': function(){return Math.random() * height;}
  });
};

setInterval(move, 2000);

//player
var drag = d3.behavior.drag()
  .on("drag", function(d) {
      d3.select(this).attr({
        'cx': d3.event.x,
        'cy': d3.event.y
      });
  });

arena.append('circle').attr({
  'fill': 'orange',
  'r': 20,
  'cx': function(){return width/2;},
  'cy': function(){return height/2;},
  'class': 'player'
}).call(drag);

