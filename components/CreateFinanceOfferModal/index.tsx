import * as Tabs from '@radix-ui/react-tabs'
import { useTokens } from '@reservoir0x/reservoir-kit-ui'
import Modal from 'components/Modal'
import { optimizeImage } from 'lib/optmizeImage'
import { useState } from 'react'
import Expiration from './Expiration'
import Header from './Header'
import CustomListingForm from './CustomListingForm'
import { FiClock } from 'react-icons/fi'
import { Timeline } from 'components/Timeline'

export default function CreateFinanceOfferModal({
  token,
}: {
  token: ReturnType<typeof useTokens>['data'][0]
}) {
  const [open, setOpen] = useState(false)

  const tabTriggerStyles =
    'h-[35px] text-sm font-semibold text-gray-400 data-[state=active]:text-black'

  return (
    <>
      <button onClick={() => setOpen(true)} className="btn-primary-fill">
        Create offer
      </button>
      <Modal open={open} onOpenChange={setOpen}>
        <div className="w-[830px] py-6 px-4 text-black">
          <Header
            collectionName={token?.token?.collection?.name}
            nftId={token?.token?.tokenId}
            onClose={() => setOpen(false)}
          />
          <div className="mt-6 flex space-x-6">
            <div className="flex flex-grow justify-between">
              <Tabs.Root defaultValue="custom" className="w-full">
                <Tabs.List className="ml-[216px] flex justify-between gap-6 border-b-[1px] py-2">
                  <div className="flex gap-8">
                    <Tabs.Trigger value="batch" className={tabTriggerStyles}>
                      List Art for Sale
                    </Tabs.Trigger>
                    <Tabs.Trigger value="custom" className={tabTriggerStyles}>
                      Custom Listing
                    </Tabs.Trigger>
                  </div>
                  <Expiration />
                </Tabs.List>
                <Tabs.Content value="batch" />
                <Tabs.Content value="custom">
                  <div className="flex flex-col space-y-12">
                    <div className="flex items-start space-x-4">
                      <div className="flex flex-col space-y-2">
                        <img
                          alt="Token Image"
                          className="h-[200px] w-[200px] object-contain"
                          src={optimizeImage(token?.token?.image, 200)}
                        />
                        <div className="flex justify-between px-2">
                          <p className="text-xs text-gray-500">Previous Sale</p>
                          <p className="text-sm font-bold text-gray-500">
                            0.84 ETH
                          </p>
                        </div>
                      </div>
                      <CustomListingForm />
                    </div>
                    <div className="ml-8">
                      <Timeline
                        events={[
                          {
                            icon: FiClock,
                            content: (
                              <p className="text-xs text-gray-400">Purchase</p>
                            ),
                            tooltipContent: (
                              <div
                                className={`align-center bg-black px-6 py-4 text-center text-sm text-white`}
                              >
                                0.88 ETH
                              </div>
                            ),
                            current: true,
                          },
                          {
                            icon: FiClock,
                            content: (
                              <p className="text-xs text-gray-400">
                                7 days later
                              </p>
                            ),
                          },
                          {
                            icon: FiClock,
                            content: (
                              <p className="text-xs text-gray-400">
                                14 days later
                              </p>
                            ),
                          },
                          {
                            icon: FiClock,
                            content: (
                              <p className="text-xs text-gray-400">
                                21 days later
                              </p>
                            ),
                          },
                          {
                            icon: FiClock,
                            content: (
                              <p className="text-xs text-gray-400">
                                30 days later
                              </p>
                            ),
                          },
                        ]}
                        orientation="horizontal"
                        succeedingLine={false}
                      />
                    </div>
                    <div className="flex space-x-8 self-end">
                      <button className="rounded-full text-sm font-bold uppercase">
                        Nevermind
                      </button>
                      <button className="rounded-full border-2 border-black px-8 py-3 text-sm font-bold uppercase">
                        Create Listing
                      </button>
                    </div>
                  </div>
                </Tabs.Content>
              </Tabs.Root>
            </div>
          </div>
        </div>
      </Modal>
    </>
  )
}
