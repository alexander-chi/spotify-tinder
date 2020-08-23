import React from "react";

function NavBar() {
    return (
        <>

            <div className="row" style={{
                height: "55px",
                paddingTop: "10px",
                paddingBottom: "10px"
            }}>
                <div className="col">
                    <img
                        src="/images/user.png"
                        style={{
                            height: "35px"
                        }}
                    />
                </div>
                <div className="col">
                    <h1 className="text-secondary">Spotifynder</h1>
                </div>
                <div className="col">
                    <svg width="35px" height="35px" viewBox="0 0 16 16" className="bi bi-file-music-fill"
                         fill="#dadfe6" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd"
                              d="M12 1H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2zM8.725 3.793A1 1 0 0 0 8 4.754V10.2a2.52 2.52 0 0 0-1-.2c-1.105 0-2 .672-2 1.5S5.895 13 7 13s2-.672 2-1.5V6.714L11.5 6V4.326a1 1 0 0 0-1.275-.962l-1.5.429z"/>
                    </svg>
                </div>
            </div>


        </>
    )
}

export default NavBar