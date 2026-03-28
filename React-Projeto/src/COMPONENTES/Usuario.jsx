import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import ListaUsuario from './ListaUsuario';
import CadastroUsuario from './CadastroUsuario';
import "../CSS/Usuario.css"

function Usuario() {
  const [show, setShow] = useState(false);
  const [usuarioParaEditar, setUsuarioParaEditar] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleClose = () => {
    setShow(false);
    setUsuarioParaEditar(null);
  };

  const handleShow = () => {
    setUsuarioParaEditar(null);
    setShow(true);
  };
  {/*aqui o handle editar recebe o usuario la da lista de usuario e o seta em setUsuarioParaEditar, e passa esse set para o cadastro usuario*/}
  const handleEditar = (usuario) => {
    setUsuarioParaEditar(usuario);
    setShow(true);
  };

  const handleSalvar = () => {
    setRefreshKey(prev => prev + 1);
  };

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

          <CadastroUsuario 
            show={show} 
            handleClose={handleClose} 
            usuarioParaEditar={usuarioParaEditar}
            handleSalvar={handleSalvar}
          />

          <ListaUsuario 
            key={refreshKey}
            handleEditar={handleEditar} 
            handleRefresh={refreshKey}
          />
        </div>
      </div>
    </div>
  );
}

export default Usuario
