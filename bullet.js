class Bullet {

  constructor(x, y, dirX, dirY, wid = 13, hei = 16,owner=0) {
    this.img = loadImage("img/bullet.png");
    this.x = x;
    this.y = y;
    this.dirX = dirX;
    this.dirY = dirY;
    this.w = wid;
    this.h = hei;
    //celui qui a tiré, 0 pour le joueur, 1 pour un ennemi lambda et 2 pour le boss
    this.owner = owner; 
  }

  show() {
    this.move();
    //les balles du gunner sont colorées en rouge pour les distinguer des //ennemis
    //joueur
    if (this.owner ==0) {
    tint(200, 83, 20);
    }
    //ennemi
    else if (this.owner ==1) {
      noTint();
    }
    //boss
    else if (this.owner==2) {
      tint(200, 53, 120);
    }
    image(this.img, this.x, this.y, this.w, this.h);
    noTint();
  }

  move() {
    this.x += this.dirX;
    this.y += this.dirY;
  }
  hit(e) {
    if (this.x > e.x && this.x < e.x+e.w && this.y>e.y && this.y<e.y+e.h) {
    console.log("hit");
      this.y =-10;
      return true;
    }
    //console.log("no hit");
    return false;
    
  }
  out() {
    if (this.y<0 || this.y>height || this.x <0 || this.x > width) {
    return true
    }
    return false;
  }
}