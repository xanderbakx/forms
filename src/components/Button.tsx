import { Button as BPButton, ButtonProps, Intent } from '@blueprintjs/core'

export const Button = ({ children, type, ...restProps }: ButtonProps) => {
  return (
    <BPButton
      className="min-w-[100px]"
      type={type}
      intent={type === 'submit' ? Intent.PRIMARY : Intent.NONE}
      {...restProps}
    >
      {children}
    </BPButton>
  )
}

export default Button
