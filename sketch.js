const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

var gameState = 0;

let engine;
let world;
var balls = [];
var basket,basketImg;
var wonImg, won, appleImg;
var BG,BGimg;
var score = 0;


function preload(){
  BGimg = loadImage("assets/copyright.jpg");
  basketImg = loadImage("assets/basket.png");
  wonImg = loadImage("assets/WONN.png");
  appleImg = loadImage("assets/iAPPLE.png");
}

function setup() {
  var canvas = createCanvas(500, 500);

  engine = Engine.create();
  world = engine.world;

  won = createSprite(250,250,200,200);
  won.addImage(wonImg);
  won.scale = 0.5;

  
  basket = createSprite(250,480,70,25);
  basket.addImage(basketImg);
  basket.scale = 0.2;

 
}

function draw() {
  background(BGimg);
  Engine.update(engine);

  if (gameState = 1){
    //Score
    textSize(30);
    fill("white");
    text("apples obtained:", 20, 50);
    textSize(30);
    fill("white");
    text(score, 250, 50);
  
    //Ball Null
      for(var i = 0; i < balls.length; i++){
        showBalls(balls[i]);

        if (collide(balls[i])==true){
          score = +1;
        }
      }

    if (keyDown(LEFT_ARROW)){
      basket.x = basket.x -6;
    }
    
    if (keyDown(RIGHT_ARROW)){
      basket.x = basket.x +6;
    }
    won.visible = false;

    createBalls();
  }



  if (gameState = 0){
    won.visible = true;
  }



  drawSprites();
}
//AAAAAAAAAAAAAAAAAAAAAAAAAAAAA
function collide(ball){
  if (ball != null){
    var distance = dist(ball.body.position.x, ball.body.position.y, basket.position.x, basket.position.y);
    if (distance <= 100){
      World.remove(world, ball);
      ball = null;
      return true;
    }
    else {
      return false;
    }
  }
}

function createBalls(){
  ball = new Ball(200,200,50,50,10);
  var randPOS = Math.round(random(20,400));
  ball.position.x = randPOS;
  balls.push(ball);
}

function  showBalls(ball){
  if (ball){
    ball.display();
  }
}