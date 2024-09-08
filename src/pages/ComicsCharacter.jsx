import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const ComicsCharacter = () => {
  const params = useParams();

  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://site--marvel-backend--2fb822fyxqpz.code.run/comics/${params.characterId}`
        );
        // console.log(response.data);
        // console.log(params);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
  }, [params.characterId]);

  return isLoading ? (
    <main>
      <div className="loading">Loading...</div>
    </main>
  ) : (
    <main>
      <div className="comics-container">
        <h1>Discover the comics of the Marvel Universe</h1>
        <div className="cards-container">
          {data &&
            data.comics.map((comic) => {
              // console.log(comic);
              return (
                <Link key={comic._id}>
                  <article className="card">
                    <div className="card-container">
                      <img
                        src={`${comic.thumbnail.path}/portrait_xlarge.${comic.thumbnail.extension}`}
                        alt={`${comic.title} picture`}
                      />
                      <div className="card-info">
                        <h2 className="card-name">{comic.name}</h2>
                        <p className="card-description">{comic.description}</p>
                      </div>
                    </div>
                  </article>
                </Link>
              );
            })}
        </div>
      </div>
    </main>
  );
};

export default ComicsCharacter;
