import {HttpService} from './HttpService';

export class AutorService {

    constructor() {

        this._http = new HttpService();
    }

    obterAutores() {

       return new Promise((resolve, reject) => {

            this._http
                .get('http://localhost:8080/api/autores')
                .then(autores => resolve(autores))
                .catch(erro => {
                    console.log(erro);
                    reject('Não foi possível obter autores.');
                });
       });
    }

    cadastrar(autor) {

       return new Promise((resolve, reject) => {

            this._http
                .post('http://localhost:8080/api/autores', autor)
                .then(autores => resolve(autores))
                .catch(erro => {
                    console.log(erro);
                    reject('Não foi possível cadastrar autor.');
                });
       });
    }
}

