import { ClipLoader } from 'react-spinners'
import { twMerge } from 'tailwind-merge'

type ButtonProps = {
  children: React.ReactNode
  onClick?: () => void
  variant?: 'primary' | 'secondary' | 'danger'
  type?: 'button' | 'submit' | 'reset'
  isLoading?: boolean
  disabled?: boolean
  size?: 'small' | 'medium' | 'large'
  textCase?: 'uppercase' | 'lowercase' | 'capitalize'
}

const variantStyles = {
  primary: 'bg-white text-black',
  secondary: 'bg-black border border-white text-white',
  danger: 'bg-red-500 text-white',
}

const sizeStyles = {
  small: 'h-[32px] text-[12px]',
  medium: 'h-[50px] text-[14px]',
  large: 'h-[70px] text-[18px]',
}

const loadingColors = {
  primary: 'black',
  secondary: 'white',
  danger: 'white',
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  size = 'medium',
  type = 'button',
  isLoading,
  disabled,
  textCase = 'uppercase',
}) => (
  <button
    type={type}
    className={twMerge(
      'flex w-full items-center justify-center whitespace-nowrap rounded-[40px] px-4 font-bold transition-opacity hover:opacity-75 focus:ring-0',
      (isLoading || disabled) && 'cursor-not-allowed opacity-75',
      variantStyles[variant],
      sizeStyles[size],
      textCase
    )}
    onClick={onClick}
    disabled={disabled || isLoading}
  >
    {isLoading ? (
      <div className="flex space-x-2">
        <div>{children}</div>
        <ClipLoader size={20} color={loadingColors[variant]} />
      </div>
    ) : (
      children
    )}
  </button>
)

export default Button
