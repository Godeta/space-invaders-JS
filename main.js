let ite = 0;
let phase = 0;

let gun;
let ennemis = [];
let bullets = [];

let background;
let gunCol; //couleur du gunner choisie manuellement
let selectDiff; //selecteur de difficulté

let boss, boss2;
//image lorsque un personnage meurt et vie du perso
let boom, heart;
//les différentes difficultées
let difficulty = "easy";
//le nécessaire pour les feux d'artifices
//tableau de feux d'artifices
let fireworks = [];
//gravité et un vecteur que l'on ajoute et qui sera accéléré dans particle
let gravity;
//tableau contenant le texte à afficher
let letter = ["Victoire !", "Defaite"];
//compte l'avancée dans le tableau
let textCounter = 0;

//avant le setup, load police et musique
function preload() {
  font = loadFont('Montserrat-Regular.ttf');
}

function setup() {
  createCanvas(800, 600);
  boom = loadImage("img/boom_effect.png");
  heart = loadImage("img/heart.png");
  gun = new Gunner(400, 510, 0, 100, 100);
  boss = new Boss(width / 2, 50, 80, 180);
  boss2 = new Boss(width / 3, 0, 100, 200);

  /*initialisation des tableaux déplacée dans start comme ça pour les tests sur le boss je peux directement aller en phase 2 sans affronter les ennemis*/

  //initialisation du tableau de balles
  /*for (let i =0; i<8; i++) {
   bullets[i]= new Bullet(i*100,600,2,-2);
  }*/

  background = loadImage("img/background.png");

  //petit texte sous le canvas
  createP("Repeindre notre canon :");
  //permet de choisir la couleur du boss
  gunCol = createColorPicker(color(255, 255, 255)).input(redraw);
  //choisir la difficulté
  selectDiff = createSelect();
  selectDiff.option('easy');
  selectDiff.option('medium');
  selectDiff.option('hard');
  selectDiff.option('impossible');
  selectDiff.changed(mySelectEvent); //si on change de valeur alors ça lance la fonction mySelectEvent

  //fireworks :
  //gravité dirige de 0 en abscisse et +0.2 en ordonné
  gravity = createVector(0, 0.2);
}

function draw() {
  image(background, 0, 0, width, height);
  /*déroulement du jeu avec une phase pour le début, une pour les ennemis, une pour le boss et 2 pour victoire ou défaite*/
  allPhases();
  //affichage constant
  display();

}

//affichage constant
function display() {
  //affichage de la vie de notre canon
  life();
  //affichage des balles
  for (let b of bullets) {
    b.show();
    //vérifie si une balle touche un ennemi
    for (let e of ennemis) {
      if (b.hit(e)) {
        e.damage++;
      }
    }
    //vérifie si une balle touche le boss
    if (phase == 2) {
      if (b.hit(boss)) {
        boss.damage++;
      }
      if (difficulty == "impossible" && b.hit(boss2)) {
        boss2.damage++;
      }
    }
    //vérifie si une balle touche notre canon
    if (b.hit(gun)) {
      gun.damage++;
    }
  }

  //affichage + déplacement de notre canon
  gun.show(ite);
  gun.move();
  //affichage des ennemis, parcours inverse (car problème lors de la supp)
  for (let i = ennemis.length - 1; i >= 0; i--) {
    ennemis[i].show();
    //si l'ennemi est mort on l'enlève de l'array
    if (ennemis[i].death() && frameCount % 30 == 5) {
      ennemis.splice(i, 1);
    }
  }
  //elimination des balles, parcours inverse (car problème lors de la supp)
  for (let i = bullets.length - 1; i >= 0; i--) {
    if (bullets[i].out()) {
      bullets.splice(i, 1);
    }
  }

  if (phase!=4) { //pour ne pas continuer lorsque l'on est en phase défaite
  //si on meurt
  if (gun.death() && frameCount % 100 == 80) {
    phase = 4;
    addFirework(0, 255);
    }
  }
}

