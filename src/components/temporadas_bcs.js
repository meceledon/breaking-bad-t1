import React, {useState, useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';

function Temporadas_bcs({ match }) {

    useEffect(() => {
        fetchEpisodes();
        console.log(match);
    },[]);

    const [loading, setLoading] = useState(true);
    const [episodes, setEpisodes] = useState([]);

    let history = useHistory();

    const fetchEpisodes = async () => {
        const data = await fetch('https://tarea-1-breaking-bad.herokuapp.com/api/episodes?series=Better+Call+Saul');
        const episodes = await data.json();
        console.log(episodes);
        setEpisodes(episodes);
        const episodes_better_call_saul = episodes.filter(episode => {
            if(episode.season === match.params.temp){
                return true;
            }else{
                return false;
            }
          });
        
        setEpisodes(episodes_better_call_saul)
        setLoading(false);

        console.log(episodes_better_call_saul);

    }
      

  return (
    <div className="Home">
      {loading  && <h1>...Cargando</h1>}
      <h1>Better Call Saul:</h1>
      <h2>Capitulos Temporada {match.params.temp}:</h2>
      <div>
      {episodes.map(episode =>(
            <h3>
                <Link to={`/episodes/${episode.episode_id}`}>{episode.episode}. {episode.title}</Link>
            </h3>
        ))}
      </div>
      <button onClick={() => history.goBack()}><b>Volver</b></button>
    </div>
  );
}

export default Temporadas_bcs;
