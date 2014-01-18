var radius = 20;
var width = parseInt(d3.select('.arena').style('width'));
var height = parseInt(d3.select('.arena').style('height'));

var arena = d3.select('.arena').append('svg').style('width', '100%').style('height', '100%');

var score = 0;
var highscore = 0;

//scoring
var d3score = d3.select('.score');
var d3highscore = d3.select('.highscore');

var increaseScore = function() {
  score += 1;
  d3score.text(score);
}

//enemies
arena.selectAll('circle').data(d3.range(30)).enter().append('circle').attr({
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
  .tween('custom', function(d, i){
    var enemy = d3.select(this);

    return function(){
      checkCollision(enemy, i);

    }
  }).ease();
};

move();

setInterval(increaseScore, 10);
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
    if(score > highscore) {
      highscore = score;
      d3highscore.text(highscore);
    }
    score = 0;
    d3score.text(score);
    explosion(+player.attr('cx'), +player.attr('cy'));
  }
};

//getting fancy

var explosion = function(x, y) {
  arena.insert('circle', ":first-child").attr({
    'r': 20,
    'cx': x,
    'cy': y,
    'fill' : 'purple'
  }).transition()
  .duration(500)
  .attr({
    'r': 100,
  })
  .style('opacity', '0').remove();
}