import './App.css'
import { useState } from "react";

const semestres = [
  [
    "Zoología",
    "Laboratorio Zoología",
    "Biología Celular",
    "Laboratorio Biología Celular",
    "Química Orgánica",
    "Laboratorio Química",
    "Mátematicas",
    "Intro a la Medicina",
    "Promedio"
  ],
  [
    "Bioquímica",
    "Agresión y Defensa I",
    "Cuerpo Animal I",
    "Habilidades Comunicativas",
    "Bioquímica",
    "Laboratorio Bioquímica",
    "Salud Pública",
    "Promedio"
  ],
  // Puedes agregar más semestres aquí
];

function App() {
  const [tachadas, setTachadas] = useState({});
  const [notas, setNotas] = useState({});

  const toggleTachado = (semestreIndex, materiaIndex) => {
    const key = `${semestreIndex}-${materiaIndex}`;
    setTachadas(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleNotaChange = (semestreIndex, materiaIndex, value) => {
    const key = `${semestreIndex}-${materiaIndex}`;
    setNotas(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const calcularPromedio = (semestreIndex, cantidadMaterias) => {
    let suma = 0;
    let contador = 0;
    for (let i = 0; i < cantidadMaterias; i++) {
      const key = `${semestreIndex}-${i}`;
      const nota = parseFloat(notas[key]);
      if (!isNaN(nota)) {
        suma += nota;
        contador++;
      }
    }
    return contador > 0 ? (suma / contador).toFixed(1) : "-";
  };

  return (
    <div className="fixed flex inset-0 bg-[#F7DCE6] -z-10 items-center justify-center overflow-auto">
      <div className="grid gap-20 lg:grid-cols-2 md:grid-cols-2 p-4">
        {semestres.map((materias, semestreIndex) => {
          const ultimaMateriaIndex = materias.length - 1;
          return (
            <div key={semestreIndex} className="bg-[#6D9E6D] h-fit w-[400px] rounded-3xl min-h-fit p-0 overflow-hidden">
              <h1 className="text-black bg-auto bg-white font-bold tracking-[10px] text-lg p-4">
                SEMESTRE {semestreIndex + 1}
              </h1>
              <div className="mt-2 text-left px-4">
                <ol className="space-y-3 font-bold text-white">
                  {materias.map((materia, materiaIndex) => {
                    const isPromedio = materia.toLowerCase().includes("promedio");
                    const key = `${semestreIndex}-${materiaIndex}`;
                    return (
                      <li
                        key={materiaIndex}
                        onClick={() => !isPromedio && toggleTachado(semestreIndex, materiaIndex)}
                        className="flex items-center justify-between bg-white/30 hover:bg-orange-300 p-2 rounded-lg w-full transform scale-100 hover:scale-110 transition-transform duration-300 cursor-pointer"
                      >
                        <span className={`${tachadas[key] ? "line-through decoration-black text-white" : ""}`}>
                          {materia}
                        </span>
                        <div className="flex items-center gap-2">
                          {isPromedio ? (
                            <span className="text-lg bg-white/70 text-black px-3 py-1 rounded">
                              {calcularPromedio(semestreIndex, materias.length - 1)}
                            </span>
                          ) : (
                            <input
                              type="number"
                              min="10"
                              max="70"
                              placeholder="(Σxi)/n"
                              value={notas[key] || ""}
                              onChange={(e) => handleNotaChange(semestreIndex, materiaIndex, e.target.value)}
                              className="w-22 px-2 py-1 rounded bg-white/80 text-black text-center focus:outline-none focus:ring-2 focus:ring-orange-500"
                            />
                          )}
                        </div>
                      </li>
                    );
                  })}
                </ol>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
