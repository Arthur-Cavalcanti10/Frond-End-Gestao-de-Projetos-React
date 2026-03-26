import '../CSS/Tarefa.css'
import Button from 'react-bootstrap/Button';
import ListaTarefa from './ListaTarefa';
import CadastroTarefa from './CadastroTarefa';
import { useState } from 'react';

function Tarefa() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div id="conteudo">
      <div id="conteudo-geral">
        <div className="container">
          <div className="header" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%'}}>
            <h2 style={{margin: 0}}>
              <i className="fa-solid fa-list-check"></i> Lista de Tarefas
            </h2>
            <div className="acoes-header" style={{display: 'flex', gap: '10px'}}>
              <button type="button" className="btn-pdf" id="btn-pdf-tarefas">
                <span className="material-icons">picture_as_pdf</span> Exportar PDF
              </button>
              <Button variant="primary" onClick={handleShow}>
                Nova Tarefa
              </Button>
            </div>
          </div>

          <CadastroTarefa show={show} handleClose={handleClose} />

          <ListaTarefa />
        </div>
      </div>
    </div>
  )
}

export default Tarefa
