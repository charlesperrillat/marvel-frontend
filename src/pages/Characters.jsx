import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import Card from "../components/Card";

import "../assets/styles/characters.css";

const Characters = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [limit, setLimit] = useState(100);
  const [skip, setSkip] = useState(0);
  const [name, setName] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);

  const handleNextPage = () => {
    setSkip(limit * currentPage);
    setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage(currentPage - 1);
    setSkip(limit * (currentPage - 2));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${
            import.meta.env.VITE_API_URL
          }characters?limit=${limit}&skip=${skip}&name=${name}`
        );
        // console.log(response.data);
        setData(response.data);
        setLimit(response.data.limit);
        setMaxPage(Math.ceil(response.data.count / limit));
        const pages = [];
        for (let i = 1; i <= maxPage; i++) {
          pages.push(i);
        }
        setCurrentPage(Math.floor(1 + skip / limit));
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [name, limit, skip, currentPage]);

  return isLoading ? (
    <main>
      <div className="loading">Loading...</div>
    </main>
  ) : (
    <main>
      <div className="characters-container">
        <h1>Discover the characters of the Marvel Universe</h1>
        <div className="characters-search">
          <input
            type="text"
            name="characters-search"
            placeholder="🔍 Looking for a character?"
            value={name}
            onChange={(event) => {
              setName(event.target.value);
            }}
          />
          <div className="characters-limit">
            <span>Show:</span>
            <select
              name="characters-limit"
              id="characters-limit"
              value={limit}
              onChange={(event) => {
                setLimit(event.target.value);
              }}
            >
              <option value="20">20</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
          </div>
        </div>
        <div className="cards-container">
          {data.results.map((character) => {
            return (
              <Link to={`/comics/${character._id}`} key={character._id}>
                <Card
                  pictureUrl={`${character.thumbnail.path}/portrait_xlarge.${character.thumbnail.extension}`}
                  name={character.name}
                  description={character.description}
                />
              </Link>
            );
          })}
        </div>
        <div className="pages-container">
          {currentPage > 1 && (
            <button className="page-button" onClick={handlePreviousPage}>
              Page précédente
            </button>
          )}
          <span>{currentPage}</span>
          {currentPage < maxPage && (
            <button className="page-button" onClick={handleNextPage}>
              Page suivante
            </button>
          )}
        </div>
      </div>
    </main>
  );
};

export default Characters;
