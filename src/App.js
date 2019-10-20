import React, {useEffect, useState} from 'react';
import './App.css';
import Recipe from './Recipe';


const App = () =>{

  const APP_ID = "41a957fe";
  const APP_KEY = "18dd8892919b1b33a7350630f57de6d2";


  const [recipies, setRecipes] = useState([]);

  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("chicken");

  useEffect(  () =>{
    getRecipes();
   
  }, [query]);

const getRecipes = async () => {
  const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
  const data = await response.json();
  setRecipes(data.hits);
  console.log(data.hits);
}

const getSearch = e =>{
  e.preventDefault();
  setQuery(search);
  setSearch("");
}

const updateSearch = e => {
  setSearch(e.target.value);
}

  return(
    <div className="App">
      <h1 className="appTitle">Recipe Finder</h1>

      <form onSubmit={getSearch}className="search-form">
        <input className="search-bar" type="text" value={search} onChange={updateSearch}/>
        <button className="search-button" type="submit">Search</button>
      </form>

  <div className="recipes">
      {recipies.map(recipe =>(
        <Recipe 
          key={recipe.recipe.label}
          title={recipe.recipe.label} 
          calories={recipe.recipe.calories}
          image={recipe.recipe.image}
          ingredients={recipe.recipe.ingredients} 
        />
      ))}
  </div>
    </div>    
  );
};

export default App;