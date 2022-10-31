import styles from './AddButton.module.css';
import cn from 'classnames/bind';
import { GrAdd } from 'react-icons/gr';
const cx = cn.bind(styles);

const AddButton = ({ size = 18, onClick }) => {
  return (
    <div className={cx('add-button')} onClick={onClick}>
      <GrAdd size={size} />
    </div>
  );
};
export default AddButton;
