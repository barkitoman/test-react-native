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
    async deletePost(id) {
      return await makeRequest(`posts/${id}`, `DELETE`);
    },
  },
  user: {
    async getUserInfo(userId) {
      return await makeRequest(`users/${userId}`, `GET`);
    },
  },
  comments: {
    async getComments(postId) {
      return await makeRequest(`comments?postId=${postId}`, `GET`);
    },
  },
};

export default API;
