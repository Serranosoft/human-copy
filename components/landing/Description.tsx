import s from '../../styles/css/Description.module.css';
import ArrowCurvedRight from '../icons/ArrowCurvedRight';

export default function Description() {
    return (
        <div className={s.description}>
            <h2>¿Prefieres 5 minutos o 4 horas de trabajo?</h2>
            <p><i>HumanCopy</i> se ha creado con el objetivo de <span>facilitar el trabajo de búsqueda de redactores, petición de artículos y correcciones</span> ofreciendo un panel con todas las funcionalidades necesarias.</p>
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