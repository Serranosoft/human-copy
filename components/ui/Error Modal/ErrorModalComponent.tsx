import React from 'react';
import s from '../../../styles/css/ErrorModal.module.css';
import Modal from 'react-modal';

export default function ErrorModalComponent(props: any) {
    console.log(props);
    return (
        <>
            <Modal
                className={s.root}
                isOpen={props.open}
                ariaHideApp={false}
            >
                <span onClick={props.closeErrorModal}>x</span>
                {props.children}
            </Modal>
        </>
    )
}