import React, {useEffect, useState}  from "react"
import api from '../../lib/api/index'
import spotify from "../../lib/api/spotify";

export const UserContext = React.createContext({})


export function UserContextProvider({children}) {
  const [userData, setUserData] = useState({
    getLoginStatus: getLoginStatus,
    logOut: logOut,
    authedFetch: authedFetch,
    accessToken: localStorage.getItem('spotifynder_user_token'),
    setAccessToken: setAccessToken,
    spotifyData: null,
    loggedIn: false
  })

  useEffect(() => {
    setAccessToken(userData.accessToken)
      .then(() => {
        console.log('Access token loaded from storage')
      })
  }, [])




  async function _updateUserData(res) {
    return setUserData({
      ...userData,
      ...res
    })
  }

  async function _getLoginStatus() {
    return new Promise((resolve, reject) => {
      api.spotify.me.get(authedFetch)
        .then(async data => {
          resolve(true)
        })
        .catch(err => {
          reject(false)
        })
    })

  }

  async function setAccessToken(accessToken) {
    console.log(accessToken)
    await _updateUserData({accessToken: accessToken})
  }

  useEffect(() => {
    console.log(userData)
    api.spotify.me.get(authedFetch)
      .then(res => res.json())
      .then(async data => {
        localStorage.setItem('spotifynder_user_token', userData.accessToken)
        await _updateUserData({
          loggedIn: true,
          spotifyData: data
        })
      })
      .catch(err => {
        logout()
      })
  }, [userData.accessToken])

  function logOut() {
    console.log('user logOut triggered')
    _updateUserData({
      init: true,
      user: null,
      access: null,
      token: null,
      email: null,
      expiry: null,
      loggedIn: false,
    })
  }

  function getLoginStatus() {

  }



  function logout() {
    _updateUserData({
      loggedIn: false,
    })
    localStorage.removeItem('spotifynder_user_token')
  }

  async function authedFetch(...args) {
    console.log("fetch called with args:", args);
    const response = await fetch(...args, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + userData.accessToken,
      }
    })

    response
      .clone()
      .json()
      .then(body => {
        console.log("intercepted response:", body)
        if (body.error?.status === 401) {
          console.log('401!')
          logout()
        }
      })
      .catch(err => {
        console.error(1234, err)
      })
    return response;
  }

  return (
    <UserContext.Provider value={userData}>
      {children}
    </UserContext.Provider>
  )
}




