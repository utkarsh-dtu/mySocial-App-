import { createContext, useReducer, useEffect } from "react";
import AuthReducer from "./AuthReducer";
// const INITIAL_STATE = {
//   user: {
//     _id: "61a4a58b0820ac1a16d222a3",
//     username: "Anirudh Khan",
//     email: "ak@mySocial.com",
//     profilePicture: "",
//     coverPicture: "",
//     followers: [],
//     followings: [],
//     isAdmin: false,
//     createdAt: "2021-11-29T10:03:55.063Z",
//     __v: 0,
//   },
//   isFetching: false,
//   error: false,
// };

const INITIAL_STATE = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  isFetching: false,
  error: false,
};
export const AuthContext = createContext(INITIAL_STATE);
// if we wrap a component around Provider, we can access those elements in the descandants of that component

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  // we are sharing all these values (user, isFetching , error and dipatch with App (around which this AuthContext is wrapped))
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user));
  }, [state.user]);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
