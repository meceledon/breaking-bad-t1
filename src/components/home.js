import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';

function Home() {

    useEffect(() => {
        fetchEpisodes();
    },[]);

    const [loading, setLoading] = useState(true);
    const [episodes, setEpisodes] = useState([]);
    const [temporadas_bb_lista, setTemporadas_bb_lista] = useState([]);
    const [temporadas_bcs_lista, setTemporadas_bcs_lista] = useState([]);

    const fetchEpisodes = async () => {
        const data = await fetch('https://tarea-1-breaking-bad.herokuapp.com/api/episodes');
        const episodes = await data.json();
        console.log(episodes);
        setEpisodes(episodes);
        const episodes_breaking_bad = episodes.filter(episode => {
            if(episode.series === "Breaking Bad"){
                return true;
            }else{
                return false;
            }
          });
        const numero_temp_bb = Number(episodes_breaking_bad.reduce(numero_mayor).season);
        var temporadas_bb_lista = [];
        for (var i = 1; i <= numero_temp_bb; i++) {
            temporadas_bb_lista.push(i);
            }
        setTemporadas_bb_lista(temporadas_bb_lista);
        console.log(temporadas_bb_lista);
        
        const episodes_better_call_saul = episodes.filter(episode => {
            if(episode.series === "Better Call Saul"){
                return true;
            }else{
                return false;
            }
          });
        const numero_temp_bcs = Number(episodes_better_call_saul.reduce(numero_mayor).season);
        var temporadas_bcs_lista = [];
        for (var i = 1; i <= numero_temp_bcs; i++) {
            temporadas_bcs_lista.push(i);
            }
        setTemporadas_bcs_lista(temporadas_bcs_lista);
        setLoading(false);
        console.log(temporadas_bcs_lista);
        console.log(episodes_breaking_bad);
        console.log(episodes_better_call_saul);

        console.log(numero_temp_bb);
        console.log(numero_temp_bcs);

    }

    function numero_mayor (actual, num) {
        if(actual.season > num.season){
            return actual;
        }else{
            return num;
        }
      }
      

  return (
    <div className="Home">
      {loading  && <h1>...Cargando</h1>}
      <h1>Temporadas Breaking Bad:</h1>
      <div>
      {temporadas_bb_lista.map(temp =>(
            <h3>
                <Link to={`/Breaking+Bad/${temp}`}>Temporada {temp}</Link>
            </h3>
        ))}
      </div>
      <h1>Temporadas Better Call Saul:</h1>
      <div>
      {temporadas_bcs_lista.map(temp =>(
            <h3>
                <Link to={`/Better+Call+Saul/${temp}`}>Temporada {temp}</Link>
            </h3>
        ))}
      </div>
    </div>
  );
}

export default Home;
