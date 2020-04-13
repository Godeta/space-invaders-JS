class Bullet {

  constructor(x, y, dirX, dirY, wid = 13, hei = 16) {
    this.img = loadImage("img/bullet.png");
    this.x = x;
    this.y = y;
    this.dirX = dirX;
    this.dirY = dirY;
    this.w = wid;
    this.h = hei;
  }

  show() {
    this.move();
    //les balles du gunner sont colorées en rouge pour les distinguer des //ennemis
    tint(200, 83, 20);
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