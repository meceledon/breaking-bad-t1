import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';

function Temporadas_bb({ match }) {

    useEffect(() => {
        fetchEpisodes();
        console.log(match);
    },[]);

    const [loading, setLoading] = useState(true);
    const [episodes, setEpisodes] = useState([]);

    const fetchEpisodes = async () => {
        const data = await fetch('https://tarea-1-breaking-bad.herokuapp.com/api/episodes?series=Breaking+Bad');
        const episodes = await data.json();
        console.log(episodes);
        setEpisodes(episodes);
        const episodes_breaking_bad = episodes.filter(episode => {
            if(episode.season === match.params.temp){
                return true;
            }else{
                return false;
            }
          });
        
        setEpisodes(episodes_breaking_bad)
        setLoading(false);

        console.log(episodes_breaking_bad);

    }
      

  return (
    <div className="Home">
      {loading  && <h1>...Cargando</h1>}  
      <h1>Breaking Bad:</h1>
      <h2>Capitulos Temporada {match.params.temp}:</h2>
      <div>
      {episodes.map(episode =>(
            <h3>
                <Link to={`/episodes/${episode.episode_id}`}>{episode.episode}. {episode.title}</Link>
            </h3>
        ))}
      </div>
      
    </div>
  );
}

export default Temporadas_bb;
