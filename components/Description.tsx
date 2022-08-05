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
                    <p>Evita comunicaciones innecesarias</p>
                    <span>No esperes la respuesta de tu redactor. Manda una solicitud desde tu panel y tendrás tus artículos lo más pronto posible</span>
                </div>
                <ArrowCurvedRight />
                <div>
                    <span className={s.index}>2.</span>
                    <p>Redacción manual, original y especializada</p>
                    <span>Nuestras redacciones son escritas a mano (sin IA) y tenemos redactores especializados en diversidad de sectores</span>
                </div>
                <ArrowCurvedRight />
                <div>
                    <span className={s.index}>3.</span>
                    <p>Correcciones ilimitadas incluidas</p>
                    <span>Si el artículo no era como esperabas, puedes pedir los cambios que quieras de manera ilimitada y sin costes adicionales</span>
                </div>
            </div>
        </div>
    )
}