import React from 'react';

const View = ({data, font, char, alias}) => {
    const strokeList = data && char && data[char];
    const d = font && char && (
        font[char] || font[alias[char]]
    );

    return (
        <div id="view">
            <h2>查看 SVG</h2>
            { (font && char) ?
                <svg id="fontsvg" xmlns="http://www.w3.org/2000/svg" version="1.1" width="100%" viewBox="0 0 1000 1000">
                    <path d={d} transform="matrix(1,0,0,-1,0,850)" />
                </svg> : <svg />
            }
            { (data && char) ?
                <svg id="datasvg" xmlns="http://www.w3.org/2000/svg" version="1.1" width="100%" viewBox="0 0 100 100">
                    {
                        strokeList.map((stroke, index) => <StrokeView stroke={stroke} key={index}/>)
                    }
                </svg> : <svg />
            }
        </div>
    );
}

const StrokeView = ({stroke, index}) => {
    const {paths} = stroke;
    let d = ''
    for (let path of paths) {
        let {cmd, params} = path
        d += cmd + params.join(' ')
    }
    return (
        <path d={d} stroke="red"
        strokeWidth="1" fill="none"/>
    )
}

export default View;
