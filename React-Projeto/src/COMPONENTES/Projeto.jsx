import '../CSS/Projeto.css'
import Button from 'react-bootstrap/Button';
import ListaProjeto from './ListaProjeto';
import CadastroProjeto from './CadastroProjeto';
import { useState } from 'react';

function Projeto() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div id="conteudo">
      <div id="conteudo-geral">
        <div className="container">
          <div className="header" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%'}}>
            <h2 style={{margin: 0}}>
              <i className="fa-solid fa-diagram-project"></i> Lista de Projetos
            </h2>
            <div className="acoes-header" style={{display: 'flex', gap: '10px'}}>
              <button type="button" className="btn-pdf" id="btn-pdf-projetos">
                <span className="material-icons">picture_as_pdf</span> Exportar PDF
              </button>
              <Button variant="primary" onClick={handleShow}>
                Novo Projeto
              </Button>
            </div>
          </div>

          <CadastroProjeto show={show} handleClose={handleClose} />

          <ListaProjeto />
        </div>
      </div>
    </div>
  );
}

export default Projeto
