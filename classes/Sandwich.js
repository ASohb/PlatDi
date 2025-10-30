class Sandwich{
    constructor(x,y, largura, altura){
        this.corpo= Matter.Bodies.rectangle(x,y,largura,altura,{isStatic:true});
        this.largura=largura;
        this.altura= altura;
        this.imagem=loadImage('../Sandwich.png');
        Matter.World.add(mundo, this.corpo);
    }

    mostrar(){
        const posicao = this.corpo.position;
        push();
        imageMode(CENTER);
        image(this.imagem, posicao.x,posicao.y, this.largura, this.altura);
        pop();
    }
}