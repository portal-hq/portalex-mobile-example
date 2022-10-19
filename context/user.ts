import { createContext, useContext } from 'react'

const UserContext = createContext<AuthResult>(null)

export const UserContextProvider = UserContext.Provider

export const useUser = () => {
  const user = useContext(UserContext)

  return user
}

export default UserContext
