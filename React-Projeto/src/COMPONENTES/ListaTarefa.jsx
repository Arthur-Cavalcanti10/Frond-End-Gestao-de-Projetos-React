import { useState, useEffect } from 'react';
import axios from 'axios';

function ListaTarefa() {
  const [tarefas, setTarefas] = useState([]);
  const [projetos, setProjetos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);
  const [filtroStatus, setFiltroStatus] = useState("");
  const [filtroPrioridade, setFiltroPrioridade] = useState("");
  const [filtroProjeto, setFiltroProjeto] = useState("");

  useEffect(() => {
    buscarTarefas();
    buscarProjetos();
  }, []);

  const buscarTarefas = () => {
    setLoading(true);
    axios.get("http://localhost:8080/tarefas")
      .then((response) => {
        setTarefas(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erro ao carregar tarefas", error);
        setErro("Erro ao carregar tarefas");
        setLoading(false);
      });
  };

  const buscarProjetos = () => {
    axios.get("http://localhost:8080/projetos")
      .then((response) => setProjetos(response.data))
      .catch((error) => console.error("Erro ao carregar projetos", error));
  };

  const excluirTarefa = (id) => {
    if (window.confirm("Deseja realmente excluir esta tarefa?")) {
      axios.delete(`http://localhost:8080/tarefas/${id}`)
        .then(() => {
          alert("Tarefa excluída com sucesso!");
          buscarTarefas();
        })
        .catch((error) => {
          console.error("Erro ao excluir:", error);
          alert("Erro ao excluir tarefa");
        });
    }
  };

  const tarefasFiltradas = tarefas.filter((t) => {
    const statusMatch = filtroStatus === "" || t.status === filtroStatus;
    const prioridadeMatch = filtroPrioridade === "" || t.prioridade === filtroPrioridade;
    const projetoMatch = filtroProjeto === "" || (t.projeto && t.projeto.id == filtroProjeto);
    return statusMatch && prioridadeMatch && projetoMatch;
  });

  const limparFiltro = () => {
    setFiltroStatus("");
    setFiltroPrioridade("");
    setFiltroProjeto("");
  };

  return (
    <>
      <div className="filtros">
        <div className="filtros-grid">
          <div className="form-group">
            <label htmlFor="filtro-status">Status</label>
            <select id="filtro-status" className="form-control" value={filtroStatus} onChange={(e) => setFiltroStatus(e.target.value)}>
              <option value="">Todos</option>
              <option value="PENDENTE">Pendente</option>
              <option value="FAZENDO">Fazendo</option>
              <option value="CONCLUIDA">Concluída</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="filtro-prioridade">Prioridade</label>
            <select id="filtro-prioridade" className="form-control" value={filtroPrioridade} onChange={(e) => setFiltroPrioridade(e.target.value)}>
              <option value="">Todas</option>
              <option value="ALTA">Alta</option>
              <option value="MEDIA">Média</option>
              <option value="BAIXA">Baixa</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="filtro-projeto">Projeto</label>
            <select id="filtro-projeto" className="form-control" value={filtroProjeto} onChange={(e) => setFiltroProjeto(e.target.value)}>
              <option value="">Todos</option>
              {projetos.map((proj) => (
                <option key={proj.id} value={proj.id}>{proj.nome}</option>
              ))}
            </select>
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
          Mostrando {tarefasFiltradas.length} de {tarefas.length} registros
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

      <div id="tarefas-container" className="tarefas-container">
        {loading ? (
          <p>Carregando...</p>
        ) : erro ? (
          <p style={{color: 'red'}}>{erro}</p>
        ) : tarefasFiltradas.length === 0 ? (
          <p>Nenhuma tarefa encontrada</p>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Título</th>
                <th>Prioridade</th>
                <th>Status</th>
                <th>Projeto</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {tarefasFiltradas.map((t) => (
                <tr key={t.id}>
                  <td>{t.titulo}</td>
                  <td>{t.prioridade}</td>
                  <td>{t.status}</td>
                  <td>{t.projeto ? t.projeto.nome : '-'}</td>
                  <td>
                    <button className="btn btn-sm btn-primary">
                      <i className="fas fa-edit"></i> Editar
                    </button>
                    <button className="btn btn-sm btn-danger" onClick={() => excluirTarefa(t.id)}>
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
          Mostrando {tarefasFiltradas.length} de {tarefas.length} registros
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

export default ListaTarefa;
