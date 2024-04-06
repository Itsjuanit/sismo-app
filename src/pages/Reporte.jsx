import SismoReporte from "../components/SismoReporte";

function Reporte({ sismos }) {
  console.log("🚀 ~ Reporte ~ sismos:", sismos);
  return (
    <div>
      <SismoReporte sismos={sismos} />
    </div>
  );
}

export default Reporte;
