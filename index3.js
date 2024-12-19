const express = require('express'); // Importar Express
const axios = require('axios'); // Importar Axios

const app = express(); // Crear una instancia de la aplicación Express
const PORT = 3000; // Puerto donde correrá el servidor

app.get('/consulta-api', async (req, res) => {
  let data = JSON.stringify({
    "estampaTiempoInicial": "2024-12-17T09:00:00-0300",
    "estampaTiempoFinal": "2024-12-17T10:00:00-0300",
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
    data : data
  };

  try {
    console.log('Realizando consulta a la API...');
    const response = await axios.request(config);
    console.log("Datos recibidos correctamente");

    // Responder al cliente con los datos obtenidos de la API
    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error al consultar la API:', error.message);
    res.status(500).json({ error: 'Error al obtener datos de la API', details: error.message });
  }
});

// Iniciar el servidor en el puerto especificado
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
