let gun = [];
let ite =0;
let phase =0;

function setup() {
  createCanvas(400, 400);
  
  /*for (let i=0; i<3; i++) {
   gun[i] = loadImage("img/gun"+i+".png"); 
    console.log("img/gun"+i+".png");
  }*/
  gun[0] = loadImage("img/gun0.png");
  gun[1] = loadImage("img/gun1.png");
  gun[2] = loadImage("img/gun2.png");
}

function draw() {
  background(220);
  //le début
  if (phase ==0) {
  start();
  }
  //les ennemis arrivent
  else if (phase ==1) {
     if (ite <2 && frameCount %50 == 49) {
   ite++; 
  }
    
  }
  //notre canon
  image(gun[ite],200,368);
  /* animation loop
  image(gun[frameCount%gun.length],0,0);*/

  
}

//début de la partie, lorsque phase =0
function start() {
  ite=0;
  if (frameCount %50 == 49) {
   ite++; 
    phase = 1;
  }
}