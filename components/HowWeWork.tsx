
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
                    <span>Hacemos una búsqueda de palabras clave con diferentes herramientas e investigamos qué le funciona a la competencia</span>
                </div>
                <ArrowRightSVG />
                <div className={s.card}>
                    <Image src="/redaccion.svg" width="50px" height="50px" alt="Investigación" />
                    <p>Redacción</p>
                    <span>Creamos un esquema con todo lo necesario para atacar la intención de búsqueda y nos ponemos a redactar</span>
                </div>
                <ArrowRightSVG />
                <div className={s.card}>
                    <Image src="/revision.svg" width="50px" height="50px" alt="Investigación" />
                    <p>Revisión</p>
                    <span>Revisamos que cada artículo cumpla con todo lo que has pedido y lo subimos a tu panel</span>
                </div>               
                <ArrowRightSVG />
                <div className={s.card}>
                    <Image src="/correccion.svg" width="50px" height="50px" alt="Investigación" />
                    <p>Corrección</p>
                    <span>Los artículos son entregados y si no te convence, corregimos y cambiamos el contenido según tus indicaciones</span>
                </div>               
            </div>
        </section>
    )
}
