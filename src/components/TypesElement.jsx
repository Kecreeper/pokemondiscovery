import '../App.css';

export default function TypesElement(type) {
    type = type.type;
    let imgUrl = type.sprites[Object.keys(type.sprites)[6]];
    imgUrl = imgUrl[Object.keys(imgUrl)[1]].name_icon;
    const name = type.name
  
    return (
      <>
        <img src={imgUrl} alt={name} title={name} className='inline px-0.5 drop-shadow-md' />
      </>
    )
}