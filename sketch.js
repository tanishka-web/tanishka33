var PLAY = 1;
var END = 0;
var gameState = PLAY;

var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;
var land,landw
var score=0;
var sky,skyw
var gameOver, restart;
var sound,sound1


function preload(){
  trex_running =   loadAnimation("Screenshot (636)_LI.jpg");
  trex_collided = loadAnimation("Screenshot (636)_LI.jpg");
  skyw=loadImage("sky1.jpg")
  landw=loadImage("Screenshot (737).png")
  groundImage = loadImage("ground2.png");
  sound=loadSound("Ding-sound-effect.mp3")
  sound1=loadSound("mixkit-retro-arcade-lose-2027.wav")
  cloudImage = loadImage("Screenshot (640)_LI.jpg");
  
  obstacle1 = loadImage("Screenshot (638)_LI.jpg");
  obstacle2 = loadImage("Screenshot (638)_LI.jpg");
  obstacle3 = loadImage("Screenshot (638)_LI.jpg");
  obstacle4 = loadImage("Screenshot (638)_LI.jpg");
  obstacle5 = loadImage("Screenshot (638)_LI.jpg");
  obstacle6 = loadImage("Screenshot (638)_LI.jpg");
  
  gameOverImg = loadImage("over.png");
  restartImg = loadImage("Screenshot (634).png");
}

function setup() {
  createCanvas(windowWidth,windowHeight);
  
  sky=createSprite();
  sky.addImage("sky",skyw)
  sky.scale=0.3
  
 
  
  trex = createSprite(50,486,20,50);
  
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided", trex_collided);
  trex.scale = 0.1;
  
  ground = createSprite(200,480,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -(6 + 3*score/100);
  
   land=createSprite(550,600,80,10 );
 land.addImage("land",landw)
  land.x = land.width /2;
  land.velocityX = (-6)
  land.scale=1
   
  gameOver = createSprite(300,260);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(300,340);
  restart.addImage(restartImg);
  
  gameOver.scale = 0.2;
  restart.scale = 0.1;

  gameOver.visible = false;
  restart.visible = false;
  
  invisibleGround = createSprite(200,486,400,10);
  invisibleGround.visible = false;
  
  cloudsGroup = new Group();
  obstaclesGroup = new Group();
  
  score = 0;
}

function draw() {
  //trex.debug = true;
  background("black");
  textSize(30);
  fill("white")
  text("Score: "+ score, 20,250);
  
  if (gameState===PLAY){
    score = score + Math.round(getFrameRate()/60);
    ground.velocityX = -(6 + 3*score/100);
    land.velocityX = -(6 + 3*score/100);
  
    if(touches.length>0||keyDown("space") && trex.y >=  400) {
      trex.velocityY = -12;
      sound.play();
      touches=[]
    }
  
    trex.velocityY = trex.velocityY + 0.8
  
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    
     if (land.x < 300){
      land.x = land.width/2;
    }
  
    trex.collide(invisibleGround);
    spawnClouds();
    spawnObstacles();
  
    if(obstaclesGroup.isTouching(trex)){
        gameState = END;
      sound1.play()
    }
  }
  else if (gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    
    //set velcity of each game object to 0
    ground.velocityX = 0;
    land.velocityX=0
    trex.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
    
    //change the trex animation
    trex.changeAnimation("collided",trex_collided);
    
    //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
    
    if(mousePressedOver(restart)) {
      reset();
    }
  }
  
  
  drawSprites();
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 100 === 0) {
    var cloud = createSprite(600,3,40,10);
    cloud.y = Math.round(random(160,190));
    cloud.addImage(cloudImage);
    cloud.scale = 0.1;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //add each cloud to the group
    cloudsGroup.add(cloud);
  }
  
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,460,10,40);
    //obstacle.debug = true;
    obstacle.velocityX = -(6 + 3*score/100);
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.1;
    obstacle.lifetime = 300;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  
  trex.changeAnimation("running",trex_running);
  
 
  
  score = 0;
  
}