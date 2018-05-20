import React, { Component } from 'react';
import PubSub from 'pubsub-js';

export class SelectCustomizado extends Component {

    constructor() {

        super();
        this.state = {msgErro: ''};
    }

    render() {

        return (
            <div className="pure-control-group">
                <label htmlFor={this.props.id}>{this.props.label}</label>
                <select {...this.props}>
                    <option value=""> Selecione autor </option>
                {
                    this.props.opcoes.map(function(opcao) {

                        return (
                            <option key={opcao.valor} value={opcao.valor}>{opcao.label}</option>
                        );
                    })
                }
                </select>
                <span className="erro">{this.state.msgErro}</span>
            </div>
            );
    }

    componentDidMount() {

        PubSub.subscribe('erro-validacao', (topico, erro) => {

            if(erro.field == this.props.name) {

                this.setState({msgErro: erro.defaultMessage});
            }
        });

        PubSub.subscribe('limpa-erros', (topico) => this.setState({msgErro: ''}));
    }
}
