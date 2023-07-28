import React from 'react';

export const Loader = (props) => {
    return (
        <div className="loader"></div>
    )
}

export const FullLoader = (props) => {
    return (
        <div className='loader-wrapper'>
            <div className="loader"></div>
        </div>
    )
}

export const FullWidthLoader = (props) => {
    return (
        <div className='full-width-loader'>
            <div className="loader"></div>
        </div>
    )
}