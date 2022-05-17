import { apps } from '~/assets/apps'
import { Application } from '~/components'
import { useApps, useSettings } from '~/context'

export const Desktop = () => {
  const [settings] = useSettings()
  const [{ context }] = useApps()

  return (
    <section
      className='grid overflow-hidden auto-cols-20 auto-rows-17.5 w-screen h-screen bg-center bg-no-repeat bg-cover'
      style={{
        backgroundImage: `url(${settings.wallpaper})`,
      }}>
      {context.open.map((id) => (
        <Application key={id} data={apps[id]} />
      ))}
    </section>
  )
}
