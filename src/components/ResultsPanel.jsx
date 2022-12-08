import { Fragment } from "react";

const ResultsPanel = (props) => {
    const {
        now, 
        statesResults, 
        computedCountry, 
        candidates, 
        candColors, 
        stateColor, 
        totals} = props;

    return (
        <>
            <h1>Previsão do Resultado Final</h1>
            <h2 id="apurado-brasil">{`Apurado Brasil: ${computedCountry}%`}</h2>
            <h4 id="hora">{`Hora: ${now}`}</h4>
            <table className="table mb-5">
                <thead className="table-dark">
                <tr style={{fontSize: "28px"}}>
                    {candidates.map((candidate, index) => {
                    return (
                        <th key={index}>{candidate["nm"]}</th>
                    )
                    })}
                </tr>
                </thead>
                <tbody>
                <tr style={{fontSize: "40px"}}>
                    {candidates.map((candidate, index) => {
                    return (
                        <td key={index} className={candColors[index] ? candColors[index]["candColorClass"] : ""}>{`${totals[`total${candidate["n"]}`]}%`}</td>
                    )
                    })}
                </tr>
                </tbody>
            </table>
            <h2>Resultados por UF</h2>
            {candColors.map((color, index) => {
                return <h5 key={index}>{`${color.name} = ${candidates[index] ? `Candidato ${candidates[index]["nm"]} na frente` : `Candidato ${index} na frente`}`}</h5>
            })}
            <table className="table">
                <thead className="table-dark">
                <tr>
                    <th>UF</th>
                    <th>NOME UF</th>
                    <th>APURADO</th>
                    <th>ELEITORES</th>
                    {candidates.map((candidate, index) => {
                    return (
                        <Fragment key={index}>
                        <th>{`${candidate["nm"]} (%)`}</th>
                        <th>{`${candidate["nm"]} (ABS)`}</th>
                        </Fragment>
                    )
                    })}
                </tr>
                </thead>
                <tbody id="table-body">
                {statesResults.map((state, index) => {
                    return (
                    <tr key={index} className={stateColor[index]}>
                        <td>{state.abbr}</td>
                        <td>{state.nome}</td>
                        <td>{`${state[`${state["abbr"]}-apurado`]}%`}</td>
                        <td>{state.eleitores}</td>
                        {candidates.map((candidate, index) => {
                        return (
                            <Fragment key={index}>
                            <td>{`${state[`${state["abbr"]}-perc-${candidate["n"]}`]}%`}</td>
                            <td>{state[`${state["abbr"]}-total-${candidate["n"]}`]}</td>
                            </Fragment>
                        )
                        })}
                    </tr>
                    )
                })}
                </tbody>
            </table>
        </>
    )
}

export default ResultsPanel;