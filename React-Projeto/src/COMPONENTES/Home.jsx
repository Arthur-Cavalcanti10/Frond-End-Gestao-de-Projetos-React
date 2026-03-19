import { Link } from "react-router-dom";

function Home() {
  const usuarios = [
    { id: 1, nome: "Maria", idade: "29" },
    { id: 2, nome: "Jose", idade: "28" },
    { id: 5, nome: "Fernando", idade: "34" },
    { id: 4, nome: "Carla", idade: "20" },
  ];

  return (
    <div>
      <h2>Lista de Usuários</h2>
      <ul>
        {usuarios.map((usuario) => (
          <li key={usuario.id}>         {/*Cata o id do usuario*/}
            {usuario.nome}{" "}<Link to={`/usuario/${usuario.id}`}>ver perfil</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;