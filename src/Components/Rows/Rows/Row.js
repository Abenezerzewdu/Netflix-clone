import React, { useState, useEffect } from "react";
import "./row.css";
import axios from "../../../Utils/Axios";
import "./row.css";
import movieTrailer from "movie-trailer";
import YouTube from "react-youtube";

function Row({ title, fetchurl, isLargeRow }) {
  const base_url = "https://image.tmdb.org/t/p/original";
  const [movies, setMovie] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");

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

  const handleClick = (movie) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      movieTrailer(movie?.title || movie?.name || movie?.original_name).then(
        (url) => {
          try {
            console.log(url);
            const urlParams = new URLSearchParams(new URL(url).search);
            console.log(urlParams);
            console.log(urlParams.get("v"));

            setTrailerUrl(urlParams.get("v"));
          } catch (error) {
            console.log("error", TypeError);
          }
        }
      );
    }
  };

  const opts = {
    height: "250",
    width: "50%",
    playerVars: { autoplay: 1 },
  };

  return (
    <div className="row">
      <h1>{title}</h1>
      <div className="row_posters">
        {movies.map((movie, index) => (
          <img
            onClick={() => handleClick(movie)}
            key={index}
            src={`${base_url}${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.name}
            className={`row_poster ${isLargeRow && "row_posterLarge"}`}
          />
        ))}
      </div>
      <div style={{ padding: "40px" }}>
        {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
      </div>
    </div>
  );
}

export default Row;
