import React, { Fragment } from 'react';

const Model = ({data, char, change}) => {
    const strokes = data && char && data[char];
    return (
        <div id="model">
            <h2>调整数据</h2>
            { (data && char) ?
                strokes.map((stroke, strokeIndex) => <StrokeModel key={strokeIndex} stroke={stroke} strokeIndex={strokeIndex} change={change}/>) : <div />
            }
        </div>
    );
}

const StrokeModel = ({stroke, strokeIndex, change}) => {
    const {name, paths} = stroke
    return (
        <Fragment>
            <h3>{name}</h3>
            <ul>
                {
                    paths.map((path, pathIndex) => <PathModel key={pathIndex} path={path} pathIndex={pathIndex} strokeIndex={strokeIndex} change={change} />)
                }
            </ul>
        </Fragment>
    )
}

const handleNumberInput = (change, paramIndex, pathIndex, strokeIndex, event) => {
    let value = event.target.value;
    change(strokeIndex, pathIndex, paramIndex, value);
}

const handleNumberIncrease = (change, paramIndex, pathIndex, strokeIndex, param, event) => {
    change(strokeIndex, pathIndex, paramIndex, param + 1)
}

const handleNumberDecrease = (change, paramIndex, pathIndex, strokeIndex, param, event) => {
    change(strokeIndex, pathIndex, paramIndex, param - 1)
}

const PathModel = ({path, pathIndex, strokeIndex, change}) => {
    const {cmd, params} = path
    return (
        <li>
            <span className="cmd">{cmd}</span>
            {
                params.map((param, paramIndex) => 
                    <span
                        className="numberModel"
                        key={paramIndex}
                    >
                        <input
                            className="number"
                            value={param}
                            onChange={event => handleNumberInput(change, paramIndex, pathIndex, strokeIndex, event)}>
                        </input>
                        <button className="increase" onClick={event => handleNumberIncrease(change, paramIndex, pathIndex, strokeIndex, param, event)}>↑</button>
                        <button className="decrease" onClick={event => handleNumberDecrease(change, paramIndex, pathIndex, strokeIndex, param, event)}>↓</button>
                    </span>
                    )
            }
        </li>
    )
}

export default Model;
