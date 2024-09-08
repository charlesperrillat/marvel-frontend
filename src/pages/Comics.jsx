import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import "../assets/styles/comics.css";

const Comics = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [limit, setLimit] = useState(100);
  const [skip, setSkip] = useState(0);
  const [title, setTitle] = useState("");
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
          }comics?limit=${limit}&skip=${skip}&title=${title}`
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
  }, [title, limit, skip, currentPage]);

  return isLoading ? (
    <main>
      <div className="loading">Loading...</div>
    </main>
  ) : (
    <main>
      <div className="comics-container">
        <h1>Discover the comics of the Marvel Universe</h1>
        <div className="comics-search">
          <input
            type="text"
            name="comics-search"
            placeholder="🔍 Looking for a comics?"
            value={title}
            onChange={(event) => {
              setTitle(event.target.value);
            }}
          />
          <div className="comics-limit">
            <span>Show:</span>
            <select
              name="comics-limit"
              id="comics-limit"
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
          {data.results &&
            data.results.map((comic) => {
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
                        <h2 className="card-name">{comic.title}</h2>
                        <p className="card-description">{comic.description}</p>
                      </div>
                    </div>
                  </article>
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

export default Comics;
