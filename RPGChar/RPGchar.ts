class RpgChar {

    private _nome!: string;
    private _str!: number;
    private _dex!: number;
    private _hp!: number;
    private _mp!: number;

    get nome(){
        return this._nome;
    }

    set nome(nome: string){
        this._nome = nome;
    }

    get str(){
        return this._str;
    }

    set str(str: number){
        if(str < 0){
            throw new Error("A força não pode ser negativa");
        }
        if(str == 0){
            throw new Error("A força não pode ser igual a zero");
        }
        this._str = str;
    }

    get dex(){
        return this._dex;
    }

}