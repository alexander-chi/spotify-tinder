import React, {useState, useEffect} from "react";

import Track from "./Track";


function Artist(props) {
    //console.log(props)
    const [data, setData] = useState({artistId: props.artistId});
    const [artist, setArtist] = useState(null)
    const [tracks, setTracks] = useState(null)
    const [trackNumber, setTrackNumber] = useState(0)
    let reqObj = {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + props.authToken,
        }
    }
    useEffect(() => {
        fetch("https://api.spotify.com/v1/artists/" + props.artistId, reqObj)
            .then(res => res.json())
            .then((data) => {
                setArtist(data)
            })
        fetch("https://api.spotify.com/v1/artists/" + props.artistId + "/top-tracks?country=SE", reqObj)
            .then(res => res.json())
            .then((data) => {
                console.log("NEW TRACKS FETCHED")
                setTracks(data)
                setTrackNumber(0)
            })
    }, [data, props])
    if (tracks) {

        return (
            <>
                <div className="mx-auto" style={{height: "75vh",width: "90vw", zIndex: 9, position: "absolute"}}>
                    <div className="row h-100 mx-0 p-0 ">
                        <div className="col p-0" onClick={() => {
                            if (trackNumber > 0) {
                                setTrackNumber(trackNumber - 1)
                            }
                        }}>
                        </div>
                        <div className="col p-0" onClick={() => {
                            if (trackNumber < 9) {
                                setTrackNumber(trackNumber + 1)
                            }

                        }}>

                        </div>
                    </div>
                </div>
                <Track track = {tracks.tracks[trackNumber]} trackNumber = {trackNumber}></Track>
                <div className="row mt-3">


                </div>
            </>
        )
    } else {
        return (
            <>
                <p>Loading</p>
            </>
        )
    }
}




export default Artist