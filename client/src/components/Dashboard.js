import React from 'react'
import useAuth from "./useAuth"

function Dashboard({ code}) {
    const asccessToken = useAuth(code)
  return (
    <div>
      {code}
    </div>
  )
}

export default Dashboard;
