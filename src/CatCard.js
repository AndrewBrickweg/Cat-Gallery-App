const CatCard = ({ name, img }) => {
  return (
    <div className="cardBox">
      <img className="card" src={img} alt="cat"></img>
      <div>{name}</div>
    </div>
  );
};

export default CatCard;
