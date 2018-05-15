import {HttpService} from './HttpService';

export class AutorService extends HttpService {

    _handleErrors(res) {

        if(![200, 400].includes(res.status)) throw new Error(res.statusText); //Erros de bad request (400) serão tratados na camada acima

        return res;
    }    

    obterAutores() {

       return new Promise((resolve, reject) => {

            this.get('http://localhost:8080/api/autores')
                .then(autores => resolve(autores))
                .catch(erro => {
                    console.log(erro);
                    reject('Não foi possível obter autores.');
                });
       });
    }

    cadastrar(autor) {

       return new Promise((resolve, reject) => {

            this.post('http://localhost:8080/api/autores', autor)
                .then(autores => resolve(autores))
                .catch(erro => {
                    console.log(erro);
                    reject('Não foi possível cadastrar autor.');
                });
       });
    }
}

