import React, {useState, useEffect} from "react";
import CategoryButton from "./CategoryButton";

class ChooseSeedCategories extends React.Component {
  constructor() {
    super();
    this.state = {
      categories: [],
      selectedCategories: []
    }
  }
  componentDidMount() {
    let reqObj = {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.props.authToken,
      }
    }
    fetch("https://api.spotify.com/v1/recommendations/available-genre-seeds", reqObj)
      .then(res => res.json())
      .then((data) => {
        console.log(data)
        this.setState({categories: data.genres.map((genre) => {
            return {
              genre: genre,
              selected: false
            }
          }) })
      })
  }
  handleCategoryToggle = (i) => {
    const val = !this.state.categories[i].selected
    this.setState(state => {
      state.categories[i].selected = val
      console.log(state.categories[i])
      return state
    })
  }
  handleSubmit = (e) => {
    e.preventDefault()
    const selectedCategories = []
    this.state.categories.map((category) => {
      if (category.selected) {
        selectedCategories.push(category.genre)
      }
    })
    if (selectedCategories.length > 5) {
      window.alert('You can only choose a maximum of 5 categories')
    } else {
      this.props.setNewCategoriesCallback(selectedCategories)
    }

  }


  render() {
    const buttons = this.state.categories.map((category, i) => {
      return (
        <CategoryButton
          key={i}
          category={category.genre}
          selected={category.selected}
          handleCategoryToggle={this.handleCategoryToggle}
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
              onClick={this.handleSubmit}>Next</button>
          </div>
        </div>
      </>
    )
  }

}


function ChooseSeedCategoriesOld(props) {
  const [categories, setCategories] = useState(null)
  const [selectedCategories, setSelectedCategories] = useState([])

  function Button({category, selected, toggleSelectedCategories, i}) {
    function handleClick(e) {
      toggleSelectedCategories(i)
    }

    return (
      <button className={!selected ? 'btn btn-outline-secondary m-2' : 'btn btn-primary m-2'}
              onClick={handleClick}>{category}</button>
    )
  }
}
export default ChooseSeedCategories
