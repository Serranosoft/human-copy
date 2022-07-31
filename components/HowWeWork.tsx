
import s from '../styles/css/HowWeWork.module.css';
import ArrowRightSVG from './icons/ArrowRight';
import TestSVG from './icons/TestSVG';

export default function HowWeWork() {


    return (
        <section className={s.root}>
            <h2>Nuestra metodologia de trabajo</h2>
            <div className={s.cardGrid}>
                <div className={s.card}>
                    <TestSVG />
                    <p>Investigación</p>
                    <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi vel pulvinar erat, non commodo nisl.</span>
                </div>
                <ArrowRightSVG />
                <div className={s.card}>
                    <TestSVG />
                    <p>Palabras clave</p>
                    <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi vel pulvinar erat, non commodo nisl.</span>
                </div>
                <ArrowRightSVG />
                <div className={s.card}>
                    <TestSVG />
                    <p>Redacción</p>
                    <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi vel pulvinar erat, non commodo nisl.</span>
                </div>
                <ArrowRightSVG />
                <div className={s.card}>
                    <TestSVG />
                    <p>Revisión</p>
                    <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi vel pulvinar erat, non commodo nisl.</span>
                </div>               
            </div>
        </section>
    )
}
