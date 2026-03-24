import { Link } from "react-router-dom";

function Home() {
  const usuarios = [
    { id: 1, nome: "Maria", idade: "29" },
    { id: 2, nome: "Jose", idade: "28" },
    { id: 5, nome: "Fernando", idade: "34" },
    { id: 4, nome: "Carla", idade: "20" },
  ];

  return (
    <div id="conteudo">
      <div id="conteudo-geral">
        <h2>Bem-vindo!</h2>
        <p>Lista de usuários:</p>
        <ul>
          {usuarios.map((u) => (
            <li key={u.id}>{u.nome} - {u.idade} anos</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Home;