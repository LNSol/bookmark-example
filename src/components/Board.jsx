import { useState, useEffect } from 'react';
import styles from './Board.module.css';
import cn from 'classnames/bind';
import BookCard from './BookCard';
import AddButton from './common/AddButton';
import InputCreateCard from './modal/InputCreateCard';
import { useSession } from '../contexts/session-context';
const cx = cn.bind(styles);

const Board = () => {
  const { session } = useSession();
  const [books, setBooks] = useState([]);
  console.log('books >> ', books);
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

  const addBook = (title) => {
    const maxId = Math.max(...books.map((book) => book.id), 0);
    books.push({ id: maxId + 1, title });
    setBooks([...books]);
  };

  const closeModal = () => {
    setIsShowModal({ ...isShowModal, clicked: false });
  };

  useEffect(() => {
    setBooks((prevBooks) => session.books);
  }, [session]);

  return (
    <div className={cx('board')}>
      <div className={cx('books')}>
        {books.map((book) => (
          <BookCard key={book.id} title={book.title} bookId={book.id} />
        ))}
      </div>
      <div className={cx('add-button')}>
        <AddButton size={32} onClick={onClickShowModal} />
      </div>
      {isShowModal.clicked ? (
        <InputCreateCard
          pos={{ x: isShowModal.x, y: isShowModal.y }}
          closeModal={closeModal}
          addCard={addBook}
        />
      ) : (
        <></>
      )}
    </div>
  );
};
export default Board;
