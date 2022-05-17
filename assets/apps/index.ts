import { EdgeSVG, VSCodeSVG, WordSVG } from '~/assets/svg'
import * as Constants from '~/constants'
import { defineApp } from '~/utils'

export type AppID = string
export const defaultApps: AppID[] = ['vscode', 'edge', 'word']

export const apps: Record<AppID, App> = {
  vscode: defineApp({
    id: 'vscode',
    title: 'Code',
    icon: VSCodeSVG,
    src: Constants.VSCODE_IFRAME_SRC,
  }),
  edge: defineApp({
    id: 'edge',
    title: 'Microsoft Edge',
    icon: EdgeSVG,
    src: Constants.EDGE_STARTUP_PAGE,
  }),
  word: defineApp({
    id: 'word',
    title: 'Microsoft Word',
    icon: WordSVG,
  }),
}

export type App = {
  id: AppID
  title: string
  icon: SVGComponent
  width: number
  height: number

  src?: string
  component?: () => JSX.Element
}
