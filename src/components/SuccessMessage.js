import React from 'react';

const SuccessMessage = ({ message }) => {
    if (message === null) {
        return null
    }

    return (
        <div className="success">
            <h1>{message}</h1>
        </div>
    )
}
export default SuccessMessage;