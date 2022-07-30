import s from '../styles/css/Description.module.css';
import HenConfused from './icons/HenConfused';
import HenWithLove from './icons/HenWithLove';
import HenWithNoBoard from './icons/HenWithNoBoard';

export default function Description() {
    return (
        <div className={s.description}>
            {/* <h2>5 minutos y ahorra<span className="on-scroll"> horas de trabajo</span></h2> */}
            <h2>Prefieres 5 minutos o<span className="on-scroll"> 4 horas de trabajo</span></h2>
            <p><i>HumanCopy</i> se ha creado con el objetivo de <span>facilitar el trabajo de búsqueda de redactores, petición de artículos y correcciones</span> ofreciendo un panel con todas las funcionalidades necesarias.</p>
            <p>Solo necesitas 5 minutos para seguir estos tres pasos: Regístrate, contrata un plan y comienza a pedir artículos. Nosotros nos encargamos de la búsqueda de talento, redacción, corrección y posterior publicación en tu panel personal.</p>
            <div>
                <div>
                    <HenConfused />
                    <p>Evita comunicaciones innecesarias</p>
                    <span>No pierdas el tiempo contactando y esperando la respuesta de tu redactor. Manda una solicitud desde tu panel y tendrás tus artículos lo más pronto posible</span>
                </div>
                <div>
                    <HenWithLove />
                    <p>Redacción manual, original y especializada</p>
                    <span>Nuestras redacciones son escritas a mano (sin IA) y tenemos redactores especializados en diversidad de sectores</span>
                </div>
                <div>
                    <HenWithNoBoard />
                    <p>Correcciones ilimitadas</p>
                    <span>Si el artículo no era como esperabas, puedes pedir los cambios que quieras de manera ilimitada y sin costes adicionales</span>
                </div>
            </div>
        </div>
    )
}