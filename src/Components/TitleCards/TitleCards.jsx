import React, { useEffect, useRef, useState } from "react";
import "./TitleCard.css";
import cards_data from "../../assets/cards/Cards_data";
import { Link } from "react-router-dom";

const TitleCard = ({ title, category }) => {
  const [apiData, setApiData] = useState([]);
  const cardsref = useRef();

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYTcyM2RmMTZkMjdmMDc5MDBlMGFhNTE2ZDk1ZGVmMiIsInN1YiI6IjY2NGM1ZTg1NDFlMjFkOWNlNWY3NGE0MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.05dYDxPnJ8jKTGWMw6P35js0rvUP1FjO7V-v1In5eoo",
    },
  };

  const handleWheel = (Event) => {
    Event.preventDefault();
    cardsref.current.scrollLeft += Event.deltaY;
  };
  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${category ? category : "now_playing"
      }?language=en-US&page=1`,options)
      .then((response) => response.json())
      .then((response) => setApiData(response.results))
      .catch((err) => console.error(err));

    cardsref.current.addEventListener("wheel", handleWheel);
  }, []);

  return (
    <div className="Title-Card">
      <h2>{title ? title : "Popular on Netflix"}</h2>
      <div className="card-list" ref={cardsref}>
        {apiData.map((card, index) => {
          return (
            <Link to={`/player/${card.id}`} className="card" key={index}>
              <img
                src={`https://image.tmdb.org/t/p/w500` + card.backdrop_path}
                alt=""
              />
              <p>{card.original_title}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default TitleCard;
