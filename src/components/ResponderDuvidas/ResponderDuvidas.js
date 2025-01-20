import ReactDOM from "react-dom";
import { useState } from "react";
import "./ResponderDuvidas.css";
import tiraDuvidasLogo from "../Logo-Tira-Dúvidas-removebg.png";
import defaultProfilePic from "../default-profile.png";
import FilterIcon from '../filtrar.png'; 


const ResponderDuvidas = ({ doubts }) => {
  const [filtroVisivel, setFiltroVisivel] = useState(false);
  const [filtro, setFiltro] = useState("");
  const [search, setSearch] = useState("");
  const [filteredDoubts, setFilteredDoubts] = useState(doubts);

  const toggleFiltroVisivel = () => {
    setFiltroVisivel(!filtroVisivel);
  };

  const handleFiltroChange = (e) => {
    setFiltro(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const aplicarFiltro = () => {
    let result = [...doubts];

    // Filtrar por palavras-chave
    if (search) {
      result = result.filter((doubt) =>
        doubt.title.toLowerCase().includes(search.toLowerCase()) ||
        doubt.description.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Filtrar por status
    if (filtro === "respondidas") {
      result = result.filter((doubt) => doubt.status === "respondida");
    } else if (filtro === "naoRespondidas") {
      result = result.filter((doubt) => doubt.status !== "respondida");
    }

    // Ordenar
    if (filtro === "crescente") {
      result.sort((a, b) => a.title.localeCompare(b.title));
    } else if (filtro === "decrescente") {
      result.sort((a, b) => b.title.localeCompare(a.title));
    }

    setFilteredDoubts(result);
  };

  return (
    <div className="responder-duvidas">
      <header className="header-responder-duvidas">
        <img src={tiraDuvidasLogo} alt="Tira Dúvidas Logo" className="logo-responderDuvidas" />
        <h1 className="cadastro-duvida-title">Responder Dúvidas</h1>
        <a href="/perfil" className="profile-btn">
          <img src={defaultProfilePic} alt="icon-profile" className="user-profile-img" />
        </a>
      </header>

      <div className="filtrar-container">
      <button className="filtrar-btn" onClick={toggleFiltroVisivel}> 
        <img src={FilterIcon} alt="Filter Icon" className="filter-icon-profile" />
        Filtrar</button>

        {filtroVisivel && (
          <div className="filtro-container">
            <input
              type="text"
              placeholder="Buscar por palavras-chave"
              value={search}
              onChange={handleSearchChange}
              className="search-input"
            />
            <select onChange={handleFiltroChange} value={filtro}>
              <option value="">Selecione um filtro</option>
              <option value="crescente">Crescente</option>
              <option value="decrescente">Decrescente</option>
              <option value="respondidas">Respondidas</option>
              <option value="naoRespondidas">Não Respondidas</option>
            </select>
            <button onClick={aplicarFiltro} className="button-filter">
              Aplicar filtro
            </button>
          </div>
        )}
      </div>

      <section>
        <h2 className="subtitle">Últimas dúvidas</h2>
        <div className="doubt-list">
          {filteredDoubts.map((doubt, index) => (
            <DoubtCard key={index} doubt={doubt} />
          ))}
        </div>
      </section>
    </div>
  );
};

const DoubtCard = ({ doubt }) => {
  const getStatusClass = (status) => {
    if (status === "insatisfeito") return "status-insatisfeito";
    if (status === "pendente") return "status-pendente";
    if (status === "respondida") return "status-respondida";
    return "";
  };

  const getStatusIcon = (status) => {
    if (status === "insatisfeito") return "❌";
    if (status === "pendente") return "⚠️";
    if (status === "respondida") return "✅";
    return "";
  };

  return (
    <div className={`doubt-card ${getStatusClass(doubt.status)}`}>
      <div className="doubt-card-header">
        <span className="status-icon">{getStatusIcon(doubt.status)}</span>
        <h3 className="doubt-title">{doubt.title}</h3>
      </div>
      <p className="doubt-description">{doubt.description}</p>
      <div className="doubt-info">
        <p>
          <strong>Usuário criação:</strong> {doubt.user}
        </p>
        <p>
          <strong>Categoria:</strong> {doubt.category}
        </p>
        <p>
          <strong>Situação:</strong> {doubt.status}
        </p>
      </div>
    </div>
  );
};

const mockDoubts = [
  {
    title: "Dúvida 1",
    description: "Descrição da dúvida 1",
    user: "Usuário A",
    category: "Categoria X",
    status: "insatisfeito",
  },
  {
    title: "Dúvida 2",
    description: "Descrição da dúvida 2",
    user: "Usuário B",
    category: "Categoria Y",
    status: "pendente",
  },
  {
    title: "Dúvida 3",
    description: "Descrição da dúvida 3",
    user: "Usuário C",
    category: "Categoria Z",
    status: "respondida",
  },
];

ReactDOM.render(
  <ResponderDuvidas doubts={mockDoubts} />,
  document.getElementById("root")
);

export default ResponderDuvidas;
