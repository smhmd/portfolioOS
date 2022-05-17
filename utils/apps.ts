import { App } from '~/assets/apps'
import { VSCodeSVG } from '~/assets/svg'

export const defineApp = (app: Partial<App>): App => {
  return Object.assign(
    {
      title: 'Windows Application',
      id: '__app__',
      width: 800,
      height: 600,
      icon: VSCodeSVG,
    },
    app
  )
}
