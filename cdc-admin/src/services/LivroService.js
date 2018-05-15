import {HttpService} from './HttpService';

export class LivroService extends HttpService {
        
    obterLivros() {
       
       return new Promise((resolve, reject) => {
        
            this.get('http://localhost:8080/api/livros')                
                .then(livros => resolve(livros))
                .catch(erro => {
                    console.log(erro);
                    reject('Não foi possível obter livros.');
                });  
       });        
    }
}

