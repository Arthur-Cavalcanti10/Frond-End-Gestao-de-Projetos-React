import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';

function CadastroUsuario({ show, handleClose }) {
  const [nome, setNome] = useState("")
  const [cpf, setCpf] = useState("")
  const [email, setEmail] = useState("")
  const [dataNascimento, setDataNascimento] = useState("")
  const [status, setStatus] = useState("")
  const [senha, setSenha] = useState("")

  const novoUsuario = {
    nome: nome,
    cpf: cpf,
    email: email,
    dataNascimento: dataNascimento,
    status: status,
    senha: senha
  }

  const salvarUsuario = () => {
    axios.post("http://localhost:8080/usuarios/cadastrar", novoUsuario)
      .then(() => {
        alert("Usuário salvo com sucesso!");
        handleClose();
        setNome("");
        setCpf("");
        setEmail("");
        setSenha("");
        setDataNascimento("");
        setStatus("");
        window.location.reload();
      })
      .catch((error) => {
        console.error("Erro ao salvar:", error);
        alert("Erro ao salvar usuário");
      });
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Novo Usuário</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form className="form-container-usuario">
          <input type="hidden" id="usuarioId" />

          <label htmlFor="Nome">
            Nome:<span className="required">*</span>
          </label>
          <input
            className="form-tarefas"
            type="text"
            value={nome} onChange={(e) => setNome(e.target.value)}
            id="nomeUsuarioCadastro"
            name="nomeusuario"
            placeholder="Digite o nome"
            required
          />

          <label htmlFor="cpf">
            CPF:<span className="required">*</span>
          </label>
          <input
            className="form-tarefas"
            id="cpf"
            value={cpf} onChange={(e) => setCpf(e.target.value)}
            name="cpf"
            maxLength="14"
            placeholder="000.000.000-00"
          />

          <label htmlFor="email">
            E-mail:<span className="required">*</span>
          </label>
          <input
            className="form-tarefas"
            type="email"
            value={email} onChange={(e) => setEmail(e.target.value)}
            id="email"
            name="email"
            placeholder="email@email.com"
            required
          />

          <label htmlFor="senha">
            Senha:<span className="required">*</span>
          </label>
          <input
            className="form-tarefas"
            type="password"
            value={senha} onChange={(e) => setSenha(e.target.value)}
            id="senha"
            name="senha"
            placeholder="Digite a senha"
            required
          />

          <label htmlFor="datanascimento">
            Data de Nascimento:<span className="required">*</span>
          </label>
          <input
            className="form-tarefas"
            type="date"
            value={dataNascimento} onChange={(e)=>setDataNascimento(e.target.value)}
            id="datanascimento"
            name="datanascimento"
            required
          />

          <label htmlFor="statusUsuario">
            Status:<span className="required">*</span>
          </label>
          <select
            className="form-tarefas"
            id="statusUsuario"
            name="statusUsuario"
            value={status} onChange={(e)=>setStatus(e.target.value)}
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
        <Button variant="primary" onClick={salvarUsuario}>
          Salvar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CadastroUsuario;
