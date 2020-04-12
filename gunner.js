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

  }



  //prend en paramètre l'indice de l'image et affiche le gun correspondant
  show(ite) {
    if (this.x <0) {
     this.x = width-10; 
    }
    else if (this.x >width) {
     this.x = 10; 
    }
     /* animation loop
  image(gun[frameCount%gun.length],0,0);*/
    image(this.gun[ite], this.x, this.y, this.w, this.h);
  }

  //ajoute la valeur indiquée à l'abscisse
  move(value) {
   this.x += value; 
  }
}