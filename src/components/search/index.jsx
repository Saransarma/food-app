import { useEffect, useState } from "react";
import "./styles.css";

const Search = (props) => {
  console.log(props);
  const { getDataFromSearchComponent, apiCalledSuccess, setApiCalledSuccess } = props;

  const [inputValue, setInputValue] = useState("");
  const handleInputvalue = (event) => {
    const { value } = event.target;
    setInputValue(value);
  };

  console.log(inputValue);

  const handleSubmit = (event) => {
    event.preventDefault();
    getDataFromSearchComponent(inputValue);
  };

  useEffect(()=>{
    if(apiCalledSuccess){
      setInputValue('')
      setApiCalledSuccess(false)
    }
  },[apiCalledSuccess])

  return (
    <form onSubmit={handleSubmit} className="search">
      <input
        name="search"
        onChange={handleInputvalue}
        value={inputValue}
        placeholder="Search Recipies"
        id="search"
      />
      <br />
      <button type="submit">Search</button>
    </form>
  );
};

export default Search;
