import React, {Component} from 'react';
import {AutorService}  from './services/AutorService';
import {InputCustomizado} from './componentes/InputCustomizado';
import {BotaoSubmitCustomizado} from './componentes/BotaoSubmitCustomizado';

export class FormularioAutor extends Component {

    constructor() {

        super();
        this.state = {nome: '', email: '', senha: ''};
        this._autorService = new AutorService();
        this.enviarForm = this.enviarForm.bind(this);
        this.setNome = this.setNome.bind(this);
        this.setEmail = this.setEmail.bind(this);
        this.setSenha = this.setSenha.bind(this);
    }

    enviarForm(evento) {

        evento.preventDefault();

        this._autorService.cadastrar({

            nome: this.state.nome,
            email: this.state.email,
            senha: this.state.senha
        }).then(resposta => this.setState({lista: resposta}));
    }

    setNome(evento) {

        this.setState({nome: evento.target.value});
    }

    setEmail(evento) {

        this.setState({email: evento.target.value});
    }

    setSenha(evento) {

        this.setState({senha: evento.target.value});
    }

    render() {

        return(
            <div className="pure-form pure-form-aligned">
                <form className="pure-form pure-form-aligned" onSubmit={this.enviarForm} method="post">
                    <InputCustomizado id="nome" name="nome" value={this.state.nome} onChange={this.setNome} label="Nome" />
                    <InputCustomizado id="email" name="email" value={this.state.email} onChange={this.setEmail} label="Email" />
                    <InputCustomizado id="senha" name="senha" value={this.state.senha} onChange={this.setSenha} label="Senha" />
                    <BotaoSubmitCustomizado label="Gravar" />
                </form>
            </div>
            );
    }
}

export class TabelaAutores extends Component {

    constructor() {

        super();
        this.state = {lista: []};
        this._autorService = new AutorService();
    }

    componentDidMount() {

        this._autorService
            .obterAutores()
            .then(autores => this.setState({lista: autores}));
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
                            this.state.lista.map(function(autor) {

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
