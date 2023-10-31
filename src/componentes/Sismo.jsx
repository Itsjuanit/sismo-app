import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css"; // Importa los estilos de Leaflet
import { GrFormClose } from "react-icons/gr";

function Sismo({ sismo }) {
  const { date, time, depth, magnitude, latitude, longitude, location, link } =
    sismo;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRotated, setIsRotated] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleIconRotation = () => {
    setIsRotated(!isRotated); // Cambia el valor de isRotated al opuesto de su valor actual
    handleCloseModal(); // Llama a la función handleCloseModal
  };

  return (
    <tr className="border-b text-center align-middle">
      <td className="p-6 border">
        <p className="text-gray-800">{date}</p>
      </td>
      <td className="p-6 border">
        <p className="text-gray-800">{time}</p>
      </td>
      <td className="p-6 border">
        <p className="text-gray-800">{depth}</p>
      </td>
      <td className="p-6 border">
        <p className="text-gray-800">{magnitude}</p>
      </td>
      <td className="p-6 border">
        <p className="text-gray-800">{latitude}</p>
      </td>
      <td className="p-6 border">
        <p className="text-gray-800">{longitude}</p>
      </td>
      <td className="p-6 border">
        <p className="text-gray-800">{location}</p>
      </td>
      <td className="p-6 border">
        <button onClick={handleOpenModal} className="text-blue-600 font-bold">
          Ver mapa
        </button>
        {isModalOpen && (
          <>
            <div
              className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md z-10"
              onClick={handleCloseModal}
            ></div>

            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg z-20">
              <div className="flex justify-end">
                <button
                  onClick={handleIconRotation}
                  className="text-slate-700 font-bold text-xl"
                >
                  <GrFormClose
                    className={isRotated ? "transform rotate-180" : ""}
                  />
                </button>
              </div>
              <MapContainer
                center={[latitude, longitude]}
                zoom={7}
                style={{ height: "400px", width: "600px" }}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker position={[latitude, longitude]}>
                  <Popup>{location}</Popup>
                </Marker>
              </MapContainer>
            </div>
          </>
        )}
      </td>
    </tr>
  );
}

export default Sismo;
