import React, {useState, useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';

function Buscador({ match }) {

    useEffect(() => {
        fetchCharacter();
        fetchQuotes();
        console.log(match);
    },[]);

    const [loading1, setLoading1] = useState(true);
    const [loading2, setLoading2] = useState(true);
    const [characters, setCharacters] = useState([]);
    const [quotes, setQuotes] = useState({});

    let history = useHistory();

    const fetchCharacters = async (offset) => {
        const data = await fetch(`https://tarea-1-breaking-bad.herokuapp.com/api/characters/?limit=10&offset=${offset}`);
        const characters2 = await data.json();
        characters = characters.concat(characters2);
        setCharacters(characters);
        setLoading1(false);
        console.log(characters);

    }


    
    if (loading1 || loading2) {
        return(<h1>...Cargando</h1>);
    } else {
        return (
            <div className="Home">
              <input type="text" placeholder="Search.." name="search"></input>
              <button type="submit">Submit</button>
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

export default Buscador;