import React, { useState, useEffect } from 'react';
import s from '../../../styles/css/Modal.module.css';
import Modal from 'react-modal';

export default function ModalComponent(props: any) {

    return (
        <>
            <Modal
                className={s.root}
                isOpen={props.open}
                contentLabel="Enviar un artículo"
                ariaHideApp={false}
            >
                <span onClick={props.closeModal}>x</span>
                {props.children}
            </Modal>
        </>
    )
}