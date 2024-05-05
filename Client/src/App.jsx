import { useState } from "react";
import Logo from "/Logo.png";
import "./App.css";
import axios from "axios";

function App() {
  const [input, setInput] = useState("");
  const [display, setDisplay] = useState([]);
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsPending(true);
    if (input !== "") {
      axios
        .post("http://localhost:5000/model", { text: input })
        .then((response) => {
          setDisplay([
            ...display,
            { user: "Usuario", message: input },
            { user: "Franch", message: response.data.response },
          ]);
          setIsPending(false);
        })
        .catch((error) => {
          console.error(error);
          setDisplay([
            ...display,
            { user: "Usuario", message: input },
            { user: "Franch", message: "Error al obtener una respuesta" },
          ]);
          setIsPending(false);
        });
      setInput("");
    }
  };

  const handleInputChange = (e) => {
    e.preventDefault();
    setInput(e.target.value);
  };

  return (
    <div className="container">
      <div className="header-container">
        <header>
          <img src={Logo} alt="Logo" />{" "}
          <span>
            <b>Autism Insight</b>
          </span>
        </header>
      </div>

      <div className="chat-container">
        {display.map((message, index) => {
          return (
            <div key={index}>
              <div className="user">{message.user}</div>
              <div className="message-text">{message.message}</div>
            </div>
          );
        })}
        {isPending && (
          <div className="loading-container">
            <div className="loading-message">Cargando Respuesta...</div>
            <div className="loading-spinner"></div>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="input-text">
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          placeholder="Realiza tu pregunta aquí"
        />
        <button type="submit">
          <b>↑</b>
        </button>
      </form>
    </div>
  );
}
export default App;
