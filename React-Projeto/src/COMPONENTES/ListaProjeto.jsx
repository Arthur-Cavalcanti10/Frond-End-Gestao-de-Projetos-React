import { useState, useEffect } from 'react';
import axios from 'axios';

function ListaProjeto() {
  const [projetos, setProjetos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);
  const [filtroNome, setFiltroNome] = useState("");
  const [filtroResponsavel, setFiltroResponsavel] = useState("");

  useEffect(() => {
    buscarProjetos();
  }, []);

  const buscarProjetos = () => {
    setLoading(true);
    axios.get("http://localhost:8080/projetos")
      .then((response) => {
        setProjetos(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erro ao carregar projetos", error);
        setErro("Erro ao carregar projetos");
        setLoading(false);
      });
  };

  const excluirProjeto = (id) => {
    if (window.confirm("Deseja realmente excluir este projeto?")) {
      axios.delete(`http://localhost:8080/projetos/${id}`)
        .then(() => {
          alert("Projeto excluído com sucesso!");
          buscarProjetos();
        })
        .catch((error) => {
          console.error("Erro ao excluir:", error);
          alert("Erro ao excluir projeto");
        });
    }
  };

  const projetosFiltrados = projetos.filter((p) => {
    const nomeMatch = filtroNome === "" || p.nome.toLowerCase().includes(filtroNome.toLowerCase());
    const responsavelMatch = filtroResponsavel === "" || (p.responsavel && p.responsavel.nome && p.responsavel.nome.toLowerCase().includes(filtroResponsavel.toLowerCase()));
    return nomeMatch && responsavelMatch;
  });

  const limparFiltro = () => {
    setFiltroNome("");
    setFiltroResponsavel("");
  };

  return (
    <>
      <div className="filtros">
        <div className="filtros-grid">
          <div className="form-group">
            <label htmlFor="filtro-nome-projeto">Nome do Projeto</label>
            <input type="text" id="filtro-nome-projeto" className="form-control" 
              placeholder="Filtrar pelo projeto" value={filtroNome} 
              onChange={(e) => setFiltroNome(e.target.value)} />
          </div>

          <div className="form-group">
            <label htmlFor="filtro-responsavel">Responsável</label>
            <input type="text" id="filtro-responsavel-projeto" className="form-control" 
              placeholder="Responsável" value={filtroResponsavel}
              onChange={(e) => setFiltroResponsavel(e.target.value)} />
          </div>
          
          <div className="btn-filtrar">
            <button id="btn-limpar" className="btn" onClick={limparFiltro}>
              <i className="fas fa-broom"></i> Limpar
            </button>
          </div>
        </div>
      </div>

      <div className="paginacao">
        <div className="paginacao-info">
          Mostrando {projetosFiltrados.length} de {projetos.length} registros
        </div>
        <div>
          <button id="btn-anterior" className="btn" disabled>
            <i className="fas fa-chevron-left"></i> Anterior
          </button>
          <button id="btn-proximo" className="btn" disabled>
            Próximo <i className="fas fa-chevron-right"></i>
          </button>
        </div>
      </div>

      <div id="projetos-container" className="projetos-container">
        {loading ? (
          <p>Carregando...</p>
        ) : erro ? (
          <p style={{color: 'red'}}>{erro}</p>
        ) : projetosFiltrados.length === 0 ? (
          <p>Nenhum projeto encontrado</p>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Descrição</th>
                <th>Responsável</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {projetosFiltrados.map((p) => (
                <tr key={p.id}>
                  <td>{p.nome}</td>
                  <td>{p.descricao}</td>
                  <td>{p.responsavel ? p.responsavel.nome : '-'}</td>
                  <td>{p.status}</td>
                  <td>
                    <button className="btn btn-sm btn-primary">
                      <i className="fas fa-edit"></i> Editar
                    </button>
                    <button className="btn btn-sm btn-danger" onClick={() => excluirProjeto(p.id)}>
                      <i className="fas fa-trash"></i> Excluir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="paginacao">
        <div className="paginacao-info">
          Mostrando {projetosFiltrados.length} de {projetos.length} registros
        </div>
        <div>
          <button id="btn-anterior" className="btn" disabled>
            <i className="fas fa-chevron-left"></i> Anterior
          </button>
          <button id="btn-proximo" className="btn" disabled>
            Próximo <i className="fas fa-chevron-right"></i>
          </button>
        </div>
      </div>
    </>
  );
}

export default ListaProjeto;
