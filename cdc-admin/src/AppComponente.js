import React, {Component} from 'react';

export default class AppComponente extends Component {

    salvaAlteracao(nomeInput, evento) {

        this.setState({[nomeInput]: evento.target.value});
    }
}
