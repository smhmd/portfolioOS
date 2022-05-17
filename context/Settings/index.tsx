import { createContext, useContext, useState } from 'react'

export const SettingsContext = createContext<SettingsContextType | null>(null)

type Settings = {
  wallpaper: string
}

export const SettingsProvider = (props: SettingsProviderProps) => {
  const value = useState<Settings>({
    wallpaper: '/wallpapers/windows/img19-1920x1200.jpg',
  })

  return <SettingsContext.Provider value={value} {...props} />
}

/**
 * @example const [settings, setSettings] = useSettings()
 */
export const useSettings = () => {
  const ctx = useContext(SettingsContext)
  if (!ctx) {
    throw new Error('useSettings must be used within a SettingsProvider')
  }
  return ctx
}

type SettingsProviderProps = React.PropsWithChildren<unknown>
type SettingsContextType = [
  Settings,
  React.Dispatch<React.SetStateAction<Settings>>
]
