import React, { forwardRef, useRef, ButtonHTMLAttributes } from 'react';
import mergeRefs from 'react-merge-refs';
import s from '../../../styles/css/Button.module.css';

import LoadingDots from 'components/ui/LoadingDots';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    active?: boolean;
    width?: number;
    loading?: boolean;
    Component?: React.ComponentType;
}

const Button = forwardRef<HTMLButtonElement, Props>((props, buttonRef) => {
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

    const ref = useRef(null);

    return (
        <Component
            aria-pressed={active}
            ref={mergeRefs([ref, buttonRef])}
            className={s.root}
            disabled={disabled}
            style={{
                width,
                ...style
            }}
            {...rest}
        >
            {children}
            {loading && (
                <i>
                    <LoadingDots />
                </i>
            )}
        </Component>
    );
});

export default Button;
