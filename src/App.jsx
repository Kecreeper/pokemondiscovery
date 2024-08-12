import { useState } from 'react'
import './App.css'

const pokeUrl = "https://pokeapi.co/api/v2/pokemon/";
const buttonClass = 'font-semibold bg-white py-1 px-6 rounded-lg border border-b-black border-r-black'

function PokemonData({ data }) {
  const name = data.name.charAt(0).toUpperCase() + data.name.slice(1)
  const imgUrl = data.sprites.front_default
  
  return (
    <div className='mx-auto my-5 max-w-3xl bg-white/75 shadow-xl rounded-xl grid grid-cols-1'>
      <div className='my-5 font-bold text-3xl text-center'>
        {name}
      </div>
      <div className='grid place-items-center'>
        <img src={imgUrl} className='size-6/12 object-cover'/>
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

  const handleChange = function(event) {
    setPokemonInput(event.target.value);
  }

  const queryPokemon = async function () {
    if (!pokemonInput == null) {
      const json = await getPokemonData(pokemonInput);
      setData(json);
    }
  }

  return (
    <>
      {data && <PokemonData data={data} />}
      <div className='mx-auto max-w-xl bg-white/75 shadow-xl rounded-xl grid grid-cols-1'>
        <div className='text-2xl text-center py-4 font-bold'>
          Pokemon Discovery
        </div>
        <input value={pokemonInput} onChange={handleChange} className='max-w-xl mx-auto rounded-md' />
        <div className='flex justify-around py-4'>
          <script>
            const 
          </script>
          <button onClick={queryPokemon} className={buttonClass}>Query Pokemon</button>
          <button className={buttonClass}>Random Pokemon</button>
        </div>
        
      </div>
    </>
  )
}

export default App
