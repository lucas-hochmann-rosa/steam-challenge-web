# 🧮 Desafio dos Números

<p align="center">
  <a href="https://github.com/lucas-hochmann-rosa/steam-challenge-web">
    <img src="https://img.shields.io/badge/GitHub-steam--challenge--web-181717?style=for-the-badge&logo=github">
  </a>
  <a href="https://www.linkedin.com/in/lucas-hochmann-rosa">
    <img src="https://img.shields.io/badge/LinkedIn-Lucas_Hochmann_Rosa-0A66C2?style=for-the-badge&logo=linkedin">
  </a>
  <a href="#-tecnologias-utilizadas">
    <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=111">
  </a>
  <a href="#-tecnologias-utilizadas">
    <img src="https://img.shields.io/badge/Vite-7-646CFF?style=for-the-badge&logo=vite&logoColor=white">
  </a>
  <a href="LICENSE">
    <img src="https://img.shields.io/badge/Licen%C3%A7a-MIT-2ea44f?style=for-the-badge">
  </a>
</p>

<p align="center">🇧🇷 Português · <a href="README.en.md">🇺🇸 English</a></p>

> Experiência interativa de lógica matemática criada para a **Mostra STEAM 2026** da Escola SESI Chapecó.

---

## ⚡ Início

```bash
git clone https://github.com/lucas-hochmann-rosa/steam-challenge-web.git
cd steam-challenge-web
npm install
npm run dev
```

Para gerar e testar a versão de produção:

```bash
npm run build
npm start
```

---

## 📌 Visão Geral

O **Desafio dos Números** é um site/jogo educativo feito para uma apresentação presencial. A experiência conduz o visitante por um truque matemático inicial e, depois, libera desafios de raciocínio em três níveis: sequência numérica, construção de expressões e senha lógica.

O projeto foi desenvolvido por **Lucas Hochmann Rosa**. **Augusto Belini Gasparetto** e **Maria Paula Rossetti Siqueira** integram o grupo de apresentação da Mostra STEAM 2026.

---

## ✨ Principais Funcionalidades

- Truque matemático guiado com revelação e explicação algébrica.
- Três modos de desafio: fácil, médio e difícil.
- Cronômetro com tempo-alvo por dificuldade.
- Validação de resposta e fluxo de tentativa com ou sem premiação.
- Interface responsiva para computador, tablet e celular.
- Feedback sonoro via Web Audio API, com botão para ligar ou desligar sons.
- Assets visuais da Escola SESI e dos integrantes do grupo.

---

## 🧭 Sumário

