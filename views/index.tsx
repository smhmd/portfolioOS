import '~/styles/tailwind.css'

if (import.meta.env.DEV) {
  import('~/styles/inspect.css')
}

import * as React from 'react'
import * as ReactDOM from 'react-dom'

import { Desktop, TaskBar } from '~/components'
import { Providers } from '~/context'

ReactDOM.render(
  <React.StrictMode>
    <Providers>
      <main>
        <Desktop />
        <TaskBar />
      </main>
    </Providers>
  </React.StrictMode>,
  document.getElementById('root')
)
