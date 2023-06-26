import { ChevronDown, CornerDownRight, RefreshCcw, Tags, X } from "lucide-react";
import { MouseEventHandler, useState } from "react";

import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "../Tooltip";

interface ListingItemProps {
  listings?: Record<string, any>[];
}

const ListingItem: React.FC<ListingItemProps> = ({
  listings = []
}) => {
  const [show, setShow] = useState(false);
  const hasMultiple = listings.length > 1;

  const toggleShow = () => setShow((current) => !current);
  const onCancel: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
  }

  return ( 
    <div>
      <div onClick={toggleShow} className="cursor-pointer transition flex justify-between items-center">
        <div className="flex items-center space-x-2">
          {show ? (
            <button type="button" className="hover:opacity-100 opacity-40 transition">
              <ChevronDown className="w-[14px] h-[14px]" />
            </button>
          ) : (
            <div className="w-[14px]" />
          )}
          <img alt="" className="aspect-square rounded-md" src="/niftyapes/noun_2.png" />
          <div className="flex flex-col">
            <p className="text-xs text-[#81859F]">collection</p>
            <p className="text-[14px] text-white">collection #5056</p>
          </div>
        </div>
        {!hasMultiple && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <div className="text-[10px] text-[#81859F]">
                  4 ETH over 3 Months
                </div>
              </TooltipTrigger>
              <TooltipContent className="rounded-[10px] bg-[#16141E] p-4 border-0">
                  <p className="text-[10px] text-[#81859F]">
                    4 ETH over 3 Months, 20% Down, 120% APR, Weekly Payments
                  </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
        {hasMultiple && (
          <button type="button" className="hover:opacity-75 transition text-xs border-[#7000FF] border py-1 px-2 rounded-full flex items-center gap-x-1">
            <Tags className="w-[14px] h-[14px]" />
            {listings.length} listings
          </button>
        )}
        <button onClick={onCancel} className="text-xs hover:opacity-75 transition border border-[#ffffff1a] rounded-md bg-transparent px-2 py-1">
          {hasMultiple ? 'Cancel All' : 'Cancel'}
        </button>
      </div>
      {show && (
        <div className="space-y-4 mt-4">
          {listings.map((listing, i) => (
            <div key={i} className="flex justify-between items-center">
              <div className="flex items-center text-[10px] text-[#81859F]">
                <CornerDownRight className="w-[14px] h-[14px] mr-2"/>
                4 ETH over 3 Months
              </div>
              {listing.expired ? (
                <div className="text-xs text-[#FF638D] bg-[#FF638D1A] px-[5px] py-[2px] rounded-[4px]">
                  expired
                </div>
              ) : (
                <div className="text-xs bg-[#81859F1A] px-[5px] py-[2px] rounded-[4px]">
                  expires in 30 days
                </div>
              )}
              <button className="hover:opacity-100 opacity-40 transition">
                {listing.expired ? (
                  <RefreshCcw className="h-[14px] w-[14px] text-white" />
                ) : (
                  <X className="h-[14px] w-[14px] text-white" />
                )}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
 
export default ListingItem;
