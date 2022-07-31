
import s from '../styles/css/WhoWeAre.module.css';
import ArrowDownSVG from './icons/ArrowDown';

export default function WhoWeAre() {


    return (
        <section className={s.root}>
            <h2>¿Quiénes somos?</h2>
            <div>
                <div>
                    <div className={s.avatar}>
                        <img src="/paula.jpg" />
                        <div className={s.description}>
                            <h3>Paula Quintana Gonzalez</h3>
                            <p>SEO & Copywriter</p>
                            <span>Lorem ipsum dolor sit amet consectetur adipisicing elit.</span>
                        </div>
                        <div className={s.socialBar}>
                            <a target="_blank" href="https://twitter.com/hugmelevi"><img src="/twitter.svg" /></a>
                        </div>
                    </div>
                    <div className={s.avatar}>
                        <img src="/manuel.jpg" />
                        <div className={s.description}>
                            <h3>Manuel Serrano Scholz</h3>
                            <p>SEO & Programador</p>
                            <span>Lorem ipsum dolor sit amet consectetur adipisicing elit.</span>
                        </div>
                        <div className={s.socialBar}>
                            <a target="_blank" href="https://twitter.com/ImScholz"><img src="/twitter.svg" /></a>
                        </div>
                    </div>
                    <div className={s.avatar}>
                        <img src="/users.svg" />
                        <div className={s.description}>
                            <h3>Redactores profesionales</h3>
                            <p>Redactor/a</p>
                            <span>Redactores especializados en marketing, posicionamiento y ventas con los que hemos trabajado previamente y acreditamos su máxima profesionalidad</span>
                        </div>
                    </div>
                    
                </div>
            </div>
                <ArrowDownSVG />
        </section>
    )
}
