import styles from './MarkCard.module.css';
import cn from 'classnames/bind';
const cx = cn.bind(styles);

const MarkCard = ({ markInfo }) => {
  return (
    <div className={cx('mark-card')}>
      <div className={cx('icon')}>Icon</div>
      <div className={cx('content')}>
        <h4>{markInfo.title}</h4>
        <p>{markInfo.content}</p>
        <small>{markInfo.like}</small>
      </div>
    </div>
  );
};
export default MarkCard;
