import { useEffect, useRef } from 'react';
import s from '../styles/css/Faq.module.css';

export default function Faq() {


    useEffect(() => {

        document.querySelectorAll("div.question").forEach(question => {
            console.log(question);
            question.addEventListener("click", () => {
                question.querySelector(".questionAnswer")!.classList.toggle(s["show"]);
            })
        })
    }, [])

    return (
        <section className={s.root}>
            <div>
                <h2>Preguntas frecuentes</h2>
                <div className={s.questionWrapper + " question"}>
                    <div className={s.questionTitle}>
                        <p>¿Qué métodos de pago tiene HumanCopy?</p>
                        <img src="/down-arrow.svg" />
                    </div>
                    <div className={s.questionAnswer + " questionAnswer"}>
                        <p>
                            De manera predeterminada sólo se puede pagar a través de una tarjeta bancaria. Pero aceptamos pagos por Paypal o USDT.
                        </p>
                        <p>
                            En ese caso, tendría que ponerse en contacto con nosotros a través del correo humancopyes@gmail.com
                        </p>
                    </div>
                </div>
                <div className={s.questionWrapper + " question"}>
                    <div className={s.questionTitle}>
                        <p>¿Puedo cancelar mi suscripción en cualquier momento?</p>
                        <img src="/down-arrow.svg" />
                    </div>
                    <div className={s.questionAnswer + " questionAnswer"}>
                        <p>
                            Si, HumanCopy es un servicio sin permanencia. En tu panel de usuario puedes acceder a múltiples opciones como la de cancelar la suscripción.
                        </p>
                    </div>
                </div>
                <div className={s.questionWrapper + " question"}>
                    <div className={s.questionTitle}>
                        <p>¿Quién va a redactar mis artículos? ¿Puedo ponerme en contacto directo?</p>
                        <img src="/down-arrow.svg" />
                    </div>
                    <div className={s.questionAnswer + " questionAnswer"}>
                        <p>
                            Los artículos serán redactados por diferentes personas especializadas en el ámbito más cercano a tu web. Por ejemplo, si quieres artículos sobre turismo, buscaremos a un redactor con experiencia previa en el sector.
                        </p>
                        <p>
                            Lo mejor de HumanCopy es que no es necesario que busques ni te pongas en contacto con nadie, sólo subes tus especificaciones y nosotros haremos el resto.
                        </p>
                    </div>
                </div>
                <div className={s.questionWrapper + " question"}>
                    <div className={s.questionTitle}>
                        <p>¿Qué pasa si no me gustan mis artículos?</p>
                        <img src="/down-arrow.svg" />
                    </div>
                    <div className={s.questionAnswer + " questionAnswer"}>
                        <p>
                            HumanCopy es un servicio de redacción y corrección ilimitada. Si el artículo no es lo que esperabas sólo tienes que ir a correcciones y decirnos cómo quieres que lo cambiemos.
                        </p>
                        <p>
                            Esto no conlleva ningún coste independientemente del plan contratado.
                        </p>
                    </div>
                </div>
                <div className={s.questionWrapper + " question"}>
                    <div className={s.questionTitle}>
                        <p>¿Puedo elegir el tipo de redacción?</p>
                        <img src="/down-arrow.svg" />
                    </div>
                    <div className={s.questionAnswer + " questionAnswer"}>
                        <p>
                            Trabajamos con redactores especializados y puedes indicarnos si quieres una redacción para tu página de empresa, email marketing, Adsense, Amazon afiliados, Ecommerce…
                        </p>
                    </div>
                </div>
                <div className={s.questionWrapper + " question"}>
                    <div className={s.questionTitle}>
                        <p>¿En cuánto tiempo voy a tener mis artículos disponibles?</p>
                        <img src="/down-arrow.svg" />
                    </div>
                    <div className={s.questionAnswer + " questionAnswer"}>
                        <p>
                            Los artículos son redactados por personas y no por IA, esto conlleva un mínimo de horas para poder investigar y redactar.
                        </p>
                        <p>
                            Tardaremos el menos tiempo posible con una estimación de 1.000 o 2.000 palabras en 2 días.
                        </p>
                        <p>
                            Recuerda que en tu panel puedes indicarnos qué artículos quieres con prioridad.
                        </p>
                    </div>
                </div>
            </div>
        </section >
    )
}