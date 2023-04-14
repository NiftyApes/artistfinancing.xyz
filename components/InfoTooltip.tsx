import { AiOutlineQuestionCircle } from 'react-icons/ai'
import Tooltip, { Side } from './Tooltip'

const InfoTooltip = ({
  side,
  content,
  modeOverride,
}: {
  side?: Side
  content: string
  modeOverride?: 'light' | 'dark'
}) => {
  let iconStyle = 'text-gray-500 dark:text-white'

  if (modeOverride === 'light') {
    iconStyle = 'text-gray-500'
  }

  if (modeOverride === 'dark') {
    iconStyle = 'text-white'
  }

  return (
    <Tooltip content={content} side={side} modeOverride={modeOverride}>
      <div className={iconStyle}>
        <AiOutlineQuestionCircle />
      </div>
    </Tooltip>
  )
}

export default InfoTooltip
