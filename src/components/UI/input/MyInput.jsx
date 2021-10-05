import React from 'react';
import './MyInput.css'

const MyInput = (props) => {
    return (
        <input className="MyInput" {...props}/>
    );
};

export default MyInput;