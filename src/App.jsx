import { useState, useEffect } from "react";

export default function GradeTracker() {
  const [notas, setNotas] = useState({});
  const [tachadas, setTachadas] = useState({});

  useEffect(() => {
    // Set body and html background color to match the app
    document.body.style.backgroundColor = '#F7DCE6';
    document.documentElement.style.backgroundColor = '#F7DCE6';
    return () => {
      // Cleanup on unmount
      document.body.style.backgroundColor = '';
      document.documentElement.style.backgroundColor = '';
    };
  }, []);

  const semestres = [
    [
      "Zoología",
      "Biología Celular",
      "Laboratorio Biología Celular",
      "Química General y Orgánica",
      "Matemáticas General",
      "Introducción a la Medicina Veterinaria",
      "Promedio"
    ],
    [
      "Bioquímica",
      "Agresión y Defensa Orgánica I",
      "Cuerpo Animal I",
      "Habilidades Comunicativas",
      "Inglés I",
      "Promedio"
    ],
    [
      "Función y Disfunción Orgánica I",
      "Agresión y Defensa Orgánica II",
      "Cuerpo Animal II",
      "Métodos Cuantitativos RRNN",
      "Inglés II",
      "Promedio"
    ],
    [
      "Función y Disfunción Orgánica II",
      "Genética",
      "Ecología General",
      "Anatomía Clínica",
      "Inglés III",
      "Promedio"
    ],
    [
      "Biología de la Conservación",
      "Anatomía Patológica",
      "Enfermedades de Organismos Acuáticos",
      "Farmacología",
      "Nutrición y Alimentación Animal",
      "Inglés IV",
      "Promedio"
    ],
    [
      "Epidemiología y Salud Pública",
      "Imagenología",
      "Patología Clínica",
      "Reproducción",
      "Razonamiento Científico y TICS",
      "Promedio"
    ],
    [
      "Inocuidad de los Alimentos",
      "Manejo de Fauna Silvestre",
      "Legislación y Evaluación de Impacto Ambiental",
      "Medicina",
      "Sistema de Producción Animal",
      "Promedio"
    ],
    [
      "Zoonosis y Enfermedades Emergentes",
      "Patología Molecular",
      "Cirugía",
      "Formulación y Evaluación de Proyectos de RRNN",
      "Integrador I: Práctica Profesional",
      "Promedio"
    ],
    [
      "Ética y Bienestar Animal",
      "Innovación y Transferencia Tecnológica",
      "Clínica",
      "Pensamiento Crítico",
      "Proyecto de Título",
      "Promedio"
    ],
    [
      "Electivo Profesional I",
      "Electivo Profesional II",
      "Responsabilidad Social",
      "Integrador II: Internado",
      "Promedio"
    ],
  ];

  const handleNotaChange = (semestreIndex, materiaIndex, value) => {
    const key = `${semestreIndex}-${materiaIndex}`;
    setNotas(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const toggleTachado = (semestreIndex, materiaIndex) => {
    const key = `${semestreIndex}-${materiaIndex}`;
    setTachadas(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const calcularPromedio = (semestreIndex, totalMaterias) => {
    let suma = 0;
    let contador = 0;
    
    for (let i = 0; i < totalMaterias; i++) {
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
    <div className="min-h-screen w-full bg-[#6D869E]" style={{backgroundColor: '#6D869E', minHeight: '100vh'}}>
     <h1 className="text-center text-4xl font-bold text-white italic"> MALLA CURRICULAR DE KATRINITA 🤍 localstorage...</h1> 
      <div className="w-full h-full bg-[#6D869E] p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 w-full">
          {semestres.map((materias, semestreIndex) => (
            <div key={semestreIndex} className="bg-[#6D9E6D] w-full rounded-3xl overflow-hidden shadow-lg">
              <h1 className="text-black bg-white font-bold tracking-[3px] text-center text-lg p-4">
                SEMESTRE {semestreIndex + 1}
              </h1>
              <div className="p-4">
                <div className="space-y-3">
                  {materias.map((materia, materiaIndex) => {
                    const isPromedio = materia.toLowerCase().includes("promedio");
                    const key = `${semestreIndex}-${materiaIndex}`;
                    return (
                      <div
                        key={materiaIndex}
                        onClick={() => !isPromedio && toggleTachado(semestreIndex, materiaIndex)}
                        className="flex items-center justify-between bg-white/30 hover:bg-orange-300 p-3 rounded-lg  w-full transform hover:scale-105 transition-all duration-300 cursor-pointer"
                      >
                        <span className={`font-bold text-white ${tachadas[key] ? "line-through decoration-black" : ""}`}>
                          {materia}
                        </span>
                        <div className="flex items-center gap-2">
                          {isPromedio ? (
                            <span className="text-lg bg-white/70 text-black px-3 py-1 rounded font-bold">
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
                              className="w-24 px-2 py-1 rounded bg-white/80 text-black text-center focus:outline-none focus:ring-2 focus:ring-orange-500 font-medium"
                              onClick={(e) => e.stopPropagation()}
                            />
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}