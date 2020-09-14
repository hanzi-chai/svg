import React, { Component, Fragment } from "react";
import {get, post} from 'axios';
import List from './List';
import View from './View';
import Model from './Model';

import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.submit = this.submit.bind(this);
        this.switch = this.switch.bind(this);
        this.selectChar = this.selectChar.bind(this);
        this.changeNumber = this.changeNumber.bind(this);
        this.state = {
            size: 0,
            components: {},
            glyphs: {},
            progress: {},
            componentChanged: new Set(),
            progressChanged: new Set(),
            currentComponent: undefined
        }
    }

    componentDidMount() {
        get('/api/')
        .then(res => {
            let {components, glyphs, progress} = res.data;
            this.setState({
                components: components,
                glyphs: glyphs,
                progress: progress,
                size: Object.keys(progress).length
            })
        })
    }

    submit() {
        const componentDiff = {};
        for (let component of this.state.componentChanged) {
            componentDiff[component] = this.state.components[component];
        }
        const progressDiff = {};
        for (let component of this.state.progressChanged) {
            progressDiff[component] = this.state.progress[component];
        }
        post('/api/', {
            componentDiff: componentDiff,
            progressDiff: progressDiff
        })
        .then(res => {
            console.log(res.data);
        })
        this.setState({
            componentChanged: new Set(),
            progressChanged: new Set()
        })
    }

    switch() {
        this.setState(state => {
            state.progress[state.currentComponent] = !state.progress[state.currentComponent];
            state.progressChanged.add(state.currentComponent);
            return state;
        });
    }

    selectChar(currentComponent) {
        this.setState({ currentComponent: currentComponent });
    }

    changeNumber(strokeIndex, pathIndex, paramIndex, value) {
        this.setState(state => {
            state.components[state.currentComponent][strokeIndex].paths[pathIndex].params[paramIndex] = value;
            state.componentChanged.add(state.currentComponent);
            return state
        });
    }

    render() {
        return (
            <Fragment>
                <div>
                    <h1>笔画数据校对</h1>
                    <span id="progress">进度：{Object.values(this.state.progress).filter(x => x).length} / {this.state.size}</span>
                    <button id="switch" onClick={this.switch}>{this.state.progress[this.state.currentComponent] ? '标记为未完成' : '标记为已完成'}</button>
                    <button id="save" onClick={this.submit}>保存</button>
                </div>
                <List components={this.state.components} progress={this.state.progress} select={this.selectChar} />
                <View data={this.state.components} font={this.state.glyphs} char={this.state.currentComponent}/>
                <Model data={this.state.components} char={this.state.currentComponent} change={this.changeNumber}/>
            </Fragment>
        );
    }
}

export default App;