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
  let contentStyles = 'bg-black text-white dark:bg-white dark:text-black'

  if (modeOverride === 'light') {
    iconStyle = 'text-gray-500'
    contentStyles = 'bg-black text-white'
  }

  if (modeOverride === 'dark') {
    iconStyle = 'text-white'
    contentStyles = 'bg-white text-black'
  }

  return (
    <Tooltip
      content={
        <div
          className={`align-center p-2 text-center text-sm ${contentStyles}`}
        >
          {content}
        </div>
      }
      side={side}
      modeOverride={modeOverride}
    >
      <div className={iconStyle}>
        <AiOutlineQuestionCircle />
      </div>
    </Tooltip>
  )
}

export default InfoTooltip
