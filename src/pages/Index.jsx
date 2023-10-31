import { useEffect, useState } from "react";
import Sismo from "../componentes/Sismo";

function Index() {
  const [sismos, setSismos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("http://localhost:3001/scrape");
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }
        const data = await response.json();
        setSismos(data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data: ", error);
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <>
      <h1 className="font-black text-4xl text-purple-500 table-auto">Sismos</h1>
      <p className="mt-3">Mirá todos los sismos del mundo</p>
      {loading ? (
        <p className="text-center mt-10">Cargando datos...</p>
      ) : sismos.length ? (
        <table className="w-full shadow mt-5 table-auto">
          <thead className="text-black">
            <tr>
              <th className="p-2">Fecha</th>
              <th className="p-2">Hora</th>
              <th className="p-2">Profundidad</th>
              <th className="p-2">Magnitud</th>
              <th className="p-2">Latitud</th>
              <th className="p-2">Longitud</th>
              <th className="p-2">Lugar</th>
              <th className="p-2">Mapa</th>
            </tr>
          </thead>
          <tbody>
            {sismos.map((sismo, index) => (
              <Sismo sismo={sismo} key={index} />
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center mt-10">No hay sismos registrados</p>
      )}
    </>
  );
}

export default Index;
