import s from '../styles/css/Description.module.css';
import ArrowCurvedRight from './icons/ArrowCurvedRight';

export default function Description() {
    return (
        <div className={s.description}>
            <h2>¿Prefieres 5 minutos o<span className="on-scroll"> 4 horas de trabajo?</span></h2>
            <p><i>HumanCopy</i> se ha creado con el objetivo de <span>facilitar el trabajo de búsqueda de redactores, petición de artículos y correcciones</span> ofreciendo un panel con todas las funcionalidades necesarias.</p>
            {/* <p>Solo necesitas 5 minutos para seguir estos tres pasos: Regístrate, contrata un plan y comienza a pedir artículos. Nosotros nos encargamos de la búsqueda de talento, redacción, corrección y posterior publicación en tu panel personal.</p> */}
            <div>
                <div>
                    <span className={s.index}>1.</span>
                    <p>Sin perder el tiempo</p>
                    <span>No pierdas el tiempo buscando y hablando con redactores. Sube las indicaciones a nuestro panel y nos pondremos a trabajar.</span>
                </div>
                <ArrowCurvedRight />
                <div>
                    <span className={s.index}>2.</span>
                    <p>Redacción especializada</p>
                    <span>Escribimos el contenido siguiendo tus indicaciones de manera manual (sin IA) con redactores especializados</span>
                </div>
                <ArrowCurvedRight />
                <div>
                    <span className={s.index}>3.</span>
                    <p>Correcciones ilimitadas</p>
                    <span>Si el artículo no era como esperabas puedes pedir los cambios que quieras de manera ilimitada y sin costes adicionales</span>
                </div>
            </div>
        </div>
    )
}