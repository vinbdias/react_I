import {HttpService} from './HttpService';

export class LivroService extends HttpService {

    _handleErrors(res) {

        if(![200, 400].includes(res.status)) throw new Error(res.statusText); //Erros de bad request (400) serão tratados na camada acima

        return res;
    }

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

    cadastrar(livro) {

       return new Promise((resolve, reject) => {

            this.post('http://localhost:8080/api/livros', livro)
                .then(livros => resolve(livros))
                .catch(erro => {
                    console.log(erro);
                    reject('Não foi possível cadastrar livro.');
                });
       });
    }
}

