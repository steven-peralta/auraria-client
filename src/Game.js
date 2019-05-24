import React from 'react';
import {connect} from './network';
import config from './config';

export default class Game extends React.Component {
    constructor(props) {
        super(props);
        this.rendererContext = React.createRef();
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return false;
    }

    componentDidMount() {
        this.rendererContext = this.rendererContext.current.getContext('2d');
        //connect();
    }

    render() {
        return (
            <canvas ref={this.rendererContext} width={config.screen.width} height={config.screen.height}/>
        )
    }
}