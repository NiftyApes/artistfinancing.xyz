import { CalendarCheck} from "lucide-react";

import { cn } from "lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../Tooltip";

interface PaymentsItemProps {
  listings?: Record<string, any>[];
  expired?: boolean;
  steps?: Record<string, any>[];
  activeSteps?: number;
}

const PaymentsItem: React.FC<PaymentsItemProps> = ({
  listings = [],
  steps = [],
  expired,
  activeSteps = 0,
}) => {
  const hasMultiple = listings.length > 1;
  const onCancel = () => {};

  return ( 
    <div>
      <div className="transition flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <img alt="" className="aspect-square rounded-md" src="/niftyapes/noun_2.png" />
          <div className="flex flex-col">
            <p className="text-[14px] text-white">collection #5056</p>
            <div className={cn('text-xs text-[#81859F] flex items-center', expired && 'text-[#FF5B5B]')}>
              <CalendarCheck className="w-[10px] h-[10px] mr-1" />
              Due Jun 01, 2023, 12:01 AM
            </div>
          </div>
        </div>
        <button onClick={onCancel} className="text-xs hover:opacity-75 transition border border-[#ffffff1a] rounded-md bg-transparent px-2 py-1 flex items-center">
          Pay <img src="/niftyapes/eth.png" alt="Ethereum logo" /> 0.85
        </button>
      </div>
      <div className="grid grid-cols-10 mt-4 gap-2">
        <div className={cn('col-span-9 items-center grid gap-2', `grid-cols-${steps.length}` )}>
          {steps.map((step, i) => (
            <TooltipProvider key={i}>
             <Tooltip>
                <TooltipTrigger>
                  <div className={cn('col-span-1 rounded-full h-[4px] bg-[#1C192A] w-full', step.completed && 'bg-[#7FD85F]', step.expired && 'bg-[#FF5B5B]')} ></div>
                </TooltipTrigger>
                <TooltipContent className={cn('rounded-[10px] bg-[#16141E] p-4 border-0 flex items-center gap-2  text-[#81859F]', step.completed && 'text-[#70FF00]', step.expired && 'text-[#FF5B5B]')}>
                  <CalendarCheck className="h-[10px] w-[10px]" />
                  <p className="text-[10px]">
                    Due Jun 01, 2023, 12:01 AM
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </div>
        <div className="text-[10px] text-[#81859F]">{activeSteps} of {steps.length}</div>
      </div>
    </div>
  );
}
 
export default PaymentsItem;
