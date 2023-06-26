import * as Progress from "@radix-ui/react-progress";
import PaymentsItem from "./PaymentsItem";

const items = [
  {
    expired: true,
    activeSteps: 1,
    steps: [
      {
        expired: true,
      },
      {
        completed: false,
      },
      {
        completed: false,
      }
    ]
  },
  {
    expired: false,
    activeSteps: 1,
    steps: [
      {
        completed: true,
      },
      {
        completed: false,
      }
    ]
  },
  {
    expired: false,
    activeSteps: 3,
    steps: [
      {
        completed: true,
      },
      {
        completed: true,
      },
      {
        completed: true,
      },
      {
        completed: false,
      }
    ]
  }
];

export const PaymentsTab = () => {
  return ( 
    <div className="mt-6 space-y-5">
      {items.map((item, i) => (
        <PaymentsItem steps={item.steps} activeSteps={item.activeSteps} expired={item.expired} key={i} />
      ))}
    </div>
  );
}
 