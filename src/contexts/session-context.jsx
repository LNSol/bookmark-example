import {
  createContext,
  useContext,
  useState,
  useReducer,
  useCallback,
} from 'react';

const SessionContext = createContext();

const getBooks = (userName) => {
  const bookAndMark = JSON.parse(localStorage.getItem(userName));
  return bookAndMark ? bookAndMark : [];
};
const setBooks = (userName, book) => {
  const books = getBooks(userName);
  books.push(book);
  localStorage.setItem(userName, JSON.stringify(books));
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        loginUser: action.payload,
        books: getBooks(action.payload),
      };
    case 'LOGOUT':
      return {
        loginUser: null,
        books: [],
      };
    case 'ADD_BOOK':
      setBooks(state.loginUser, action.payload);
      state.books.push(action.payload);
      return {
        ...state,
      };
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

  const addBook = useCallback(
    (title) => {
      const maxId = Math.max(...session.books.map((book) => book.id), 0);
      dispatch({
        type: 'ADD_BOOK',
        payload: { id: maxId + 1, title, marks: [] },
      });
    },
    [session]
  );

  return (
    <SessionContext.Provider value={{ session, login, logout, addBook }}>
      {children}
    </SessionContext.Provider>
  );
};
export const useSession = () => useContext(SessionContext);
