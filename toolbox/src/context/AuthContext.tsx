import React, { useContext, useState, useEffect } from "react"
import { getUserFromUid, loginWithGoogle, logOut } from "../lib/controller";
import { auth } from "../lib/firebase"
import { GoogleUser } from "../types/types";

const AuthContext = React.createContext<AuthDefaultValue>({
  currentUser: undefined,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve()
})

type AuthDefaultValue = {
  currentUser: GoogleUser | undefined,
  login: () => Promise<any>,
  logout: () => Promise<any>
  setCurrentUser?: React.Dispatch<React.SetStateAction<GoogleUser | undefined>>
};

export function useAuth() {
  return useContext(AuthContext)
}

interface IAuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: IAuthProviderProps) {
  const [currentUser, setCurrentUser] = useState<GoogleUser | undefined>()

  async function login() {
    const userFromBackend = await loginWithGoogle();
    const userWithId = await getUserFromUid(userFromBackend.uid);
    if (userWithId) {
      setCurrentUser(userWithId);
    }
    return userWithId;
  }

  async function logout() {
    const a = await logOut();
    setCurrentUser(undefined);
    return a;

  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async user => {
      if (user) {
        const userWithId = await getUserFromUid(user.uid)
        setCurrentUser(userWithId)
      }
    })

    return unsubscribe
  }, [])

  const value = {
    currentUser,
    login,
    logout,
    setCurrentUser
  }

  return (
    <AuthContext.Provider value={value} >
      {children}
    </AuthContext.Provider>
  )
}
