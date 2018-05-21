import React, {Component} from 'react';
import AppComponente from './AppComponente';
import {LivroService}  from './services/LivroService';
import {AutorService}  from './services/AutorService';
import {InputCustomizado} from './componentes/InputCustomizado';
import {InputValorMoedaCustomizado} from './componentes/InputValorMoedaCustomizado';
import {SelectCustomizado} from './componentes/SelectCustomizado';
import {BotaoSubmitCustomizado} from './componentes/BotaoSubmitCustomizado';
import PubSub from 'pubsub-js';
import TratadorDeErros from './TratadorDeErros';
import './css/pure-min.css';
import './css/side-menu.css';

class FormularioLivro extends AppComponente {

    constructor() {

        super();
        this.state = {titulo: '', preco: '', autor: '', opcoesAutores: []};
        this._livroService = new LivroService();
        this._autorService = new AutorService();
    }

    _parseInputValorMoedaCustomizado(valor) {

        return valor.replace('R$ ', '').replace('.', '').replace(',', '.');
    }

    enviarForm(evento) {

        evento.preventDefault();

        PubSub.publish('limpa-erros', {});

        console.log(this);

        this._livroService
        .cadastrar({

            titulo: this.state.titulo,
            preco: this._parseInputValorMoedaCustomizado(this.state.preco),
            autorId: this.state.autorId
        })
        .then((resposta) => {

            if(resposta.status == 400) {

                if (typeof resposta.errors !== 'undefined')
                    new TratadorDeErros().publicarErros(resposta.errors);
                else
                    console.log(resposta);
            }
            else {

                PubSub.publish('atualiza-lista-livros', resposta);
                this.setState({titulo: '', preco: '', autorId: ''});
            }
        })
        .catch(erro => console.log(erro));
    }

    render() {

        return(
            <div className="pure-form pure-form-aligned">
                <form className="pure-form pure-form-aligned" onSubmit={this.enviarForm.bind(this)} method="post">
                    <InputCustomizado id="titulo" name="titulo" type="text" value={this.state.titulo} onChange={this.salvaAlteracao.bind(this, 'titulo')} label="Título" />
                    <InputValorMoedaCustomizado id="preco" name="preco" type="text" min="1" step="any" thousandSeparator={'.'} decimalSeparator={','} decimalScale={2} prefix={'R$ '} placeholder="R$ 0,00" value={this.state.preco} onChange={this.salvaAlteracao.bind(this, 'preco')} label="Preço" />
                    <SelectCustomizado id="autorId" name="autorId" value={this.state.autorId} opcoes={this.state.opcoesAutores} onChange={this.salvaAlteracao.bind(this, 'autorId')} label="Autor" />
                    <BotaoSubmitCustomizado label="Gravar" />
                </form>
            </div>
            );
    }

    componentDidMount() {

        let opcoesAutores = [];
        this._autorService
            .obterAutores()
            .then(autores => {

                autores
                .sort((a, b) => {

                    if(a.nome < b.nome)
                        return -1;

                    if(a.nome > b.nome)
                        return 1;

                    return 0;
                })
                .forEach(autor =>
                    opcoesAutores.push({valor: autor.id, label: autor.nome}));

                this.setState({opcoesAutores: opcoesAutores});
            });
    }
}

class TabelaLivros extends AppComponente {

    constructor() {

        super();
        this._livroService = new LivroService();
    }

    render() {

        return (
            <div>
                <table className="pure-table">
                    <thead>
                        <tr>
                            <th>Titulo</th>
                            <th>Preço</th>
                            <th>Autor</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.props.lista.map(function(livro) {

                                return (
                                    <tr key={livro.id}>
                                        <td>{livro.titulo}</td>
                                        <td>{livro.preco}</td>
                                        <td>{livro.autor.nome}</td>
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

export default class LivroBox extends AppComponente {

    constructor() {

        super();
        this.state = {lista: []};
        this._livroService = new LivroService();
    }

    componentDidMount() {

        this._livroService
            .obterLivros()
            .then(livros => this.setState({lista: livros}));

        PubSub.subscribe('atualiza-lista-livros', (topico, novaLista) =>
         this.setState({lista: novaLista}));
    }

    render() {

        return(
            <div>
                <div className="header">
                    <h1>Cadastro de Livros</h1>
                </div>
                <div className="content" id="content">
                    <FormularioLivro />
                    <TabelaLivros lista={this.state.lista} />
                </div>
            </div>
            );
    }
}
