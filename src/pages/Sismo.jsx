import { useEffect, useState } from "react";
import SismoCard from "../components/SismoCard";
import SismoAlert from "../components/SismoAlert";
import SearchBar from "../components/SearchBar";

function Sismo() {
  const [sismos, setSismos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAlert, setShowAlert] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(null);

  async function fetchData() {
    try {
      const response = await fetch("https://sismo-api.onrender.com/scrape");
      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }
      const data = await response.json();
      if (data.data.length > 0) {
        setSismos(data.data);
        checkRecentSismo(data.data);
        localStorage.setItem("sismosData", JSON.stringify(data.data));
        localStorage.setItem("sismosTimestamp", Date.now());
      }
      setError(null);
    } catch (error) {
      console.error("Error fetching data: ", error);
      setError(error.message);
    } finally {
      setLoading(false); // Establecer el estado de carga en falso después de completar la solicitud.
    }
  }

  function checkRecentSismo(sismosData) {
    if (sismosData.length === 0) {
      setShowAlert(false);
      return;
    }
    const [mostRecentSismo] = sismosData;
    const now = Date.now();
    const tenMinutesAgo = now - 10 * 60 * 1000;
    setShowAlert(new Date(mostRecentSismo.time).getTime() >= tenMinutesAgo);
  }

  useEffect(() => {
    fetchData(); // Llamar a fetchData() al montar el componente

    const fetchDataInterval = setInterval(fetchData, 10 * 60 * 1000); // Llamar a fetchData() cada 10 minutos

    return () => clearInterval(fetchDataInterval); // Limpiar el intervalo al desmontar el componente
  }, []);

  useEffect(() => {
    const updateLocalStorage = () => {
      console.log("Verificando y actualizando el localStorage...");
      const storedData = localStorage.getItem("sismosData");
      if (storedData) {
        console.log("Datos encontrados en el localStorage:", storedData);
        try {
          const parsedData = JSON.parse(storedData);
          console.log("Es un JSON válido:", parsedData);
          const storedTimestamp = localStorage.getItem("sismosTimestamp");
          if (storedTimestamp) {
            console.log(
              "Marca de tiempo encontrada en el localStorage:",
              storedTimestamp
            );
            const storedTime = parseInt(storedTimestamp);
            const now = Date.now();
            const twentyFourHours = 24 * 60 * 60 * 1000;
            if (now - storedTime >= twentyFourHours) {
              console.log(
                "Han pasado más de 24 horas, actualizando los datos..."
              );
              fetchData();
            } else {
              console.log(
                "No han pasado más de 24 horas, utilizando los datos existentes."
              );
              setSismos(parsedData);
            }
          }
        } catch (error) {
          console.error("No es un JSON válido:", error);
        }
      } else {
        console.log(
          "No se encontraron datos en el localStorage, obteniendo nuevos datos..."
        );
        fetchData();
      }
    };

    const updateLocalStorageInterval = setInterval(
      updateLocalStorage,
      24 * 60 * 60 * 1000
    );

    return () => clearInterval(updateLocalStorageInterval);
  }, []);

  function filterSismos(sismos, term) {
    return sismos.filter((sismo) =>
      sismo.location.toLowerCase().includes(term.toLowerCase())
    );
  }

  const displaySismos = searchTerm ? filterSismos(sismos, searchTerm) : sismos;

  return (
    <>
      <h1 className="font-black text-4xl text-[#3f4235] table-auto">
        SISMOTRACK
      </h1>
      <div className="fixed bottom-0 right-0 m-6 w-3/4 md:w-1/4">
        <SismoAlert sismos={sismos} />
      </div>
      <p className="mt-3">Podes revisar todos los sismos que han ocurrido.</p>
      <SearchBar onSearchChange={setSearchTerm} />

      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <div className="text-center mt-2" role="status">
            <svg
              aria-hidden="true"
              className="w-16 h-16 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-[#3F4235]"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>

            <span className="sr-only">Cargando...</span>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-5">
          {displaySismos.map((sismo, index) => (
            <SismoCard sismo={sismo} key={index} />
          ))}
        </div>
      )}

      {!loading && !sismos.length && (
        <p className="text-center mt-10">No hay sismos registrados</p>
      )}
      {!loading && searchTerm && !displaySismos.length && (
        <p className="text-center mt-10">
          No se encontraron sismos para la búsqueda
        </p>
      )}
    </>
  );
}

export default Sismo;
