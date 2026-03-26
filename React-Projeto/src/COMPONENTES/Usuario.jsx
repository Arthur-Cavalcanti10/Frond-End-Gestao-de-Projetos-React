import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import ListaUsuario from './ListaUsuario';
import CadastroUsuario from './CadastroUsuario';
import "../CSS/Usuario.css"

function Usuario() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div id="conteudo">
      <div id="conteudo-geral">
        <div className="container">
          <div className="header" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%'}}>
            <h2 style={{margin: 0}}>
              <i className="fas fa-users"></i> Lista de Usuários
            </h2>
            <div className="acoes-header" style={{display: 'flex', gap: '10px'}}>
              <button type="button" className="btn-pdf" id="btn-pdf-usuario">
                <span className="material-icons">picture_as_pdf</span> Exportar PDF
              </button>
              <Button variant="primary" onClick={handleShow}>
                Novo Usuário
              </Button>
            </div>
          </div>

          <CadastroUsuario show={show} handleClose={handleClose} />

          <ListaUsuario />
        </div>
      </div>
    </div>
  );
}

export default Usuario
