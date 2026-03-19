import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./COMPONENTES/Home"
import Usuario from "./COMPONENTES/Usuario"

function ListaUsuario(){
  
  return <BrowserRouter>
           <h1>Meu Sistema</h1>
          <Routes>
            <Route path = "/" element={<Home />}/>
            <Route path = "/usuario/:id" element={<Usuario/>}/>
          </Routes>
         </BrowserRouter>
}

export default ListaUsuario