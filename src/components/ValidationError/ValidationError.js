import React from 'react';
import './ValidationError.css';

export default function ValidationError(props) {
    const colorClass = '';
    if (props.message) {
        const errorPosition = props.errorPosition === 'absolute'
            ? 'error-absolute'
            : 'error-relative';
        return (
            <div className='ValidationError-wrapper'>
                <span
                    className={[errorPosition, colorClass].join(' ')}
                >{props.message}</span>
            </div>
        );
    };
    return <></>
};