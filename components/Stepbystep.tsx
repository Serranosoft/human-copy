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
                        <p>Escoge un plan</p>
                        <span>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi purus quam, semper id nulla nec, interdum interdum nulla. Sed efficitur orci in sem maximus vehicula. Vestibulum euismod ante velit.
                        </span>
                    </div>
                </div>
                <RightLine className={s.stepLine} />
                <div>
                    <div>
                        <p>Haz un pedido</p>
                        <span>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi purus quam, semper id nulla nec, interdum interdum nulla. Sed efficitur orci in sem maximus vehicula. Vestibulum euismod ante velit.
                        </span>
                    </div>
                    <img className="on-scroll" src="/step24-home.jpg" alt="Vercel.com Logo" />
                </div>
                <LeftLine className={s.stepLine} />
                <div>
                    <img className="on-scroll" src="/step3-home.jpg" alt="Vercel.com Logo" />
                    <div>
                        <p>Supervisa y descarga tus pedidos</p>
                        <span>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi purus quam, semper id nulla nec, interdum interdum nulla. Sed efficitur orci in sem maximus vehicula. Vestibulum euismod ante velit.
                        </span>
                    </div>
                </div>
                <MiddleLine className={s.stepLine} />
                <div>
                    <p>¡Listo!</p>
                    <span>AAAAAAAAAAAAAA</span>
                </div>
            </div>
        </div>
    )
}