import React, {useEffect} from "react";

function Track(props) {
    //console.log(props.track.name)
    var preview = new Audio(props.track.preview_url)
    useEffect(() => {

        preview.play()

        return function cleanup() {
            preview.pause()
        }
    })
    var artistList = []
    props.track.artists.map(artist => {
        artistList.push(artist.name)
    })
    var trackSelected = [false, false, false, false, false, false, false, false, false, false]
    trackSelected[props.trackNumber] = true
    return (
        <>
            <div
                className="h-100 w-100 rounded d-flex flex-column"
                style={{
                    backgroundImage: `url(${props.track.album.images[0].url})`,
                    backgroundRepeat: "no-repeat",
                    backgroundAttachment: "fixed",
                    backgroundPosition: "center",
                    backgroundSize: "cover"

                }}
            >

                <div className="text-white text-left mt-auto mx-2">
                    <div className="mx-2">
                        <h4>{props.track.name}</h4>
                        <p className="mb-0">{artistList.join(", ")}</p>
                    </div>

                    <div className="row mx-2 mb-2" style={{height: "25px"}}>
                        {
                            trackSelected.map((track, i) => {
                                if (track) {
                                    return (
                                        <div key={i} className="col p-0 text-center" style={{height: "25px"}}>
                                            <svg width="2em" height="2em" viewBox="0 0 16 16" className="bi bi-dot"
                                                 fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"/>
                                            </svg>
                                        </div>
                                    )
                                } else {
                                    return (
                                        <div key={i} className="col p-0 text-center" style={{height: "25px"}}>
                                            <svg width="2em" height="2em" viewBox="0 0 16 16" className="bi bi-dash"
                                                 fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M3.5 8a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.5-.5z"/>
                                            </svg>
                                        </div>
                                    )
                                }


                            })
                        }
                    </div>
                </div>

            </div>
        </>
    )
}

export default Track
