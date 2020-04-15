class Boss {

  constructor(x, y, widtht, heightt,damage =0) {
    this.img = loadImage("img/boss.png");
    this.boom = loadImage("img/boom_effect.png");

    this.x = x;
    this.y = y;
    this.w = widtht;
    this.h = heightt;
    this.damage = damage;
    //pour le déplacement random avec perlin noise
    this.xoff1 =random(0,100);
    this.xoff2 = random(5000,10000);
    //vitesse
    this.speed =0.01;
  }

  //affiche le boss + son déplacement + ses attaques
  show() {
    if (!this.death()) { //si il n'est pas mort
    this.move();
    this.attack();
      //plus il prend de dégat plus la teinture passe de blanc à rouge
      tint(255,255-this.damage*10,255-this.damage*10);
    image(this.img, this.x, this.y, this.w, this.h);
      noTint();
    }
  }

  //les déplacements du boss sont aléatoires entre 0 et height-200
  move() {
    //bruit plus ou moins random entre 0 et 1 donne valeur entre 0 et width
    this.x = map(noise(this.xoff1),0,1,0,width);
    this.y = map(noise(this.xoff2),0,1,0,height-200);
    //plus rapide après avoir pris des dégats 
    if(this.damage > 8 && this.damage <13) {
     this.speed = 0.015; 
    }
    else if(this.damage > 15) {
     this.speed = 0.03; 
    }
    this.xoff1 +=this.speed;
    this.xoff2 +=this.speed;
  }
  
  //attaques fréquentes et balles plus grandes
  attack() {
    let speedAtt;
    if (difficulty=="easy") {speedAtt=0.015;}
    else if (difficulty=="medium") {speedAtt=0.02;}
    else if (difficulty == "hard" || "impossible") {speedAtt=0.03;}
    if (random(1) < speedAtt) {
      let bul1 = new Bullet(this.x + 35, this.y + 200, 0, 3,20,23,2);
      bullets.push(bul1);
    }
  }
  
  death () {
   if (this.damage>20) {
    tint(200,0,0);
    image(this.img, this.x, this.y, this.w, this.h);
     image(boom,this.x+10,this.y);
     noTint();
     return true;
   }
    return false;
  }
} 