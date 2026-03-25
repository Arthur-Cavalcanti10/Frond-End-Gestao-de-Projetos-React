import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import "../CSS/Usuario.css"

function Usuario() {
  const [show, setShow] = useState(false);
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [nome,setNome] = useState("")
  const [cpf,setCpf] = useState("")
  const [email,setEmail] = useState("")
  const [dataNascimento,setDataNascimento] = useState("")
  const [status,setStatus] = useState("")
  const [senha,setSenha] = useState("")
  const [filtroNome, setFiltroNome] = useState("")
  const [filtroCPF, setFiltroCpf] = useState("")
  const [filtroEmail, setFiltroEmail] = useState("")
  const [filtroStatus, setFiltroStatus] = useState("")
  
  const usuariosFiltrados = usuarios.filter(usuario => {
    const nomeMatch = filtroNome === "" || usuario.nome.toLowerCase().includes(filtroNome.toLowerCase()); //se nao tiver filtro, retorna null, se houver,retorna true e procura um nome no array que tenha esse nome e adiciona no usuarios filtrados, 
    const cpfMatch = filtroCPF === "" || usuario.cpf.includes(filtroCPF);
    const emailMatch = filtroEmail === "" || usuario.email.toLowerCase().includes(filtroEmail.toLowerCase());
    const statusMatch = filtroStatus === "" || usuario.status === filtroStatus;
    return nomeMatch && cpfMatch && emailMatch && statusMatch; //se o return for true, adiciona esse usuario nos usuarios filtrados
  });
  
  const limparFiltro = () => {
    setFiltroNome("");
    setFiltroCpf("");
    setFiltroEmail("");
    setFiltroStatus("");
  };
  
  const novoUsuario = {
    nome:nome,
    cpf:cpf,
    email:email,
    dataNascimento:dataNascimento,
    status:status,  
    senha:senha
  }

  useEffect(() => {
    buscarUsuarios();
  }, []);

  const buscarUsuarios = () => {
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
  };

  const salvarUsuario = () => {
    axios.post("http://localhost:8080/usuarios/cadastrar", novoUsuario)
      .then((response) => {
        handleClose();
        setUsuarios([...usuarios, response.data]);
        setNome("");
        setCpf("");
        setEmail("");
        setSenha("");
        setDataNascimento("");
        setStatus("");
      })
      .catch((error) => {
        console.error("Erro ao salvar:", error);
        alert("Erro ao salvar usuário");
      });
  };

  return (
    <>
      <div id="conteudo">
        <div id="conteudo-geral">
          <div className="container">
            {/* Cabeçalho da seção de usuários */}
            <div className="header">
              <h2>
                <i className="fas fa-users"></i> Lista de Usuários
              </h2>
              <div className="acoes-header">
                {/* Botão para exportar PDF */}
                <button type="button" className="btn-pdf" id="btn-pdf-usuario">
                  <span className="material-icons">picture_as_pdf</span> Exportar PDF
                </button>
                {/* Botão para novo usuário */}
                <Button variant="primary" onClick={handleShow}>
                  Novo Usuário
                </Button>

                <Modal show={show} onHide={handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>Novo Usuário</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <form className="form-container-usuario">
                      {/* Campo oculto para ID do usuário (usado em edição) */}
                      <input type="hidden" id="usuarioId" />

                      {/* Campo: Nome do usuário */}
                      <label htmlFor="Nome">
                        Nome:<span className="required">*</span>
                      </label>
                      {/* recebemos o evento "e", que, ao ser disparado, recebe o valor do campo que o disparou (target.value) */}
                      <input
                        className="form-tarefas"
                        type="text"
                        value={nome} onChange={((e) => setNome(e.target.value))}
                        id="nomeUsuarioCadastro"
                        name="nomeusuario"
                        placeholder="Digite o nome"
                        required
                      />

                      {/* Campo: CPF com formatação automática */}
                      <label htmlFor="cpf">
                        CPF:<span className="required">*</span>
                      </label>
                      <input
                        className="form-tarefas"
                        id="cpf"
                        value={cpf} onChange={((e) => setCpf(e.target.value))}
                        name="cpf"
                        maxLength="14"
                        placeholder="000.000.000-00"
                      />

                      {/* Campo: E-mail */}
                      <label htmlFor="email">
                        E-mail:<span className="required">*</span>
                      </label>
                      <input
                        className="form-tarefas"
                        type="email"
                        value={email} onChange={((e) => setEmail(e.target.value))}
                        id="email"
                        name="email"
                        placeholder="email@email.com"
                        required
                      />

                      {/* Campo: Senha */}
                      <label htmlFor="senha">
                        Senha:<span className="required">*</span>
                      </label>
                      <input
                        className="form-tarefas"
                        type="password"
                        value={senha} onChange={((e) => setSenha(e.target.value))}
                        id="senha"
                        name="senha"
                        placeholder="Digite a senha"
                        required
                      />

                      {/* Campo: Data de nascimento */}
                      <label htmlFor="datanascimento">
                        Data de Nascimento:<span className="required">*</span>
                      </label>
                      <input
                        className="form-tarefas"
                        type="date"
                        value={dataNascimento} onChange={((e)=>setDataNascimento(e.target.value))}
                        id="datanascimento"
                        name="datanascimento"
                        required
                      />

                      {/* Campo: Status do usuário */}
                      <label htmlFor="statusUsuario">
                        Status:<span className="required">*</span>
                      </label>
                      <select
                        className="form-tarefas"
                        id="statusUsuario"
                        name="statusUsuario"
                        value={status} onChange={((e)=>setStatus(e.target.value))}
                        required
                      >
                        <option value="">Selecione o status</option>
                        <option value="ATIVO">Ativo</option>
                        <option value="INATIVO">Inativo</option>
                      </select>
                    </form>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                      Fechar
                    </Button>
                    <Button variant="primary" onClick={() => { salvarUsuario(); handleClose(); }}>
                      Salvar
                    </Button>
                  </Modal.Footer>
                </Modal>
              </div>
            </div>

            {/* Seção de filtros */}
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

            {/* Controles de paginação (superior) */}
            <div className="paginacao">
              <div className="paginacao-info">
                Mostrando <span id="registros-exibidos">0</span> de{" "}
                <span id="registros-totais">0</span> registros
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

            {/* Tabela de usuários */}
            <div className="table-responsive">
                <>
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
                    <tbody id="tabela-corpo">
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
                              <td>-</td>
                            </tr>
                          ))
                        )}
                    </tbody>
                  </table>
                </>
              
            </div>

            {/* Controles de paginação (inferior) */}
            <div className="paginacao">
              <div className="paginacao-info">
                Mostrando <span id="registros-exibidos">0</span> de{" "}
                <span id="registros-totais">0</span> registros
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
          </div>
        </div>
      </div>
    </>
  );
}

export default Usuario