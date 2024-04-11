import SismoReporte from "../components/SismoReporte";

function Reporte({ sismos }) {
  console.log("🚀 ~ Reporte ~ sismos:", sismos);
  return (
    <div className="min-h-screen flex justify-center items-center p-6 sm:p-12">
      <SismoReporte sismos={sismos} />
    </div>
  );
}

export default Reporte;
