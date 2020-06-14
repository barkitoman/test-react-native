const SERVER_URL = 'jsonplaceholder.typicode.com';
const BASE_URL = `https://${SERVER_URL}/`;

async function makeRequest(sufix = '/', method = 'GET', payload = {}, multipart = false) {
  const contentType = 'application/json';
  const general = {
    method,
    headers: {
      Accept: '*/*',
      'Cache-Control': 'no-cache',
      Host: SERVER_URL,
      'Accept-Encoding': 'gzip, deflate, br',
      Connection: 'keep-alive',
      'Content-Type': contentType,
    },
  };

  if (method === 'POST' || method === 'PUT' || method === 'DELETE') {
    general.body = JSON.stringify(payload);
  }

  return await fetch(`${BASE_URL}${sufix}`, general)
    .then((response) => {
      console.log(method, response.status, `${BASE_URL}${sufix}`);
      if (!response.ok) {
        return response.text();
      }
      return response.json();
    })
    .then((jsonresponse) => jsonresponse)
    .catch((err) => {
      console.log('error with status ', err);
    });
}

const API = {
  post: {
    async getPosts() {
      return await makeRequest(`posts`, `GET`);
    },
    async getSensorsByZoneId(id) {
      const response = await makeRequest(`getSensorsByZoneId?id=${id}`, `GET`);
      return response.data;
    },
    async claimSensor(data) {
      const response = await makeRequest(`claimSensor`, `POST`, data);
      return response.data;
    },
  },
};

export default API;
