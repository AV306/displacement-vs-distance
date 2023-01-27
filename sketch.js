const w = 600;
const h = 600;
const halfW = w/2;
const halfH = h/2;

const BG_COLOR = 220;

function setup()
{
  createCanvas( w, h );
  mouseX = halfW;
  mouseY = halfH;
}

function draw()
{
  background( BG_COLOR );
  
  drawGrid();
  
  drawPoint();
  
  drawDistance();
  
  drawDisplacement();
}

function drawGrid()
{
  push();
  
  textBackground( halfW, halfH, 15, 10 );
  textSize( 15 );
  fill( 0 );
  textAlign( LEFT, TOP );
  text( "(0, 0)", halfW + 5, halfH );
  
  stroke( 0 );
  strokeWeight( 1 );
  
  // Horizontal (x-axis)
  line( 0, halfH, w, halfH );

  // Vertical (y-axis)
  line( halfW, 0, halfW, h );

  pop();
}

function drawPoint()
{
  push();
  fill( 255 );
  circle( mouseX, mouseY, 20 );
  pop();
}

function drawDisplacement()
{
  push();
  
  var displacement = distance( halfW, halfH, mouseX, mouseY );
  
  textAlign( LEFT, CENTER );
  text( `Displacement: ${displacement}`,
      halfW + 10 + (mouseX - halfW ) / 2,
      halfH + (mouseY - halfH) / 2
  );
  
  stroke( 255, 0, 0 );
  line( halfW, halfH, mouseX, mouseY );
  
  pop();
}

var d = 0;
var lastMouseX = [halfW];
var lastMouseY = [halfH];
function drawDistance()
{
  push();
  
  d += distance( mouseX, mouseY, lastMouseX[lastMouseX.length - 1], lastMouseY[lastMouseY.length - 1] );
  lastMouseX.push( mouseX );
  lastMouseY.push( mouseY );
  
  for ( var i = 0; i < lastMouseX.length; i++ )
  {
    line(
      lastMouseX[i],
      lastMouseY[i],
      lastMouseX[i+1],
      lastMouseY[i+1]
    );
  }
  
  textBackground( 0, 0, halfW, 20 );
  
  fill( 0 );
  textAlign( LEFT, TOP );
  text( `Distance: ${d}`, 0, 0 );
  
  pop();
}

function distance( x1, y1, x2, y2 )
{
  return Math.sqrt(
    (x1 - x2) ** 2 +
    (y1 - y2) ** 2
  );
}

function textBackground( x, y, w, h )
{
  push();
  noStroke();
  fill( BG_COLOR );
  rect( x, y, w, h );
}
