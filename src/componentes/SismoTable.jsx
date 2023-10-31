import { useEffect, useState } from "react";
import Sismo from "./Sismo";

function SismoTable() {
  const [sismos, setSismos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("https://sismo-api.onrender.com/scrape");
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }
        const data = await response.json();

        console.log(data);

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
      <h1 className="font-black text-4xl text-slate-700 table-auto">
        SismoApp
      </h1>
      <p className="mt-3">Podes revisar todos los sismos que han ocurrido.</p>
      {loading ? (
        <p className="text-center mt-10">Cargando datos...</p>
      ) : sismos.length ? (
        <div className="overflow-x-auto">
          <table className="min-w-full shadow mt-5 table-auto">
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
        </div>
      ) : (
        <p className="text-center mt-10">No hay sismos registrados</p>
      )}
    </>
  );
}

export default SismoTable;
