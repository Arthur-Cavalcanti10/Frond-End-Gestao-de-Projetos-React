import '../CSS/Projeto.css'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { use, useState } from 'react';



function Projeto() {
  const alertProjeto = () => alert("Projeto salvo com sucesso!")
  const [show, setShow] = useState(false);
  const [nomeProjeto, setNomeProjeto] = useState("")
  const [descricaoProjeto, setDescricaoProjeto] = useState("")
  const [dataCriacaoProjeto, setDataCriacaoProjeto] = useState("")
  const [dataConclusaoProjeto, setDataConclusaoProjeto] = useState("")
  const [statusProjeto, setStatusProjeto] = useState("")
  const [responsavelProjeto,setResponsavelProjeto] = useState("")
  const handleClose = () => setShow(false);

  const handleShow = () => {
    console.log("Modal abrindo...");
    setShow(true);
  }

  const projetos = {
    nome : nomeProjeto,
    descricao : descricaoProjeto,
    dataCriacao : dataCriacaoProjeto,
    dataConclusao : dataConclusaoProjeto,
    status : statusProjeto,
    responsavel : responsavelProjeto
  }

  const salvarProjeto = () => {
    console.log("Salvando projeto:", projetos);
    console.log("Valor de nomeProjeto:", nomeProjeto);
  }

  return (
    <div id="conteudo">
      <div id="conteudo-geral">
        <div className="container">
          {/* Cabeçalho da seção de projetos */}
          <div className="header">
            <h2>
              <i className="fa-solid fa-diagram-project"></i> Lista de Projetos
            </h2>
            <div className="acoes-header">
              <button type="button" className="btn-pdf" id="btn-pdf-projetos">
                <span className="material-icons">picture_as_pdf</span> Exportar PDF
              </button>
              <Button variant="primary" onClick={handleShow}>
                Novo Projeto
              </Button>

              <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Novo Projeto</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  {/* Formulário de cadastro/edição de projetos */}
                  <form className="form-container-projetos">
                    {/* Campo oculto para ID do projeto (usado em edição) */}
                    <input type="hidden" id="projetoId" />


                    {/* Campo: Nome do projeto */}
                    <label htmlFor="nomeProjeto">
                      Nome do projeto :<span className="required">*</span>
                    </label>
                    <input
                      className="form-projetos"
                      type="text"
                      value={nomeProjeto} onChange={((e) => setNomeProjeto(e.target.value))}
                      id="nomeProjeto"
                      name="nomeProjeto"
                      placeholder="Digite o nome do projeto"
                      required
                    />

                    {/* Campo: Descrição do projeto */}
                    <label htmlFor="descricaoProjeto">Descrição:</label>
                    <textarea
                      className="form-projetos"
                      id="descricaoProjeto"
                      value={descricaoProjeto} onChange={((e) => setDescricaoProjeto(e.target.value))}
                      name="descricaoprojeto"
                      placeholder="Descreva o projeto"
                    ></textarea>

                    {/* Linha com duas colunas para datas */}
                    <div className="duas-colunas">
                      <div className="coluna">
                        <label htmlFor="datacriacaoProjeto">
                          Data de criação:<span className="required">*</span>
                        </label>
                        <input
                          className="form-projetos-menor"
                          type="date"
                          value={dataCriacaoProjeto} onChange={((e) => setDataCriacaoProjeto(e.target.value))}
                          id="datacriacaoProjeto"
                          name="datacriacaoprojeto"
                          required
                        />
                      </div>
                      <div className="coluna">
                        <label htmlFor="dataconclusaoProjeto">
                          Data de conclusão:<span className="required">*</span>
                        </label>
                        <input
                          className="form-projetos-menor"
                          type="date"
                          value={dataConclusaoProjeto} onChange={((e) => setDataConclusaoProjeto(e.target.value))}
                          id="dataconclusaoProjeto"
                          name="dataconclusaoprojeto"
                          required
                        />
                      </div>
                    </div>

                    {/* Linha com duas colunas para status e responsável */}
                    <div className="duas-colunas">
                      <div className="coluna">
                        <label htmlFor="statusProjeto">
                          Status:<span className="required">*</span>
                        </label>
                        <select
                          className="form-projetos-menor"
                          id="statusProjeto"
                          value={statusProjeto} onChange={((e) => setStatusProjeto(e.target.value))}
                          name="status"
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
                        <label htmlFor="responsavelProjeto">
                          Responsável:<span className="required">*</span>
                        </label>
                        <input
                          className="form-projetos-menor"
                          id="responsavelProjeto"
                          value={responsavelProjeto} onChange={((e) => setResponsavelProjeto(e.target.value))}
                          name="projeto"
                          required
                        />
                      </div>
                    </div>
                  </form>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Fechar
                  </Button> 
                  <Button variant="primary" onClick={() => {handleClose(), alertProjeto(), salvarProjeto()} }>
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
                <label htmlFor="filtro-nome-projeto">Nome do Projeto</label>
                <input
                  type="text"
                  id="filtro-nome-projeto"
                  className="form-control"
                  placeholder="Filtrar pelo projeto"
                />
              </div>

              <div className="form-group">
                <label htmlFor="filtro-responsavel-projeto">Responsável</label>
                <input
                  type="text"
                  id="filtro-responsavel-projeto"
                  className="form-control"
                  placeholder="Responsável"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Projeto