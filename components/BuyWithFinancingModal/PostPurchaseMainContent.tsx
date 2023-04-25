import { FC } from 'react'

type Props = {
  nameOfWhatYouAreBuying?: string
}

const PostPurchaseMainContent: FC<Props> = ({ nameOfWhatYouAreBuying }) => {
  return (
    <div className="text-gray-600" style={{ fontFamily: 'Poppins' }}>
      <div className="mb-12">
        You have purchased <strong>{nameOfWhatYouAreBuying}</strong>.
        Congratulations!
      </div>
      <div className="mb-12 flex">
        <div className="mr-6" style={{ position: 'relative', top: 3 }}>
          <svg
            width="22"
            height="40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19.3184 19.5579C19.6422 19.4275 19.8967 19.1677 20.0203 18.8413C20.144 18.5149 20.1255 18.1516 19.9694 17.8395L12.2702 2.44098C12.0608 2.02218 11.6349 1.75553 11.1667 1.75008C10.6985 1.74464 10.2665 2.00132 10.0474 2.41514L1.89527 17.8136C1.72761 18.1303 1.70392 18.5037 1.83021 18.839C1.95649 19.1744 2.22061 19.4394 2.55551 19.5668L10.7076 22.6683C11.0018 22.7802 11.3273 22.777 11.6192 22.6595L19.3184 19.5579Z"
              stroke="#7F8990"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />

            <path
              d="M18.3743 1.66529C18.8847 1.45452 19.4729 1.60364 19.8213 2.03212C20.1696 2.46061 20.1956 3.0669 19.885 3.52354L12.1858 14.846C11.9564 15.1833 11.5768 15.3875 11.1689 15.393C10.761 15.3984 10.3761 15.2045 10.1377 14.8734L1.98558 3.55104C1.66196 3.10156 1.6727 2.49271 2.01199 2.05494C2.35127 1.61716 2.93818 1.45485 3.45418 1.65609L11.1388 4.65311L18.3743 1.66529Z"
              stroke="#7F8990"
              strokeWidth="2.5"
              strokeLinejoin="round"
              transform="translate(0, 18)"
            />
          </svg>
        </div>
        <div>
          Make payments on this page, or on the payments page to manage your
          loan.
        </div>
      </div>
      <div className="flex">
        <div className="mr-6" style={{ position: 'relative', top: 5 }}>
          <svg
            width="22"
            height="26"
            viewBox="0 0 22 26"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M20 24.5716L11 18.143L2 24.5716V4.00014C2 3.31815 2.27092 2.6641 2.75315 2.18186C3.23539 1.69963 3.88944 1.42871 4.57143 1.42871H17.4286C18.1106 1.42871 18.7646 1.69963 19.2468 2.18186C19.7291 2.6641 20 3.31815 20 4.00014V24.5716Z"
              stroke="#7F8990"
              strokeWidth="2.57143"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div>
          <div className="mb-6">
            You&rsquo;ve also received an{' '}
            <span className="text-black">NFT representing your purchase</span>{' '}
            (a Buyer Ticket).
          </div>
          <div>
            You can transfer ownership of this loan by sending or selling that
            Buyer Ticket.
          </div>
        </div>
      </div>
    </div>
  )
}

export default PostPurchaseMainContent
