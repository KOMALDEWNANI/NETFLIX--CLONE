import React, { useEffect, useState } from 'react';
import instance from './axios';
import './Banner.css'
import requests from './requests';

function Banner() {
  
    const [movie, setMovie] = useState([]);

    useEffect(() => {
        async function fetchData(){
            const request = await instance.get(requests.fetchTrending).then(function (response) {
                setMovie(
                    response.data.results[
                        Math.floor(Math.random()*response.data.results.length - 1)
                    ]
                )
               
              })
              .catch(function (error) {
                console.log(error);
             });
            
            
           
            
           return request;
        }
        fetchData();
    }, [])
    console.log(movie)
    function truncate(string, n){
        return string?.length > n ? string.substr(0, n - 1) + '...': string;
    }
  return <header
     className = "banner"
      style = {{
      backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
      backgroundSize: "cover",
      backgroundPosition : "center center"
  }}>
<div className="banner__contents">
    <h1 className="banner__title">
        {movie?.title || movie?.name || movie?.original_name}
    </h1>
    <div className="banner__buttons">
        <button className = "banner__button">Play</button>
        <button className = "banner__button">My List</button>
    </div>
    <h1 className="banner__description">{truncate(movie?.overview, 200)}</h1>
</div>
<div className="banner--fadebottom"/>


  </header>
}

export default Banner;
