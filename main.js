let ite =0;
let phase =0;

let gun;
let ennemis = [];
let bullets = [];

let background ;

function setup() {
  createCanvas(800, 600);
  gun = new Gunner(400,510,0,100,100);
  
  //initialisation du tableau d'ennemis
  for (let i =0; i<8; i++) {
   ennemis[i]= new Ennemi(i*100,0,70,70);
  }
  //initialisation du tableau de balles
  /*for (let i =0; i<8; i++) {
   bullets[i]= new Bullet(i*100,600,2,-2);
  }*/
  
  background = loadImage("img/background.png");
}

function draw() {
  image(background,0,0,width,height);
  
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
 
  //affichage des balles
  for (let b of bullets) {
   b.show(); 
    //vérifie si une balle touche un ennemi
    for (let e of ennemis) {
     if (  b.hit(e) ) {
      e.damage++;
     }
    }
  }
  
   //affichage de notre canon
  gun.show(ite);
  //affichage des ennemis, parcours inverse (car problème lors de la supp)
  for (let i = ennemis.length-1;i>=0;i--) {
   ennemis[i].show(); 
    //si l'ennemi est mort on l'enlève de l'array
    if (ennemis[i].death() &&frameCount %30==5 ) {ennemis.splice(i,1);}
  }
  //elimination des balles, parcours inverse (car problème lors de la supp)
  for (let i = bullets.length-1;i>=0;i--) {
    if (bullets[i].out() ) {
    bullets.splice(i,1);
    }
  }
    
}

//début de la partie, lorsque phase =0
function start() {
  ite=0;
  if (frameCount %50 == 49) {
   ite++; 
    phase = 1;
  }
}

//si on appuit sur une touche
function keyPressed() {
  if (key === " ") {
    bul = new Bullet(gun.x+35,gun.y - 10,0,-3);
    bullets.push(bul);
  }
  
 if (keyCode === RIGHT_ARROW) {
   gun.move(10);
 }
  else if (keyCode === LEFT_ARROW) {
   gun.move(-10);
 }
}