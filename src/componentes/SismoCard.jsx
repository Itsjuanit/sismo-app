import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { GrFormClose } from "react-icons/gr";
import carteles from "../assets/carteles.png";
import point from "../assets/point.png";
import redFlag from "../assets/redflag.png";
import sos from "../assets/sos.png";

const images = [carteles, sos, point, redFlag];
function SismoCard({ sismo }) {
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
      "#00ff00",
      "#40ff00",
      "#80ff00",
      "#bfff00",
      "#ffff00",
      "#ffbf00",
      "#ff8000",
      "#ff4000",
      "#ff0000",
      "#ff0000",
    ];
    let index = Math.min(Math.floor(magnitude), 10);
    return colors[index] || colors[9];
  }

  function getRandomImage() {
    const randomIndex = Math.floor(Math.random() * images.length);
    return images[randomIndex];
  }
  const randomImage = getRandomImage();

  return (
    <div className="w-full max-w-sm bg-#fff border border-gray-200 rounded-lg shadow">
      <img
        src={randomImage}
        alt="Sismo"
        className="w-full object-contain h-48 rounded-t-lg"
      />

      <div className="px-5 pb-5">
        <h5 className="text-xl font-semibold tracking-tight text-gray-900 uppercase">
          Sismo en {location}
        </h5>
        <div className="flex items-center mt-2.5 mb-5">
          <p>
            <span className="text-gray-900">Fecha: {date}</span>
          </p>
        </div>
        <div>
          <p>Hora: {time}</p>
          <p>Profundidad: {depth}</p>
          <p>
            Magnitud:{" "}
            <span style={{ backgroundColor: getColorForMagnitude(magnitude) }}>
              {magnitude}
            </span>
          </p>
          <p>Latitud: {latitude}</p>
          <p>Longitud: {longitude}</p>
        </div>
        <div className="flex items-center justify-between mt-5">
          <button
            onClick={handleOpenModal}
            className="text-blue-600 hover:underline"
          >
            Ver Mapa
          </button>
        </div>
      </div>
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
    </div>
  );
}

export default SismoCard;
