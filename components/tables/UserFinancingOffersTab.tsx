import React from 'react'
import UserFinancingOffersTable from './UserFinancingOffersTable'

const UserFinancingOffersTab: React.FC = () => {
  return (
    <div className="justify-center dark:text-white">
      <div className="mb-6 text-center">
        <UserFinancingOffersTable />
      </div>
    </div>
  )
}

export default UserFinancingOffersTab
