import React from 'react';

const ErrorMessage = ({ message }) => {
    if (message === null) {
        return null
    }
    return (
        <div className="error" >
            <h1 style={{ color: 'red' }}>{message}</h1>
        </div>
    )
}


export default ErrorMessage;