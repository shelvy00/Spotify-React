import React from 'react'


const AUTH_URL = "https://accounts.spotify.com/authorize?client_id=06466eddfb64409d9c23ab34d3fa8a21&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state"

function Login() {
  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
      <a className=" btn btn-success btn-lg " href={AUTH_URL}>Login With Spotify</a>    
    </div>
  )
}

export default Login;
