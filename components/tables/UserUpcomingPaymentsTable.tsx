import React from 'react';

const UserUpcomingPaymentsTable: React.FC = () => {
  return (
    <div className="reservoir-body mt-14 grid justify-center dark:text-white">
      <div className="text-center mb-6">
        Table
      </div>
      <div className="flex flex-row justify-center space-x-4">
        <button
          className="btn-primary-fill gap-2 dark:ring-primary-900 dark:focus:ring-4"
        >
          Make Payment
        </button>
        <button
          className="btn-primary-outline gap-2 dark:ring-primary-900 dark:focus:ring-4"
        >
          Sell Loan
        </button>
      </div>
    </div>
  );
};

export default UserUpcomingPaymentsTable;
