import s from '../../../styles/css/LoadingDots.module.css';

const LoadingDots = () => {
  return (
    <span className={s.root}>
      <span>•</span>
      <span>•</span>
      <span>•</span>
    </span>
  );
};

export default LoadingDots;
