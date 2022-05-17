import clsx from 'clsx'

import { App } from '~/assets/apps'
import { DismissSVG, MaximizeSVG, SubtractSVG } from '~/assets/svg'
import { useApps } from '~/context'

export const TitleBar = ({ data }: TitleBarProps) => {
  const [{ context }, send] = useApps()
  const { id, title, icon: Icon } = data

  const isOnTop = context.visible.at(-1) === id

  const handleClose = () => {
    send({ type: 'CLOSE', id })
  }

  const handleMinimize = () => {
    send({ type: 'MINIMIZE', id })
  }

  return (
    <div
      className={clsx(
        'flex justify-between items-center w-full bg-solid-primary border-b border-card select-none',
        !isOnTop && 'text-disabled'
      )}>
      <h6 className={clsx('__handle', 'flex grow items-center p-2 space-x-2')}>
        <Icon className='w-4 h-4' role='presentation' />
        <span>{title}</span>
      </h6>
      <div>
        <button
          className='py-2 px-4 hover:bg-subtle-secondary'
          title='Minimize'
          onMouseUp={handleMinimize}>
          <SubtractSVG
            fill='currentColor'
            role='presentation'
            shapeRendering='crispEdges'
          />
        </button>
        <button
          className='py-2 px-4 hover:bg-subtle-secondary'
          title='Maximize'>
          <MaximizeSVG fill='currentColor' role='presentation' />
        </button>
        <button
          className={clsx(
            'py-2 px-4 hover:bg-system-critical',
            isOnTop && 'hover:text-white'
          )}
          title='Close'
          onMouseUp={handleClose}>
          <DismissSVG
            fill='currentColor'
            role='presentation'
            shapeRendering='crispEdges'
          />
        </button>
      </div>
    </div>
  )
}

interface TitleBarProps {
  data: App
}
