import { useState } from "react";
import "./App.css";

function App() {
  const [tarea, setTarea] = useState("");
  const [tareas, setTareas] = useState([]);

  const agregarTarea = () => {
    if (tarea.trim() === "") return;

    setTareas([
      ...tareas,
      {
        texto: tarea,
        completada: false,
      },
    ]);

    setTarea("");
  };

  const eliminarTarea = (index) => {
    setTareas(tareas.filter((_, i) => i !== index));
  };

  const completarTarea = (index) => {
    const nuevasTareas = [...tareas];

    nuevasTareas[index].completada =
      !nuevasTareas[index].completada;

    setTareas(nuevasTareas);
  };

  const completadas = tareas.filter(
    (t) => t.completada
  ).length;

  return (
    <div className="container">
      <h1>To Do List</h1>

      <div className="input-container">
        <input
          type="text"
          placeholder="agregar una nueva tarea..."
          value={tarea}
          onChange={(e) => setTarea(e.target.value)}
        />

        <button onClick={agregarTarea}>
          Agregar
        </button>
      </div>

      <h2>Lista de Tareas</h2>

      {tareas.map((t, index) => (
        <div className="task" key={index}>
          <input
            type="checkbox"
            checked={t.completada}
            onChange={() => completarTarea(index)}
          />

          <span
            style={{
              textDecoration: t.completada
                ? "line-through"
                : "none",
              color: t.completada
                ? "#888"
                : "white",
            }}
          >
            {t.texto}
          </span>

          <div className="actions">
            <button
              className="delete"
              onClick={() => eliminarTarea(index)}
            >
              Eliminar
            </button>
          </div>
        </div>
      ))}

      <div className="footer">
        Completadas: {completadas} |
        Por Completar: {tareas.length - completadas}
      </div>
    </div>
  );
}

export default App;
