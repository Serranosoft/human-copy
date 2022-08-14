import ClipSVG from "./icons/Clip";
import s from '../styles/css/Stats.module.css';
import { motion } from "framer-motion";

export default function Stats() {


    return (
        <div className={s.bigImg}>
            <h2>Estadísticas de <motion.span initial={{ opacity: 0 }} whileInView={{textShadow: "0 0 25px #34b3c1, 0 0 30px #4dbbc7", opacity: 1}} viewport={{ once: true }} transition={{delay: 0.25}}>nuestros trabajos</motion.span></h2>
            <motion.div
            viewport={{ once: true }}
            transition={{duration: 0.5}}
            whileInView={{x: [-100, 0], y: [500, 0]}}
            >
                <ClipSVG />
                <div>
                    <div style={{ backgroundImage: "url(/sc-nt.jpg)" }}>
                        <span>Página web <span className={s.highlight}>warez</span></span>
                    </div>
                    <span>+10.000% impresiones y clics en 7 meses</span>
                </div>
                <div>
                    <div style={{ backgroundImage: "url(/sc-tst.jpg)" }}>
                        <span>Página web de <span className={s.highlight}>series en inglés</span></span>
                    </div>
                    <span>+70% impresiones en el último mes</span>
                </div>
                <div>
                    <div style={{ backgroundImage: "url(/sc-ce.jpg)" }}>
                        <span>Página web de <span className={s.highlight}>criptomonedas</span></span>
                    </div>
                    <span>+6000% impresiones con contenido en tendencia</span>
                </div>
                <span>Pon el ratón por encima de las gráficas para conocer la temática de cada proyecto</span>
                <div>
                    <div style={{ backgroundImage: "url(/sc-db.jpg)" }}>
                        <span>Página web de <span className={s.highlight}>recetas</span></span>
                    </div>
                    <span>+55% impresiones y clics en los últimos 4 meses</span>
                </div>
                <div>
                    <div style={{ backgroundImage: "url(/sc-hf.jpg)" }}>
                        <span>Página web de <span className={s.highlight}>finanzas</span></span>
                    </div>
                    <span>Crecimiento de un 40% trimestralmente</span>
                </div>
                <div>
                    <div style={{ backgroundImage: "url(/sc-idlt.jpg)" }}>
                        <span>Página web de <span className={s.highlight}>noticias en prensa rosa</span></span>
                    </div>
                    <span>+1250% durante 2 meses y medio</span>
                </div>
            </motion.div>

        </div>
    )
}