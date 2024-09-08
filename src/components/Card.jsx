import "../assets/styles/card.css";

const Card = ({ pictureUrl, name, description }) => {
  return (
    <article className="card">
      <div className="card-container">
        <img src={pictureUrl} alt={`${name} picture`} />
        <div className="card-info">
          <h2 className="card-name">{name}</h2>
          <p className="card-description">{description}</p>
        </div>
      </div>
    </article>
  );
};

export default Card;
