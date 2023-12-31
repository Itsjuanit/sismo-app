import footerImg from "../assets/footerImg.png";

function Footer() {
  return (
    <div
      className="bg-contain bg-center bg-no-repeat text-center lg:text-left"
      style={{
        backgroundImage: `url(${footerImg})`,
        backgroundSize: "cover",
      }}
    >
      <div className="container p-6 text-gray-900">
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="mb-6 lg:mb-0">
            <h5 className="mb-2 font-medium uppercase">Disclaimer</h5>

            <p className="mb-4">
              La información proporcionada en este sitio web se obtiene mediante
              técnicas de web scraping a partir de fuentes externas. El
              propósito de este sitio es simplemente recopilar y desplegar esta
              información de manera más accesible para los usuarios. No nos
              hacemos responsables por la exactitud, actualidad o integridad de
              la información proporcionada, ni por cualquier decisión o acción
              tomada en base a la información contenida en este sitio web.
            </p>
          </div>

          <div className="mb-6 lg:mb-0 text-center lg:text-left">
            <h5 className="mb-2 font-medium uppercase">Itsjuanit</h5>
            <p className="mb-4">
              Este sitio ha sido realizado con Vite, React, React-router-dom,
              Node.js, Tailwindcss, desplegado en Vercel el front y el backend
              en Render. Visitá{" "}
              <a
                href="https://portfolio-itsjuanit.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-900 text-xl underline bold"
              >
                ITSJUANIT
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
