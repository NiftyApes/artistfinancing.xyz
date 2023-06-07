import { useAccount, useEnsAvatar, useEnsName } from "wagmi";
import Avatar from "./Avatar";
import { truncateAddress, truncateEns } from "lib/truncateText";
import FormatNativeCrypto from "./FormatNativeCrypto";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "./Sheet";
import * as Tabs from '@radix-ui/react-tabs'
import { useState } from "react";

const NOTIFICATION_COUNT = 3;
const tabs = [
  { name: 'Payments Due', id: 'payments' },
  { name: 'Listings', id: 'listings' },
  { name: 'Activity', id: 'activity' },
]


const CurrencyBox = ({ amount, label }: { amount: number, label: string }) => (
  <div className="w-[110px] h-[100px] rounded-xl bg-[#16141E] flex flex-col items-center justify-center gap-y-1">
    <FormatNativeCrypto amount={amount} />
    <p className="text-[11px] text-[#81859F]">{label}</p>
  </div>
);

const FloatingButton = () => {
  return ( 
    <button className="fixed bottom-10 right-10">
      <div className="relative cursor-pointer">
        {NOTIFICATION_COUNT && (
          <div className="absolute rounded-full h-8 w-8 -top-4 -right-4 border-2 border-orange-300 bg-gradient-to-r from-orange-400 to-orange-600 flex items-center justify-center">
            {NOTIFICATION_COUNT}
          </div>
        )}
        <div className="border-2 border-gray-200/30 h-10 w-10 rounded-xl bg-black flex items-center justify-center">
          🍌
        </div>
      </div>
    </button>
   );
}

const Drawer = () => {
  const account = useAccount();
  const { data: ensAvatar } = useEnsAvatar({ address: account?.address })
  const { data: ensName } = useEnsName({ address: account?.address })

  const [activeTab, setActiveTab] = useState('payments');

  return (
    <Sheet>
      <SheetTrigger>
        <FloatingButton />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>
            <div className="inline-flex gap-x-2 items-center">
              <Avatar address={account.address} avatar={ensAvatar} size={64} />
              <div className="flex flex-col text-[15px]">
                <div>
                  {ensName ? (
                    <span>{truncateEns(ensName)}</span>
                  ) : (
                    <span>{truncateAddress(account.address || '')}</span>
                  )}
                </div>
                <div className="text-xs font-light text-gray-400 flex items-center">
                  <img
                    src="/icons/sru-etherscan.svg"
                    alt="Etherscan Icon"
                    className="float-left mr-2 h-6 w-[14px]"
                  />
                  <p>
                    Etherscan
                  </p>
                </div>
              </div>
            </div>
          </SheetTitle>
          <SheetDescription>
            <div className="flex justify-between items-center gap-x-2 my-2">
              <CurrencyBox amount={20.99} label="Due in 15d" />
              <CurrencyBox amount={13.99} label="Received" />
              <CurrencyBox amount={0} label="Defaults" />
            </div>
          </SheetDescription>
        </SheetHeader>
        <Tabs.Root value={activeTab}>
            <Tabs.List className="no-scrollbar mb-4 ml-[-15px] flex w-[calc(100%_+_30px)] overflow-y-scroll border-b border-[rgba(0,0,0,0.05)] dark:border-[rgba(255,255,255,0.2)] md:ml-0 md:w-full">
              {tabs.map(({ name, id }) => (
                <Tabs.Trigger
                  key={id}
                  id={id}
                  value={id}
                  onClick={() => setActiveTab(id)}
                  className={
                    'group reservoir-label-s relative min-w-0 shrink-0 whitespace-nowrap border-b-2 border-transparent  py-4 px-8 text-center hover:text-gray-700 focus:z-10 radix-state-active:border-black radix-state-active:text-gray-900 dark:text-white dark:radix-state-active:border-[#7000FF]'
                  }
                >
                  <span>{name}</span>
                </Tabs.Trigger>
              ))}
            </Tabs.List>
            <Tabs.Content value="payments">
              <div className="mt-6">
                Payments
              </div>
            </Tabs.Content>
            <Tabs.Content value="listings">
              <div className="mt-6">
                Listings
              </div>
            </Tabs.Content>
            <Tabs.Content value="activity">
              <div className="mt-6">
                Activity
              </div>
            </Tabs.Content>
          </Tabs.Root>
      </SheetContent>
    </Sheet>
  );
}
 
export default Drawer;
