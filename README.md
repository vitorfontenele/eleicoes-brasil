<a name="readme-top"></a>

<div align="center">
  <a href="https://github.com/vitorfontenele/eleicoes-brasil">
    <img src="dist/vote.svg" alt="Logo" width="80" height="80">
  </a>
  <h3 align="center">eleicoes-brasil</h3>
  <a href="https://vitorfontenele.github.io/eleicoes-brasil/">https://vitorfontenele.github.io/eleicoes-brasil/</a>
</div>

<!-- Conteúdo -->
<details>
  <summary>Conteúdo</summary>
  <ol>
    <li>
      <a href="#sobre-o-projeto">Sobre o projeto</a>
      <ul>
        <li><a href="#feito-com">Feito com</a></li>
      </ul>
    </li>
    <li>
      <a href="#instalação">Instalação</a>
    </li>
    <li><a href="#utilização">Utilização</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contribuindo">Contribuindo</a></li>
    <li><a href="#licença">Licença</a></li>
    <li><a href="#contato">Contato</a></li>
    <li><a href="#contribuições">Contribuições</a></li>
  </ol>
</details>


<!-- SOBRE O PROJETO -->
## Sobre o projeto

Este projeto foi feito com o objetivo de prever o resultado final do segundo turno das eleições de 2022 para Presidente da República Federativa do Brasil, enquanto ocorriam as apurações dos votos em tempo real. Os dados das votações são provenientes de uma API fornecida pelo TSE.

Enquanto os votos são apurados em tempo real, alguns estados começam a apurar mais cedo e de forma mais rápida, enquanto outros iniciam a apuração mais tardiamente ou levam mais tempo para computar os seus votos.

A ideia utilizada nessa aplicação é que o percentual de votos que cada candidato recebe em determinado estado, a partir de determinado momento, passa a ser estável (praticamente não muda).

Assim, sabendo-se antecipadamente o número de eleitores de cada estado, pode-se estimar o número de votos válidos que determinado candidato terá quando as urnas estiverem 100% apuradas. Esse raciocínio é então replicado para todos os estados e temos uma estimativa de qual será o percentual final de votos válidos para cada candidato em todo o país.

<p align="right">(<a href="#readme-top">voltar para o topo</a>)</p>

### Feito com


* [![React][React.js]][React-url]
* [![Bootstrap][Bootstrap.com]][Bootstrap-url]

<p align="right">(<a href="#readme-top">voltar para o topo</a>)</p>




<!-- INSTALAÇÃO -->
## Instalação

1. Clone o repositório:
   ```sh
   git clone https://github.com/vitorfontenele/eleicoes-brasil.git
   ```
2. Instale os pacotes NPM:
   ```sh
   npm install
   ```

<p align="right">(<a href="#readme-top">voltar para o topo</a>)</p>

<!-- UTILIZAÇÃO -->
## Utilização

Este projeto foi pensado para o segundo turno presidencial das eleições brasileiras de 2022. Ainda assim, o código foi escrito de forma a ser significativamente reutilizável, isto é, poucas alterações são necessárias para o caso de utilizar o projeto em uma outra eleição presidencial (seja primeiro ou segundo turno). 

As principais alterações necessárias, em caso de uso futuro, estariam relacionadas à estilização (cores) utilizadas para cada candidato. Também será necessário verificar quaisquer alterações na documentação da API do TSE.

<p align="right">(<a href="#readme-top">voltar para o topo</a>)</p>

<!-- ROADMAP -->
## Roadmap

- [x] Criação do projeto com JS Vanilla
- [x] Deploy no Github Pages
- [x] Transformação em um projeto React
- [x] Aumento da reutilização do código
- [ ] Tornar a estilização 100% reutilizável

Veja [open issues](https://github.com/vitorfontenele/eleicoes-brasil/issues) para modificações propostas (e issues conhecidos).

<p align="right">(<a href="#readme-top">voltar para o topo</a>)</p>

<!-- CONTRIBUINDO -->
## Contribuindo

Contribuições são o que tornam a comunidade open-source um lugar incrível de aprendizado, inspiração e criação. Quaisquer contribuições serão muito apreciadas.

Se você tiver sugestões que melhorariam este projeto, por favor faça um fork do repositório e crie um pull request. Você também pode simplesmente abrir um issue com a tag "enhancement".
Não se esqueça de dar uma estrela para o projeto! Mais uma vez, obrigado!

1. Faça um Fork do Projeto
2. Crie uma branch para as modificações que você deseja propor (`git checkout -b feature/mudanca-incrivel`)
3. Faça um Commit das suas alterações (`git commit -m 'Adicionar uma mudança incrível'`)
4. Faça um Push para a Branch que você criou (`git push origin feature/mudanca-incrivel`)
5. Abra um Pull Request

<p align="right">(<a href="#readme-top">voltar para o topo</a>)</p>

<!-- LICENSE -->
## Licença

Distribuído sob a MIT License. Veja `LICENSE.txt` para mais informações.

<p align="right">(<a href="#readme-top">voltar para o topo</a>)</p>

<!-- CONTATO -->
## Contato

[![Github][github-shield]][github-url][![Linkedin][linkedin-shield]][linkedin-url]

Link do Projeto: [https://github.com/vitorfontenele/eleicoes-brasil](https://github.com/vitorfontenele/eleicoes-brasil)

<p align="right">(<a href="#readme-top">voltar para o topo</a>)</p>

<!-- CONTRIBUIÇÕES -->
## Contribuições

* [Vite](https://vitejs.dev)
* [GitHub Pages](https://pages.github.com)
* [SVG Repo](https://www.svgrepo.com)
* [TSE](https://www.tse.jus.br)

<p align="right">(<a href="#readme-top">voltar para o topo</a>)</p>


<!-- MARKDOWN LINKS & IMAGES -->
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com
[linkedin-shield]: https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white
[linkedin-url]: https://www.linkedin.com/in/vitor-fontenele/
[github-shield]: https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white
[github-url]: https://github.com/vitorfontenele
