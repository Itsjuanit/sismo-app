import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

function SismoReporte() {
  const [sismos, setSismos] = useState([]);
  const [selectedCity, setSelectedCity] = useState("San Juan");

  useEffect(() => {
    const updateSismosFromLocalStorage = () => {
      const storedData = localStorage.getItem("sismosData");
      if (storedData) {
        const sismosData = JSON.parse(storedData);
        // Ordenar los sismos por fecha de más antigua a más reciente
        sismosData.sort((a, b) => {
          const dateA = new Date(a.date + " " + a.time);
          const dateB = new Date(b.date + " " + b.time);
          return dateA - dateB;
        });
        setSismos(sismosData);
        // Obtener todas las ciudades únicas de los sismos sin incluir "Todas las Ciudades"
        const cities = [...new Set(sismosData.map((sismo) => sismo.location))];
        setCities(cities);
      }
    };
    updateSismosFromLocalStorage();
  }, []);

  const [cities, setCities] = useState([]);

  const filteredSismos = selectedCity
    ? sismos.filter((sismo) => sismo.location === selectedCity)
    : sismos;

  const data = filteredSismos.map((sismo) => ({
    fecha: new Date(sismo.date + " " + sismo.time).toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }),
    magnitud: parseFloat(sismo.magnitude),
    ciudad: sismo.location,
  }));

  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
  };

  return (
    <div>
      <h1 className="font-black text-4xl text-[#3f4235] table-auto">REPORTE</h1>
      <h2>Gráfico de Magnitud de Sismos</h2>
      <label htmlFor="city">Seleccionar Ciudad:</label>
      <select id="city" onChange={handleCityChange} value={selectedCity}>
        {cities.map((city) => (
          <option key={city} value={city}>
            {city}
          </option>
        ))}
      </select>
      <LineChart width={800} height={400} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="fecha" />
        <YAxis />
        <Tooltip
          formatter={(value, name, props) => {
            if (selectedCity === "San Juan") {
              return [`Magnitud: ${value}`, `Ciudad: ${props.payload.ciudad}`];
            } else {
              return [`Magnitud: ${value}`];
            }
          }}
        />
        <Legend />
        <Line type="monotone" dataKey="magnitud" stroke="#3f4235" />
      </LineChart>
    </div>
  );
}

export default SismoReporte;
