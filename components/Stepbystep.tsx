import s from '../styles/css/Stepbystep.module.css';
import LeftLine from './icons/LeftLine';
import MiddleLine from './icons/MiddleLine';
import RightLine from './icons/RightLine';

export default function Stepbystep() {

    return (
        <div className={s.stepByStep}>
            <h1>¿Cómo funciona <span>HumanCopy?</span></h1>
            <div>
                <div>
                    <img className="on-scroll" src="/step1-home.jpg" alt="Vercel.com Logo" />
                    <div>
                        <p>Elige un plan</p>
                        <span>
                        Puedes elegir nuestra suscripción mensual de artículos y correcciones ilimitados o probar el servicio con una cantidad fija de palabras
                        </span>
                    </div>
                </div>
                <RightLine className={s.stepLine} />
                <div>
                    <div>
                        <p>Pide tus artículos</p>
                        <span>
                        Reparte las palabras contratadas en los artículos que quieras (Mínimo 500 palabras por
artículo).<br /><br /> Sólo necesitamos el tema principal y una pequeña descripción con tus requisitos.
Puedes elegir a qué artículos darle prioridad en el tiempo.
                        </span>
                    </div>
                    <img className="on-scroll" src="/step24-home.jpg" alt="Vercel.com Logo" />
                </div>
                <LeftLine className={s.stepLine} />
                <div>
                    <img className="on-scroll" src="/step3-home.jpg" alt="Vercel.com Logo" />
                    <div>
                        <p>Descarga tus artículos</p>
                        <span>
                        Descarga los artículos que ya están acabados y revisa los que aún
están pendientes.<br /><br /> Si algo no te ha convencido presiona el botón de correcciones e indica lo
que debemos cambiar y se te entregará de nuevo en el menor tiempo posible.
                        </span>
                    </div>
                </div>
                <MiddleLine className={s.stepLine} />
                <div>
                    <p>Hablar sobre las correcciones</p>
                    <span>Descripción de las correcciones</span>
                </div>
            </div>
        </div>
    )
}