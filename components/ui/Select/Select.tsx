import React, { forwardRef, SelectHTMLAttributes } from 'react';
import s from '../../../styles/css/Select.module.css';

const Select = React.forwardRef((props: any, ref: any) => {
    return (
        <select
            ref={ref}
            className={s.root}
            disabled={props.disabled}
            onChange={props.onChange}
        >
        </select>
    )
})

export default Select;
