
import s from '../../styles/css/WhoWeAre.module.css';
import ArrowDownSVG from '../icons/ArrowDown';

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
                            <span>Investigación, organización, esquematización y revisión. Soy la persona encargada de optimizar tu contenido para que consigas el máximo beneficio posible.</span>
                            <span>Después de mucha experiencia redactando en mis proyectos quiero ayudar a crear contenidos de calidad y con proyección.</span>
                        </div>
                        <div className={s.socialBar}>
                            <a target="_blank" href="https://twitter.com/hugmelevi"><img src="/twitter.svg" /></a>
                            <a target="_blank" href="https://www.linkedin.com/in/paula-quintana-36856b204/"><img src="/linkedin.svg" /></a>
                        </div>
                    </div>
                    <div className={s.avatar}>
                        <img src="/manuel.jpg" />
                        <div className={s.description}>
                            <h3>Manuel Serrano Scholz</h3>
                            <p>SEO & Programador</p>
                            <span>Programador y SEO con 5 años de experiencia. Soy el encargado de brindar una plataforma que facilite el trabajo de webmasters y SEOs</span>
                            <span>Tras desarrollar con éxito negocios digitales aplicando SEO generando miles de visitas, leads y remuneración he desarrollado junto con mi compañera esta plataforma para ayudarte a alcanzar tus objetivos</span>
                        </div>
                        <div className={s.socialBar}>
                            <a target="_blank" href="https://twitter.com/ImScholz"><img src="/twitter.svg" /></a>
                            <a target="_blank" href="https://www.linkedin.com/in/manuel-serrano-scholz/"><img src="/linkedin.svg" /></a>
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
