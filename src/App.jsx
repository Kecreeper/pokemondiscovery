import { useState } from 'react';
import { ThemeProvider, BaseStyles } from '@primer/react';
import StatBar from './components/StarBar';
import './App.css';
import placeholderData from '/placeholderData.json?url';

const pokeUrl = "https://pokeapi.co/api/v2/pokemon/";
const buttonCSS = 'font-semibold text-blue-700 bg-amber-300 shadow-xl py-1 px-6 rounded-lg border border-b-black border-r-black hover:bg-amber-400 active:bg-amber-500';

function AbilityCard(ability) {
  ability = ability.ability;
  const name = ability.name.charAt(0).toUpperCase() + ability.name.slice(1);
  let effect = ability.effect_entries
  if (effect.length != 0) {
    effect = ability.effect_entries.filter(entry => entry.language.name === 'en')[0].effect;
  } else {
    effect = 'No effect entry available.'
  }
  const flavorText = ability.flavor_text_entries.filter(entry => entry.language.name === 'en')[0].flavor_text;
  console.log(effect);

  return (
    <div className='max-w-xs mx-2 py-2 px-3 rounded-xl bg-amber-400 ring ring-blue-700/65'>
      <div className='text-center font-extrabold text-xl'> {name} </div>
      <p className='italic'>{flavorText}</p>
      <p className='font-semibold'>{effect}</p>
    </div>
  )
}

async function getAbilities(firstAbilitiesTable) {
  let finalTable = [];

  for (let i = 0; i < firstAbilitiesTable.length; i++) {
    try {
      const response = await fetch(firstAbilitiesTable[i].ability.url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      const json = await response.json();
      finalTable[i] = json;
    } catch (error) {
      console.error(error.message);
    };
  }
  
  return finalTable;
} 

function PokemonData({ data }) {
  const abilities = data[1];
  data = data[0];

  const name = data.name.charAt(0).toUpperCase() + data.name.slice(1);
  const imgUrl = data.sprites.front_default;

  const stats = data.stats;
  const hp = stats[0].base_stat;
  const atk = stats[1].base_stat;
  const def = stats[2].base_stat;
  const sAtk = stats[3].base_stat;
  const sDef = stats[4].base_stat;
  const spd = stats[5].base_stat;
  
  return (
    <ThemeProvider>
      <BaseStyles>
        <div className='mx-auto my-5 max-w-3xl bg-white/55 backdrop-blur-sm shadow-xl rounded-xl grid grid-cols-1'>
          <div className='font-extrabold mt-4 -mb-2 text-4xl text-center'>
            {name}
          </div>
          <div className='flex my-4'>
            <div className='flex flex-col items-start justify-center w-1/2'>
                  <div className='py-3 px-16'>
                    <StatBar num={ atk }/><span className='text-2xl font-mono font-semibold'> {atk} </span>
                    <div className='text-sm font-extrabold'>
                      ATK
                    </div>
                  </div>
                  <div className='py-3 px-16'>
                    <StatBar num={ def }/><span className='text-2xl font-mono font-semibold'> {def} </span>
                    <div className='text-sm font-extrabold'>
                      DEF
                    </div>
                  </div>
                  <div className='py-3 px-16'>
                    <StatBar num={ sAtk }/><span className='text-2xl font-mono font-semibold'> {sAtk} </span>
                    <div className='text-sm font-extrabold'>
                      ATK🌟
                    </div>
                  </div>
                  <div className='py-3 px-16'>
                    <StatBar num={ sDef }/><span className='text-2xl font-mono font-semibold'> {sDef} </span>
                    <div className='text-sm font-extrabold'>
                      DEF🌟
                    </div>
                  </div>
                  <div className='py-3 px-16'>
                    <StatBar num={ spd }/><span className='text-2xl font-mono font-semibold'> {spd} </span>
                    <div className='text-sm font-extrabold'>
                      SPD
                    </div>
                  </div>
            </div>
            <div className="w-1/2 flex flex-col justify-center items-center">
              <img src={imgUrl} className='size-96 object-cover -m-16'/>
              <div> asdfasdf </div>
            </div>
          </div>
          <div className='flex justify-evenly'>
            {
              abilities.map((ability) => (
                <AbilityCard key={ability.name} ability={ability} />
              ))
            }
          </div>
          <div className='mx-auto mb-4 text-center text-2xl font-mono font-bold'>
            <StatBar num={hp}/>
            <div> {hp + " HP"} </div> 
          </div>
        </div>
      </BaseStyles>
    </ThemeProvider>
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
    return null
  };
}

async function getRandomPokemon() {
  const url = pokeUrl + (Math.floor(Math.random() * 1025) + 1);

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error.message);
  }
}

function App() {
  const [pokemonInput, setPokemonInput] = useState("charmander");
  const [data, setData] = useState(null);

  const handleChange = function(event) {
    setPokemonInput(event.target.value);
  }

  const queryPokemon = async function () {
    if (!pokemonInput == "") {
      const jsonMain = await getPokemonData(pokemonInput);
      if (jsonMain != null) {
        const jsonAbilities = await getAbilities(jsonMain.abilities);
        setData([jsonMain, jsonAbilities]);
        /* if (jsonAbilities.length != 0) {
          setData([jsonMain, jsonAbilities]);
        } else {
          const placeholderAbilities = await getAbilities(await ((await fetch(placeholderData)).json()).abilities);
          setData([jsonMain, placeholderAbilities]);
        } */
      } else {
        const placeholder1 = await (await fetch(placeholderData)).json()
        const placeholder2 = await getAbilities(placeholder1.abilities);
        setData([placeholder1, placeholder2]);
      };
    }
  }

  const randomPokemon = async function () {
    const json = await getRandomPokemon();
    const json2 = await getAbilities(json.abilities);
    setData([json, json2]);
  };

  return (
    <>
      {data && <PokemonData data={data} />}
      <div className='mx-auto max-w-md bg-white/55 backdrop-blur-sm shadow-xl rounded-xl grid grid-cols-1 space-y-3.5 pt-3 pb-4'>
        <div className='drop-shadow-md text-2xl text-center font-bold'>
          Pokemon Discovery
        </div>
        <div className='max-w-md mx-auto py-1 px-2 shadow-md bg-black/35 rounded-md text-sm text-white text-center tracking-widest font-thin'>
          API PROVIDED BY <a className='font-normal text-yellow-400 hover:text-blue-900' href='https://pokeapi.co/'>POKEAPI.CO</a>
        </div>
        <div className='mx-auto font-bold'>
          Pokemon: &nbsp;
          <input value={pokemonInput} onChange={handleChange} className='font-semibold max-w-xl mx-auto shadow-xl rounded-md hover:bg-amber-400 focus:outline-none focus:ring focus:ring-blue-700' />
        </div>
        
        <div className='flex justify-around'>
          <button onClick={queryPokemon} className={buttonCSS}>Query Pokemon</button>
          <button onClick={randomPokemon} className={buttonCSS}>Random Pokemon</button>
        </div>
      </div>
    </>
  )
}

export default App
