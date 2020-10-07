import React, {useEffect, useState} from 'react';
import './App.css';
import SpotifyLogin from 'react-spotify-login';
import { clientId, redirectUri } from './settings';
import ls from 'local-storage';

import NavBar from "./Components/NavBar";

import SwipeApp from "./Components/SwipeApp";
import ChooseSeedCategories from "./Components/ChooseSeedCategories";
function App() {
    const [authToken , setAuthToken] = useState(null)
    const [user, setUser] = useState(null)
    const [view, setView] = useState(null)
    const [categories, setCategories] = useState(null)
    const [seedCategories, setSeedCategories] = useState(null)
    const [likedArtists, setLikedArtists] = useState([])
    const [artist, setArtist] = useState(null)
    const [viewedArtists, setViewedArtist] = useState([])

    const setNewCategoriesCallback = (newCategories) => {
        setSeedCategories(newCategories);
        let reqObj = {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + authToken,
            }
        }
        fetch("https://api.spotify.com/v1/recommendations?seed_genres=" + newCategories.concat(), reqObj)
            .then(res => res.json())
            .then((data) => {
                function findNewArtist(data) {
                    console.log(data)
                    var newArtist = data.tracks[getRandomInt(data.tracks.length - 1)].artists[0].id
                    if (viewedArtists.includes(newArtist)) {
                        findNewArtist(data)
                    } else {setArtist(newArtist)}
                }
                findNewArtist(data)
            })

    }

    useEffect(() => {
        if (ls.get("authToken") === null ) {
            setView("login")
        } else if (ls.get("authToken") !== null && ls.get("categories") === null) {
            setAuthToken(ls.get("authToken"));
            setView("categories")
        } else if (ls.get("authToken") !== null && ls.get("categories") !== null) {
            setAuthToken(ls.get("authToken"));
            setCategories(ls.get("categories"))
            setView("app")
        }
        if (seedCategories !== null) {

            setView("app")
        }
        if (ls.get("likedArtists") !== null) {
            setLikedArtists(ls.get("likedArtists"))
            setView("app")
        }
    })


    const onSuccess = response => {
        setAuthToken(response.access_token);
        ls.set("authToken", response.access_token)
        let reqObj = {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + response.access_token,
            }
        }

        fetch("https://api.spotify.com/v1/me", reqObj)
            .then(res => res.json())
            .then((data) => {
                setUser(data)
                setView("categories")
                ls.set("user", data)
            })

    }
    const onFailure = (response => console.error(response));

    const likeArtist = (artistId) => {
        let allArtists = viewedArtists
        allArtists.push(artistId)
        setViewedArtist(allArtists)

        let currentLikedArtists = likedArtists
        currentLikedArtists.push(artistId)
        setLikedArtists(currentLikedArtists)

        let reqObj = {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + authToken,
            }
        }
        var last5 = []
        const reversedArtists = likedArtists.slice(0).reverse()
        let i = 0
        for (i = 0; i < 5; i++) {
            last5.push(reversedArtists[i])
        }
        //console.log("https://api.spotify.com/v1/recommendations?seed_artists=" + last5.concat())
        fetch("https://api.spotify.com/v1/recommendations?seed_artists=" + last5.concat(), reqObj)
            .then(res => res.json())
            .then((data) => {
                function findNewArtist(data) {
                    var newArtist = data.tracks[getRandomInt(data.tracks.length - 1)].artists[0].id
                    if (viewedArtists.includes(newArtist)) {
                        findNewArtist(data)
                    } else {setArtist(newArtist)}
                }
                findNewArtist(data)
            })

    }

    const dislikeArtist = (artistId) => {
        if (likedArtists.length === 0) {
            setNewCategoriesCallback(seedCategories)
        } else {
            let allArtists = viewedArtists
            allArtists.push(artistId)
            setViewedArtist(allArtists)

            let reqObj = {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + authToken,
                }
            }
            var last5 = []
            const reversedArtists = likedArtists.slice(0).reverse()
            let i = 0
            for (i = 0; i < 5; i++) {
                last5.push(reversedArtists[i])
            }
            fetch("https://api.spotify.com/v1/recommendations?seed_artists=" + last5.concat(), reqObj)
              .then(res => res.json())
              .then((data) => {
                  function findNewArtist(data) {
                      console.log(data)
                      var newArtist = data.tracks[getRandomInt(data.tracks.length - 1)].artists[0].id
                      if (viewedArtists.includes(newArtist)) {
                          findNewArtist(data)
                      } else {setArtist(newArtist)}
                  }
                  findNewArtist(data)
              })
        }

    }


    if (view === "app") {
        if (artist) {
            return (
                <div className="App container" style={{height: "100vh"}}>
                    <NavBar></NavBar>
                    <SwipeApp
                      authToken = {authToken}
                      likeArtist = {likeArtist}
                      dislikeArtist = {dislikeArtist}
                      Artist = {artist}
                      />
                </div>
            );
        } else {
            return <p>Loading</p>
        }

    } else if (view === "categories"){
        return (
            <ChooseSeedCategories authToken = {authToken} setNewCategoriesCallback = {setNewCategoriesCallback}/>
        )
    } else if (view === "login"){
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
        );
    } else {
        return (
            <p>Loading</p>
        )
    }

}



export default App;

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}
