const Motor= Matter.Engine,
      Mundo=Matter.World,
      Corpos= Matter.Bodies,
      SAT= Matter.SAT
      ;


let mundo, motor;
let plataforma= [];
let inimigos = [];


let jogador;


let nivel=1;


function setup() {
  createCanvas(windowWidth, windowHeight);


  motor = Motor.create();
  mundo = motor.world;


  motor.world.gravity.y = 2;


 iniciarNivel(nivel)


}


function draw() {
  background("skyBlue");
Motor.update(motor);
  push()
  translate(-jogador.corpo.position.x+width/2, -jogador.corpo.position.y+height/2)


  for (let plat of plataforma ){
      plat.mostrar();


      if(JogadorTocandoPlataforma(jogador, plat)){
        jogador.resetarPular();
      }
  }
 
 for (let inimigo of inimigos){
    inimigo.movimento()
    inimigo.verificarBorda(plataforma);
    inimigo.mostrar();


    let colisão = SAT.collides(inimigo.corpo, jogador.corpo)
    if(colisão.collided){
      noLoop();
      alert("gdfvdg")
    }
 }


 if(jogador.corpo.position.y>height+500){
  noLoop()
  alert("você morreu !!")
 }


  verificarColisaoComSandwich(jogador, sandwich);


  jogador.mostrar();


  if(sandwich){
    sandwich.mostrar();
  }
  pop()
  textAlign(LEFT,TOP);
  textSize(25);
  fill("orange")
  text("Nivel: "+nivel, 50,50);
}


function keyPressed(){
  if(keyCode === RIGHT_ARROW){
    jogador.mover(0.05);
  }
  if(keyCode === LEFT_ARROW){
    jogador.mover(-0.05);
  }
  if(keyCode === 32){
    jogador.pular(-1);
  }
}


function iniciarNivel(nivel){
  if(nivel===1){
    nivel1();
  }
  if(nivel==2){
    nivel2();
  }
}






function nivel1(){
   plataforma.push( new Plataformas(100, height-100, 200,20));
   plataforma.push(new Plataformas(300, height -300, 200, 20));
   plataforma.push(new Plataformas(500, height -450, 200, 20));
   plataforma.push(new Plataformas(900, height -400, 200, 20));
   plataforma.push( new Plataformas(1100, height-600, 200,20));
   plataforma.push(new Plataformas(1500, height -800, 200, 20));
   plataforma.push(new Plataformas(1700, height -1000, 200, 20));
   plataforma.push(new Plataformas(2000, height -1200, 200, 20));


   jogador = new Jogador(100, height-120,50, 50);
   sandwich = new Sandwich(2010, height-1323, 60, 20)
   inimigos.push(new Inimigos(550, height-500, 50,50,2))
}


function nivel2(){
  plataforma.push(new Plataformas(100, height - 150, 250, 20));
  plataforma.push(new Plataformas(400, height - 300, 200, 20));
  plataforma.push(new Plataformas(700, height - 450, 250, 20));
  plataforma.push(new Plataformas(1000, height - 600, 200, 20));
  plataforma.push(new Plataformas(1300, height - 450, 200, 20));
  plataforma.push(new Plataformas(1600, height - 300, 250, 20));
  plataforma.push(new Plataformas(1900, height - 150, 200, 20));
  plataforma.push(new Plataformas(2200, height - 350, 250, 20));
  jogador = new Jogador(100, height - 180, 50, 50);
  sandwich = new Sandwich(2200, height - 380, 60, 20);
}


function removerTudo(){
  for (let plat of plataforma){
    if(plat.corpo){
      Mundo.remove(mundo, plat.corpo);
    }
  }
  plataforma = [];
 
  if( sandwich && sandwich.corpo){
    Mundo.remove(mundo, sandwich.corpo);
    sandwich=null
  }
}


function verificarColisaoComSandwich(jogador, sandwich) {
  if(!sandwich) return;


  let colisao = SAT.collides(jogador.corpo, sandwich.corpo);


  if(colisao.collided){
    removerTudo();
    nivel++;
    alert("Nivel atual "+ nivel);
    iniciarNivel(nivel);
  }
}






function JogadorTocandoPlataforma(jogador, plat){
  const posicaoJogador = jogador.corpo.position;
  const posicaoPlataforma = plat.corpo.position;


  const topoPlataforma = posicaoPlataforma.y - plat.altura / 2;
  const esquerdaPlataforma = posicaoPlataforma.x - plat.largura / 2;
  const direitaPlataforma = posicaoPlataforma.x + plat.largura / 2;


  const baseJogador = posicaoJogador.y + jogador.altura / 2;
  const esquerdaJogador = posicaoJogador.x - jogador.largura / 2;
  const direitaJogador = posicaoJogador.x + jogador.largura / 2;


 
  const tocando =
    baseJogador >= topoPlataforma - 5 &&    
    baseJogador <= topoPlataforma + 10 &&    
    direitaJogador >= esquerdaPlataforma &&
    esquerdaJogador <= direitaPlataforma &&
    jogador.corpo.velocity.y >= 0;


  if (tocando) {
   
    Matter.Body.setPosition(jogador.corpo, {
      x: posicaoJogador.x,
      y: topoPlataforma - jogador.altura / 2
    });


   
    Matter.Body.setVelocity(jogador.corpo, {
      x: jogador.corpo.velocity.x,
      y: 0
    });


   
    jogador.corpo.friction = 0.8;
  } else {
   
    jogador.corpo.friction = 0;
  }


  return tocando;
}




function windowResized(){
    resizeCanvas(windowWidth, windowHeight);
}

