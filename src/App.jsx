import { useState , useEffect } from 'react'
import './App.css'
import {baseURL} from "./constants/baseURL";
import states from "./states/states.json";

function App() {
  const [now, setNow] = useState("");
  const [statesResults, setStatesResults] = useState(states);
  const [computedCountry, setComputedCountry] = useState("");
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    setNow(new Date(Date.now()));
    getData();
  }, [])

  const getData = async () => {
    const candidatesCopy = [...candidates];
    const countryURL = baseURL("br");
    let response;
    let data;
    try { 
      response = await fetch(countryURL);
      data = await response.json();
    } catch(error) {
      console.log(error)
    }
    setComputedCountry(data["pst"].replace(",", "."));
    data["cand"].map((candidato, index) => {
      candidatesCopy[index] = candidato;
    })
    setCandidates(candidatesCopy);
  }

  useEffect(() => {
    getResultsStates();
  }, [candidates])

  const getResultsStates = () => {
    const statesResultsCopy = [...statesResults];
  
    statesResultsCopy.map(async (state) => {
      const uf = state["abbr"];
      const stateURL = baseURL(uf);
      let response;
      let data;
      try {
        response = await fetch(stateURL);
        data = await response.json();
      } catch(error){
        console.log(error);
      }
      state[`${uf}-apurado`] = `${data["pst"].replace(",", ".")}`;
        data["cand"].map(candidato => {
          const { n , pvap } = candidato;
          const perc = Number(pvap.replace(",", "."));
          state[`${uf}-perc-${n}`] = perc;
          const totalAbs = Math.round(perc * 0.01 * state["eleitores"]);
          state[`${uf}-total-${n}`] = totalAbs;             
        })
    })
    setStatesResults(statesResultsCopy);
  }

  const totals = {};
  candidates.map(candidate => {
    totals[`total${candidate["n"]}`] = 0;
  })

  candidates.map(candidate => {
    statesResults.map(state => {
      totals[`total${candidate["n"]}`] += state[`${state["abbr"]}-total-${candidate["n"]}`]
    })
  })

  const sumValues = obj => Object.values(obj).reduce((a, b) => a + b, 0);

  const sumTotals = sumValues(totals);

  Object.keys(totals).map(key => totals[key] = (totals[key]* 100/sumTotals).toFixed(2));

  return (
    <div className="App">
      <h1>Previsão do Resultado Final</h1>
      <h2 id="apurado-brasil">{`Apurado Brasil: ${computedCountry}%`}</h2>
      <h4 id="hora">{`Hora: ${now}`}</h4>
      <table className="table mb-5">
        <thead className="thead-dark">
          <tr style={{fontSize: "28px"}}>
            {candidates.map(candidate => {
              return (
                <>
                  <th>{candidate["nm"]}</th>
                </>
              )
            })}
          </tr>
        </thead>
        <tbody>
          <tr style={{fontSize: "40px"}}>
            {candidates.map(candidate => {
              return (
                <>
                  <td>{`${totals[`total${candidate["n"]}`]}%`}</td>
                </>
              )
            })}
          </tr>
        </tbody>
      </table>
      <h2>Resultados por UF</h2>
      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th>UF</th>
            <th>NOME UF</th>
            <th>APURADO</th>
            <th>ELEITORES</th>
            {candidates.map(candidate => {
              return (
                <>
                  <th>{`${candidate["nm"]} (%)`}</th>
                  <th>{`${candidate["nm"]} (ABS)`}</th>
                </>
              )
            })}
          </tr>
        </thead>
        <tbody id="table-body">
          {statesResults.map((state, index) => {
            return (
              <tr key={index}>
                <td>{state.abbr}</td>
                <td>{state.nome}</td>
                <td>{`${state[`${state["abbr"]}-apurado`]}%`}</td>
                <td>{state.eleitores}</td>
                {candidates.map(candidate => {
                  return (
                    <>
                      <td>{`${state[`${state["abbr"]}-perc-${candidate["n"]}`]}%`}</td>
                      <td>{state[`${state["abbr"]}-total-${candidate["n"]}`]}</td>
                    </>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default App