var bg, bgImg
var bottomGround
var topGround
var balloon, balloonImg
var obsbottom1, obsbottom1img, obsbottom2, obsbottom2img, obsbottom3, obs3bottomimg, score;
var obstop1, obstopimg1, obstop2, obstopimg2,edges; //added this edges
var coin, coinimg;
var coingroup;
var obsgroup1;
var obsgroup2;
var gamestate = "play"
var gameover, gameoverimg, restart,restartimg;

function preload(){
bgImg = loadImage("assets/bg.png")
backgroundimg = loadImage("assets/background1.jpg")
obsbottom1img = loadImage("assets/obsBottom1.png")
obsbottom2img = loadImage("assets/obsBottom2.png")
obsbottom3img = loadImage("assets/obsBottom3.png")
obstopimg1 = loadImage("assets/obsTop1.png")
obstopimg2 = loadImage("assets/obsTop2.png")
balloonImg = loadAnimation("assets/balloon1.png","assets/balloon2.png","assets/balloon3.png")
coinimg = loadImage("assets/coin2.png")
gameoverimg = loadImage("assets/gameOver.png");
restartimg = loadImage("assets/restart.png");
}

function setup(){
createCanvas(width+1000,height+350)
score = 0;
//background image
//bg = createSprite(0,0,width,height);
//bg.addImage(backgroundimg);
//bg.scale = 1;
console.log(displayWidth);
console.log(windowWidth);

//creating top and bottom grounds
bottomGround = createSprite(200,390,800,20);
bottomGround.visible = false;

topGround = createSprite(200,10,800,20);
topGround.visible = false;
      
//creating balloon     
balloon = createSprite(100,200,20,50);
balloon.addAnimation("balloon",balloonImg);
balloon.scale = 0.2;

gameover = createSprite(width+500,height+175);
gameover.addImage(gameoverimg);
restart = createSprite(width+500,height+125);
restart.addImage(restartimg);

edges=createEdgeSprites() //added this
coingroup = new Group()
obsgroup1 = new Group()
obsgroup2 = new Group()
}

function draw() {
  
  background(backgroundimg);
  fill("black")
          textSize(40)
          text("Score: "+score,width-300,100)
          if(keyDown("UP_ARROW")) {
            balloon.velocityY = -6;
            }
          if(gamestate=="play"){
            //making the hot air balloon jump
            

            //adding gravity
           balloon.velocityY = balloon.velocityY + 0.3;
           createBird();
           createBuilding();
           createCoin();
           if(balloon.isTouching(coingroup)){
             score = score+3;
             coingroup[0].destroy();
           }
           if(balloon.isTouching(obsgroup1)){
             score = score-4;
             obsgroup1[0].destroy();
           }
           if(balloon.isTouching(obsgroup2)){
             score = score-2;
             obsgroup2[0].destroy();
           }
           gameover.visible = false;
           restart.visible = false;
           if(score<=-10){
             gamestate="end"
             coingroup.setVelocityXEach(0);
             obsgroup1.setVelocityXEach(0);
             obsgroup2.setVelocityXEach(0);
            
           }
          }
          if(gamestate="end"){
            gameover.visible = true;
            restart.visible = true;
            score = 0;
            if(mousePressedOver(restart)){
              gamestate = "play"
            }
            
          }


          
   balloon.collide(edges) //added this
   
        drawSprites();
        
}

function createBuilding(){
  if(frameCount%150==0){
    obsbottom1 = createSprite(1800,675,100,200)
    //obsbottom1.addImage(obsbottom1img);
    obsbottom1.velocityX = -2; 
    obsbottom1.scale = 0.3;
    rand=Math.floor(random(1,4))
    console.log(rand);
    switch(rand){
      case 1:obsbottom1.addImage(obsbottom1img)
      break;
      case 2:obsbottom1.addImage(obsbottom2img)
      break;
      case 3:obsbottom1.addImage(obsbottom3img)
      break;
      default:break;
    }
    obsgroup1.add(obsbottom1)
  }
}

function createBird(){
  if(frameCount%110==0){
    obstop2 = createSprite(1100,random(30,100),100,200)
    //obstop2.addImage(obstop2img);
    obstop2.velocityX = -2; 
    obstop2.scale = 0.2;
    rand2=Math.floor(random(1,3))
    switch(rand2){
      case 1:obstop2.addImage(obstopimg1)
      break;
      case 2:obstop2.addImage(obstopimg2)
      break;
      default:break;
    }
    obsgroup2.add(obstop2)
  }
}

function createCoin(){
  if(frameCount%170==0){
  coin = createSprite(1200,random(30,110))
  coin.addImage(coinimg);
  coin.scale = 0.025;
  coin.velocityX = -1;
  coingroup.add(coin)
  }
}



