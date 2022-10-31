import { Link } from 'react-router-dom';
import styles from './Nav.module.css';
import cn from 'classnames/bind';
import { useSession } from '../contexts/session-context';
const cx = cn.bind(styles);

const Nav = () => {
  const { session, logout } = useSession();

  return (
    <div className={cx('top-nav')}>
      <h1>Book & Mark</h1>
      <div className={cx('menu')}>
        <Link to='/'>Home</Link>
        <Link to='/about'>About</Link>
        {!session?.loginUser ? (
          <Link to='/login'>Login</Link>
        ) : (
          <Link to='/' onClick={logout}>
            Logout
          </Link>
        )}
      </div>
    </div>
  );
};
export default Nav;
