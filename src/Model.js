import React, { Fragment } from 'react';

const Model = ({data, char, change}) => {
    const strokeList = data && char && data[char];
    return (
        <div id="model">
            <h2>调整数据</h2>
            { (data && char) ?
                strokeList.map((stroke, strokeIndex) => <StrokeModel key={strokeIndex} stroke={stroke} strokeIndex={strokeIndex} change={change}/>) : <div />
            }
        </div>
    );
}

const StrokeModel = ({stroke, strokeIndex, change}) => {
    const {feature, start, curveList} = stroke;
    return (
        <Fragment>
            <h3>{feature}</h3>
            {
                start.map((parameter, parameterIndex) => <NumberModel key={parameterIndex} parameter={parameter} parameterIndex={parameterIndex} curveIndex={-1} strokeIndex={strokeIndex} change={change} />)
            }
            <ul>
                {
                    curveList.map((curve, curveIndex) => <CurveModel key={curveIndex} curve={curve} curveIndex={curveIndex} strokeIndex={strokeIndex} change={change} />)
                }
            </ul>
        </Fragment>
    )
}

const CurveModel = ({curve, curveIndex, strokeIndex, change}) => {
    const {command, parameterList} = curve;
    return (
        <li>
            <span className="command">{command}</span>
            {
                parameterList.map(
                    (parameter, parameterIndex) => <NumberModel key={parameterIndex} parameter={parameter} parameterIndex={parameterIndex} curveIndex={curveIndex} strokeIndex={strokeIndex} change={change}/>
                )
            }
        </li>
    )
}

const handleNumberInput = (change, parameterIndex, curveIndex, strokeIndex, event) => {
    let value = parseInt(event.target.value);
    change(strokeIndex, curveIndex, parameterIndex, value);
}

const handleNumberIncrease = (change, parameterIndex, curveIndex, strokeIndex, parameter, event) => {
    change(strokeIndex, curveIndex, parameterIndex, parameter + 1);
}

const handleNumberDecrease = (change, parameterIndex, curveIndex, strokeIndex, parameter, event) => {
    change(strokeIndex, curveIndex, parameterIndex, parameter - 1);
}

const NumberModel = ({parameter, parameterIndex, curveIndex, strokeIndex, change}) => {
    return (
        <span className="numberModel">
            <input
                className="number"
                value={parameter}
                onChange={event => handleNumberInput(change, parameterIndex, curveIndex, strokeIndex, event)}>
            </input>
            <button className="increase" onClick={event => handleNumberIncrease(change, parameterIndex, curveIndex, strokeIndex, parameter, event)}>↑</button>
            <button className="decrease" onClick={event => handleNumberDecrease(change, parameterIndex, curveIndex, strokeIndex, parameter, event)}>↓</button>
        </span>
    )
}

export default Model;
