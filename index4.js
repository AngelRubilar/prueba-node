const axios = require('axios');

// Función para calcular la consulta de los últimos 5 minutos
function realizarConsulta() {
  const ahora = new Date(); // Hora actual
  //const haceCincoMinutos = new Date(ahora.getTime() - 5 * 60 * 1000); // Hace 5 
  const haceUnaHora = new Date(ahora.getTime() - 3 * 60 * 60 * 1000); // una hora
  console.log(`=== Realizando consulta hora a la API === ${haceUnaHora}`);

  const opcionesFormato = { timeZone: 'America/Santiago', hour12: false }; // Zona horaria para Chile
  const estampaTiempoFinal = ahora.toLocaleString('es-CL', opcionesFormato);
  const estampaTiempoInicial = haceUnaHora.toLocaleString('es-CL', opcionesFormato);
  console.log(`=== Realizando consulta hora a la API inicio=== ${estampaTiempoInicial}`);
  console.log(`=== Realizando consulta hora a la API termino === ${estampaTiempoFinal}`);

  let data = JSON.stringify({
    "estampaTiempoInicial": estampaTiempoInicial,
    "estampaTiempoFinal": estampaTiempoFinal,
    "tipoMedicion": 1,
    "consulta": [
      {
        "dispositivoId": "SQM Mejillones"
      }
    ]
  });

  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: 'https://api.serpram.cl/air_ws/v1/api/getHistorico',
    headers: { 
      'Content-Type': 'application/json', 
      'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJtYWlsIjoiIiwic3ViIjoic3FtLnNlcnByYW0iLCJjcmVhdGVkIjoxNzMyNjU0NDk4NTk1LCJ1c2VySWQiOjExMDEsImF1ZCI6IndlYiIsInJvbGUiOlt7ImF1dGhvcml0eSI6IlJPTEVfQ0xJRSJ9XSwiaWF0IjoxNzMyNjU0NDk4fQ.FSxnFf2_YRO_PzcK5yklovseTz4dRzm5-eSygl9qVAK-kfPItcuOtHrL-QOCnVMw4llxC6Li-dkaPx3j2wA3eg'
    },
    data: data
  };
  console.log('consulta',config);
  console.log('=== Realizando consulta a la API ===');
  console.log(`Parámetros:\n  Inicial: ${estampaTiempoInicial}\n  Final: ${estampaTiempoFinal}\n`);

  // Realizar la petición
  axios.request(config)
    .then((response) => {
      console.log("=== Datos recibidos correctamente ===");
      console.table(JSON.stringify(response.data)); // Mostrar todos los datos en la consola
    })
    .catch((error) => {
      console.error("=== Error al realizar la consulta ===");
      console.error(error.message);
    });
}

// Llamar a la función cada 5 minutos (300,000 ms)
setInterval(realizarConsulta, 300000);

// Ejecutar la consulta inmediatamente al iniciar el programa
realizarConsulta();
