import '../CSS/Dashboard.css';
import logo_2 from '../IMG/logo_2.png';
import {Route,Routes,Link} from "react-router-dom"
import Usuario from './Usuario';
import Projeto from './Projeto';
import Tarefa from './Tarefa';
import Home from './Home';
import Dropdown from 'react-bootstrap/Dropdown';

function Dashboard() {
  return (
    <div>
      <header id="top-bar">
        <div className="logo-2">
          <img src={logo_2} alt="logo" />
        </div>
        <nav className="menu-horizontal">
          <ul>
            <li>
              <Link className="active" to="/">
                <span class="material-icons">dashboard</span> Dashboard
              </Link>
            </li>
            <li>
              <Link to="/tarefa">
                <span class="material-icons">list_alt</span> Tarefas
              </Link>
            </li>
            <li>
              <Link to="/projeto">
                <span class="material-icons">share</span>Projetos
              </Link>
            </li>
            <li>
              <Link to="/usuario">
               <span class="material-icons">group</span>  Usuários
              </Link>
            </li>
          </ul>
        </nav>
         <Dropdown className='dropdown d-flex align-items-center'>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        Dropdown Button
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
      </header>

      <Routes>
        <Route path = "/" element = {<Home/>}/>
        <Route path = "/usuario" element = {<Usuario/>}/>
        <Route path = "/tarefa" element = {<Tarefa/>}/>
        <Route path = "/projeto" element = {<Projeto/>}/>
      </Routes>
    </div>
  );
}

export default Dashboard;