import React from 'react'
import EditForm from '../components/EditForm'
import Header from '../components/Header'

const CustomerEditPage = () => {
  return (
    <div className="min-h-screen flex flex-col w-full overflow-hidden ">
      <Header />
      <div className="w-screen p-5 flex justify-center">
        <EditForm />
      </div>
    </div>
  )
}

export default CustomerEditPage