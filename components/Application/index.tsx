import { Rnd } from 'react-rnd'

import { App } from '~/assets/apps'
import { useApps } from '~/context'

import { TitleBar } from './TitleBar'

export const Application = ({ data }: ApplicationType) => {
  const [{ context }, send] = useApps()
  const { id, width, height, src, component: Component } = data

  const x = 320 + 40 * context.open.length
  const y = 20 + 40 * context.open.length

  const index = context.visible.indexOf(id)

  const handleRaise = () => {
    send({ type: 'RAISE', id })
  }

  return (
    <Rnd
      bounds='parent'
      default={{ x, y, width, height }}
      dragHandleClassName='__handle'
      minHeight={320}
      minWidth={320}
      style={{ zIndex: index }}
      onMouseDown={handleRaise}
      onResize={handleRaise}>
      <section
        className='flex overflow-hidden flex-col w-full h-full text-caption rounded border border-surface shadow-flyout'
        role='application'>
        <TitleBar data={data} />
        <div className='grow bg-mica'>
          {Component ? (
            <Component />
          ) : src ? (
            <iframe className='w-full h-full' src={src} title={id} />
          ) : null}
        </div>
      </section>
    </Rnd>
  )
}

interface ApplicationType {
  data: App
}
