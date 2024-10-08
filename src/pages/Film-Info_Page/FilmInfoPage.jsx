import React, { useEffect, useState } from 'react'

export default function FilmInfoPage() {
  const [v, setV] = useState([]);

  useEffect(() => {
    fetch(`http://smartersapp.vip/player_api.php?username=13p9dl2r0d&password=eoqc714tty&action=get_vod_info&vod_id=${location.href.split('/?')[1]}`)
      .then((res) => res.json())
      .then((data) => setV([data.info]));
  }, [])

  console.log(v);


  return (
    <div className="FilmInfoPages">
      <div className="movie_image">
        {
          v.map((movie, index) => {
            return <img key={index} src={movie.cover_big} alt="movie image" />
          })
        }
      </div>
    </div>
  )
}

// axios