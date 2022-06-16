import React, { forwardRef, SelectHTMLAttributes } from 'react';
import s from '../../../styles/css/Select.module.css';

interface Props extends SelectHTMLAttributes<HTMLSelectElement> {
    active?: boolean;
    width?: number;
    Component?: React.ComponentType;
}

const Select = forwardRef<HTMLButtonElement, Props>((props, buttonRef) => {
    const {
        className,
        active,
        disabled = false,
        style = {},
        Component = "select",
        ...rest
    } = props;

    return (
        <Component
            aria-pressed={active}
            className={s.root}
            disabled={disabled}
            style={{
                ...style
            }}
            {...rest}
        >
        </Component>
    );
});

export default Select;
