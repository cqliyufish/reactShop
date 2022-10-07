import { createContext, useState, useEffect } from "react";
import {
  onAuthStateChangedListener,
  createUserDocumentFromAuth,
} from "utils/firebase/firebase.utils";

//step 1: 创建context，需要提供default value
export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
});

//step 2：provider包裹context作用返回
//provider 提供value供订阅者使用
export const UserProvider = ({ children }) => {
  // auth change listener
  useEffect(() => {
    onAuthStateChangedListener((user) => {
      if (user) {
        // creat doc ref if user
        createUserDocumentFromAuth(user);
      }
      setCurrentUser(user);
    });
  }, []);

  const [currentUser, setCurrentUser] = useState(null);
  const value = { currentUser, setCurrentUser };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
