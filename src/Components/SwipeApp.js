import React from "react";

import "./SwipeApp.css"
import TinderCard from 'react-tinder-card'


import Artist from "./Artist";

function SwipeApp(props) {
    console.log(props.Artist)




    return (
        <>
            <div className="bg-light rounded dropShadow-1" style={{height: "75vh"}}>
                <Artist artistId = {props.Artist} authToken = {props.authToken}></Artist>
            </div>
            <div className="row mt-3">
                <div className="text-red col">
                    <img src="/images/no.png" className="dropShadow-1" style={{height:"90px", width:"90px", borderRadius:"45px"}}
                         onClick={() => {
                             props.dislikeArtist(props.Artist)
                             console.log("dislike artist called")
                         }}/>
                </div>
                <div className="col">
                    <a href={`https://open.spotify.com/artist/${props.Artist}`} target="_blank">
                        <img src="/images/spotify.png" className="dropShadow-1" style={{height:"90px", width:"90px", borderRadius:"45px"}}
                             />
                    </a>

                </div>
                <div className="col">
                    <img src="/images/yes.png" className="dropShadow-1" style={{height:"90px", width:"90px", borderRadius:"45px"}}
                    onClick={() => {
                        props.likeArtist(props.Artist)
                    }}/>
                </div>

            </div>
        </>
    )






}

export default SwipeApp

