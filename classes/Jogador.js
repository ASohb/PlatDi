class Jogador{
    constructor(x,y, largura, altura){
        this.corpo =Matter.Bodies.rectangle(x,y,largura,altura,{
        friction: 0.3,
            restitution: 0.1, 
            density: 0.8,
            frictionAir:0.001,
            inertia: Infinity, 
            inverseInertia: 0.0001 
    })
        this.largura=largura;
        this.altura=altura;
        this.pulosDisponiveis=2;

        this.image= loadImage(
            'dog.png'
        )

        Matter.World.add(mundo, this.corpo);
    }

    mostrar(){
        const posicao = this.corpo.position;

        fill(255,0,0);
        imageMode(CENTER);
        image(this.image,posicao.x, posicao.y, this.largura, this.altura);
    }

       mover(direcao){
        
        Matter.Body.setVelocity(this.corpo, {
            x: direcao *100, 
            y: this.corpo.velocity.y
        });
    }

    pular(forcaPulo){
        if(this.pulosDisponiveis>0){
            
            Matter.Body.setVelocity(this.corpo, {
                x: this.corpo.velocity.x,
                y: forcaPulo * 15
            });
            this.pulosDisponiveis--; 
        }
    }

    resetarPular(){
        this.pulosDisponiveis= 2;
    }
}