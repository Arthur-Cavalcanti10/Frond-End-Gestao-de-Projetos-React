import { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import axios from 'axios'
                                         {/* recebe o usuario do usuario.jsx(recebido da listaUsuario) */}
function CadastroUsuario({ show, handleClose, usuarioParaEditar, handleSalvar }) {
  const [nome, setNome] = useState("")
  const [cpf, setCpf] = useState("")
  const [email, setEmail] = useState("")
  const [dataNascimento, setDataNascimento] = useState("")
  const [status, setStatus] = useState("")
  const [senha, setSenha] = useState("")

  useEffect(() => {
    if (show) { {/* se o show for true */}
      if (usuarioParaEditar) {{/* se o usuarioParaEditar nao for null(o botao editar tiver sido apertado) */}
        setNome(usuarioParaEditar.nome || "")
        setCpf(usuarioParaEditar.cpf || "")
        setEmail(usuarioParaEditar.email || "")  // o modal tera esses campos pre-preenchidos
        setDataNascimento(usuarioParaEditar.dataNascimento || "")
        setStatus(usuarioParaEditar.status || "")
        setSenha("")
      } else {
        setNome("")
        setCpf("")
        setEmail("")
        setDataNascimento("")
        setStatus("")
        setSenha("")
      }
    }
  }, [show, usuarioParaEditar])

  const isEdicao = usuarioParaEditar !== null  //se usuarioParaEditar nao for null, entao é uma edição

  const salvarUsuario = () => {
    if (!nome || !cpf || !email || !dataNascimento || !status || !senha) {
      alert("Preencha todos os campos obrigatórios!");
      return;
    }

    // Validação de senha: 1 maiúscula + 1 caractere especial
    const temMaiuscula = /[A-Z]/.test(senha);
    const temEspecial = /[!@#$%^&*(),.?":{}|<>]/.test(senha);
    
    if (!isEdicao && (!temMaiuscula || !temEspecial)) { //validação da senha
      alert("A senha deve conter pelo menos 1 letra maiúscula e 1 caractere especial!");
      return;
    }
     
    //aqui temos os dados que serão alterados conforme o formulario for alterado
    const novoUsuario = {
      nome: nome,
      cpf: cpf,
      email: email, 
      dataNascimento: dataNascimento,
      status: status,
      senha: senha
    }

    if (isEdicao) {  //se for uma edição, sera um put
      axios.put(`http://localhost:8080/usuarios/${usuarioParaEditar.id}`, novoUsuario)
        .then(() => {
          alert("Usuário atualizado com sucesso!")
          handleClose()
          handleSalvar()
        })
        .catch((error) => {
          console.error("Erro ao atualizar:", error)
          alert("Erro ao atualizar usuário")
        })
    } else {  // se nao for, sera um post
      axios.post("http://localhost:8080/usuarios/cadastrar", novoUsuario)
        .then(() => {
          alert("Usuário salvo com sucesso!")
          handleClose()
          handleSalvar()
        })
        .catch((error) => {
          console.error("Erro ao salvar:", error)
          alert("Erro ao salvar usuário")
        })
    }
  }

  const tituloModal = isEdicao ? "Editar Usuário" : "Novo Usuário"

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{tituloModal}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form className="form-container-usuario">
          <label htmlFor="Nome">
            Nome:<span className="required">*</span>
          </label>
          <input
            className="form-tarefas"
            type="text"
            value={nome} onChange={(e) => setNome(e.target.value)}
            id="nomeUsuarioCadastro"
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
            placeholder="email@email.com"
            required
          />

          <label htmlFor="senha">
            Senha: (A senha deve conter 1 letra maiuscula e 1 caracter especial)<span className="required">*</span>
          </label>
          <input
            className="form-tarefas"
            type="password"
            value={senha} onChange={(e) => setSenha(e.target.value)}
            id="senha"
            placeholder={isEdicao ? "Digite para alterar" : "Digite a senha"}
            required={!isEdicao}
          />

          <label htmlFor="datanascimento">
            Data de Nascimento:<span className="required">*</span>
          </label>
          <input
            className="form-tarefas"
            type="date"
            value={dataNascimento} onChange={(e)=>setDataNascimento(e.target.value)}
            id="datanascimento"
            required
          />

          <label htmlFor="statusUsuario">
            Status:<span className="required">*</span>
          </label>
          <select
            className="form-tarefas"
            id="statusUsuario"
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
          {isEdicao ? "Atualizar" : "Salvar"}
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default CadastroUsuario
