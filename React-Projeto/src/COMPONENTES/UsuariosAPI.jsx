import { useState, useEffect } from "react";
import axios from "axios"

function UsuariosApi() {
  const [usuarios, setUsuarios] = useState([]);
  const [erro, setErro] = useState(null);
  const [load, setLoad] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:8080/usuarios")
      .then((response) => {
        setUsuarios(response.data);
        setLoad(false);
      })
      .catch(() => {
        setErro("Erro ao buscar dados");
        setLoad(false);
      });
  }, []);

  if (load) {
    return <p>Carregando...</p>;
  }

  if (erro) {
    return <p>{erro}</p>;
  }

  return (
    <div>
      <h2>Lista de Usuários</h2>
      <ul>
        {usuarios.map((usuario) => (
          <li key={usuario.id}>
            {usuario.nme} - {usuario.email}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UsuariosApi;