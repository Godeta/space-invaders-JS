class Ennemi {

  constructor(x, y, widtht, heightt,damage =0) {
    this.img = loadImage("img/ennemis.png");
    this.boom = loadImage("img/boom_effect.png");

    this.x = x;
    this.y = y;
    this.w = widtht;
    this.h = heightt;
    this.damage = damage;
  }

  //prend en paramètre l'indice de l'image et affiche le gun correspondant
  show() {
    this.move(2);
    if (!this.death()) { //si il n'est pas mort
    image(this.img, this.x, this.y, this.w, this.h);
    }
  }

  //ajoute la valeur indiquée à l'abscisse
  move(value) {
    if (this.x > width) {
      this.x = 0
      this.y += 70;
    }
    //si il dépasse le bord de l'écran il //revient au début + une ligne en dessous
    this.x += value;
  }
  
  death () {
   if (this.damage>2) {
    tint(200,0,0);
    image(this.img, this.x, this.y, this.w, this.h);
     image(this.boom,this.x+10,this.y);
     noTint();
     return true;
   }
    return false;
  }
}