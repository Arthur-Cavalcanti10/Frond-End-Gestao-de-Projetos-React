import '../CSS/Projeto.css'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState, useEffect } from 'react';
import axios from 'axios';



function Projeto() {
  const [show, setShow] = useState(false);
  const [nomeProjeto, setNomeProjeto] = useState("")
  const [descricaoProjeto, setDescricaoProjeto] = useState("")
  const [dataInicioProjeto, setDataInicioProjeto] = useState("")
  const [dataConclusaoProjeto, setDataConclusaoProjeto] = useState("")
  const [statusProjeto, setStatusProjeto] = useState("")
  const [responsavelId, setResponsavelId] = useState("")
  const [responsaveis, setResponsaveis] = useState([])
  const [projetos,setProjetos] = useState([])
  const [loading,setLoading] = useState(true)
  const [erro,setErro]=useState(null)
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
  }

  useEffect(() => {
    buscarProjetos();
    buscarResponsaveis();
  }, []);

  const buscarProjetos = () => {
    setLoading(true);
    axios.get("http://localhost:8080/projetos").then((response) =>{
      setProjetos(response.data);
      setLoading(false);
    }).catch((error) => {
      console.error("erro ao carregar projetos", error);
      setErro("erro ao carregar projetos");
      setLoading(false);
    });
  };

  const buscarResponsaveis = () => {  //aqui nos vamos buscar os usuarios para colocarmos no responsavel
    axios.get("http://localhost:8080/usuarios")
      .then((response) => setResponsaveis(response.data))
      .catch((error) => console.error("erro ao carregar responsáveis", error));
  };

  const novoProjeto = {
    nome : nomeProjeto,
    descricao : descricaoProjeto,
    dataInicio : dataInicioProjeto,
    dataConclusao : dataConclusaoProjeto,
    status : statusProjeto,
    responsavel : { id: responsavelId } //pega o id do responsavel
  }

  const salvarProjeto = () => {
    axios.post("http://localhost:8080/projetos/cadastrar", novoProjeto)
      .then((response) => {
        alert("Projeto salvo com sucesso!");
        handleClose();
        setProjetos([...projetos, response.data]);
        setNomeProjeto("");
        setDescricaoProjeto("");
        setDataInicioProjeto("");
        setDataConclusaoProjeto("");
        setStatusProjeto("");
        setResponsavelId("");
      })
      .catch((error) => {
        console.error("Erro ao salvar:", error);
        alert("Erro ao salvar projeto");
      });
  };

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
                        <label htmlFor="dataInicioProjeto">
                          Data de início:<span className="required">*</span>
                        </label>
                        <input
                          className="form-projetos-menor"
                          type="date"
                          value={dataInicioProjeto} onChange={((e) => setDataInicioProjeto(e.target.value))}
                          id="dataInicioProjeto"
                          name="dataInicio"
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
                          <option value="CANCELADO">cancelado</option>
                          <option value="ATIVO">ativo</option>
                          <option value="CONCLUITO">concluído</option>

                        </select>
                      </div>
                      <div className="coluna">
                        <label htmlFor="responsavelId">
                          Responsável:<span className="required">*</span>
                        </label>
                        <select
                          className="form-projetos-menor"
                          id="responsavelId"
                          value={responsavelId} onChange={((e) => setResponsavelId(e.target.value))}
                          name="responsavel"
                          required
                        >
                          <option value="">Selecione</option>
                          {responsaveis.map((user) => ( //pega os usuarios do array reponsaveis
                            <option key={user.id} value={user.id}>{user.nome}</option>//coloca-os como opção
                          ))}
                        </select>
                      </div>
                    </div>
                  </form>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Fechar
                  </Button> 
                  <Button variant="primary" onClick={salvarProjeto}>
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
              <input type="text" id="filtro-nome-projeto" className="form-control" placeholder="Filtrar pelo projeto" />
            </div>

            <div className="form-group">
              <label htmlFor="filtro-responsavel">Responsável</label>
              <input type="text" id="filtro-responsavel-projeto" className="form-control" placeholder="Responsável" />
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

          {/* Controles de paginação (superior) */}
          <div className="paginacao">
            <div className="paginacao-info">
              Mostrando <span id="registros-exibidos">0</span> de <span id="registros-totais">0</span> registros
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
        
        {/* Container principal dos projetos */}
        <div id="projetos-container" className="projetos-container">
          {/* os projetos serão inseridas aqui via JavaScript */}
          <div id="sem-registros" className="sem-registros" style={{display: "none"}}>
            Nenhuma tarefa encontrada.
          </div>
        </div>

        {/* Controles de paginação (inferior) */}
        <div className="paginacao">
          <div className="paginacao-info">
            Mostrando <span id="registros-exibidos">{projetos.length}</span> de <span id="registros-totais">{projetos.length}</span> registros
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
        {
          projetos.map((projeto) =>(
            <tr key={projeto.id}>
             <td>{projeto.nome}</td>
             <td>{projeto.descricao}</td>
             <td>{projeto.status}</td>
            </tr>
          ) )
        }
      </div>
    </div>
    </div>
  );
}

export default Projeto