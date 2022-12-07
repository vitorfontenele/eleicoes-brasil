import { useState , useEffect } from 'react'
import './App.css'
import {baseURL} from "./constants/baseURL";
import states from "./states/states.json";

function App() {
  const [now, setNow] = useState("");
  const [statesResults, setStatesResults] = useState(states);
  const [countryResults, setCountryResults] = useState({"apurado-brasil": 0, "candidatos": [], "totalAbs": 0});

  useEffect(() => {
    setNow(new Date(Date.now()));
    getResultsCountry();
    getResultsStates();
  }, [])

  const getResultsCountry = async () => {
    const countryResultsCopy = {...countryResults};
    const countryURL = baseURL("br");
    try { 
      const response = await fetch(countryURL);
      const data = await response.json();
      countryResultsCopy["apurado-brasil"] = data["pst"].replace(",", ".");
      data["cand"].map((candidato, index) => {
        countryResultsCopy["candidatos"][index] = candidato;
      })
    } catch(error) {
      console.log(error)
    }
    setCountryResults(countryResultsCopy);
    console.log(countryResults["candidatos"]);
  }

  const getResultsStates = () => {
    const statesResultsCopy = [...statesResults];
    const totalAbsAll = {"13": 0, "22": 0};
    statesResultsCopy.map(async (state) => {
      const uf = state["abbr"];
      const stateURL = baseURL(uf);
      try {
        const response = await fetch(stateURL);
        const data = await response.json();
        state[`${uf}-apurado`] = `${data["pst"].replace(",", ".")}`;
        for (let candidato of data["cand"]){
          const { n , pvap } = candidato;
          const perc = Number(pvap.replace(",", "."));
          state[`${uf}-perc-${n}`] = perc;
          const totalAbs = Math.round(perc * 0.01 * state["eleitores"]);
          state[`${uf}-total-${n}`] = totalAbs;             
          //console.log(state)
          totalAbsAll[n] += totalAbs;
        }
      } catch(error){
        console.log(error);
      }
    })
    setStatesResults(statesResultsCopy);
    setCountryResults({...countryResults, totalAbs: totalAbsAll});
  }

  return (
    <div className="App">
      <h1>Previsão do Resultado Final</h1>
      <h2 id="apurado-brasil">{`Apurado Brasil: ${countryResults["apurado-brasil"]} %`}</h2>
      <h4 id="hora">{`Hora: ${now}`}</h4>
      <table className="table mb-5">
        <thead className="thead-dark">
          <tr style={{fontSize: "28px"}}>
            {countryResults["candidatos"].map(result => {
              return (
                <>
                  <th>{result["nm"]}</th>
                </>
              )
            })}
          </tr>
        </thead>
        <tbody>
          <tr style={{fontSize: "40px"}}>
            <td className="table-danger" id="lula-perc-final">10</td>
            <td className="table-primary" id="bolsonaro-perc-final">20</td>
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
            {countryResults["candidatos"].map(result => {
              return (
                <>
                  <th>{`${result["nm"]} (%)`}</th>
                  <th>{`${result["nm"]} (ABS)`}</th>
                </>
              )
            })}
          </tr>
        </thead>
        <tbody id="table-body">
          {statesResults.map((state, index) => {
            return (
              <tr key={index}>
                <th>{state.abbr}</th>
                <th>{state.nome}</th>
                <th>{`${state[`${state["abbr"]}-apurado`]} %`}</th>
                <th>{state.eleitores}</th>
                {countryResults["candidatos"].map(result => {
                  return (
                    <>
                      <th>{state[`${state["abbr"]}-perc-${result["n"]}`]}</th>
                      <th>{state[`${state["abbr"]}-total-${result["n"]}`]}</th>
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
