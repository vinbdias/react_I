import React, {Component} from 'react';
import {AutorService}  from './services/AutorService';
import {InputCustomizado} from './componentes/InputCustomizado';
import {BotaoSubmitCustomizado} from './componentes/BotaoSubmitCustomizado';
import PubSub from 'pubsub-js';
import TratadorDeErros from './TratadorDeErros';
import './css/pure-min.css';
import './css/side-menu.css';

class FormularioAutor extends Component {

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
                else
                    console.log(resposta);
            }
            else { 

                PubSub.publish('atualiza-lista-autores', resposta);         
                this.setState({nome: '', email: '', senha: ''});   
            }            
        })
        .catch(erro => console.log(erro));
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
                    <InputCustomizado id="nome" name="nome" type="text" value={this.state.nome} onChange={this.setNome} label="Nome" />
                    <InputCustomizado id="email" name="email" type="email" value={this.state.email} onChange={this.setEmail} label="Email" />
                    <InputCustomizado id="senha" name="senha" type="password" value={this.state.senha} onChange={this.setSenha} label="Senha" />
                    <BotaoSubmitCustomizado label="Gravar" />
                </form>
            </div>
            );
    }
}

class TabelaAutores extends Component {

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

export default class AutorBox extends Component {

    constructor() {

        super();
        this.state = {lista: []};     
        this._autorService = new AutorService();           
    }

    componentDidMount() {

        this._autorService
            .obterAutores()
            .then(autores => this.setState({lista: autores}));

        PubSub.subscribe('atualiza-lista-autores', (topico, novaLista) => this.setState({lista: novaLista}));
    }    

    render() {

        return(
            <div>
                <FormularioAutor />
                <TabelaAutores lista={this.state.lista} />
            </div>
            );
    }
}
