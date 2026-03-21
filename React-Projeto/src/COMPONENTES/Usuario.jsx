import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import "../CSS/Usuario.css"

function Usuario() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const alertUsuario = () => alert("Usuário salvo com sucesso!")
  const [name,setName] = useState("")
  const [cpf,setCpf] = useState("")
  const [email,setEmail] = useState("")
  const [dataNascimento,setDataNascimento] = useState("")
  const [status,setStatus] = useState("")
  
  const usuarios = {
    name:name,
    id:Date.now(),
    cpf:cpf,
    email:email,
    dataNacimento:dataNascimento,
    status:status
  }

const salvarUsuario = () => console.log(usuarios)

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
                        value={name} onChange={((e) => setName(e.target.value))}
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
                        <option value="ativo">Ativo</option>
                        <option value="inativo">Inativo</option>
                        <option value="pendente">Pendente</option>
                      </select>
                    </form>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                      Fechar
                    </Button>
                    <Button variant="primary" onClick={() => { salvarUsuario(); handleClose();alertUsuario() }}>
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
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="filtro-cpf">CPF</label>
                  <input
                    type="text"
                    id="filtro-cpf"
                    className="form-control"
                    placeholder="Filtrar por CPF"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="filtro-email">E-mail</label>
                  <input
                    type="text"
                    id="filtro-email"
                    className="form-control"
                    placeholder="Filtrar por e-mail"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="filtro-status">Status</label>
                  <select id="filtro-status" className="form-control">
                    <option value="">Todos</option>
                    <option value="ativo">Ativo</option>
                    <option value="inativo">Inativo</option>
                  </select>
                </div>

                <div className="btn-filtrar">
                  <button id="btn-limpar" className="btn">
                    <i className="fas fa-broom"></i> Limpar
                  </button>
                  <button id="btn-filtrar" className="btn btn-primary">
                    <i className="fas fa-filter"></i> Filtrar
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
              <table id="tabela-usuarios">
                <thead>
                  <tr>
                    <th>Nome</th>
                    <th>CPF</th>
                    <th>E-mail</th>
                    <th>Idade</th>
                    <th>Status</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody id="tabela-corpo"></tbody>
              </table>

              <div
                id="sem-registros"
                className="sem-registros"
                style={{ display: "block" }}
              >
                Nenhum usuário encontrado.
              </div>
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