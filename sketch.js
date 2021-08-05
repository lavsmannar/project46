var mario,obstacle,ground,coin;
var marioImg,marioJumping,obstacleImg,groundImg,coinImg,jumpSound;
var obstacleGroup;
var velocity;

var score,coins;

var PLAY=1;
var END=0;
var gamestate=PLAY;

function preload(){
    marioImg=loadImage('images/mario.png');
    marioJumping=loadImage('images/marioJumping.png');
    
    obstacleImg=loadImage('images/obstacle.png');

    groundImg=loadImage('images/marioGround.png');

    coinImg=loadImage('images/coin.png');

    jumpSound=loadSound('Mario-jump-sound.mp3');
}

function setup(){
    createCanvas(800,400);
    mario=createSprite(100,330,15,15);
    mario.addImage(marioImg);
    mario.scale=0.01;

    ground=createSprite(600,400,1600,100);
    ground.addImage(groundImg);
    ground.scale=0.6; 
    ground.velocityX=-6;   

    obstacleGroup=new Group();

    velocity=-6;

    score=0;
}

function draw(){
    if(gamestate===PLAY){
    background('lightblue');
    
    spawnObstacles();

    mario.collide(ground);
    mario.velocityY+=0.8;

    if(keyDown('space')&&mario.y>330){
        mario.velocityY=-15;
        jumpSound.play();
    }
    
    if(ground.x<=190){
        ground.x=600;
    }

    if(frameCount%500===0){
        ground.velocityX-=1;
        velocity-=1;
    }

    if(mario.isTouching(obstacleGroup)){
        gamestate=END;
    }
    
    score++;

    textSize(15);
    text(40,40,'Score: '+score);

    drawSprites();
    }
}

function spawnObstacles(){
    if(frameCount%170===0){
        var obstacle=createSprite(900,335,15,15);
        obstacle.addImage(obstacleImg);
        obstacle.scale=0.05;
        obstacle.velocityX=velocity;
        obstacle.lifetime=5000;
        obstacleGroup.add(obstacle);
    }
}