class Inimigos{
      constructor(x,y, largura, altura, velocidade){
        this.corpo =Matter.Bodies.rectangle(x,y,largura,altura,{
            isStatic:false,
            friction: 0.3,
            restitution: 0.1, 
            density: 0.8,
            frictionAir:0.001,
            inertia: Infinity, 
            inverseInertia: 0.0001 
    })
        this.largura=largura;
        this.altura=altura;
        this.velocidade = velocidade;
        this.sentido = 1; 

        this.image= loadImage(
            'Enemy.png'
        )

        Matter.World.add(mundo, this.corpo);
}
    mostrar(){
        const posicao = this.corpo.position;
        push();
        imageMode(CENTER);
        image(this.image,posicao.x, posicao.y, this.largura, this.altura);
        pop();
    }

    movimento(){
        Matter.Body.setVelocity(this.corpo,{
            x:this.velocidade*this.sentido,
            y:this.corpo.velocity.y
        })
    }

    verificarBorda(plataformas){
        const pos = this.corpo.position

        for(let plat of plataformas){
            const esquerda=plat.corpo.position.x - plat.largura/2;
            const direita=plat.corpo.position.x + plat.largura/2;
            const topo=plat.corpo.position.y - plat.altura/2;

            const emCima = Math.abs(pos.y+this.altura/2-topo)<10 &&
                           pos.x>esquerda &&pos.x<direita;
            
            if (emCima){
                if(pos.x<=esquerda+10){
                    this.sentido=1;
                }else if (pos.x>=direita -10){
                    this.sentido =-1
                }
            }



        }
    }
}