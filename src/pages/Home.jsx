import Board from '../components/Board';
import { useSession } from '../contexts/session-context';

const Home = () => {
  const { session } = useSession();
  return <Board />;
};
export default Home;
