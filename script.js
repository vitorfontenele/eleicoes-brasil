//DEFINIR PARA 545 NO SEGUNDO TURNO
const numEleicao = 545;

const estados = [
    {abbr: 'sp', nome: 'São Paulo', eleitores: 34667793},
    {abbr: 'mg', nome: 'Minas Gerais', eleitores: 16290870},
    {abbr: 'rj', nome: 'Rio de Janeiro', eleitores: 12827296},
    {abbr: 'ba', nome: 'Bahia', eleitores: 11291528},
    {abbr: 'rs', nome: 'Rio Grande do Sul', eleitores: 8593469},
    {abbr: 'pr', nome: 'Paraná', eleitores: 8475632},
    {abbr: 'pe', nome: 'Pernambuco', eleitores: 7018098},
    {abbr: 'ce', nome: 'Ceará', eleitores: 6820673},
    {abbr: 'pa', nome: 'Pará', eleitores: 6082312},
    {abbr: 'sc', nome: 'Santa Catarina', eleitores: 5489658},
    {abbr: 'ma', nome: 'Maranhão', eleitores: 5042999},
    {abbr: 'go', nome: 'Goiás', eleitores: 4870354},
    {abbr: 'pb', nome: 'Paraíba', eleitores: 3091684},
    {abbr: 'es', nome: 'Espírito Santo', eleitores: 2921506},
    {abbr: 'am', nome: 'Amazonas', eleitores: 2647748},
    {abbr: 'pi', nome: 'Piauí', eleitores: 2573810},
    {abbr: 'rn', nome: 'Rio Grande do Norte', eleitores: 2554727},
    {abbr: 'mt', nome: 'Mato Grosso', eleitores: 2469414},
    {abbr: 'al', nome: 'Alagoas', eleitores: 2325656},
    {abbr: 'df', nome: 'Distrito Federal', eleitores: 2203045},
    {abbr: 'ms', nome: 'Mato Grosso do Sul', eleitores: 1996510},
    {abbr: 'se', nome: 'Sergipe', eleitores: 1671801},
    {abbr: 'ro', nome: 'Rondônia', eleitores: 1230987},
    {abbr: 'to', nome: 'Tocantins', eleitores: 1094003},
    {abbr: 'ac', nome: 'Acre', eleitores: 588433},
    {abbr: 'ap', nome: 'Amapá', eleitores: 550687},
    {abbr: 'rr', nome: 'Roraima', eleitores: 366240},
]

let totalEleitores = 0;
const tableBody = document.getElementById("table-body");

for (let estado of estados){
    totalEleitores += estado["eleitores"];
    const tr = document.createElement("tr");
    tr.setAttribute("id", estado["abbr"]);
    const trInner = `
    <th>${estado["abbr"]}</th>
    <th id="${estado["abbr"]}-nome">${estado["nome"]}</th>
    <td id="${estado["abbr"]}-eleitores">${estado["eleitores"]}</td>
    <td id="${estado["abbr"]}-perc-lula">0</td>
    <td id="${estado["abbr"]}-total-lula">0</td>
    <td id="${estado["abbr"]}-perc-bolsonaro">0</td>
    <td id="${estado["abbr"]}-total-bolsonaro">0</td>
    `
    tr.innerHTML = trInner;
    tableBody.appendChild(tr);
}

// console.log(totalEleitores);

const getResults = async () => {
    let totalLula = 0;
    let totalBolsonaro = 0;
    for (let estado of estados){
        const uf = estado['abbr'];
        const baseURL = `https://resultados.tse.jus.br/oficial/ele2022/${numEleicao}/dados-simplificados/${uf}/${uf}-c0001-e000${numEleicao}-r.json`;
        //console.log(baseURL);
        // const headers = {'Content-Type':'application/json',
        // 'Access-Control-Allow-Origin':'*',
        // 'Access-Control-Allow-Methods':'POST,PATCH,OPTIONS'};
        const response = await fetch(baseURL);
        const data = await response.json();
        //console.log(data["cand"][1]["n"]);
        for (let candidato of data["cand"]){
            if (candidato["n"] == 13){
                document.getElementById(`${uf}-perc-lula`).textContent = `${candidato["pvap"]}%`;
                const perc = Number(candidato["pvap"].replace(",", "."));
                const eleitores = Number(document.getElementById(`${uf}-eleitores`).textContent);
                document.getElementById(`${uf}-total-lula`).textContent = Math.round(perc*0.01*eleitores);
                totalLula += Math.round(perc*0.01*eleitores);
            } else if (candidato["n"] == 22){
                document.getElementById(`${uf}-perc-bolsonaro`).textContent = `${candidato["pvap"]}%`;
                const perc = Number(candidato["pvap"].replace(",", "."));
                const eleitores = Number(document.getElementById(`${uf}-eleitores`).textContent);
                document.getElementById(`${uf}-total-bolsonaro`).textContent = Math.round(perc*0.01*eleitores);
                totalBolsonaro += Math.round(perc*0.01*eleitores);
            }
        }
        let totalLulaUf = Number(document.getElementById(`${uf}-total-lula`).textContent);
        let totalBolsonaroUf = Number(document.getElementById(`${uf}-total-bolsonaro`).textContent);

        if (totalLulaUf > totalBolsonaroUf){
            document.getElementById(`${uf}`).classList.add("table-success");
            document.getElementById(`${uf}-perc-lula`).style.fontWeight = "Bold";
        } else if (totalBolsonaroUf > totalLulaUf){
            document.getElementById(`${uf}`).classList.add("table-light");
            document.getElementById(`${uf}-perc-bolsonaro`).style.fontWeight = "Bold";
        }
    }
    document.getElementById("lula-perc-final").textContent = `${(totalLula/totalEleitores*100).toFixed(2)}%`;
    document.getElementById("bolsonaro-perc-final").textContent = `${(totalBolsonaro/totalEleitores*100).toFixed(2)}%`;

    if (totalLula > totalBolsonaro){
        document.getElementById("lula-perc-final").classList.add("table-success");
        document.getElementById("lula-perc-final").style.fontWeight = "Bold";
    } else if (totalLula < totalBolsonaro){
        document.getElementById("lula-perc-final").classList.add("table-light");
        document.getElementById("bolsonaro-perc-final").style.fontWeight = "Bold";
    }
}

getResults()
