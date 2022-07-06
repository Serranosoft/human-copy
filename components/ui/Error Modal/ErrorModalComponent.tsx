import React from 'react';
import s from '../../../styles/css/ErrorModal.module.css';
import Modal from 'react-modal';
import Button from '../Button';

export default function ErrorModalComponent(props: any) {
    return (
        <>
            <Modal
                className={s.root}
                isOpen={props.open}
                ariaHideApp={false}
                style={{
                    overlay: {
                        zIndex: "1",
                    }
                }}
            >
                <span onClick={props.closeErrorModal}>x</span>
                {/* {props.children} */}
                <div>
                    <p>{props.msg}</p>
                </div>
                <Button onClick={props.closeErrorModal}>Aceptar</Button>
            </Modal>
        </>
    )
}