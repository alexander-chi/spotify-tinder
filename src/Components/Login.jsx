import SpotifyLogin from "react-spotify-login";
import {clientId, redirectUri} from "../settings";
import React, {useContext} from "react";
import {UserContext} from "./context/UserContext";

function Login() {
  const userData = useContext(UserContext)

  function onSuccess(res) {
    userData.setAccessToken(res.access_token)
  }

  function onFailure() {

  }


  return (
    <div className="text-center d-flex align-items-center landingBackground"
         style={{
           height: "100vh"
         }}>
      <div className="w-100 mx-5">
        <h1>This is a React demo</h1>
        <p>Please login to spotify to use this application</p>
        <SpotifyLogin clientId={clientId}
                      redirectUri={redirectUri}
                      onSuccess={onSuccess}
                      onFailure={onFailure}
                      className="btn w-50 spotifyGreenButton"
        />
      </div>
    </div>
  )
}

export default Login
