import type { ToolbarToggleItemProps } from '@radix-ui/react-toolbar'
import * as Toolbar from '@radix-ui/react-toolbar'
import clsx from 'clsx'

import { App } from '~/assets/apps'
import { Tooltip } from '~/components'
import { useApps } from '~/context'

export const TaskBarItem = ({ data, ...props }: IconProps) => {
  const [{ context }, send] = useApps()
  const { id, title, icon: Icon } = data

  const isOpen = context.open.includes(id)
  const index = context.visible.indexOf(id)
  const isOnTop = index !== -1 && index === context.visible.length - 1

  const label = isOpen ? `${title}, Open` : `Launch ${title}`

  return (
    <Tooltip side='top' sideOffset={10} text={title}>
      <Toolbar.ToggleItem
        aria-label={label}
        className={clsx(
          'group flex relative flex-col justify-center  items-center p-1 space-y-1.5 rounded-base border focus:outline-none focus-visible:ring-2',
          isOnTop ? 'bg-control border-surface-flyout' : 'border-transparent'
        )}
        onClick={() => {
          send({ type: 'TASKBAR.CLICK', id })
        }}
        {...props}>
        <Icon
          className='w-7.5 h-7.5 transition-transform group-active:scale-90'
          role='presentation'
        />
        <span
          aria-hidden
          className={clsx(
            'block absolute bottom-0 h-0.75 rounded-full transition-all',
            isOnTop
              ? 'w-4 bg-accent'
              : isOpen
              ? 'w-1.5 bg-accent-disabled'
              : 'w-0 bg-transparent'
          )}
        />
      </Toolbar.ToggleItem>
    </Tooltip>
  )
}

interface IconProps extends ToolbarToggleItemProps {
  data: App
}
