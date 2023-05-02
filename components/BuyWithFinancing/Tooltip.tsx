import InfoTooltip from 'components/InfoTooltip'

const Tooltip = ({
  tooltipText,
  modeOverride,
}: {
  tooltipText: string
  modeOverride: 'light' | 'dark'
}) => {
  return (
    <span
      style={{ display: 'inline-flex', position: 'relative', top: 2, left: 3 }}
    >
      <InfoTooltip modeOverride={modeOverride} content={tooltipText} />
    </span>
  )
}

export default Tooltip
