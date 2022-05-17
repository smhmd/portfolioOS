import * as Tooltip from '@radix-ui/react-tooltip'

import { AppsProvider } from './Apps'
import { SettingsProvider } from './Settings'

export const Providers = ({ children }: ProvidersProps) => {
  return (
    <Tooltip.Provider>
      <AppsProvider>
        <SettingsProvider>{children}</SettingsProvider>
      </AppsProvider>
    </Tooltip.Provider>
  )
}

type ProvidersProps = React.PropsWithChildren<unknown>
