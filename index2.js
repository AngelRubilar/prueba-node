const axios = require('axios');
  
let data = JSON.stringify({
  "estampaTiempoInicial": "2024-12-19T09:00:00-0300",
  "estampaTiempoFinal": "2024-12-19T11:45:00-0300",
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
console.log('consulta a la api ',config);
axios.request(config)
.then((response) => {
  console.table(JSON.stringify(response.data));
  console.log("datos correctos");
})
.catch((error) => {
  console.log(error);
});
