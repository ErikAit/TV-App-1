import React, { useEffect, useState } from 'react'

export default function FilmInfoPage() {
  const [movie, setMovie] = useState([]);

  const username = '13p9dl2r0d'
  const password = 'eoqc714tty'

  useEffect(() => {
    fetch(`http://smartersapp.vip/player_api.php?username=${username}&password=${password}&action=get_vod_info&vod_id=${location.href.split('/?')[1]}`)
      .then((res) => res.json())
      .then((data) => setMovie([data.info]));
  }, [])

  console.log(movie);


  return (
    <div className="FilmInfoPages">
      <div className="movie_image">
        {
          movie.map((movie, index) => {
            return <img key={index} src={movie.cover_big} alt="movie image" />
          })
        }
      </div>
    </div>
  )
}

// axios