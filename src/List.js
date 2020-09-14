import React from 'react';

let changeHandler = (select) => {
    let e = document.getElementById("selector");
    let value = e.options[e.selectedIndex].value;
    select(value);
}

let List = ({components, select, progress}) => {
    let array = Object.keys(components);
    array.sort((x, y) => {
        if (x.length < y.length) return -1;
        if (x.length > y.length) return 1;
        if (x < y) return -1;
        if (x > y) return 1;
        return 0;
    });
    return (
        <div id="list">
            <h2>选择汉字</h2>
            <select id="selector" size="20" onChange={() => changeHandler(select)}>
                {
                    array && array.map(component => {
                        return <option key={component} value={component}>{progress[component] ? '✅ ' + component : '❓ ' + component}</option>
                    })
                }
            </select>
        </div>
    )
}

export default List;