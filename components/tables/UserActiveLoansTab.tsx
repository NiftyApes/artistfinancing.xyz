import React from 'react'
import UserActiveLoansTable from './UserActiveLoansTable'

const UserActiveLoansTab: React.FC = () => {
  return (
    <div className="reservoir-body mt-14 grid justify-center dark:text-white">
      <UserActiveLoansTable />
    </div>
  )
}

export default UserActiveLoansTab
