import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useState,
} from 'react'

type UserIdContextType<S> = [S, Dispatch<SetStateAction<S>>]
const UserIdContext = createContext<UserIdContextType<number> | null>(null)

export const UserIdProvider = ({ children }: PropsWithChildren) => {
  return <UserIdContext.Provider value={useState<number>(-1)}>{children}</UserIdContext.Provider>
}

export const useUserId = () => {
  const value = useContext(UserIdContext)

  if (!value) {
    throw new Error('UserIdProvider를 찾을 수 없습니다.')
  }

  return value
}
