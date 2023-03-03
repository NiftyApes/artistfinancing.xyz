import React from 'react'
import UserActiveLoansTable from './UserActiveLoansTable'

const UserActiveLoansTab: React.FC = () => {
  return (
    <div className="mt-14 justify-center dark:text-white">
      <div className="mb-6 text-center">
        <UserActiveLoansTable />
      </div>
    </div>
  )
}

export default UserActiveLoansTab
