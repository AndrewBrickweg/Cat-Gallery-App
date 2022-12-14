const CatCard = ({ breeds, name, origin, description, filterValue }) => {
  const energyLevel = breeds.energy_level;

  const catImage = breeds.image;

  const catImageUrl = catImage ? catImage.url : catImage;

  return (
    <div className="cardBox">
      <div>{energyLevel === filterValue} </div>
      <img className="card" src={catImageUrl} alt="cat" />
      <div>{name}</div>
      <div>{origin}</div>
      <div>{filterValue}</div>
      {/* <div>{description}</div> */}
    </div>
  );
};

export default CatCard;
