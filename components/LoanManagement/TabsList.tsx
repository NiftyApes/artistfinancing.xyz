import * as Tabs from '@radix-ui/react-tabs';

const tabs = [
  { name: 'Payments Due', id: 'payments' },
  { name: 'Listings', id: 'listings' },
  { name: 'Activity', id: 'activity' },
];

export const TabsList: React.FC<{ onChange: (id: string) => void }> = ({ onChange }) => {
  return ( 
    <Tabs.List className="no-scrollbar mb-4 ml-[-15px] flex w-full overflow-y-scroll border-b border-[rgba(0,0,0,0.05)] dark:border-[rgba(255,255,255,0.2)] md:ml-0 md:w-full">
      {tabs.map(({ name, id }) => (
        <Tabs.Trigger
          key={id}
          id={id}
          value={id}
          onClick={() => onChange(id)}
          className={
            'group reservoir-label-s flex-1 relative min-w-0 shrink-0 whitespace-nowrap border-b-2 border-transparent  py-4 px-8 text-center hover:text-gray-700 focus:z-10 radix-state-active:border-black radix-state-active:text-gray-900 dark:text-white dark:radix-state-active:border-[#7000FF]'
          }
        >
          <span>{name}</span>
        </Tabs.Trigger>
      ))}
    </Tabs.List>
   );
};