- [Arquitetura](#-arquitetura)
- [Mapa dos Módulos](#-mapa-dos-módulos)
- [Tecnologias utilizadas](#-tecnologias-utilizadas)
- [Dinâmica da experiência](#-dinâmica-da-experiência)
- [Regras da construção do projeto](#-regras-da-construção-do-projeto)
- [Requisitos](#-requisitos)
- [Instalação](#-instalação)
- [Configuração de Ambiente](#-configuração-de-ambiente)
- [Execução](#-execução)
- [Deploy](#-deploy)
- [Avisos](#-avisos)
- [Licença](#-licença)
- [Autor](#-autor)

---

## 🏗️ Arquitetura

```text
steam-challenge-web/
├── index.html
├── package.json
├── vite.config.js
├── vercel.json
├── public/
│   ├── augusto.png
│   ├── escola-sesi.svg
│   ├── logo-escola-sesi.png
│   ├── lucas.jpg
│   ├── maria.jpg
│   └── math-icons/
│       ├── abaco.png
│       ├── calculadora.png
│       ├── dados.png
│       ├── grafico.png
│       └── operacoes.png
└── src/
    ├── main.jsx
    └── styles.css
```

---

## 🗺️ Mapa dos Módulos

| Arquivo | Função |
| ------ | ------ |
| `index.html` | Entrada HTML da aplicação e metadados da página. |
| `src/main.jsx` | Aplicação React, telas, estados e regras dos desafios. |
| `src/styles.css` | Estilos exportados da experiência original. |
| `public/` | Imagens e ícones servidos diretamente pelo navegador. |
| `vite.config.js` | Configuração do Vite, incluindo base automática para GitHub Pages. |
| `vercel.json` | Configuração de build e saída para deploy na Vercel. |
| `.github/workflows/deploy-pages.yml` | Publicação automática no GitHub Pages a partir da branch `main`. |

---

## 🧰 Tecnologias utilizadas

**Interface:** React 19.

**Build:** Vite 7.

**Linguagem:** JavaScript com ES Modules.

**Ícones:** Lucide React.

**Áudio:** Web Audio API.

---

## 🎲 Dinâmica da experiência

A experiência começa com um truque matemático guiado. O participante escolhe um número, segue operações simples e chega ao resultado 7. Em seguida, a aplicação mostra o motivo algébrico do truque e libera três dificuldades:

| Nível | Dinâmica | Tempo-alvo |
| --- | --- | --- |
| Fácil | Completar uma sequência numérica. | 30 segundos |
| Médio | Montar uma expressão usando todos os números. | 60 segundos |
| Difícil | Resolver pistas para abrir um cofre numérico. | 90 segundos |

---

## 📐 Regras da construção do projeto

- Identificadores, funções, estados e estrutura de arquivos ficam em inglês.
- Textos de interface e documentação ficam em português.
- Comentários no código ficam em português, reservados para decisões não óbvias - o "porquê", não o "o quê".
- A versão local preserva a aparência e a dinâmica da versão exportada original.
- A autoria de desenvolvimento é de **Lucas Hochmann Rosa**; os demais integrantes aparecem como grupo de apresentação, sem responsabilidade autoral pelo código.

---

## ⚙️ Requisitos

- Node.js 20 ou superior
- npm 10 ou superior

---

## 🚀 Instalação

```bash
npm install
```

---

## 🔐 Configuração de Ambiente

Este projeto não usa variáveis de ambiente. A aplicação roda inteiramente no navegador.

---

## ▶️ Execução

Ambiente de desenvolvimento:

```bash
npm run dev
```

Checagem completa:

```bash
npm run check
```

Build de produção:

```bash
npm run build
npm start
```

---

## 🌐 Deploy

### Vercel

O arquivo `vercel.json` já define:

| Campo | Valor |
| --- | --- |
| Comando de build | `npm run build` |
| Diretório de saída | `dist` |
| Framework | `vite` |

### GitHub Pages

O workflow `.github/workflows/deploy-pages.yml` publica a pasta `dist` quando houver push na branch `main`.

Endereço esperado após o deploy:

```text
https://lucas-hochmann-rosa.github.io/steam-challenge-web/
```

No GitHub, a página deve usar **GitHub Actions** como origem do Pages.

---

## ⚠️ Avisos

Este projeto foi criado para uma apresentação escolar e não representa uma página oficial da Escola SESI. Logos e imagens institucionais aparecem apenas no contexto do trabalho da Mostra STEAM 2026.

O diretório `dist/` é gerado pelo build e não deve ser versionado.

---

## 📄 Licença

Licenciado sob MIT. Sinta-se livre para usar, modificar e distribuir, mantendo o aviso de copyright e atribuindo crédito a **Lucas Hochmann Rosa**.

---

## 👨‍💻 Autor

**Lucas Hochmann Rosa**

- Repositório: <https://github.com/lucas-hochmann-rosa/steam-challenge-web>
- GitHub: <https://github.com/lucas-hochmann-rosa>
- LinkedIn: <https://www.linkedin.com/in/lucas-hochmann-rosa>

Grupo de apresentação: Lucas Hochmann Rosa, Augusto Belini Gasparetto e Maria Paula Rossetti Siqueira.

---
