import { useState , useEffect } from 'react'
import { baseURL } from "./constants/baseURL";
import states from "./states/states.json";
import { Fragment } from "react";
import ResultsPanel from "./components/ResultsPanel";
import Loading from './components/Loading';

function App() {
  const [now, setNow] = useState("");
  const [statesResults, setStatesResults] = useState(states);
  const [computedCountry, setComputedCountry] = useState("");
  const [candidates, setCandidates] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setNow(new Date(Date.now()));
    const getData = async () => {
      await getComputedAndCandidates();
      await getResultsStates();
    }
    getData();
  }, [])

  const getComputedAndCandidates = async () => {
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
    data["cand"].map((candidate, index) => {
      candidatesCopy[index] = candidate;
    })
    setCandidates(candidatesCopy);
  }

  const getResultsStates = async () => {
    const statesResultsCopy = [...statesResults];
    
    for (let state of statesResultsCopy){
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
      data["cand"].map(candidate => {
        const { n , pvap } = candidate;
        const perc = Number(pvap.replace(",", "."));
        state[`${uf}-perc-${n}`] = perc;
        const totalAbs = Math.round(perc * 0.01 * state["eleitores"]);
        state[`${uf}-total-${n}`] = totalAbs;             
      })
    }
    setStatesResults(statesResultsCopy);
    // setTimeout is used so the transition between the
    // loading screen and the results panel is less abrupt
    setTimeout(() => {setIsLoading(false)}, 750);
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

  // Specific color styling according to the colors used in each candidate's campaign
  const candAColor = {name: "Vermelho", candColorClass: "table-danger"};
  const candBColor = {name: "Azul", candColorClass: "table-primary"};
  const candColors = [candAColor, candBColor];
  const stateColor = statesResults.map(state => {
    const totalCandA = state[`${state["abbr"]}-total-${candidates[0] ? candidates[0]["n"] : ""}`];
    const totalCandB = state[`${state["abbr"]}-total-${candidates[1] ? candidates[1]["n"] : ""}`];
    if (totalCandA > totalCandB){
      return candAColor["candColorClass"];
    } else if (totalCandB > totalCandA){
      return candBColor["candColorClass"];
    } else {
      return "table-default";
    }
  })

  return (
    <div className="App">
      {isLoading && <Loading />}
      {!isLoading && <ResultsPanel 
        now={now} 
        statesResults={statesResults} 
        computedCountry={computedCountry} 
        candidates={candidates} 
        candColors={candColors} 
        stateColor={stateColor}
        totals={totals} />}
    </div>
  )
}

export default App