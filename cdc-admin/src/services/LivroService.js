import {HttpService} from './HttpService';

export class LivroService {
    
    constructor() {
        
        this._http = new HttpService();
    }
    
    obterLivros() {
       
       return new Promise((resolve, reject) => {
        
            this._http
                .get('http://localhost:8080/api/livros')                
                .then(livros => resolve(livros))
                .catch(erro => {
                    console.log(erro);
                    reject('Não foi possível obter livros.');
                });  
       });        
    }
}

