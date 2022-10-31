import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSession } from '../contexts/session-context';

const Login = () => {
  const navigate = useNavigate();
  const userNameRef = useRef(null);
  const { login } = useSession();

  const onClick = () => {
    login(userNameRef.current.value);
    navigate('/');
  };

  return (
    <div>
      userName: <input type='text' ref={userNameRef} />
      <button onClick={onClick}>Login</button>
    </div>
  );
};
export default Login;
