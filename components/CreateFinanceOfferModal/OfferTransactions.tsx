import { useTokens } from '@reservoir0x/reservoir-kit-ui'
import { Event, Timeline } from 'components/Timeline'
import { optimizeImage } from 'lib/optmizeImage'
import { FC, useContext, useMemo } from 'react'
import { FiClock } from 'react-icons/fi'
import { IoCheckmark } from 'react-icons/io5'
import ApproveNFTStep from './steps/ApproveNFTStep'
import SignOfferStep from './steps/SignOfferStep'
import { CreateOffersStore } from './store'

type Props = {
  token: ReturnType<typeof useTokens>['data'][0]
}

const OfferTransactions: FC<Props> = ({ token }) => {
  const { state } = useContext(CreateOffersStore)

  const eventSteps: Event[] = useMemo(() => {
    // First step is always to approve the NFT for transfer
    const steps: Event[] = [
      {
        icon: FiClock,
        completedIcon: IoCheckmark,
        content: <ApproveNFTStep token={token} />,
        current: state.currentStep === 0,
        completed: state.currentStep > 0,
      },
    ]

    if (state.stage === 'custom_submitted') {
      steps.push({
        icon: FiClock,
        completedIcon: IoCheckmark,
        content: (
          <SignOfferStep assignedStep={1} token={token} terms={state.custom} />
        ),
        current: state.currentStep === 1,
        completed: state.currentStep > 1,
      })
    }

    // TODO: Include "BuyNow" offer when it makes sense.
    // Loops through batch offers and adds steps for each enabled offer.
    if (state.stage === 'batch_submitted') {
      state.batch
        .filter((batchOffer) => batchOffer.enabled)
        .forEach((batchOffer, idx) => {
          steps.push({
            icon: FiClock,
            completedIcon: IoCheckmark,
            content: (
              <SignOfferStep
                assignedStep={idx + 1}
                token={token}
                terms={batchOffer}
              />
            ),
            current: state.currentStep === idx + 1,
            completed: state.currentStep > idx + 1,
          })
        })
    }

    // Last step is always "Offers Complete"
    steps.push({
      icon: FiClock,
      completedIcon: IoCheckmark,
      content: <p className="text-sm text-black">Offers Completed</p>,
    })
    // Adjust the last step current and completed state
    steps[steps.length - 1].current = state.currentStep === steps.length - 1
    steps[steps.length - 1].completed = state.currentStep === steps.length - 1

    return steps
  }, [state.currentStep])

  return (
    <div className="flex h-full space-x-12 px-4 pt-8">
      <img
        alt="Token Image"
        className="w-2/5 self-start object-contain"
        src={optimizeImage(token?.token?.image, 400)}
      />
      <div className="w-3/5">
        <Timeline
          events={eventSteps}
          orientation="vertical"
          succeedingLine={false}
        />
      </div>
    </div>
  )
}

export default OfferTransactions
