import React from 'react';
import s from '../../../styles/css/Input.module.css';

const Input = (props: any) => {
    const { className, children, onChange, ...rest } = props;

    const handleOnChange = (e: any) => {
        if (props.onChange) {
            props.onChange(e);
        }
        return null;
    };

    return (
        <input
            className={s.root}
            onChange={handleOnChange}
            {...rest}
        />
    );
};

export default Input;
