class Gunner {

  /*for (let i=0; i<3; i++) {
   gun[i] = loadImage("img/gun"+i+".png"); 
    console.log("img/gun"+i+".png");
  }*/

  constructor(x, y, ite, widtht, heightt) {
    this.gun = [];
    this.gun[0] = loadImage("img/gun0.png");
    this.gun[1] = loadImage("img/gun1.png");
    this.gun[2] = loadImage("img/gun2.png");

    this.x = x;
    this.y = y;
    this.ite = ite;
    this.w = widtht;
    this.h = heightt;

    this.dirX = 0;
    this.damage = 0;

  }



  //prend en paramètre l'indice de l'image et affiche le gun correspondant
  show(ite) {
    /* animation loop
  image(gun[frameCount%gun.length],0,0);*/
    //si il n'est pas mort
    if (!this.death()) {
      //couleur choisie avec la case
      tint(gunCol.color());
      image(this.gun[ite], this.x, this.y, this.w, this.h);
      noTint();
    }
  }

  //ajoute la valeur indiquée à l'abscisse
  move(value = this.dirX) {
    if (this.x < 0) {
      this.x = width - 10;
    } else if (this.x > width) {
      this.x = 10;
    }
    this.x += value;
  }
  /*pour le déplacement, dans le draw et appuyer sur une flèche change la direction, relacher -> 0. Permet un déplacement plus agréable que le simple keyPressed -> x+ value */
  setDirX(val) {
    this.dirX = val;
  }

  //si on a pris trop de dégats
  death() {
    if (this.damage >= 5) {
      tint(200, 0, 0);
      image(this.gun[0], this.x, this.y, this.w, this.h);
      image(boom, this.x - 20, this.y + 20);
      noTint();
      return true;
    }
    return false;
  }
}