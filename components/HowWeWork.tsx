
import Image from 'next/image';
import s from '../styles/css/HowWeWork.module.css';
import ArrowRightSVG from './icons/ArrowRight';

export default function HowWeWork() {


    return (
        <section className={s.root}>
            <h2>Nuestra metodologia de trabajo</h2>
            <div className={s.cardGrid}>
                <div className={s.card}>
                    <Image src="/investigacion.svg" width="50px" height="50px" alt="Investigación" />
                    <p>Investigación</p>
                    <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi vel pulvinar erat, non commodo nisl.</span>
                </div>
                <ArrowRightSVG />
                <div className={s.card}>
                    <Image src="/redaccion.svg" width="50px" height="50px" alt="Investigación" />
                    <p>Redacción</p>
                    <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi vel pulvinar erat, non commodo nisl.</span>
                </div>
                <ArrowRightSVG />
                <div className={s.card}>
                    <Image src="/revision.svg" width="50px" height="50px" alt="Investigación" />
                    <p>Revisión</p>
                    <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi vel pulvinar erat, non commodo nisl.</span>
                </div>               
                <ArrowRightSVG />
                <div className={s.card}>
                    <Image src="/correccion.svg" width="50px" height="50px" alt="Investigación" />
                    <p>Corrección</p>
                    <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi vel pulvinar erat, non commodo nisl.</span>
                </div>               
            </div>
        </section>
    )
}
