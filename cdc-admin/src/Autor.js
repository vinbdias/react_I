import React, {Component} from 'react';
import AppComponente from './AppComponente';
import {AutorService}  from './services/AutorService';
import {InputCustomizado} from './componentes/InputCustomizado';
import {BotaoSubmitCustomizado} from './componentes/BotaoSubmitCustomizado';
import PubSub from 'pubsub-js';
import TratadorDeErros from './TratadorDeErros';
import './css/pure-min.css';
import './css/side-menu.css';

class FormularioAutor extends AppComponente {

    constructor() {

        super();
        this.state = {nome: '', email: '', senha: ''};
        this._autorService = new AutorService();
        this.enviarForm = this.enviarForm.bind(this);
    }

    enviarForm(evento) {

        evento.preventDefault();

        PubSub.publish('limpa-erros', {});

        this._autorService
        .cadastrar({

            nome: this.state.nome,
            email: this.state.email,
            senha: this.state.senha
        })
        .then((resposta) => {

            if(resposta.status == 400) {

                if (typeof resposta.errors !== 'undefined')
                    new TratadorDeErros().publicarErros(resposta.errors);
            }
            else {

                PubSub.publish('atualiza-lista-autores', resposta);
                this.setState({nome: '', email: '', senha: ''});
            }
        })
        .catch(erro => {throw new Error(erro)});
    }

    render() {

        return(
            <div className="pure-form pure-form-aligned">
                <form className="pure-form pure-form-aligned" onSubmit={this.enviarForm} method="post">
                    <InputCustomizado id="nome" name="nome" type="text" value={this.state.nome} onChange={this.salvaAlteracao.bind(this, 'nome')} label="Nome" />
                    <InputCustomizado id="email" name="email" type="email" value={this.state.email} onChange={this.salvaAlteracao.bind(this, 'email')} label="Email" />
                    <InputCustomizado id="senha" name="senha" type="password" value={this.state.senha} onChange={this.salvaAlteracao.bind(this, 'senha')} label="Senha" />
                    <BotaoSubmitCustomizado label="Gravar" />
                </form>
            </div>
            );
    }
}

class TabelaAutores extends AppComponente {

    constructor() {

        super();
        this._autorService = new AutorService();
    }

    render() {

        return (
            <div>
                <table className="pure-table">
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.props.lista.map(function(autor) {

                                return (
                                    <tr key={autor.id}>
                                        <td>{autor.nome}</td>
                                        <td>{autor.email}</td>
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                </table>
            </div>
            );
    }
}

export default class AutorBox extends AppComponente {

    constructor() {

        super();
        this.state = {lista: []};
        this._autorService = new AutorService();
    }

    componentDidMount() {

        this._autorService
            .obterAutores()
            .then(autores => {

                autores.sort();
                this.setState({lista: autores})
            });

        PubSub.subscribe('atualiza-lista-autores', (topico, novaLista) =>
         this.setState({lista: novaLista}));
    }

    render() {

        return(
            <div>
                <div className="header">
                    <h1>Cadastro de Autores</h1>
                </div>
                <div className="content" id="content">
                    <FormularioAutor />
                    <TabelaAutores lista={this.state.lista} />
                </div>
            </div>
            );
    }
}
