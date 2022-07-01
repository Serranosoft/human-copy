import s from '../../../styles/css/LoadingDots.module.css';

const LoadingDots = ({big = true} : {big?: any}) => {
    console.log(big);
  return (
    // <span className={s.root}>
    //   <span>•</span>
    //   <span>•</span>
    //   <span>•</span>
    // </span>
    <span className={big ? "loader loader-xl" : "loader loader-sm"}>

    </span>
  );
};

export default LoadingDots;
