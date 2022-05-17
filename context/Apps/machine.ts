import useStateMachine, { t } from '@cassiozen/usestatemachine'
import { produce } from 'immer'

import { AppID } from '~/assets/apps'

type ContextType = { open: AppID[]; visible: AppID[] }

type EventsType = {
  OPEN: { id: AppID }
  CLOSE: { id: AppID }
  RAISE: { id: AppID }
  MINIMIZE: { id: AppID }
  CLEAR: object // meaning empty
  'TASKBAR.CLICK': { id: AppID }
}

// We cache the visible state before we clear it when we "view desktop" so that we can put the exact visible apps back when we view the apps
let visibleCache: ContextType['visible'] = []

export const useAppsStateMachine = () =>
  useStateMachine({
    initial: 'idle',
    verbose: true,
    context: {
      // Array of apps that are open -- currently, it does not support multiple instances of the same app
      open: [],
      // Array of apps that are visible, the last item is visually the top-most app. Apps can be open and not not visible (minimized).
      visible: [],
    },
    states: {
      idle: {
        on: {
          OPEN: 'idle',
          CLOSE: 'idle',
          RAISE: 'idle',
          MINIMIZE: 'idle',
          CLEAR: {
            target: 'idle',
            guard: ({ context }) => {
              return context.open.length > 0
            },
          },
          'TASKBAR.CLICK': 'idle',
        },
        effect: ({ event, setContext, send, context: { open, visible } }) => {
          switch (event.type) {
            case 'OPEN': {
              setContext(
                produce(({ open, visible }) => {
                  open.push(event.id)
                  visible.push(event.id)
                })
              )
              return
            }
            case 'CLOSE': {
              setContext(
                produce(({ open, visible }) => {
                  const index = open.indexOf(event.id)
                  open.splice(index, 1)
                  visible.splice(visible.indexOf(event.id), 1)
                })
              )
              return
            }
            case 'RAISE': {
              // Move the application to the last position so that its index can be used as a z-index for all the applications
              setContext(
                produce(({ visible }) => {
                  const index = visible.indexOf(event.id)
                  if (index !== -1) {
                    visible.splice(index, 1)
                    visible.push(event.id)
                  } else {
                    visible.push(event.id)
                  }
                })
              )
              return
            }
            case 'MINIMIZE': {
              setContext(
                produce(({ visible }) => {
                  visible.splice(visible.indexOf(event.id), 1)
                })
              )
              return
            }
            case 'CLEAR': {
              setContext((context) => {
                if (context.visible.length > 0) {
                  visibleCache = context.visible
                  return { ...context, visible: [] }
                } else {
                  return { ...context, visible: visibleCache }
                }
              })
              return
            }
            case 'TASKBAR.CLICK': {
              const isOnTop = visible.at(-1) === event.id
              const isAlreadyOpen = open.includes(event.id)

              if (isOnTop) {
                send({ type: 'MINIMIZE', id: event.id })
              } else if (isAlreadyOpen) {
                send({ type: 'RAISE', id: event.id })
              } else {
                send({ type: 'OPEN', id: event.id })
              }
              return
            }
            default:
              break
          }
        },
      },
    },
    schema: {
      context: t<ContextType>(),
      events: {
        OPEN: t<EventsType['OPEN']>(),
        CLOSE: t<EventsType['CLOSE']>(),
        RAISE: t<EventsType['RAISE']>(),
        MINIMIZE: t<EventsType['MINIMIZE']>(),
        CLEAR: t<EventsType['CLEAR']>(),
        'TASKBAR.CLICK': t<EventsType['OPEN']>(),
      },
    },
  })
