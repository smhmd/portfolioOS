import { createContext, useContext } from 'react'

import { useAppsStateMachine } from './machine'

export const AppsContext = createContext<AppsContextType | null>(null)

export const AppsProvider = (props: AppsProviderProps) => {
  const machine = useAppsStateMachine()

  return <AppsContext.Provider value={machine} {...props} />
}

export const useApps = () => {
  const ctx = useContext(AppsContext)
  if (!ctx) {
    throw new Error('useApps must be used within an AppsProvider')
  }
  return ctx
}

type AppsProviderProps = React.PropsWithChildren<unknown>
type AppsContextType = ReturnType<typeof useAppsStateMachine>
