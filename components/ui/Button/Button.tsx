import React, { ButtonHTMLAttributes } from 'react';
import s from '../../../styles/css/Button.module.css';
import LoadingDots from 'components/ui/LoadingDots';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    active?: boolean;
    width?: number;
    loading?: boolean;
    Component?: React.ComponentType;
}

const Button = (props: Props) => {
    const {
        className,
        children,
        active,
        width,
        loading = false,
        disabled = false,
        style = {},
        Component = 'button',
        ...rest
    } = props;

    return (
        <Component
            aria-pressed={active}
            className={s.root}
            disabled={disabled}
            style={{
                width,
                ...style
            }}
            {...rest}
        >
            {children}
            {loading && (<LoadingDots />)}
        </Component>
    );
};

export default Button;
