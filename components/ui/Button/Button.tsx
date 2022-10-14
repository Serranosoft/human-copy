import React from 'react';
import s from '../../../styles/css/Button.module.css';
import LoadingDots from 'components/ui/LoadingDots';

export default function Button(props: any) {

    return (
        <button className={s.root} onClick={props.onClick}>
            {props.children}
            {props.loading && (<LoadingDots />)}
        </button>
    )
}
