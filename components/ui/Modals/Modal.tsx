import React, { useEffect, useRef } from 'react';
import s from '../../../styles/css/Modal.module.css';

export default function Modal( {show, setModalState, children, onCloseCallback}: {show: boolean, setModalState: Function, children: any, onCloseCallback?: Function} ) {

    const backdrop = useRef(null);
    const modal = useRef(null);
    let backdropEl: HTMLElement | null = null
    let modalEl: HTMLElement | null = null;
    let CloseOnBackdropClick: any;
    
    useEffect(() => {
        modalEl = modal.current;
        for (let el of Array.from(modalEl!.querySelectorAll(".close"))) {
            el.addEventListener("click", close)
        }
        backdropEl = backdrop.current;
        CloseOnBackdropClick = closeOnBackdropClick;
        if (show) {
            open();
        } else {
            close();
        }

    })

    function open(): void {
        if (modalEl!.classList.contains(s.show)) {
            return;
        }
        backdropEl!.classList.add("modal")
        backdropEl?.classList.add(s.show)
        modalEl!.classList.add(s.show);
        modalEl!.focus();

        onOpen();
    }

    function close() {
        modalEl!.classList.remove(s.show);
        backdropEl!.classList.remove(s.show);
        setModalState(false);
        onClose();
    }

    function onOpen() {}

    function onClose() {
        if (onCloseCallback) {
            onCloseCallback();
        }
    }

    function closeOnBackdropClick(e: Event): void {
        if (e.target != backdropEl) {
            return;
        }

        close();
    }

    
    return (
        <div ref={backdrop} className={s.root}>
            <div ref={modal} className={s.modal}>
                <span className="close">X</span>
                {children}
            </div>
        </div>
    )
}