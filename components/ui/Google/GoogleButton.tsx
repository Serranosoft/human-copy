import React from 'react';
import s from '../../../styles/css/GoogleButton.module.css';



const GoogleButton = ({onClick}: {onClick: any}) => {

    return (
        <button className={s.root} onClick={onClick}>
            <img src="/google.png" />
            <span>Iniciar sesión con Google</span>
        </button>
    )

}

export default GoogleButton;