import {
  createContext,
  useContext,
  useState,
  useReducer,
  useCallback,
} from 'react';

const SessionContext = createContext();

const getBooks = (userName) => {
  const { books } = JSON.parse(localStorage.getItem(userName)) ?? { books: [] };
  return books ? books : [];
};
const setBooks = (userName, book) => {
  const books = getBooks(userName);
  books.push(book);
  localStorage.setItem(userName, JSON.stringify({ books }));
};
const setMarks = (userName, bookId, mark) => {
  const books = getBooks(userName);
  books.find((book) => book.id === bookId)?.marks.push(mark);
  localStorage.setItem(userName, JSON.stringify({ books }));
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
      return { ...state };
    case 'ADD_MARK':
      setMarks(state.loginUser, action.payload.bookId, action.payload.newMark);
      state.books
        .find((book) => book.id === action.payload.bookId)
        ?.marks.push(action.payload.newMark);
      return { ...state };
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

  const addMark = useCallback(
    (bookId, title) => {
      const { marks } = session.books.find((book) => book.id === bookId);
      const maxId = Math.max(...marks.map((mark) => mark.id), 0);
      const newMark = {
        id: maxId + 1,
        icon: 'Icon',
        title,
        content: `content${maxId + 1}`,
        like: 'like: 15',
      };
      console.log('newMark >>> ', newMark);
      dispatch({ type: 'ADD_MARK', payload: { bookId, newMark } });
    },
    [session]
  );

  return (
    <SessionContext.Provider
      value={{ session, login, logout, addBook, addMark }}
    >
      {children}
    </SessionContext.Provider>
  );
};
export const useSession = () => useContext(SessionContext);
