import { useState, useMemo } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { GrFormClose } from "react-icons/gr";
import catamarca from "../assets/catamarca.png";
import chile from "../assets/chile.png";
import ciudad from "../assets/ciudad.png";
import laRioja from "../assets/laRioja.png";
import mendoza from "../assets/mendoza.png";
import salta from "../assets/salta.png";
import sanJuan from "../assets/sanJuan.png";
import sanLuis from "../assets/sanLuis.png";

const locationBackgroundImages = {
  MENDOZA: mendoza,
  "SAN JUAN": sanJuan,
  "SAN LUIS": sanLuis,
  SALTA: salta,
  CHILE: chile,
  CATAMARCA: catamarca,
  "LA RIOJA": laRioja,
  CIUDAD: ciudad,
};

function SismoCard({ sismo }) {
  const { date, time, depth, magnitude, latitude, longitude, location, link } =
    sismo;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const backgroundImageUrl = useMemo(() => {
    return locationBackgroundImages[location.toUpperCase()] || ciudad;
  }, [location]);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow">
      <div
        style={{
          backgroundImage: `url(${backgroundImageUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "30%",
          filter: "saturate(50%) brightness(90%)",
        }}
        className="w-full rounded-t-lg p-5"
      >
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 uppercase">
          Sismo en {location}
        </h5>
        <div className="flex items-center mt-2.5 mb-5">
          <p>
            <span className="text-gray-900 text-l font-bold">
              Fecha: {date}
            </span>
          </p>
        </div>
      </div>
      <div className="px-5 pb-5">
        <div>
          <p>Hora: {time}</p>
          <p>Profundidad: {depth}</p>
          <p>
            Magnitud:{" "}
            <span
              className={`text-sm font-medium mr-2 px-2.5 py-0.5 rounded ${
                magnitude < 1
                  ? "bg-blue-200 text-blue-800"
                  : magnitude < 2
                  ? "bg-green-200 text-green-800"
                  : magnitude < 3
                  ? "bg-yellow-200 text-yellow-800"
                  : magnitude < 4
                  ? "bg-orange-200 text-orange-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {magnitude}
            </span>
          </p>
          <p>Latitud: {latitude}</p>
          <p>Longitud: {longitude}</p>
        </div>
        <div className="flex items-center justify-between mt-5">
          <button
            className="rounded text-white bg-[#3f4235] p-2"
            onClick={toggleModal}
          >
            Ver Mapa
          </button>
        </div>
      </div>
      {isModalOpen && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md z-10"
            onClick={toggleModal}
          ></div>
          <div
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg z-20"
            style={{
              width: "90%",
              maxWidth: "600px",
              height: "80%",
              maxHeight: "400px",
            }}
          >
            <div className="flex justify-end">
              <button
                onClick={toggleModal}
                className="text-slate-700 font-bold text-xl"
              >
                <GrFormClose />
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
