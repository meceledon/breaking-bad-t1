import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';

function Character({ match }) {

    useEffect(() => {
        fetchCharacter();
        console.log(match);
    },[]);

    const [loading, setLoading] = useState(true);
    const [character, setCharacter] = useState({});

    const fetchCharacter = async () => {
        const data = await fetch(`https://tarea-1-breaking-bad.herokuapp.com/api/characters?name=${match.params.character_name}`);
        const character = await data.json();
        const character_obj = character[0];
        setCharacter(character_obj);
        setLoading(false);
        console.log(character_obj);

    }
    
    if (loading) {
        return(<h1>...Cargando</h1>);
    } else {
        return (
            <div className="Home">
              {loading  && <h1>...Cargando</h1>}
              <h1>{character.name}</h1>
              <img src={character.img} alt={character.name}></img>
              <h2>Sobrenombre: {character.nickname}</h2>
              <h2>Codigo identificador del personaje: {character.char_id}</h2>
              <h2>Estado: {character.status}</h2>
              <h2>Interpretado por: {character.portrayed}</h2>
              <h2>Ocupacion(es):</h2>
              {character.occupation.map(occup =>(
                    <h3>
                        <h4>- {occup}</h4>
                    </h3>
                ))}
              <h2>Apariciones en Breaking Bad:</h2>       
              {character.appearance.length > 0 && character.appearance.map(temp =>(
                    <h3>
                        <Link to={`/Breaking+Bad/${temp}`}>- Temporada {temp}</Link>
                    </h3>
                ))}
              <h2>Apariciones en Better Call Saul:</h2>       
              {character.better_call_saul_appearance.length > 0 && character.better_call_saul_appearance.map(temp =>(
                    <h3>
                        <Link to={`/Better+Call+Saul/${temp}`}>- Temporada {temp}</Link>
                    </h3>
                ))}
            </div>
          );
    }

}

export default Character;
