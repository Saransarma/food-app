import React, { useContext } from "react";
import Search from "../search";
import "./styles.css";

const RecipeItem = (props) => {
  const { id, image, title, addToFavorite } = props;

  console.log(props, "recipe-item-props");

  return (
    <div key={id} className="recipe-item">
      <div>
        <img src={image} alt="image of recipe" />
      </div>
      <p>{title}</p>

      <button type="button" onClick={addToFavorite}>Add to Favourite</button>
    </div>
  );
};

export default RecipeItem;
