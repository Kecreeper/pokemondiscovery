export default function AbilityCard(ability) {
    ability = ability.ability;
    const name = ability.name.charAt(0).toUpperCase() + ability.name.slice(1);
    let effect = ability.effect_entries
    if (effect.length != 0) {
      effect = ability.effect_entries.filter(entry => entry.language.name === 'en')[0].effect;
    } else {
      effect = 'No effect entry available.'
    }
    const flavorText = ability.flavor_text_entries.filter(entry => entry.language.name === 'en')[0].flavor_text;
  
    return (
      <div className='max-w-xs mx-2 py-2 px-3 rounded-xl bg-amber-400 ring ring-blue-700/65'>
        <div className='text-center font-extrabold text-xl'> {name} </div>
        <p className='italic'>{flavorText}</p>
        <p className='font-semibold'>{effect}</p>
      </div>
    )
}