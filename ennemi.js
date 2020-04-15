class Ennemi {

  constructor(x, y, widtht, heightt, damage = 0) {
    this.img = loadImage("img/ennemis.png");

    this.x = x;
    this.y = y;
    this.w = widtht;
    this.h = heightt;
    this.damage = damage;
  }

  //affiche les ennemis + effectue leur déplacement + attaque
  show() {
    this.move(2);
    this.attack();
    if (!this.death()) { //si il n'est pas mort
      //plus il prend de dégat plus la teinture passe de blanc à rouge
      tint(255, 255 - this.damage * 100, 255 - this.damage * 100);
      image(this.img, this.x, this.y, this.w, this.h);
      noTint();
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

  //attaques, plus rares quand il y a beaucoup d'ennemis
  attack() {
    let speedAtt;
    if (difficulty == "easy") {speedAtt=0.02-ennemis.length*0.002;}
    else if (difficulty =="medium") {speedAtt=0.03-ennemis.length*0.002;}
    else if (difficulty =="hard" || difficulty == "impossible") {speedAtt=0.05-ennemis.length*0.003;}
    if (random(1) < speedAtt) {
      let bul1 = new Bullet(this.x + 35, this.y + 80, 0, 3,16,18,1);
      bullets.push(bul1);
    }
  }

  death() {
    if (this.damage > 2) {
      tint(200, 0, 0);
      image(this.img, this.x, this.y, this.w, this.h);
      image(boom, this.x + 10, this.y);
      noTint();
      return true;
    }
    return false;
  }
}