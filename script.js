window.addEventListener('load',init,false);

var canvas=null,ctx=null;

var tecla=null;

var PAUSE=true;

var dir=0;

var puntaje=0;

var jugador=new Rectangulo(40,40,10,10);

var comida=new Rectangulo(80,80,10,10);

function random(max){
 return Math.floor(Math.random()*max);
}

function init(){
 canvas=document.getElementById('canvas');
 //canvas.style.background='#000';
 ctx=canvas.getContext('2d');
 run();
}

function run(){
 setTimeout(run,50);
 game();
 paint(ctx);
}

function game(){
 if(!PAUSE){
  // Change Direction
  if(tecla==38)
   dir=0;
  if(tecla==39)
   dir=1;
  if(tecla==40)
   dir=2;
  if(tecla==37)
   dir=3;

  // Move Rect
  if(dir==0)
   jugador.y-=10;
  if(dir==1)
   jugador.x+=10;
  if(dir==2)
   jugador.y+=10;
  if(dir==3)
   jugador.x-=10;

  // Out Screen
  if(jugador.x>canvas.width)
   jugador.x=0;
  if(jugador.y>canvas.height)
   jugador.y=0;
  if(jugador.x<0)
   jugador.x=canvas.width;
  if(jugador.y<0)
   jugador.y=canvas.height;

  // Food Intersects
  if(jugador.interseccion(comida)){
   puntaje++;
   comida.x=random(canvas.width/10-1)*10;
   comida.y=random(canvas.height/10-1)*10;
  }
 }
 // Pause/Unpause
 if(tecla==13){
  PAUSE=!PAUSE;
  tecla=null;
 }
}

function paint(ctx){
 ctx.clearRect(0,0,canvas.width,canvas.height);
 ctx.fillStyle='#0f0';
 ctx.fillRect(jugador.x,jugador.y,jugador.width,jugador.height);
 ctx.fillStyle='#f00';
 ctx.fillRect(comida.x,comida.y,comida.width,comida.height);
 ctx.fillStyle='#fff';
 //ctx.fillText('Last Press: '+lastPress,0,20);
 ctx.fillText('Puntaje: '+puntaje,0,10);
 if(PAUSE)
  ctx.fillText('PAUSE',140,75);
}

document.addEventListener('keydown',function(evt){
 tecla=evt.keyCode;
},false);

function Rectangulo(x,y,width,height){
 this.x=(x==null)?0:x;
 this.y=(y==null)?0:y;
 this.width=(width==null)?0:width;
 this.height=(height==null)?this.width:height;

 this.interseccion=function(rect){
  if(rect!=null){
   return(this.x<rect.x+rect.width&&
    this.x+this.width>rect.x&&
    this.y<rect.y+rect.height&&
    this.y+this.height>rect.y);
  }
 }
}