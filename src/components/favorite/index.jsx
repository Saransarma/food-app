import React, { useContext } from "react";
import Search from "../search";
import "./styles.css";


const FavoriteItem = (props) => {
  const { id, image,removeFromFavorite, title } = props;

  return (
    <div key={id} className="favorite-item">
      <div>
        <img src={image} alt="image of recipe" />
      </div>
      <p>{title}</p>

      <button type="button" onClick={removeFromFavorite}> Remove from Favourite</button>
    </div>
  );
};

export default FavoriteItem;
