import * as readline from "readline/promises";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


class RpgChar {

    private _nome!: string;
    private _forca!: number;
    private _destreza!: number;
    private _constituicao!: number;
    private _health!: number;
    private _magicPower!: number;


    constructor(definicoes: {
        nome: string,
        forca: number,
        destreza: number,
        constituicao: number,
    }) {
        this._nome = definicoes.nome;
        this._forca = definicoes.forca;
        this._destreza = definicoes.destreza;
        this._constituicao = definicoes.constituicao;
        this.health = this._constituicao;
        this.magicPower = this._destreza;
    }

    get nome() {
        return this._nome;
    }

    set nome(nome: string) {
        this._nome = nome;
    }

    get destreza() {
        return this._destreza;
    }

    get constituicao() {
        return this._constituicao;
    }

    get health() {
        return this._health;
    }

    set health(constituicao: number) {
        this._health = constituicao * 5;
    }

    get magicPower() {
        return this._magicPower;
    }

    set magicPower(value: number) {
        this._magicPower = Math.floor(value / 5);
    }

    static async mostrarInterface() {
        console.log("Personagens disponíveis:");

        personagens.forEach((p, i) => {
            console.log(`${i} - ${p.nome}`);
        });

        const escolhaJogador = await rl.question("Escolha qual personagem voce quer usar: ");
        const jogador = personagens[+escolhaJogador];

        if (!jogador) {
            console.log("Personagem inválido.");
            return;
        }

        const inimigos = personagens.filter((_, i) => i !== +escolhaJogador);

        console.log("\nEscolha o inimigo:");
        inimigos.forEach((p, i) => {
            console.log(`${i} - ${p.nome}`);
        });

        const escolhaInimigo = await rl.question("Escolha contra quem voce quer lutar: ");
        const inimigo = inimigos[+escolhaInimigo];

        if (!inimigo) {
            console.log("Inimigo inválido.");
            return;
        }

        console.log(`\nJogador escolheu: ${jogador.nome}`);
        console.log(`Inimigo escolhido: ${inimigo.nome}\n`);

        RpgChar.batalhar(jogador, inimigo);
        process.exit(0);
    }

    atacar(alvo: RpgChar) {
        let dano = this._forca;

        if (this._destreza > this._forca) {
            dano = this._destreza;
        }

        console.log(`${this._nome} causou ${dano} de dano em ${alvo.nome}`);
        alvo.sofrerDano(dano);
    }

    sofrerDano(dano: number) {
        this._health -= dano;
        if (this._health <= 0) {
            if (this._magicPower > 0) {
                this.recuperarVida();
                console.log(`O personagem ${this._nome} se recuperou magicamente!`);
            } else {
                this._health = 0;
                console.log(`O personagem ${this._nome} morreu.`);
            }
        }
    }

    recuperarVida() {
        this._magicPower--;
        this._health = Math.floor((this._constituicao * 5) / 2);
    }

    static batalhar(p1: RpgChar, p2: RpgChar) {
        console.log(`${p1.nome} VS ${p2.nome}`);

        let turno = 1;

        while (p1.health > 0 && p2.health > 0) {
            console.log(`\n--- Round ${turno} ---`);

            p1.atacar(p2);
            if (p2.health <= 0) break;

            p2.atacar(p1);

            console.log(`${p1.nome}: ${p1.health} HP`);
            console.log(`${p2.nome}: ${p2.health} HP`);

            turno++;
        }

        const vencedor = p1.health > 0 ? p1.nome : p2.nome;
        console.log(`${vencedor} venceu!`);
    }
}

const personagem1 = new RpgChar({
    nome: "Espadachim",
    forca: 3,
    destreza: 8,
    constituicao: 4,
});

const personagem2 = new RpgChar({
    nome: "Pugilista",
    forca: 10,
    destreza: 0,
    constituicao: 5,
});

const personagem3 = new RpgChar({
    nome: "Gosto de rapazes",
    forca: 5,
    destreza: 5,
    constituicao: 5,
});

const personagem4 = new RpgChar({
    nome: "Mago das trevas",
    forca: 4,
    destreza: 7,
    constituicao: 6,
});

const personagens = [personagem1, personagem2, personagem3, personagem4];

RpgChar.mostrarInterface();