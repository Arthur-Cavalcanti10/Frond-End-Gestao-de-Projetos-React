import '../CSS/Tarefa.css'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { use, useState } from 'react';

function Tarefa() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [tituloTarefa,setTituloTarefa] = useState("")
  const [prioridade, setPrioridade] = useState("")
  const [responsavel, setResponsavel] = useState("")
  const [descricao, setDescricao] = useState("")
  const [datacriacao, setDatacriacao] = useState("")
  const [dataconclusao, setDataconclusao] = useState("")
  const [status, setStatus] = useState("")
  const [projeto, setProjeto] = useState("")

  const tarefa = {
    titulo: tituloTarefa,
    prioridade: prioridade,
    responsavel: responsavel,
    descricao: descricao,
    datacriacao: datacriacao,
    dataconclusao: dataconclusao,
    status: status,
    projeto: projeto
  }
  const alertTarefa = () => alert("Tarefa salva com sucesso!")
  const salvarTarefa = () => console.log(tarefa)

    return (
    <div id="conteudo">
      <div id="conteudo-geral">
        <div className="container">
          {/* Cabeçalho da seção de tarefas */}
          <div className="header">
            <h2>
              <i className="fa-solid fa-list-check"></i> Lista de Tarefas
            </h2>
            <div className="acoes-header">
              {/* Botão para exportar PDF */}
              <button type="button" className="btn-pdf" id="btn-pdf-tarefas">
                <span className="material-icons">picture_as_pdf</span> Exportar PDF
              </button>
              <>
                <Button variant="primary" onClick={handleShow}>
                  Nova Tarefa
                </Button>

                <Modal show={show} onHide={handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>Nova Tarefa</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <form className="form-container">
                      {/* Campo oculto para ID da tarefa (usado em edição) */}
                      <input type="hidden" id="tarefaId" />

                      {/* Campo: Título da tarefa */}
                      <label htmlFor="titulo">
                        Título:<span className="required">*</span>
                      </label>
                      <input
                        className="form-tarefas"
                        type="text"
                        id="titulo"
                        value={tituloTarefa} onChange={((e) => setTituloTarefa(e.target.value))}
                        name="titulo"
                        placeholder="Digite o título da tarefa"
                        required
                      />

                      {/* Linha com duas colunas para prioridade e responsável */}
                      <div className="duas-colunas">
                        <div className="coluna">
                          <label htmlFor="prioridade">
                            Prioridade:<span className="required">*</span>
                          </label>
                          <select
                            className="form-tarefas-menor"
                            id="prioridade"
                            name="prioridade"
                            value={prioridade} onChange={((e) => setPrioridade(e.target.value))}
                            required
                          >
                            <option value="">Selecione</option>
                            <option value="alta">Alta</option>
                            <option value="media">Média</option>
                            <option value="baixa">Baixa</option>
                          </select>
                        </div>
                        <div className="coluna">
                          <label htmlFor="responsavel">
                            Responsável:<span className="required">*</span>
                          </label>
                          <input
                            type="text"
                            className="form-tarefas-menor"
                            id="responsavel"
                            name="responsavel"
                            value={responsavel} onChange={((e) => setResponsavel(e.target.value))}
                            required
                          />
                        </div>
                      </div>

                      {/* Campo: Descrição da tarefa */}
                      <label htmlFor="descricao">Descrição:</label>
                      <textarea
                        className="form-tarefas"
                        id="descricao"
                        name="descricao"
                        value={descricao} onChange={((e) => setDescricao(e.target.value))}
                        placeholder="Descreva a tarefa"
                      ></textarea>

                      {/* Linha com duas colunas para datas */}
                      <div className="duas-colunas">
                        <div className="coluna">
                          <label htmlFor="datacriacao">
                            Data de criação:<span className="required">*</span>
                          </label>
                          <input
                            className="form-tarefas-menor"
                            type="date"
                            id="datacriacao"
                            name="datacriacao"
                            value={datacriacao} onChange={((e) => setDatacriacao(e.target.value))}
                            required
                          />
                        </div>
                        <div className="coluna">
                          <label htmlFor="dataconclusao">
                            Data de conclusão:<span className="required">*</span>
                          </label>
                          <input
                            className="form-tarefas-menor"
                            type="date"
                            id="dataconclusao"
                            name="dataconclusao"
                            value={dataconclusao} onChange={((e) => setDataconclusao(e.target.value))}
                            required
                          />
                        </div>
                      </div>

                      {/* Linha com duas colunas para status e projeto */}
                      <div className="duas-colunas">
                        <div className="coluna">
                          <label htmlFor="status">
                            Status:<span className="required">*</span>
                          </label>
                          <select
                            className="form-tarefas-menor"
                            id="status"
                            name="status"
                            value={status} onChange={((e) => setStatus(e.target.value))}
                            required
                          >
                            <option value="">Selecione</option>
                            <option value="pendente">Pendente</option>
                            <option value="andamento">Em andamento</option>
                            <option value="concluido">Concluído</option>
                            <option value="entregue">Entregue</option>
                          </select>
                        </div>
                        <div className="coluna">
                          <label htmlFor="projeto">
                            Projeto:<span className="required">*</span>
                          </label>
                          <select
                            className="form-tarefas-menor"
                            id="projeto"
                            name="projeto"
                            value={projeto} onChange={((e) => setProjeto(e.target.value))}
                            required
                          >
                            <option value="">Selecione</option>
                            <option value="site">Website</option>
                            <option value="app">Aplicativo</option>
                            <option value="sistema">Sistema Interno</option>
                            <option value="outro">Outro</option>
                          </select>
                        </div>
                      </div>

                      {/* Checkbox para lembrete */}
                      <div className="lembrete-container">
                        <input type="checkbox" id="lembrete" name="lembrete" value="sim" />
                        <label htmlFor="lembrete">Definir Lembrete</label>
                      </div>

                    </form>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                      Close
                    </Button>
                    <Button variant="primary" onClick={() => {handleClose(); alertTarefa(); salvarTarefa()}}>
                      Save Changes
                    </Button>
                  </Modal.Footer>
                </Modal>
              </>

            </div>
          </div>

          {/* Seção de filtros */}
          <div className="filtros">
            <div className="filtros-grid">
              {/* Filtro por status */}
              <div className="form-group">
                <label htmlFor="filtro-status">Status</label>
                <select id="filtro-status" className="form-control">
                  <option value="">Todos</option>
                  <option value="pendente">Pendente</option>
                  <option value="andamento">Em andamento</option>
                  <option value="concluido">Concluído</option>
                  <option value="entregue">Entregue</option>
                </select>
              </div>

              {/* Filtro por prioridade */}
              <div className="form-group">
                <label htmlFor="filtro-prioridade">Prioridade</label>
                <select id="filtro-prioridade" className="form-control">
                  <option value="">Todas</option>
                  <option value="alta">Alta</option>
                  <option value="media">Média</option>
                  <option value="baixa">Baixa</option>
                </select>
              </div>

              {/* Filtro por projeto */}
              <div className="form-group">
                <label htmlFor="filtro-projeto">Projeto</label>
                <select id="filtro-projeto" className="form-control">
                  <option value="">Todos</option>
                  <option value="site">Website</option>
                  <option value="app">Aplicativo</option>
                  <option value="sistema">Sistema Interno</option>
                  <option value="outro">Outro</option>
                </select>
              </div>

              {/* Botões de ação dos filtros */}
              <div className="btn-filtrar">
                <button id="btn-limpar" className="btn">
                  <i className="fas fa-broom"></i> Limpar
                </button>
                <button id="btn-filtrar" className="btn btn-primary">
                  <i className="fas fa-filter"></i> Filtrar
                </button>
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
          </div>

          {/* Container principal das tarefas */}
          <div id="tarefas-container" className="tarefas-container"></div>

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
  )
}

export default Tarefa