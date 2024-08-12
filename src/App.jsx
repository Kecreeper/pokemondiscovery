import { useState } from 'react'
import './App.css'

const pokeUrl = "https://pokeapi.co/api/v2/pokemon/";

function PokemonData({ data }) {
  
  
  return (
    <div className='bg-white/75 mx-auto my-5 max-w-3xl rounded-xl grid grid-cols-1'>
      <div>
        asdfasdf
      </div>
    </div>
  )
}

async function getPokemonData(input) {
  try {
    const response = await fetch(pokeUrl + input);

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error.message);
  };
}

function App() {
  const [pokemonInput, setPokemonInput] = useState("charmander");
  const [data, setData] = useState(null);

  const handleChange = (event) => {
    setPokemonInput(event.target.value);
  }

  const queryPokemon = async function () {

  }

  return (
    <>
      <PokemonData />
      <div className='bg-white/75 mx-auto max-w-xl rounded-xl grid grid-cols-1'>
        <div className='text-2xl text-center py-4 font-sans font-bold'>
          Pokemon Discovery
        </div>
        <input value={pokemonInput} onChange={handleChange} className='max-w-xl mx-auto rounded-md' />
        <div className='flex justify-around py-4'>
          <button className='bg-white py-1 px-6 rounded-lg border border-b-black border-r-black'>Query Pokemon</button>
          <button className='bg-white py-1 px-6 rounded-lg border border-b-black border-r-black'>Random Pokemon</button>
        </div>
        
      </div>
    </>
  )
}

export default App
