export const baseURL = (uf) => {
    const numElection = 545;
    const year = 2022;
    return `https://resultados.tse.jus.br/oficial/ele${year}/${numElection}/dados-simplificados/${uf}/${uf}-c0001-e000${numElection}-r.json`;
}