import React, {useState, useEffect, useContext} from "react";
import CategoryButton from "./CategoryButton";
import {UserContext} from "./context/UserContext";




function ChooseSeedCategories({setNewCategoriesCallback}) {
  const [categories, setCategories] = useState([])

  const userData = useContext(UserContext)

  useEffect(() => {
    api.spotify.recommendations.getAvailableGenreSeeds(userData.authedFetch)
      .then(data => {
        setCategories(data.genres.map(genre => ({
          genre: genre,
          selected: false
        })))
      })
  }, [])






  const handleCategoryToggle = (i) => {
    setCategories(prevState => {
      prevState[i].selected = !prevState[i].selected
      return prevState
    })
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    const selectedCategories = []
    categories.map((category) => {
      if (category.selected) {
        selectedCategories.push(category.genre)
      }
    })
    if (selectedCategories.length > 5) {
      window.alert('You can only choose a maximum of 5 categories')
    } else {
      setNewCategoriesCallback(selectedCategories)
    }

  }





  const buttons = categories.map((category, i) => {
    return (
      <CategoryButton
        key={i}
        category={category.genre}
        selected={category.selected}
        handleCategoryToggle={handleCategoryToggle}
        i={i}
      />
    )
  })

  return (
    <>
      <div className="container text-center mt-2">
        <h4>Choose up to 5 categories</h4>
        <div className="d-flex flex-wrap">
          {buttons}
          <button
            className="btn m-1 btn-primary"
            onClick={handleSubmit}>Next</button>
        </div>
      </div>
    </>
  )
}



export default ChooseSeedCategories
