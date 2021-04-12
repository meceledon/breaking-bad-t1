import React, {useState, useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';

function Character({ match }) {

    useEffect(() => {
        fetchCharacter();
        fetchQuotes();
        console.log(match);
    },[]);

    const [loading1, setLoading1] = useState(true);
    const [loading2, setLoading2] = useState(true);
    const [character, setCharacter] = useState({});
    const [quotes, setQuotes] = useState({});

    let history = useHistory();

    const fetchCharacter = async () => {
        const data = await fetch(`https://tarea-1-breaking-bad.herokuapp.com/api/characters?name=${match.params.character_name}`);
        const character = await data.json();
        const character_obj = character[0];
        setCharacter(character_obj);
        setLoading1(false);
        console.log(character_obj);

    }

    const fetchQuotes = async () => {
        const data = await fetch(`https://tarea-1-breaking-bad.herokuapp.com/api/quote?author=${match.params.character_name}`);
        const quotes = await data.json();
        setQuotes(quotes);
        setLoading2(false);
        console.log(quotes);

    }
    
    if (loading1 || loading2) {
        return(<h1>...Cargando</h1>);
    } else {
        return (
            <div className="Home">
              {(loading1 || loading2) && <h1>...Cargando</h1>}
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
              <h2>Citas de {character.name}:</h2>
              {quotes.map(quote =>(
                    <h3>
                        <h4>"{quote.quote}"</h4>
                    </h3>
                ))}
              <button onClick={() => history.goBack()}><b>Volver</b></button>
            </div>
          );
    }

}

export default Character;
