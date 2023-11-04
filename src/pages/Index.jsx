import { Link } from "react-router-dom";
import locationImage from "../assets/fondoPrincipal.png";

function Index() {
  return (
    <div className="flex h-[90vh]">
      <div className="flex-1 p-6">
        <h1 className="font-black text-4xl text-[#3f4235]">
          ¿Que es SISMOTRACK?
        </h1>
        <p className="mt-3">
          Explora el pulso de la tierra con SISMOTRACK, tu compañero confiable
          en el monitoreo de actividad sísmica. Diseñada con una interfaz
          amigable, nuestra aplicación transforma los datos crudos de los
          movimientos sísmicos en visualizaciones comprensibles, permitiéndote
          estar informado y preparado ante los fenómenos naturales. Con
          SismoTrack, lleva la vigilancia sísmica en tu bolsillo.
        </p>
        <Link
          to="/sismos"
          className="mt-4 inline-block px-6 py-2 text-xs font-medium leading-6 text-center text-white uppercase transition bg-[#3f4235] rounded shadow ripple hover:shadow-lg focus:outline-none"
        >
          Ver Sismos
        </Link>
      </div>
      <div className="flex-1 hidden md:block">
        <img
          src={locationImage}
          alt="Sismo"
          className="object-cover h-full w-full"
        />
      </div>
    </div>
  );
}

export default Index;
