import { Link } from "react-router-dom";
import locationImage from "../assets/location.png";

function Index() {
  const style = {
    backgroundImage: `url(${locationImage})`,
    backgroundSize: "700px 500px",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center center",
    height: "90vh",
  };

  return (
    <div style={style}>
      <h1 className="font-black text-4xl text-slate-700 table-auto">
        SismoApp
      </h1>
      <p className="mt-3">Podes revisar todos los sismos que han ocurrido.</p>
      <Link to="/sismos" className="btn btn-primary">
        Ver Sismos
      </Link>
    </div>
  );
}

export default Index;
