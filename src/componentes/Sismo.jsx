import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
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
    setIsRotated(!isRotated);
    handleCloseModal();
  };

  function getColorForMagnitude(magnitude) {
    const colors = [
      "#00ff00", // verde para < 2.0
      "#40ff00", // transición a amarillo-verde
      "#80ff00",
      "#bfff00",
      "#ffff00", // amarillo para 5.0
      "#ffbf00",
      "#ff8000",
      "#ff4000",
      "#ff0000", // rojo para 9.0-9.9
      "#ff0000", // rojo más oscuro para 10+
    ];

    let index = Math.min(Math.floor(magnitude), 10);
    return colors[index] || colors[9];
  }

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
      <td
        className="p-6 border"
        style={{ backgroundColor: getColorForMagnitude(magnitude) }}
      >
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

            <div
              className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg z-20"
              style={{
                width: window.innerWidth < 768 ? "90%" : "600px",
                height: window.innerWidth < 768 ? "80%" : "400px",
              }}
            >
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
                style={{ height: "100%", width: "100%" }}
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
