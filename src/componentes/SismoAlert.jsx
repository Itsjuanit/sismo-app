import { useState, useEffect } from "react";

function SismoAlert({ sismos }) {
  const [recentSismo, setRecentSismo] = useState(false);

  useEffect(() => {
    const now = Date.now();
    const tenMinutesAgo = now - 10 * 60 * 1000;

    const sismoRecent = sismos.some((sismo) => {
      // Asumiendo que la hora del sismo viene en un formato que Date puede entender
      const sismoTime = new Date(sismo.time).getTime();
      return sismoTime >= tenMinutesAgo;
    });

    setRecentSismo(sismoRecent);
  }, [sismos]); // Dependencia en la prop sismos, así se re-evaluará cada vez que sismos cambie

  useEffect(() => {
    let timer;
    if (recentSismo) {
      timer = setTimeout(() => {
        setRecentSismo(false);
      }, 30000); // 30 segundos
    }

    // Limpieza: cancelar el temporizador si el componente se desmonta o si recentSismo cambia antes de que el temporizador se agote
    return () => {
      clearTimeout(timer);
    };
  }, [recentSismo]);

  return (
    <div>
      {recentSismo && (
        <div
          className="p-4 mb-4 text-sm text-white rounded-lg bg-red-500 shadow-lg"
          role="alert"
        >
          <span className="font-medium">Alerta de sismo</span> Hubo un sismo
          hace menos de 10 minutos.
        </div>
      )}
    </div>
  );
}

export default SismoAlert;
