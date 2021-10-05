import React from 'react';
import './myButton.css';

const MyButton = ({children, ...props}) => { //выцепляем от туда пропс children ,а все остальные пропсы оставляем как есть
    return (
        <button className="MyButton" {...props}>
            {/*по умолчанию React не знает, в какое место компонента нужно добавлячть вложенные элементы. И для этого предназначен специальный пропс children*/}
            {children}
        </button>
    );
};

export default MyButton;