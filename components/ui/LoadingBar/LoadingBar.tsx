import s from '../../../styles/css/LoadingBar.module.css';

const LoadingBar = ({big = true} : {big?: any}) => {
  return (
    <span className={big ? `${s.loader} ${s.loaderxl}` : `${s.loader} ${s.loadersm}`}></span>
  );
};

export default LoadingBar;
