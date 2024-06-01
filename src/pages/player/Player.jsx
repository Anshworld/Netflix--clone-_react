//rafce
import React, { useEffect, useState } from 'react'
import './Player.css'
import back_arrow_icon from '../../assets/back_arrow_icon.png'
import { useNavigate, useParams } from 'react-router-dom'

const Player = () => {

  const { id } = useParams();
  const navigate = useNavigate();

  const [apiData, setApiData] = useState({
    name: "",
    key: "",
    published_at: "",
    typeof:""
  })

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYTcyM2RmMTZkMjdmMDc5MDBlMGFhNTE2ZDk1ZGVmMiIsInN1YiI6IjY2NGM1ZTg1NDFlMjFkOWNlNWY3NGE0MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.05dYDxPnJ8jKTGWMw6P35js0rvUP1FjO7V-v1In5eoo",
    },
  };

  useEffect(() => {
      fetch(`https://api.themoviedb.org/3/movie/${id}/videos`, options)
    .then((response) => response.json())
    .then((response) => setApiData(response.results[0]))
    .catch((err) => console.error(err))

  },[])


  return (
    <div className="Player">
      <img src={back_arrow_icon} alt="" onClick={()=>{navigate(-1)}} />
      <iframe
        width="90%"
        height="90%"
        src={`https://www.youtube.com/embed/${apiData.key}`}
        title="trailer"
        frameBorder="0"
        allowFullScreen
      ></iframe>
      <div className="Player-info">
        <p>{apiData.published_at.slice(0,10)}</p>
        <p>{apiData.name}</p>
        <p>{apiData.type}</p>
      </div>
    </div>
  );
}

export default Player