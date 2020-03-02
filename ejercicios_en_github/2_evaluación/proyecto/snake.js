//Variables globales
var velocidad = 80;
var tamaño = 10;

class objeto {
    constructor(){
        this.tamaño = tamaño;
    }
    //&&=Y
    choque(obj){
        var difx = Math.abs (this.x - obj.x);
        var dify = Math.abs(this.y - obj.y);
        if (difx >= 0 && difx < tamaño && dify >= 0 && dify < tamaño) {
            return true;    
        } else {
            return false;
        }
    }
}
// con extends se pasan las variables de la clase haciendo esta una subclase por ejemplo haciendo objeto una subclase.
//con esta clase haremos que cuando la serpiente coma, crezca.
class Cola extends objeto {
    constructor(){
        super();
        this.x = x;
        this.y = y;
        this.siguiente = null;
    }
    dibujar(ctx) {
        if(this.siguiente != null){
            this.siguiente.dibujar(ctx);
        }
        ctx.fillStyle = "#0000FF";
        ctx.fillRect (this.x, this.y, this.tamaño, this.tamaño);
    }
    // != (not)
    setxy(x,y) {
        if(this.siguiente != null){
            this.siguiente.setxy(this.x, this.y);
        }
        this.x = x;
        this.y = y;
    }
    MediaStreamError() {
        if(this.siguiente == null){
            this.siguiente = new Cola(this.x, this.y);
        } else {
            this.siguiente.meter();
        }
    }
    verSiguiente(){
        return this.siguiente;
    }
}
// la funcion de la comida
class food extends objeto{
    constructor(){
        super();
        this.x = this.generar();
        this.y = this.generar();
    }
    generar(){
        var num = (Math.floor(Math.random() * 59)) * 10;
        return num;
    }
    colocar(){
        this.x = this.generar();
        this.y = this.generar();
    }
    dibujar(ctx){
        ctx.fillStyle = "#FF0000";
        ctx.fillRect(this.x, this.y, this.tamaño, this.tamaño);
    }
}
//Objetos del juego
var cabeza = new Cola(20,20);
var comida = new food();
var ejex = true;
var ejey = true;
var xdir = 0;
var ydir = 0;
function movimiento(){
    var nx = cabeza.x+xdir;
    var ny = cabeza.y+ydir;
    cabeza.setxy(nx,ny);
}
function control(event) {
    var cod = event.keyCode;
    //es una ppropiedad y no funcion( por lo tanto no parentesis)
    if(ejex){
        if(cod == 38){
            ydir = -tamaño;
            //de esta manera los cuadrados no de atras de la serpiente no pueden atravesar a la serpiente
            xdir = 0;
            ejex = false;
            ejey = true;
        }
        if(cod == 40){
            ydir = tamaño;
            xdir = 0;
            ejex = false;
            ejey = true;
        }
    }
    if(ejey){
     if(cod == 37){
        ydir = 0;
        xdir = -tamaño;
        ejey = false;
        ejex = true;
    }
    if(cod == 39){
        ydir = 0;
        xdir = tamaño;
        ejey = false;
        ejex = true;
    }
    //controlando el ejex hacemos que no podamos movernos en ejey de esta manera no podremos retroceder
}
//con esta funcion, en caso de que por alguna cosa terminase el juego, todos los valores volverian a estar como estaban al principio
function findeJuego(){
    xdir = 0;
    ydir = 0;
    ejex = true;
    ejey = true;
    cabeza = new Cola(20,20);
    alert("Perdiste");
}
//II= o
function choquepared(){
    if(cabeza.x <0 || cabeza.x > 590 || cabeza.y > 0 || cabeza.y > 590){
        findeJuego();
    }
}
function choquecuerpo(){
    var temp = null;
    try{
    temp = cabeza.verSiguiente().verSiguiente(); 
    }catch(err) {//el catch err es como un if y else pero en vez de una accion analiza si hay un error en este caso va a intentar ejecutar algo con try y si no puede pues con catch
        temp = null;
    }
    while(temp != null){
        if(cabeza.choque(temp)){
            //fin de juego
            findeJuego();
        } else{
            temp = temp.verSiguiente();
        }
    }
}
function dibujar() {
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext ("2d");
    ctx.clearRect(0,0, canvas.Width, canvas.height);
    //aqui abajo va todo el dibujo
    cabeza.dibujar(ctx);
    comida.dibujar(ctx);
}
//funcion principal del juego
function principal() {
    choquecuerpo();
    choquepared();
    dibujar();
    movimiento();
    
    if(cabeza.choque (comida)){
        comida.colocar();
        cabeza.meter();
    }  
}
setInterval("principal()", velocidad);