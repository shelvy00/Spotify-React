import React, { useEffect, useState } from 'react'
import axios from "axios"

export const useAuth = (code) => {
  const [accessToken, setAccessToken] = useState()
  const [refreshToken, setRefreshToken] = useState()
  const [expiresIn, setExpiresIn] = useState()

  useEffect(() => {
    axios.post("http://localhost:3001/login", {
        code,
    }).then(response => {
        console.log(response.data)
    }).catch(() => {
        //window.location = "/"
    })
  },[code])
}
export default useAuth;