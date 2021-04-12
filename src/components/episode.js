import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';

function Episode({ match }) {

    useEffect(() => {
        fetchEpisode();
        console.log(match);
    },[]);

    const [loading, setLoading] = useState(true);
    const [episode, setEpisode] = useState({});

    const fetchEpisode = async () => {
        const data = await fetch(`https://tarea-1-breaking-bad.herokuapp.com/api/episodes/${match.params.episode}`);
        const episode = await data.json();
        const episode_obj = episode[0];
        setEpisode(episode_obj);
        setLoading(false);
        console.log(episode_obj);

    }
    
    if (loading) {
        return(<h1>...Cargando</h1>);
    } else {
        return (
            <div className="Home">
              {loading  && <h1>...Cargando</h1>}
              <h1>{episode.title}</h1>
              <h2>{episode.series}, 
              temporada {episode.season}, capitulo {episode.episode}</h2>
              <h2>Codigo del episodio: {episode.episode_id}</h2>
              <h2>Fecha de estreno: {episode.air_date}</h2>
              <h2>Personajes que aparecen en este episodio:</h2>
              {episode.characters.map(character =>(
                    <h3>
                        <Link to={`/characters/${character.replace(/\s/g, '+')}`}>- {character}</Link>
                    </h3>
                ))}
            </div>
          );
    }

}

export default Episode;
