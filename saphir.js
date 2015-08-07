 //UTILITAIRE
console.log("Bienvenue dans Saphir, pour obtenir de l'aide, taper helpSaphir() dans la console et voir les commandes proposées.")
var helps = {
  DOM:"Fonction retournant le chemin DOM indiqué en argument, exemple : DOM('body','#container','.photo') est l'équivalent de document.body.getElementById('container').getElementsByClassName('photo')",
  size:"Fonction permettant d'écrire une taille pour le CSS à partir de donnée numérique, exemple : size(100,'vh') retourne '100vh'",
  incr:"Fonction permettant d'augmenter la valeur d'un paramètre CSS, exemple : incr(document.body.style.marginTop, 50) augmente de 50 la valeur du marginTop",
  floatRandom:"Fonction retournant un nombre aléatoire décimal entre le premier et second argument, exemple :floatRandom(5.10 , 20.5)",
  intRandom:"Fonction retournant un nombre aléatoire entier entre le premier et second argument, exemple :intRandom(10 , 25)",
  sinCurve:"Fonction retournant les valeurs d'une courbe sinusoïdale, le premier argument définit le nombre de valeur, le second la taille de la courbe",
  sinCurveDraw:"Fonction dessinant dans une div (spécifié par le premier argument), dessinant une courbe sinusoïdale d'une taille du second argument et d'une vitesse de défilement définie par le 3ème argument, le 4ème argument définit la couleur. Exemple : sinCurveDraw('content',5,10,'red')"
};
function helpSaphir() {
  console.log("helps.DOM");
  console.log("helps.size");
  console.log("helps.incr");
  console.log("helps.floatRandom");
  console.log("helps.intRandom");
  console.log("helps.sinCurve");
  console.log("helps.sinCurveDraw");
};
//recupérer classe
function C(c) {
  return document.getElementsByClassName(c);
};
//recupérer ID
function I(i) {
  return document.getElementById(i);
};
//récupérer tagName
function N(n) {
  return document.getElementsByTagName(n);
};
function DOM() {
  this.scan = "";
  for (i=0; i<arguments.length; i++) {
    this.nom = arguments[i];
    this.genre = this.nom.substring(0,1);
    if (this.genre == "#" || this.genre == ".") {
      this.nom = this.nom.substring(1,this.nom.length);
    };
    if (this.nom.indexOf("[") != -1) {
      this.num = parseInt(this.nom.substring((this.nom.indexOf("["))+1,(this.nom.indexOf("["))+2));
      this.nom = this.nom.substring(0,this.nom.length-3);
    } else {
      this.num = 0;
    };
    if (i == 0) {
      if (this.genre == "#") {
        this.scan = I(this.nom);
      } else if (this.genre == ".") {
        if (arguments[i].indexOf("[") == -1) {
          this.scan = C(this.nom);
        } else {
          this.scan = C(this.nom)[this.num];
        };
      } else {
        if (arguments[i].indexOf("[") == -1) {
          this.scan = N(this.nom);
        } else {
          this.scan = N(this.nom)[this.num];
        };
      };
    } else {
      this.tabl = [];
      for (j = 0; j < this.scan.childNodes.length; j++) {
        if (this.scan.childNodes[j].nodeType == 1) {
          if (this.genre == "#") {
              if (this.scan.childNodes[j].getAttribute("id") == this.nom){
                this.tabl = this.scan.childNodes[j];
              };
          } else if (this.genre == ".") {
              if (this.scan.childNodes[j].getAttribute("class") == this.nom){
              this.tabl.push(this.scan.childNodes[j]);
              };
          } else {
              if (this.scan.childNodes[j].tagName == this.nom.toUpperCase()){
              this.tabl.push(this.scan.childNodes[j]);
              };
          };
        };
      };
      if (arguments[i+1]) {
        this.scan = this.tabl[this.num];
      } else {
        this.scan = this.tabl;
      }
    };
  };
  if (this.scan.length == 1) {
    return this.scan[0];
  } else {
    return this.scan;
  };
};
//convertir nombre en mesure HTML
function size(n,m){
  return n.toString()+m;
};
//augmenter une valeur CSS
function incr(cible,nombre){
  this.mesure = cible.substring(cible.length-2,cible.length);
  this.valeur = parseInt(cible);
  this.result = (valeur+nombre).toString()+mesure;
  return result;
};
//nombre aléatoire décimal sur portée définie
function floatRandom(d,f) {
  this.range = Math.abs(d-f);
  return Math.random()*range+d;
};
//nombre aléatoire entier sur portée définie
function intRandom(d,f) {
  this.range = Math.abs(d-f);
  return Math.round(Math.random()*range+d);
};
//nombre aléatoire dans un tableau (troncature)
function arrayRandom(tableau){
  return Math.floor(Math.random()*tableau.length);
};
//fonction sinusoïsale avec taille
function sinCurve(i,t,s) {
    return Math.sin((i+t)/100)*s;
};
//dessiner une sinusoïsale en div
function sinCurveDraw(conteneur,taille,vitesse,couleur) {
  var sequence = {
    nombre:Math.round(I(conteneur).offsetWidth/10),
    taille:Math.round(I(conteneur).offsetHeight),
    frameCount:0,
  };
  for (i=0;i<sequence.nombre;i++){
  var barre = document.createElement("div");
  barre.className = "ligne";
  barre.style.position="relative";
  barre.style.float="left";
  barre.style.borderRightStyle="solid";
  barre.style.borderColor=couleur;
  barre.style.borderWidth="3px";
  barre.style.top="50%";
  I(conteneur).insertBefore(barre,null);
  C("ligne")[i].style.left = size(i*10,"px");
};
  var frame = setInterval(function(){
    sequence.frameCount++
    for (i=0;i<sequence.nombre;i++){
      C("ligne")[i].style.height = size(1+(sequence.taille/2+(Math.round(sinCurve(i*taille,sequence.frameCount*vitesse,sequence.taille/2)))),"px");
      C("ligne")[i].style.marginTop = ((parseInt(C("ligne")[i].style.height))/-2).toString()+"px";
    }
  },40);
};
//CHARGER UN FICHIER XML
function injectXML(fichier,cible)
{
if (window.XMLHttpRequest)
  {// code for IE7+, Firefox, Chrome, Opera, Safari
  xmlhttp=new XMLHttpRequest();
  }
else
  {// code for IE6, IE5
  xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
  }
xmlhttp.onreadystatechange=function()
  {
  if (xmlhttp.readyState==4 && xmlhttp.status==200)
    {
    document.getElementById(cible).innerHTML=xmlhttp.responseText;
    }
  }
xmlhttp.open("GET",fichier,true);
xmlhttp.send();
};
//RECHERCHER UN MOT DANS LE DICTIONNAIRE
function recherche(mot) {
  for (i=0; N("word").length; i++) {
    if (N("word")[i].getAttribute("word") == mot) {
      return i;
    };
  };
};
//RECHERCHER DES SYNONYMES POUR UN MOT
function synonym(syn) {
  var result = N("word")[recherche(syn)].getElementsByTagName("synonym");
  return result;
};
