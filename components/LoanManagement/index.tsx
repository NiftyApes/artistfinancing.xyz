import * as Tabs from '@radix-ui/react-tabs'
import { useEffect, useState } from "react";

import { FloatingButton } from "./FloatingButton";
import { Header } from "./Header";
import { TabsList } from './TabsList';

import { PaymentsTab } from './Payments/PaymentsTab';
import { ListingsTab } from './Listings/ListingsTab';
import { ActivityTab } from './Activity/ActivityTab';

import { Sheet, SheetContent, SheetTrigger } from "./Sheet";

const LoanManagement = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [activeTab, setActiveTab] = useState('payments');

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Sheet>
      <SheetTrigger>
        <FloatingButton />
      </SheetTrigger>
      <SheetContent size="lg">
        <Header />
        <Tabs.Root value={activeTab}>
          <TabsList onChange={(id: string) => setActiveTab(id)} />
          <Tabs.Content value="payments">
            <PaymentsTab />
          </Tabs.Content>
          <Tabs.Content value="listings">
            <ListingsTab />
          </Tabs.Content>
          <Tabs.Content value="activity">
            <ActivityTab />
          </Tabs.Content>
        </Tabs.Root>
      </SheetContent>
    </Sheet>
  );
}
 
export default LoanManagement;
