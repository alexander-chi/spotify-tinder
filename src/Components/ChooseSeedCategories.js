import React, {useState, useEffect} from "react";

function ChooseSeedCategories(props) {
    const [categories, setCategories] = useState(null)
    const [selectedCategories, setSelectedCategories] = useState([])

    useEffect(() => {
        let reqObj = {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + props.authToken,
            }
        }
        fetch("https://api.spotify.com/v1/recommendations/available-genre-seeds", reqObj)
            .then(res => res.json())
            .then((data) => {
                console.log(data)
                setCategories(data)
            })
    }, [])

    if (categories) {
        return (
            <>
                <div className="container text-center mt-2">
                    <h4>Choose up to 5 categories</h4>
                    <div className="d-flex flex-wrap">
                        {
                            categories.genres.map((genre, i) => {
                                var classes = ["btn", "m-1"];
                                if (selectedCategories.includes(genre)) {
                                    classes.push("btn-secondary")
                                } else {
                                    classes.push("btn-outline-secondary")
                                }
                                return (
                                    <div key={i} >

                                        <button id={`categoryButton_${i}`} className={classes.join(" ")}
                                        onClick={() => {
                                            var tempCat = selectedCategories
                                            tempCat.push(genre)
                                            setSelectedCategories(tempCat)
                                        }}>{genre}</button>
                                    </div>
                                    )

                            })
                        }
                        <button className="btn m-1 btn-primary"
                                onClick={() =>{
                                    props.setNewCategoriesCallback(selectedCategories)
                                }}>Next</button>
                    </div>
                </div>
            </>
        )
    } else {
        return <p>Loading</p>
    }
}

export default ChooseSeedCategories