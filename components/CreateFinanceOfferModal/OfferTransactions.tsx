import { useTokens } from '@reservoir0x/reservoir-kit-ui'
import { Timeline } from 'components/Timeline'
import { optimizeImage } from 'lib/optmizeImage'
import { FC, useContext } from 'react'
import { FiClock } from 'react-icons/fi'
import ApproveNFTStep from './steps/ApproveNFTStep'
import { CreateOffersStore } from './store'

type Props = {
  token: ReturnType<typeof useTokens>['data'][0]
}

const OfferTransactions: FC<Props> = ({ token }) => {
  const { state } = useContext(CreateOffersStore)

  return (
    <div className="flex h-full space-x-12 px-4 pt-8">
      <img
        alt="Token Image"
        className="w-2/5 self-start object-contain"
        src={optimizeImage(token?.token?.image, 400)}
      />
      <div className="w-3/5">
        <Timeline
          events={[
            {
              icon: FiClock,
              content: <ApproveNFTStep token={token} />,
              current: true,
            },
          ]}
          orientation="vertical"
          succeedingLine={false}
        />
      </div>
    </div>
  )
}

// <Timeline
//   events={[
//     {
//       icon: FiClock,
//       content: (
//         <div className="flex flex-col space-y-1">
//           <p className="text-sm text-black">
//             Approve SuperRare Underground to access your NFTs
//           </p>
//           <p className="text-xs underline">Transaction Complete</p>
//         </div>
//       ),
//       current: true,
//     },
//     {
//       icon: FiClock,
//       content: (
//         <p className="text-sm text-black">
//           Sign Buy-Now Offer for <b>4.4 ETH</b>
//         </p>
//       ),
//     },
//     {
//       icon: FiClock,
//       content: (
//         <p className="text-sm text-black">
//           Sign Financing Offer for <b>4.51 ETH</b> over <b>30 days</b>
//         </p>
//       ),
//     },
//     {
//       icon: FiClock,
//       content: (
//         <p className="text-sm text-black">
//           Sign Financing Offer for <b>4.554 ETH</b> over <b>90 days</b>
//         </p>
//       ),
//     },
//     {
//       icon: FiClock,
//       content: <p className="text-sm text-black">Offers Completed</p>,
//     },
//   ]}
//   orientation="vertical"
//   succeedingLine={false}
// />

export default OfferTransactions
