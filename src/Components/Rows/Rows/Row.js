import React, { useState, useEffect } from "react";
import "./row.css";
import axios from "../../../Utils/Axios";
import "./row.css";
function Row({ title, fetchurl, isLargeRow }) {
  const base_url = "https://image.tmdb.org/t/p/original";
  const [movies, setMovie] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const req = await axios.get(fetchurl);
        console.log(req);
        setMovie(req.data.results || []);
      } catch (error) {
        console.log("error", error);
      }
    })();
  }, [fetchurl]);
  return (
    <div className="row">
      <h1>{title}</h1>
      <div className="row_posters">
        {movies.map((movie, index) => (
          <img
            key={index}
            src={`${base_url}${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.name}
            className={`row_poster ${isLargeRow && "row_posterLarge"}`}
          />
        ))}
      </div>
    </div>
  );
}

export default Row;
