import React from "react";

function CategoryButton({category, selected, handleCategoryToggle, i}) {
   function handleClick(e) {
    handleCategoryToggle(i)
  }

  return (
    <button
      className={`btn m-2 ${selected ? 'btn-primary' : 'btn-outline-secondary'}`}
      onClick={handleClick}
    >{category}</button>
  )
}
export default CategoryButton
