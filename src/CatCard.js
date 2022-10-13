const CatCard = ({ id, img }) => {
  return (
    <div className="cardBox">
      <img className="card" src={img} alt="cat"></img>
    </div>
  );
};

export default CatCard;
