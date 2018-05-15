import PubSub from 'pubsub-js';

export default class TratadorDeErros {

    publicarErros(erros) {

        erros.forEach(erro => PubSub.publish('erro-validacao', erro));
    }
}