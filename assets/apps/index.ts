import { EdgeSVG, VSCodeSVG, WordSVG } from '~/assets/svg'
import { defineApp } from '~/utils'

import { VSCode } from './vscode'

export type AppID = string
export const defaultApps: AppID[] = ['vscode', 'edge', 'word']

export const apps: Record<AppID, App> = {
  vscode: defineApp({
    id: 'vscode',
    title: 'Code',
    icon: VSCodeSVG,
    // src: 'https://stackblitz.com/github/smhmd/portfolioOS?embed=1&theme=dark&view=editor',
    component: VSCode,
  }),
  edge: defineApp({
    id: 'edge',
    title: 'Microsoft Edge',
    icon: EdgeSVG,
    src: 'https://www.bing.com',
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
