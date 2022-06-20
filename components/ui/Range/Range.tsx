import React, { InputHTMLAttributes, ChangeEvent } from 'react';
import s from '../../../styles/css/Range.module.css';

interface Props extends Omit<InputHTMLAttributes<any>, 'onChange'> {
    className?: string;
    onChange: (value: string) => void;
    min?: string;
    max?: string;
    step?: string;
    value?: number;
}
const Range = (props: Props) => {
    const { className, children, onChange, min, max, step, value, ...rest } = props;

    const handleOnChange = (e: any) => {
        if (onChange) {
            onChange(e);
        }
        return null;
    };

    return (
        <>
            <input
                type="range"
                className={s.root}
                onChange={handleOnChange}
                min={min}
                max={max}
                step={step}
                value={value}
                {...rest}
            />
        </>
    );
};

export default Range;
