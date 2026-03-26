import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';

function CadastroTarefa({ show, handleClose }) {
  const [responsaveis, setResponsaveis] = useState([]);
  const [projetos, setProjetos] = useState([]);
  
  const [tituloTarefa, setTituloTarefa] = useState("")
  const [prioridade, setPrioridade] = useState("")
  const [responsavelId, setResponsavelId] = useState("")
  const [descricao, setDescricao] = useState("")
  const [datacriacao, setDatacriacao] = useState("")
  const [dataconclusao, setDataconclusao] = useState("")
  const [status, setStatus] = useState("")
  const [projeto, setProjeto] = useState("")

  useEffect(() => {
    if (show) {
      buscarResponsaveis();
      buscarProjetos();
    }
  }, [show]);

  const buscarResponsaveis = () => {
    axios.get("http://localhost:8080/usuarios")
      .then((response) => setResponsaveis(response.data))
      .catch((error) => console.error("Erro ao carregar responsáveis", error));
  };

  const buscarProjetos = () => {
    axios.get("http://localhost:8080/projetos")
      .then((response) => setProjetos(response.data))
      .catch((error) => console.error("Erro ao carregar projetos", error));
  };

  const tarefa = {
    titulo: tituloTarefa,
    prioridade: prioridade,
    responsavel: { id: responsavelId },
    descricao: descricao,
    dataCriacao: datacriacao,
    dataConclusao: dataconclusao,
    status: status,
    projeto: { id: projeto }
  }

  const salvarTarefa = () => {
    axios.post("http://localhost:8080/tarefas/cadastrar", tarefa)
      .then(() => {
        alert("Tarefa salva com sucesso!");
        handleClose();
        setTituloTarefa("");
        setPrioridade("");
        setResponsavelId("");
        setDescricao("");
        setDatacriacao("");
        setDataconclusao("");
        setStatus("");
        setProjeto("");
        window.location.reload();
      })
      .catch((error) => {
        console.error("Erro ao salvar:", error);
        alert("Erro ao salvar tarefa");
      });
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Nova Tarefa</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form className="form-container">
          <input type="hidden" id="tarefaId" />

          <label htmlFor="titulo">
            Título:<span className="required">*</span>
          </label>
          <input
            className="form-tarefas"
            type="text"
            id="titulo"
            value={tituloTarefa} onChange={(e) => setTituloTarefa(e.target.value)}
            name="titulo"
            placeholder="Digite o título da tarefa"
            required
          />

          <div className="duas-colunas">
            <div className="coluna">
              <label htmlFor="prioridade">
                Prioridade:<span className="required">*</span>
              </label>
              <select
                className="form-tarefas-menor"
                id="prioridade"
                name="prioridade"
                value={prioridade} onChange={(e) => setPrioridade(e.target.value)}
                required
              >
                <option value="">Selecione</option>
                <option value="ALTA">Alta</option>
                <option value="MEDIA">Média</option>
                <option value="BAIXA">Baixa</option>
              </select>
            </div>
            <div className="coluna">
              <label htmlFor="responsavelId">
                Responsável:<span className="required">*</span>
              </label>
              <select
                className="form-tarefas-menor"
                id="responsavelId"
                name="responsavel"
                value={responsavelId} onChange={(e) => setResponsavelId(e.target.value)}
                required
              >
                <option value="">Selecione</option>
                {responsaveis.map((user) => (
                  <option key={user.id} value={user.id}>{user.nome}</option>
                ))}
              </select>
            </div>
          </div>

          <label htmlFor="descricao">Descrição:</label>
          <textarea
            className="form-tarefas"
            id="descricao"
            name="descricao"
            value={descricao} onChange={(e) => setDescricao(e.target.value)}
            placeholder="Descreva a tarefa"
          ></textarea>

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
                value={datacriacao} onChange={(e) => setDatacriacao(e.target.value)}
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
                value={dataconclusao} onChange={(e) => setDataconclusao(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="duas-colunas">
            <div className="coluna">
              <label htmlFor="status">
                Status:<span className="required">*</span>
              </label>
              <select
                className="form-tarefas-menor"
                id="status"
                name="status"
                value={status} onChange={(e) => setStatus(e.target.value)}
                required
              >
                <option value="">Selecione</option>
                <option value="PENDENTE">Pendente</option>
                <option value="FAZENDO">Fazendo</option>
                <option value="CONCLUIDA">Concluída</option>
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
                value={projeto} onChange={(e) => setProjeto(e.target.value)}
                required
              >
                <option value="">Selecione</option>
                {projetos.map((proj) => (
                  <option key={proj.id} value={proj.id}>{proj.nome}</option>
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
        <Button variant="primary" onClick={salvarTarefa}>
          Salvar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CadastroTarefa;
