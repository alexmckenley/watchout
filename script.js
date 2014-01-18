var width = window.innerWidth;
var height = window.innerHeight;
var radius = 20;


var arena = d3.select('body').append('svg').style('width', width).style('height', height);

//enemies
arena.selectAll('circle').data(d3.range(20)).enter().append('circle').attr({
  'r': radius,
  'cx': function(){return Math.random() * width;},
  'cy': function(){return Math.random() * height;},
  'class': 'enemy'
});

var move = function() {
  arena.selectAll('.enemy')
  .transition()
  .duration(2000)
  .attr({
    'cx': function(){return Math.random() * width;},
    'cy': function(){return Math.random() * height;}
  })
  .tween('custom', function(d, i, a){
    var enemy = d3.select(this);

    return function(){
      checkCollision(enemy, i);

    }
  }).ease();
};

move();

setInterval(move, 1600);

//player
var drag = d3.behavior.drag()
  .on("drag", function(d) {
      d3.select(this).attr({
        'cx': d3.event.x,
        'cy': d3.event.y
      });
  });

var player = arena.append('circle').attr({
  'fill': 'orange',
  'r': radius,
  'cx': function(){return width/2;},
  'cy': function(){return height/2;},
  'class': 'player'
})

player.call(drag);



//collision detection
var collisions = 0;

var checkCollision = function(enemy, i){
  var r = radius;
  var x = enemy.attr('cx') - player.attr('cx');
  var y = enemy.attr('cy') - player.attr('cy');
  var dist = Math.sqrt(x * x + y * y);
  if(dist < 2 * radius) {
    collisions += 1;
    //debugger;
    console.log('Collision with ', i);
  }
};

