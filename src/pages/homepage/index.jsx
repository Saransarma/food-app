import { useContext, useEffect, useReducer, useState } from "react";
import Search from "../../components/search";
import RecipeItem from "../../components/recipe-item";
import FavoriteItem from "../../components/favorite";
import "./styles.css";


const dummydata = "dummydata";

const reducer = (state, action) => {
  switch (action.type) {
    case "filteredFavorite":
      console.log(action);
      return {
        ...state,
        filteredValue: action.value,
      };
    default:
      return state;
  }
};

const initialState = {
  filteredValue: "",
};

const Homepage = () => {
  //loading state
  const [loadingState, setLoadingState] = useState(false);

  //save results that we receive from api
  const [recipes, setRecipes] = useState([]);

  //favorite data state
  const [favorite, setFavorite] = useState([]);

  // State api is Successfull or Not
  const [apiCalledSuccess, setApiCalledSuccess] = useState(false);

  //use reducer functionality
  const [filteredState, dispatch] = useReducer(reducer, initialState);





  const getDataFromSearchComponent = (getData) => {
    //keep the loading state as true before we are calling the api

    setLoadingState(true);

    // calling api
    async function getRecipies() {
      const apiResponse = await fetch(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=1aaf64cd4e824f798f4e0c8110ea83f0&query=${getData}`
      );
      const result = await apiResponse.json();
      const { results } = result;

      if (results && results.length > 0) {
        //set the loading state as false again
        //set the recipes state
        setLoadingState(false);
        setRecipes(results);
        apiCalledSuccess(true);
      }
    }

    getRecipies();
  };

  /*Favourite*/
  const addToFavorite = (getCurrentRecipeItem) => {
    const cpyFavorite = [...favorite];

    const index = cpyFavorite.findIndex(
      (item) => item.id === getCurrentRecipeItem
    );
    if (index === -1) {
      cpyFavorite.push(getCurrentRecipeItem);
      setFavorite(cpyFavorite);
      //save the favorite in local storage
      localStorage.setItem("favorite", JSON.stringify(cpyFavorite));
    } else {
      alert("Item is already present in Favorite");
    }
  };

  const removeFromFavorite = (getCurrentId) => {
    let cpyFavorite = [...favorite];
    cpyFavorite = cpyFavorite.filter((item) => item.id !== getCurrentId);

    setFavorite(cpyFavorite);
    localStorage.setItem("favorite", JSON.stringify(cpyFavorite));
    window.scrollTo({top:'0',behavior:'smooth'})
  };

  useEffect(() => {
    const extractFavoritesFromLocalStorageOnPageLoad = JSON.parse(
      localStorage.getItem("favorite")
    )||[];
    setFavorite(extractFavoritesFromLocalStorageOnPageLoad);
  }, []);

  console.log(filteredState, "filteredState");

  // Filter the favorite
  const filterdFacoritesItems = favorite && favorite.length > 0 ? favorite.filter((item) =>
    item.title.toLowerCase().includes(filteredState.filteredValue)
  ):[];

  return (
    <div className="homepage">
      <Search
        getDataFromSearchComponent={getDataFromSearchComponent}
        dummydatacopy={dummydata}
        apiCalledSuccess={apiCalledSuccess}
        setApiCalledSuccess={setApiCalledSuccess}
      />

      {/* Show Favorite Items */}

      <div className="favorite-wrapper">
        <h1 className="favorite-title">Favorites</h1>
        <div className="search-favorite">
          <input
            onChange={(event) =>
              dispatch({ type: "filteredFavorite", value: event.target.value })
            }
            value={filteredState.filteredValue}
            name="searchfavorite"
            placeholder="Search Favorites"
          />
        </div>

        <div className="favorite">
            {
              !filterdFacoritesItems && <div style={{display:'flex', width:'100%',justifyContent:'center'}} className="no-items">No Favorites are Found...</div>
            }
          
          {filterdFacoritesItems && filterdFacoritesItems.length > 0
            ? filterdFacoritesItems.map((item) => (
                <FavoriteItem
                  removeFromFavorite={() => removeFromFavorite(item.id)}
                  id={item.id}
                  image={item.image}
                  title={item.title}
                />
              ))
            : null}
        </div>
      </div>

      {/* Show Favorite Items */}

      {/* Show Loading State*/}
      {loadingState && (
        <div className="loading">Loading Recipes ! Please Wait...</div>
      )}
      {/* Show Loading State*/}
      {/*Map through all the recipes */}
      <div className="items">
        {recipes && recipes.length > 0
          ? recipes.map((item) => (
              <RecipeItem
                addToFavorite={() => addToFavorite(item)}
                id={item.id}
                image={item.image}
                title={item.title}
              />
            ))
          : null}
      </div>
      {/*Map through all the recipes */}
          
          {
            !loadingState && !recipes.length && <div className="no-items">No Recipes are found</div>
          }



    </div>
  );
};

export default Homepage;
