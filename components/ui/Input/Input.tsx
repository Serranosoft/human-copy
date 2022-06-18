import React, { InputHTMLAttributes, ChangeEvent } from 'react';
import s from '../../../styles/css/Input.module.css';

interface Props extends Omit<InputHTMLAttributes<any>, 'onChange'> {
    className?: string;
    onChange: (value: string) => void;
}
const Input = (props: Props) => {
    const { className, children, onChange, ...rest } = props;

    const handleOnChange = (e: any) => {
        if (onChange) {
            onChange(e.target.value);
        }
        return null;
    };

    return (
        <>
            <input
                className={s.root}
                onChange={handleOnChange}
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck="false"
                {...rest}
            />
        </>
    );
};

export default Input;
