import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';

function CadastroProjeto({ show, handleClose }) {
  const [responsaveis, setResponsaveis] = useState([]);
  
  const [nomeProjeto, setNomeProjeto] = useState("")
  const [descricaoProjeto, setDescricaoProjeto] = useState("")
  const [dataInicioProjeto, setDataInicioProjeto] = useState("")
  const [dataConclusaoProjeto, setDataConclusaoProjeto] = useState("")
  const [statusProjeto, setStatusProjeto] = useState("")
  const [responsavelId, setResponsavelId] = useState("")

  useEffect(() => {
    if (show) {
      buscarResponsaveis();
    }
  }, [show]);

  const buscarResponsaveis = () => {
    axios.get("http://localhost:8080/usuarios")
      .then((response) => setResponsaveis(response.data))
      .catch((error) => console.error("Erro ao carregar responsáveis", error));
  };

  const novoProjeto = {
    nome: nomeProjeto,
    descricao: descricaoProjeto,
    dataInicio: dataInicioProjeto,
    dataConclusao: dataConclusaoProjeto,
    status: statusProjeto,
    responsavel: { id: responsavelId }
  }

  const salvarProjeto = () => {
    axios.post("http://localhost:8080/projetos/cadastrar", novoProjeto)
      .then(() => {
        alert("Projeto salvo com sucesso!");
        handleClose();
        setNomeProjeto("");
        setDescricaoProjeto("");
        setDataInicioProjeto("");
        setDataConclusaoProjeto("");
        setStatusProjeto("");
        setResponsavelId("");
        window.location.reload();
      })
      .catch((error) => {
        console.error("Erro ao salvar:", error);
        alert("Erro ao salvar projeto");
      });
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Novo Projeto</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form className="form-container-projetos">
          <input type="hidden" id="projetoId" />

          <label htmlFor="nomeProjeto">
            Nome do projeto:<span className="required">*</span>
          </label>
          <input
            className="form-projetos"
            type="text"
            value={nomeProjeto} onChange={(e) => setNomeProjeto(e.target.value)}
            id="nomeProjeto"
            name="nomeProjeto"
            placeholder="Digite o nome do projeto"
            required
          />

          <label htmlFor="descricaoProjeto">Descrição:</label>
          <textarea
            className="form-projetos"
            id="descricaoProjeto"
            value={descricaoProjeto} onChange={(e) => setDescricaoProjeto(e.target.value)}
            name="descricaoprojeto"
            placeholder="Descreva o projeto"
          ></textarea>

          <div className="duas-colunas">
            <div className="coluna">
              <label htmlFor="dataInicioProjeto">
                Data de início:<span className="required">*</span>
              </label>
              <input
                className="form-projetos-menor"
                type="date"
                value={dataInicioProjeto} onChange={(e) => setDataInicioProjeto(e.target.value)}
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
                value={dataConclusaoProjeto} onChange={(e) => setDataConclusaoProjeto(e.target.value)}
                id="dataconclusaoProjeto"
                name="dataconclusaoprojeto"
                required
              />
            </div>
          </div>

          <div className="duas-colunas">
            <div className="coluna">
              <label htmlFor="statusProjeto">
                Status:<span className="required">*</span>
              </label>
              <select
                className="form-projetos-menor"
                id="statusProjeto"
                value={statusProjeto} onChange={(e) => setStatusProjeto(e.target.value)}
                name="status"
                required
              >
                <option value="">Selecione</option>
                <option value="ATIVO">Ativo</option>
                <option value="CONCLUIDO">Concluído</option>
                <option value="CANCELADO">Cancelado</option>
              </select>
            </div>
            <div className="coluna">
              <label htmlFor="responsavelId">
                Responsável:<span className="required">*</span>
              </label>
              <select
                className="form-projetos-menor"
                id="responsavelId"
                value={responsavelId} onChange={(e) => setResponsavelId(e.target.value)}
                name="responsavel"
                required
              >
                <option value="">Selecione</option>
                {responsaveis.map((user) => (
                  <option key={user.id} value={user.id}>{user.nome}</option>
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
  );
}

export default CadastroProjeto;
