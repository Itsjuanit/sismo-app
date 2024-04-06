import { Scatter } from "react-chartjs-2";

function SismoReporte({ sismos }) {
  // Verificar si hay datos de sismos disponibles
  if (!sismos || sismos.length === 0) {
    return <p>No hay datos de sismos disponibles.</p>;
  }

  // Convertir los datos de sismos en el formato esperado por Chart.js
  const data = {
    datasets: [
      {
        label: "Sismos",
        data: sismos.map((sismo) => ({
          x: sismo.magnitud,
          y: sismo.profundidad,
        })),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  };

  // Configurar opciones del gráfico
  const options = {
    scales: {
      x: {
        title: {
          display: true,
          text: "Magnitud",
        },
      },
      y: {
        title: {
          display: true,
          text: "Profundidad (km)",
        },
      },
    },
  };

  // Renderizar el gráfico de dispersión
  return (
    <div>
      <Scatter data={data} options={options} />
    </div>
  );
}

export default SismoReporte;
