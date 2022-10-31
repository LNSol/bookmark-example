import { useRef } from 'react';
import styles from './InputCreateCard.module.css';
import cn from 'classnames/bind';
const cx = cn.bind(styles);

const InputCreateCard = ({ pos, closeModal, addCard }) => {
  const titleRef = useRef(null);

  const onClickAddCard = () => {
    const title = titleRef.current.value;
    if (!title) {
      return;
    }
    addCard(title);
    closeModal();
  };

  return (
    <div className={cx('modal')}>
      <div className={cx('modal-box')} style={{ top: pos.y, left: pos.x }}>
        <div className={cx('input')}>
          <input type='text' placeholder='https://...' ref={titleRef} />
        </div>
        <div className={cx('buttons')}>
          <button onClick={onClickAddCard}>만들기</button>
          <button onClick={closeModal}>취소</button>
        </div>
      </div>
    </div>
  );
};
export default InputCreateCard;
