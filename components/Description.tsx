import s from '../styles/css/Description.module.css';


export default function Description() {
    return (
        <div className={s.description}>
            <h2>Lorem Ipsum <span>dolor sit amet</span></h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. <span>Donec neque enim</span>, elementum eu varius sed, vestibulum non tellus. Aenean massa nunc, fermentum ac enim vitae, porttitor interdum lectus. Integer et tortor laoreet, varius lacus nec, feugiat quam</p>
            <div>
                <div>
                    <p>Lorem ipsum dolor sit amet.</p>
                    <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse suscipit elementum urna, sit amet efficitur neque.</span>
                </div>
                <div>
                    <p>Lorem ipsum dolor sit amet.</p>
                    <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse suscipit elementum urna, sit amet efficitur neque.</span>
                </div>
                <div>
                    <p>Lorem ipsum dolor sit amet.</p>
                    <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse suscipit elementum urna, sit amet efficitur neque.</span>
                </div>
            </div>
        </div>
    )
}