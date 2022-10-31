import {
  createContext,
  useContext,
  useState,
  useReducer,
  useCallback,
} from 'react';

const SessionContext = createContext();

const getBookMark = (userName) => {
  const bookAndMark = JSON.parse(localStorage.getItem(userName));
  return bookAndMark ? bookAndMark.books : [];
};
const setJoinUser = (userName) => {
  localStorage.setItem(userName, JSON.stringify({ books: [] }));
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        loginUser: action.payload,
        books: getBookMark(action.payload),
      };
    case 'LOGOUT':
      return {
        loginUser: null,
        books: [],
      };
    case 'ADD_BOOK':
      break;
    case 'ADD_MARK':
      break;
    case 'REMOVE_BOOK':
      break;
    case 'REMOVE_MARK':
      break;
    default:
      return state;
  }
};

export const SessionProvider = ({ children }) => {
  const [session, dispatch] = useReducer(reducer, {
    loginUser: null,
    books: [],
  });

  const login = useCallback((userName) => {
    dispatch({ type: 'LOGIN', payload: userName });
  }, []);

  const logout = useCallback(() => {
    dispatch({ type: 'LOGOUT' });
  }, []);

  return (
    <SessionContext.Provider value={{ session, login, logout }}>
      {children}
    </SessionContext.Provider>
  );
};
export const useSession = () => useContext(SessionContext);
