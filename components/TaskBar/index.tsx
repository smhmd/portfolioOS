import * as Toolbar from '@radix-ui/react-toolbar'

import { apps, defaultApps } from '~/assets/apps'
import { WinStartSVG } from '~/assets/svg'
import { TaskBarItem, Tooltip } from '~/components'
import { useApps } from '~/context'

export const TaskBar = () => {
  const [{ context }, send] = useApps()

  const taskbarApps = defaultApps.concat(
    context.open.filter((id) => !defaultApps.includes(id))
  )

  const handleClear = () => {
    send('CLEAR')
  }

  return (
    <Toolbar.Root className='flex fixed bottom-0 z-10 justify-center items-center py-1 w-full border-t border-surface backdrop-blur-lg bg-acrylic-base'>
      <Toolbar.ToggleGroup className='flex space-x-1' type='single'>
        <Tooltip side='top' sideOffset={10} text='Start'>
          <Toolbar.ToggleItem
            aria-label='start'
            className='flex flex-col justify-center items-center p-1 space-y-1.5'
            value='start'>
            <WinStartSVG className='w-6 h-6' role='presentation' />
          </Toolbar.ToggleItem>
        </Tooltip>
        {taskbarApps.map((id) => (
          <TaskBarItem key={id} data={apps[id]} value={id} />
        ))}
      </Toolbar.ToggleGroup>

      <Tooltip side='top' sideOffset={10} text='View Desktop'>
        <Toolbar.Button
          aria-label='view desktop'
          className='absolute right-0 ml-auto w-0.75 h-full bg-control'
          onClick={handleClear}
        />
      </Tooltip>
    </Toolbar.Root>
  )
}
