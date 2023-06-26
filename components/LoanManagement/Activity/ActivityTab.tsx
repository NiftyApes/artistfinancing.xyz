import { IoDiamondOutline } from "react-icons/io5";
import { TbArrowUpRight } from "react-icons/tb";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../Select";

const items = [1, 2, 3];

export const ActivityTab = () => {
  return ( 
    <div className="mt-6 space-y-5">
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="All" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="light">Light</SelectItem>
          <SelectItem value="dark">Dark</SelectItem>
          <SelectItem value="system">System</SelectItem>
        </SelectContent>
      </Select>
      {items.map((i) => (
      <div key={i}>
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <img alt="" className="h-14 w-14 rounded-md" src="/niftyapes/noun_3.png" />
            <div className="flex flex-col">
              <div className="flex space-x-1 items-center">
                <IoDiamondOutline />
                <p>Minted</p>
              </div>
              <p className="text-xs text-gray-400">Doodle #33</p>
            </div>
          </div>
          <div className="flex text-gray-400 space-x-1">
            <div className="text-xs">
              1 month ago
            </div>
            <TbArrowUpRight />
          </div>
        </div>
      </div>
      ))}
    </div>
  );
};

