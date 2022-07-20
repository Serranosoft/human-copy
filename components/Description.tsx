import s from '../styles/css/Description.module.css';
import HenConfused from './icons/HenConfused';
import HenWithLove from './icons/HenWithLove';
import HenWithNoBoard from './icons/HenWithNoBoard';

export default function Description() {
    return (
        <div className={s.description}>
            <h2>5 minutos y ahorra<span className="on-scroll"> horas de trabajo</span></h2>
            <p><i>HumanCopy</i> se basa en un sistema programado que <span>facilita todo el trabajo de búsqueda de redactores, petición de artículos y correcciones</span> ofreciendo un panel con todas las funcionalidades necesarias.</p>
            <p>Regístrate, contrata un plan y comienza a pedir artículos. Nosotros nos encargamos de la búsqueda de talento, redacción, corrección y posterior publicación en tu panel personal</p>
            <div>
                <div>
                    <HenConfused />
                    <p>Evita comunicaciones innecesarias.</p>
                    <span>No pierdas el tiempo poniendote en contacto con redactores. Manda una solicitud desde tu panel y recibe tus artículos en el tiempo establecido.</span>
                </div>
                <div>
                    <HenWithLove />
                    <p>Redacción a mano de la temática que desees</p>
                    <span>Todas las redacciones entregadas por <i>HumanCopy</i> son originales y corregidas por nosotros antes de enviarlo a tu cuenta.</span>
                </div>
                <div>
                    <HenWithNoBoard />
                    <p>Pide todas las correcciones que quieras</p>
                    <span>Cada proyecto tiene sus necesidades, nosotros lo entendemos y no aplicamos ningún cobro adicional por cada corrección.</span>
                </div>
            </div>
        </div>
    )
}