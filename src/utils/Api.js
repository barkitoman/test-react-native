const SERVER_URL = 'localhost:1434';
const BASE_URL = `http://${SERVER_URL}/api/v1/`;

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
  console.log(general);
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
  tags: {
    async getTags() {
      return await makeRequest(`tags`, `GET`);
    },
    async setTag(body) {
      return await makeRequest(`tags`, `POST`, body);
    },
    async addTag(body) {
      console.log(body, '333');
      return await makeRequest(`tags`, `PUT`, body);
    },
    async deleteTags(id) {
      return await makeRequest(`tags/${id}`, `DELETE`);
    },
  },
};

export default API;
