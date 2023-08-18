import { Loan, useCreateCalendarReminder, useLoans } from '@niftyapes/sdk'
import { useTokens } from '@reservoir0x/reservoir-kit-ui'
import useEnvChain from 'hooks/useEnvChain'
import { LuCalendarPlus } from 'react-icons/lu'

type Token = ReturnType<typeof useTokens>['data'][0]

export function PaymentCalendarReminderFromToken({ token }: { token: Token }) {
  if (!token) {
    return null
  }

  return <_PaymentCalendarReminderFromToken token={token} />
}

function _PaymentCalendarReminderFromToken({
  token,
}: {
  token: ReturnType<typeof useTokens>['data'][0]
}) {
  const collection: `0x${string}` = token?.token?.collection
    ?.id as `0x${string}`

  const { data } = useLoans({ collection, onlyActive: true })

  if (!data) {
    return null
  }

  const tokenId: string = token?.token?.tokenId as string

  const loan = data.find((loan) => loan.offer.offer.nftId === tokenId)

  if (!loan) {
    return null
  }

  return <PaymentCalendarReminder loan={loan} />
}

export function PaymentCalendarReminder({ loan }: { loan: Loan }) {
  const chain = useEnvChain()

  const { openGoogleCalendarReminderInNewTab } = useCreateCalendarReminder({
    loan,
    chainId: chain?.id,
  })

  return (
    <div
      style={{
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      onClick={openGoogleCalendarReminderInNewTab}
    >
      <span style={{ marginTop: '-3px' }}>
        <LuCalendarPlus />
      </span>
      <span
        style={{
          marginLeft: '8px',
          textTransform: 'uppercase',
          fontWeight: 600,
          fontFamily: 'Inter',
          fontSize: '14px',
        }}
      >
        Set Payment Reminder
      </span>
    </div>
  )
}
