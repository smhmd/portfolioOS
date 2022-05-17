import type { TooltipContentProps } from '@radix-ui/react-tooltip'
import { Content, Root, Trigger } from '@radix-ui/react-tooltip'

export const Tooltip = ({ text, children, ...props }: TooltipProps) => {
  return (
    <Root delayDuration={300}>
      <Content
        className='py-1.5 px-2 rounded-base border border-surface-flyout shadow-tooltip backdrop-blur-3xl bg-acrylic'
        {...props}>
        {text}
      </Content>
      <Trigger asChild>{children}</Trigger>
    </Root>
  )
}

type TooltipProps = React.PropsWithChildren<
  { text: string } & TooltipContentProps
>