//déroulement du jeu en différentes phases
function allPhases() {
  //le début
  if (phase == 0) {
    start();
  }

  //les ennemis arrivent
  else if (phase == 1) {
    //animation du canon
    if (ite < 2 && frameCount % 50 == 49) {
      ite++;
    }
    if (ennemis.length == 0) { //si il n'y a plus d'ennemis
      phase = 2;
    }
  }
  //tous les ennemis sont morts, le boss arrive
  else if (phase == 2) {
    boss.show();
    if (difficulty == "impossible") {
      boss2.show();
      //si les 2 boss sont morts
      if (boss.death() && boss2.death() && frameCount % 150 == 140) {
        phase = 3;
      }
    } else { //si on est pas en mode impossible
      //si le boss est mort + frameCount pour laisser un peu l'animation de mort
      if (boss.death() && frameCount % 150 == 140) {
        phase = 3;
        //ajoute un feu d'artifice
        addFirework(10, 0);
      }
    }
  }

  //le boss est mort, victoire
  else if (phase == 3) {
    //affichage de la victoire, feu d'artifice
    textCounter = 0; //indice 0 du tableau
    fill(0, 175);
    rect(0, 0, width, height);
    noFill();
    //fond noir qui recouvre le premier fond mais avec un //peu de transparence ce qui permet de laisser des traces
    allumeLeFeu();

    //recommencer
    fill(255);
    textSize(20);
    text("Appuyer sur R pour recommencer", 300, 300);
  }
  //notre canon est mort, défaite
  else if (phase == 4) {
    //affichage de la défaite, feu d'artifice
    textCounter = 1; //indice 1 du tableau
    fill(0, 175);
    rect(0, 0, width, height);
    noFill();
    //fond noir qui recouvre le premier fond mais avec un //peu de transparence ce qui permet de laisser des traces
    allumeLeFeu();
    //recommencer
    fill(255);
    textSize(20);
    text("Appuyer sur R pour recommencer", 300, 300);
  }
}

//début de la partie, lorsque phase =0
function start() {
  ite = 0;
  //réinitialisation de la vie de notre canon et du boss
  gun.damage = 0;
  boss.damage = 0;
  //en difficulté moyen on a seulement 3 vies
  if (difficulty == "medium") {
    gun.life = 3;
  } else {
    gun.life = 5;
  }
  //initialisation du tableau d'ennemis
  iniTab();
  if (frameCount % 50 == 49) {
    ite++;
    phase = 1;
  }
}

//si on appuit sur une touche
function keyPressed() {
  if (key === " ") {
    bul = new Bullet(gun.x + 35, gun.y - 10, 0, -3);
    bullets.push(bul);
  } else if (key === "r" || key === "R") {
    phase = 0;
  }

  if (keyCode === RIGHT_ARROW) {
    gun.setDirX(5);
  } else if (keyCode === LEFT_ARROW) {
    gun.setDirX(-5);
  }
}

//si on relache la touche
function keyReleased() {
  if (keyCode === RIGHT_ARROW || keyCode == LEFT_ARROW) {
    gun.setDirX(0);
  }
}

//initialisation des tableaux 
function iniTab() {
  let nbEnnemi;
  //selon la difficulté
  switch (difficulty) {
    case 'easy':
      nbEnnemi = 8;
      break;
    case 'medium':
      nbEnnemi = 12;
      break;
    case 'hard':
      nbEnnemi = 13;
      break;
    case 'impossible':
      nbEnnemi = 13;
      break;
    default:
      console.log("difficulté indéterminée !");
  }

  //tableau des ennemis
  for (let i = 0; i < nbEnnemi; i++) {
    ennemis[i] = new Ennemi(i * 100, 0, 70, 70);
  }
  //réinitialisation du tableau de balles à 0 au début
  bullets = [];
}

//vie de notre canon + difficulté
function life() {
  //5 coeurs, 1 coeur en moins pour chaque dégats
  for (let i = 0; i < gun.life - gun.damage; i++) {
    image(heart, width - 175 + i * 35, 50, 30, 30);
  }
  fill(255);
  textSize(20);
  text("Mode : " + difficulty, width - 200, 120);
}

//changement de difficulté
function mySelectEvent() {
  difficulty = selectDiff.value();
}
//feux d'artifices

//affiche les firework et les enlèves une fois fini
function allumeLeFeu() {
  //parcours de la fin au début car on retire des objets
  for (let i = fireworks.length - 1; i >= 0; i--) {
    fireworks[i].update();
    fireworks[i].show();
    if (fireworks[i].done()) {
      fireworks.splice(i, 1);
    }
  }
  console.log(fireworks.length); //affiche le nombre de feux d'artifices
}

//ajoute un feu d'artifice
function addFirework(x, r) {
  let f = new Firework(x, r);
  fireworks.push(f);
}