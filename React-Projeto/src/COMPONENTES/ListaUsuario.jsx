import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
                        //recebe o handle editar do usuario
function ListaUsuario({ handleEditar, handleRefresh }) {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);
  const [filtroNome, setFiltroNome] = useState("");
  const [filtroCPF, setFiltroCpf] = useState("");
  const [filtroEmail, setFiltroEmail] = useState("");
  const [filtroStatus, setFiltroStatus] = useState("");

  const usuariosFiltrados = usuarios.filter(usuario => {
    const nomeMatch = filtroNome === "" || usuario.nome.toLowerCase().includes(filtroNome.toLowerCase());
    const cpfMatch = filtroCPF === "" || usuario.cpf.includes(filtroCPF);
    const emailMatch = filtroEmail === "" || usuario.email.toLowerCase().includes(filtroEmail.toLowerCase());
    const statusMatch = filtroStatus === "" || usuario.status === filtroStatus;
    return nomeMatch && cpfMatch && emailMatch && statusMatch;
  });

  const buscarUsuarios = useCallback(() => {
    setLoading(true);
    axios.get("http://localhost:8080/usuarios")
      .then((response) => {
        setUsuarios(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erro ao buscar:", error);
        setErro("Erro ao carregar usuários");
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    buscarUsuarios();
  }, [buscarUsuarios, handleRefresh]);

  const excluirUsuario = (id) => {
    if (window.confirm("Deseja realmente excluir este usuário?")) {
      axios.delete(`http://localhost:8080/usuarios/${id}`)
        .then(() => {
          alert("Usuário excluído com sucesso!");
          buscarUsuarios();
        })
        .catch((error) => {
          console.error("Erro ao excluir:", error);
          alert("Erro ao excluir usuário");
        });
    }
  };

  const limparFiltro = () => {
    setFiltroNome("");
    setFiltroCpf("");
    setFiltroEmail("");
    setFiltroStatus("");
  };

  return (
    <>
      <div className="filtros">
        <div className="filtros-grid">
          <div className="form-group">
            <label htmlFor="filtro-nome">Nome</label>
            <input
              type="text"
              id="filtro-nome"
              className="form-control"
              placeholder="Filtrar por nome"
              value={filtroNome}
              onChange={(e) => setFiltroNome(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="filtro-cpf">CPF</label>
            <input
              type="text"
              id="filtro-cpf"
              value={filtroCPF} onChange={(e) => setFiltroCpf(e.target.value)}
              className="form-control"
              placeholder="Filtrar por CPF"
            />
          </div>

          <div className="form-group">
            <label htmlFor="filtro-email">E-mail</label>
            <input
              type="text"
              id="filtro-email"
              value={filtroEmail} onChange={(e) => setFiltroEmail(e.target.value)}
              className="form-control"
              placeholder="Filtrar por e-mail"
            />
          </div>

          <div className="form-group">
            <label htmlFor="filtro-status">Status</label>
            <select id="filtro-status" className="form-control" value={filtroStatus} onChange={(e) => setFiltroStatus(e.target.value)}>
              <option value="">Todos</option>
              <option value="ATIVO">Ativo</option>
              <option value="INATIVO">Inativo</option>
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
          Mostrando {usuariosFiltrados.length} de {usuarios.length} registros
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

      <div className="table-responsive">
        <table id="tabela-usuarios">
          <thead>
            <tr>
              <th>Nome</th>
              <th>CPF</th>
              <th>E-mail</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="5" style={{textAlign: 'center'}}>Carregando...</td>
              </tr>
            ) : erro ? (
              <tr>
                <td colSpan="5" style={{textAlign: 'center', color: 'red'}}>{erro}</td>
              </tr>
            ) : usuariosFiltrados.length === 0 ? (
              <tr>
                <td colSpan="5" style={{textAlign: 'center'}}>Nenhum usuário encontrado</td>
              </tr>
            ) : (
              usuariosFiltrados.map((usuario) => (
                <tr key={usuario.id}>
                  <td>{usuario.nome}</td>
                  <td>{usuario.cpf}</td>
                  <td>{usuario.email}</td>
                  <td>{usuario.status}</td>
                  <td>                                                  {/* Quando clicado, o botão faz com que o handle editar receba o usuario e passe esse usuario para o usuario.jsx */}
                    <button className="btn btn-sm btn-primary" onClick={() => handleEditar(usuario)}>
                      <i className="fas fa-edit"></i> Editar
                    </button>
                    <button className="btn btn-sm btn-danger" onClick={() => excluirUsuario(usuario.id)}>
                      <i className="fas fa-trash"></i> Excluir
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="paginacao">
        <div className="paginacao-info">
          Mostrando {usuariosFiltrados.length} de {usuarios.length} registros
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

export default ListaUsuario;
