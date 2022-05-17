/**
 * For accessibility-reasons,
 * imported SVGs require either aria-label or aria-labelledby
 * unless you pass role='presentation' or aria-hidden='true'
 */
type SVGPropsOverrides =
  | {
      'aria-hidden': true | 'true'
    }
  | {
      role: 'presentation'
    }
  | {
      'aria-label': string
    }
  | {
      'aria-labelledby': string
    }

type SVGComponent = (
  props: React.SVGProps<SVGSVGElement> & SVGPropsOverrides
) => JSX.Element

declare module '*.svg' {
  const ReactComponent: SVGComponent
  export { ReactComponent }
}
