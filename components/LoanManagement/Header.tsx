import { useAccount, useEnsAvatar, useEnsName } from "wagmi";

import Avatar from "components/Avatar";
import { SheetDescription, SheetHeader, SheetTitle } from "components/LoanManagement/Sheet";
import { truncateAddress, truncateEns } from "lib/truncateText";

import { CurrencyBox } from "./CurrencyBox";

export const Header = () => {
  const account = useAccount();
  const { data: ensAvatar } = useEnsAvatar({ address: account?.address })
  const { data: ensName } = useEnsName({ address: account?.address })

  return ( 
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
  );
}
