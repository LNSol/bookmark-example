import { useState, useEffect } from 'react';
import styles from './BookCard.module.css';
import cn from 'classnames/bind';
import MarkCard from './MarkCard';
import AddButton from './common/AddButton';
import InputCreateCard from './modal/InputCreateCard';
import { useSession } from '../contexts/session-context';
const cx = cn.bind(styles);

const BookCard = ({ bookId, title }) => {
  const { session, addMark } = useSession();
  console.log('session >> ', session);
  const [marks, setMarks] = useState([]);
  const [isShowModal, setIsShowModal] = useState({
    clicked: false,
    x: 0,
    y: 0,
  });

  const onClickShowModal = (evt) => {
    setIsShowModal((prev) => ({
      clicked: !prev.clicked,
      x: evt.pageX - 300,
      y: evt.pageY - 100,
    }));
  };
  const addMarkCard = (title) => {
    // const maxId = Math.max(...marks.map((mark) => mark.id), 0);
    // marks.push({
    //   id: maxId + 1,
    //   icon: 'Icon',
    //   title,
    //   content: `content${maxId + 1}`,
    //   like: 'like: 20',
    // });
    // setMarks([...marks]);
    addMark(bookId, title);
  };

  const closeModal = () => {
    setIsShowModal({ ...isShowModal, clicked: false });
  };

  useEffect(() => {
    setMarks(
      (prevMarks) =>
        session.books.find((book) => book.id === bookId)?.marks ?? []
    );
  }, [session]);

  return (
    <div className={cx('book-card')}>
      <div className={cx('book-card-title')}>
        <h2>{title}</h2>
        <AddButton onClick={onClickShowModal} />
      </div>
      <div className={cx('marks')}>
        {marks.map((mark) => (
          <MarkCard key={mark.id} markInfo={mark} />
        ))}
      </div>
      {isShowModal.clicked ? (
        <InputCreateCard
          pos={{ x: isShowModal.x, y: isShowModal.y }}
          closeModal={closeModal}
          addCard={addMarkCard}
        />
      ) : (
        <></>
      )}
    </div>
  );
};
export default BookCard;
