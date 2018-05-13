import React, { Component } from 'react';
import './css/pure-min.css';
import './css/side-menu.css';
import {AutorService}  from './services/AutorService';
import {InputCustomizado} from './componentes/InputCustomizado';

class App extends Component {

    constructor() {

        super();
        this.state = {lista: [], nome: '', email: '', senha: ''};
        this._autorService = new AutorService();
        this.enviarForm = this.enviarForm.bind(this);
        this.setNome = this.setNome.bind(this);
        this.setEmail = this.setEmail.bind(this);
        this.setSenha = this.setSenha.bind(this);
    }

    componentDidMount() {

        this._autorService
            .obterAutores()
            .then(autores => this.setState({lista: autores}));
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
        return (
            <div id="layout">

                <a href="#menu" id="menuLink" className="menu-link">

                    <span></span>
                </a>

                <div id="menu">
                    <div className="pure-menu">
                        <a className="pure-menu-heading" href="#">Company</a>

                        <ul className="pure-menu-list">
                            <li className="pure-menu-item"><a href="#" className="pure-menu-link">Home</a></li>
                            <li className="pure-menu-item"><a href="#" className="pure-menu-link">Autor</a></li>
                            <li className="pure-menu-item"><a href="#" className="pure-menu-link">Livro</a></li>


                        </ul>
                    </div>
                </div>

                    <div id="main">
                        <div className="header">
                          <h1>Cadastro de Autores</h1>
                        </div>
                        <div className="content" id="content">
                          <div className="pure-form pure-form-aligned">
                            <form className="pure-form pure-form-aligned" onSubmit={this.enviarForm} method="post">
                              <InputCustomizado id="nome" name="nome" value={this.state.nome} onChange={this.setNome} label="Nome" />
                              <InputCustomizado id="email" name="email" value={this.state.email} onChange={this.setEmail} label="Email" />
                              <InputCustomizado id="senha" name="senha" value={this.state.senha} onChange={this.setSenha} label="Senha" />
                              <div className="pure-control-group">
                                <label></label>
                                <button type="submit" className="pure-button pure-button-primary">Gravar</button>
                              </div>
                            </form>

                          </div>
                          <div>
                            <table className="pure-table">
                              <thead>
                                <tr>
                                  <th>Nome</th>
                                  <th>email</th>
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
                        </div>
                      </div>


            </div>
        );
    }
}

export default App;
